import type { Writable } from "node:stream";
import {
  DEFAULT_SINK_QUEUE_SIZE,
  LOG_LEVEL_VALUES,
  LOWEST_PRIO_LEVEL,
  type LogLevel,
  type Sink,
} from "./config.ts";
import { formatRecord, serializeRecord } from "./format.ts";

/*
 * JC: all of the code in this file is necessary to ensure that the
 * requirements of the `Writable.write` function are upheld:
 *
 * > If false is returned, further attempts to write data to the stream should
 * > stop until the 'drain' event is emitted.
 *
 * > While calling write() on a stream that is not draining is allowed, Node.js
 * > will buffer all written chunks until maximum memory usage occurs, at which
 * > point it will abort unconditionally.
 *
 * https://nodejs.org/api/stream.html#writablewritechunk-encoding-callback
 *
 * we don't want to pass this backpressure up to the callers since that would
 * require users of the library to implement their own backpressure handling at
 * every log callsite, which is ridiculous. we will implement our own backpressure
 * handling that uses a bounded queue to hold messages while the stream is blocked
 * and drops "least unimportant" messages if the queue becomes full
 *
 * in Winston, which this library used to wrap, the `write` method is called
 * without checking the return value:
 *
 * https://github.com/winstonjs/winston/blob/ff0b79de8562bb322c390fbc82fe71c11f373428/lib/winston/transports/stream.js#L47-L61
 *
 * this means that consumers of the @saasquatch/logger package prior to the
 * 4.0 update were vulnerable to this possible memory exhaustion issue
 */

export type SinkWriter = ((
  serializedRecord: string,
  level: LogLevel,
) => void) & {
  flush?: () => Promise<void>;
};

type QueuedRecord = {
  serializedRecord: string;
  level: LogLevel;
};

type StreamMonitor = {
  error?: Error;
  failureHandlers: Set<(error: Error) => void>;
};

export function createSinkWriter(loggerName: string, sink: Sink): SinkWriter {
  const maxQueueSize = sink.maxQueueSize ?? DEFAULT_SINK_QUEUE_SIZE;

  if (!Number.isInteger(maxQueueSize) || maxQueueSize < 1) {
    throw new Error("Sink maxQueueSize must be a positive integer");
  }

  const queue: QueuedRecord[] = [];

  // keep track of callers who are waiting for the SinkWriter to flush
  const flushWaiters: Array<{
    resolve: () => void;
    reject: (error: Error) => void;
  }> = [];

  let blocked = false;
  let droppedRecords = 0;
  let pendingWrites = 0;
  let streamError: Error | undefined;

  const settleFlushWaiters = () => {
    // if the stream is errored, all the flush waiters will be rejected
    // instantly
    if (streamError !== undefined) {
      for (const waiter of flushWaiters.splice(0)) {
        waiter.reject(streamError);
      }

      return;
    }

    if (!blocked && queue.length === 0 && pendingWrites === 0) {
      for (const waiter of flushWaiters.splice(0)) {
        waiter.resolve();
      }
    }
  };

  const fail = (error: Error) => {
    if (streamError !== undefined) {
      return;
    }

    streamError = error;
    blocked = false;
    queue.length = 0;
    sink.stream.removeListener("drain", drainQueue);
    settleFlushWaiters();
  };

  const writeChunk = (serializedRecord: string): boolean => {
    pendingWrites += 1;

    try {
      return sink.stream.write(serializedRecord, (error) => {
        pendingWrites -= 1;
        if (error) {
          fail(error);
          return;
        }

        settleFlushWaiters();
      });
    } catch (error) {
      pendingWrites -= 1;
      fail(error instanceof Error ? error : new Error(String(error)));
      return false;
    }
  };

  const waitForDrain = () => {
    if (streamError !== undefined) {
      return;
    }

    blocked = true;
    sink.stream.once("drain", drainQueue);
  };

  // called when the stream is drained and becomes available for writing again
  function drainQueue() {
    if (streamError !== undefined) {
      return;
    }

    blocked = false;

    // emit a warning if some logs were dropped while we were blocked by
    // backpressure
    if (droppedRecords > 0) {
      const count = droppedRecords;
      droppedRecords = 0;
      const noun = count === 1 ? "record" : "records";
      const warning = formatRecord(
        loggerName,
        "warn",
        `Dropped ${count} log ${noun} due to sink backpressure`,
        { droppedLogs: count },
      );

      if (!writeChunk(`${serializeRecord(warning)}\n`)) {
        waitForDrain();
        return;
      }
    }

    // write the queued records until the queue is empty or we become blocked
    // again
    while (queue.length > 0) {
      const record = queue.shift()!;
      if (!writeChunk(record.serializedRecord)) {
        waitForDrain();
        return;
      }
    }

    // if we managed to empty the queue then we can proceed to settle the flush
    // waiters
    settleFlushWaiters();
  }

  const dropLowestSeverityRecord = () => {
    let dropIndex = 0;
    let dropSeverity = 0;

    for (
      let i = 1;
      // if we encounter a log with the lowest possible severity we can short
      // circuit this loop
      i < queue.length && dropSeverity !== LOWEST_PRIO_LEVEL;
      i += 1
    ) {
      const thisSeverity = LOG_LEVEL_VALUES[queue[i].level];
      if (thisSeverity > LOG_LEVEL_VALUES[queue[dropIndex].level]) {
        dropIndex = i;
        dropSeverity = thisSeverity;
      }
    }

    queue.splice(dropIndex, 1);
    droppedRecords += 1;
  };

  const sinkWriter: SinkWriter = (serializedRecord, level) => {
    if (streamError !== undefined) {
      return;
    }

    if (!blocked) {
      if (!writeChunk(serializedRecord)) {
        waitForDrain();
      }

      return;
    }

    queue.push({ serializedRecord, level });
    if (queue.length > maxQueueSize) {
      dropLowestSeverityRecord();
    }
  };

  sinkWriter.flush = () => {
    if (streamError !== undefined) {
      return Promise.reject(streamError);
    }

    if (!blocked && queue.length === 0 && pendingWrites === 0) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      flushWaiters.push({ resolve, reject });
    });
  };

  monitorStream(sink.stream, fail);
  return sinkWriter;
}

// we'll keep track of which streams have monitors attached to them in case the
// same stream is used in multiple loggers (happens when children are created)
//
// this way we won't add a ton of listeners to the streams like Winston does
// https://github.com/winstonjs/winston/blob/ff0b79de8562bb322c390fbc82fe71c11f373428/lib/winston/transports/stream.js#L33-L34
const streamMonitors = new WeakMap<Writable, StreamMonitor>();

function monitorStream(
  stream: Writable,
  failureHandler: (error: Error) => void,
) {
  let monitor = streamMonitors.get(stream);
  if (monitor === undefined) {
    const newMonitor: StreamMonitor = { failureHandlers: new Set() };
    monitor = newMonitor;
    streamMonitors.set(stream, newMonitor);

    const failStream = (error: Error) => {
      if (newMonitor.error !== undefined) {
        return;
      }

      newMonitor.error = error;
      for (const handler of newMonitor.failureHandlers) {
        handler(error);
      }
    };

    stream.on("error", failStream);
    stream.on("close", () => {
      failStream(
        new Error("Log sink stream closed before all records were written"),
      );
    });
  }

  if (monitor.error !== undefined) {
    failureHandler(monitor.error);
    return;
  }

  monitor.failureHandlers.add(failureHandler);
}
