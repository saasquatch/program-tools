import assert from "node:assert/strict";
import { Writable } from "node:stream";
import { describe, test } from "node:test";
import type { LogLevel } from "../src/config.ts";
import { createSinkWriter, type SinkWriter } from "../src/stream-sink.ts";

class CaptureStream extends Writable {
  chunks: string[] = [];

  override _write(
    chunk: Buffer | string,
    _encoding: BufferEncoding,
    done: (error?: Error | null) => void,
  ) {
    this.chunks.push(chunk.toString());
    done();
  }
}

class FailedWriteStream extends Writable {
  override _write(
    _chunk: Buffer | string,
    _encoding: BufferEncoding,
    done: (error?: Error | null) => void,
  ) {
    done(new Error("write callback failed"));
  }
}

class BackpressureStream extends Writable {
  chunks: string[] = [];
  private callbacks: Array<(error?: Error | null) => void> = [];

  constructor() {
    super({ highWaterMark: 1 });
  }

  override _write(
    chunk: Buffer | string,
    _encoding: BufferEncoding,
    done: (error?: Error | null) => void,
  ) {
    this.chunks.push(chunk.toString());
    this.callbacks.push(done);
  }

  releaseNext() {
    const callback = this.callbacks.shift();
    assert.ok(callback, "Expected a pending stream write");
    callback();
  }
}

const waitForIO = () => new Promise<void>((resolve) => setImmediate(resolve));

function flush(writer: SinkWriter): Promise<void> {
  const flushWriter = writer.flush;
  assert.ok(flushWriter);
  return flushWriter();
}

function writeRecord(writer: SinkWriter, message: string, level: LogLevel) {
  writer(`${JSON.stringify({ message })}\n`, level);
}

void describe("stream sinks", () => {
  void test("bounds a blocked queue and drops the oldest record at the lowest severity", async () => {
    const stream = new BackpressureStream();
    const writer = createSinkWriter("backpressure", {
      stream,
      maxQueueSize: 3,
    });

    writeRecord(writer, "blocking", "info");
    writeRecord(writer, "old info", "info");
    writeRecord(writer, "error", "error");
    writeRecord(writer, "new info", "info");
    writeRecord(writer, "debug", "debug");
    writeRecord(writer, "emergency", "emerg");

    let didFlush = false;
    const flushing = flush(writer).then(() => {
      didFlush = true;
    });
    await waitForIO();
    assert.equal(didFlush, false);

    stream.releaseNext();
    await waitForIO();

    const warning = JSON.parse(stream.chunks[1]);
    assert.equal(warning.level, "warn");
    assert.equal(warning.droppedLogs, 2);
    assert.match(warning.message, /Dropped 2 log records/);

    for (let writes = 0; writes < 4; writes += 1) {
      stream.releaseNext();
      await waitForIO();
    }

    await flushing;
    assert.equal(didFlush, true);
    assert.deepEqual(
      stream.chunks.map((chunk) => JSON.parse(chunk).message),
      [
        "blocking",
        "Dropped 2 log records due to sink backpressure",
        "error",
        "new info",
        "emergency",
      ],
    );
  });

  void test("flushes accepted writes and resolves immediately when idle", async () => {
    const stream = new CaptureStream();
    const writer = createSinkWriter("flush", { stream });

    writeRecord(writer, "one", "info");
    await flush(writer);
    await flush(writer);

    assert.deepEqual(
      stream.chunks.map((chunk) => JSON.parse(chunk).message),
      ["one"],
    );
  });

  void test("rejects pending and future flushes after a shared stream error", async () => {
    const stream = new BackpressureStream();
    const one = createSinkWriter("one", { stream });
    const two = createSinkWriter("two", { stream });

    writeRecord(one, "one", "info");
    writeRecord(two, "two", "info");
    const flushOne = flush(one);
    const flushTwo = flush(two);
    stream.destroy(new Error("stream failed"));

    await assert.rejects(flushOne, /stream failed/);
    await assert.rejects(flushTwo, /stream failed/);

    writeRecord(one, "ignored", "emerg");
    await assert.rejects(flush(one), /stream failed/);

    const three = createSinkWriter("three", { stream });
    await assert.rejects(flush(three), /stream failed/);
  });

  void test("rejects flushes after the stream closes", async () => {
    const stream = new CaptureStream();
    const writer = createSinkWriter("closed", { stream });
    const closed = new Promise<void>((resolve) => {
      stream.once("close", resolve);
    });

    stream.destroy();
    await closed;

    await assert.rejects(flush(writer), /stream closed/);
  });

  void test("captures stream write callback failures", async () => {
    const stream = new FailedWriteStream();
    const writer = createSinkWriter("failed-callback", {
      stream,
    });

    writeRecord(writer, "failure", "error");

    await assert.rejects(flush(writer), /write callback failed/);
  });

  void test("captures synchronous stream write failures", async () => {
    const stream = new CaptureStream();
    stream.write = (() => {
      throw new Error("write failed");
    }) as typeof stream.write;
    const writer = createSinkWriter("throwing", { stream });

    writeRecord(writer, "failure", "error");

    await assert.rejects(flush(writer), /write failed/);
  });

  void test("rejects invalid queue sizes", () => {
    for (const maxQueueSize of [0, -1, 1.5, Number.NaN]) {
      assert.throws(
        () =>
          createSinkWriter("invalid", {
            stream: new CaptureStream(),
            maxQueueSize,
          }),
        /positive integer/,
      );
    }
  });
});
