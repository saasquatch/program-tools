//TODO: rename this file?
import { iif, Observable, Subject } from "rxjs";
import { bufferTime, scan } from "rxjs/operators";
import { v4 as uuid } from "uuid";
import { RequestDocument } from "graphql-request/dist/types";
import { GraphQLClient } from "graphql-request";
import { print, parse, DocumentNode, getOperationAST } from "graphql";

//TODO: replace this package with some util functions and remove.
import combineQuery, {
  CombinedQueryBuilder,
  NewCombinedQueryBuilder,
} from "graphql-combine-query";

/*************
 * constants *
 *************/
const MAX_REQUESTS = 10;
const REQUEST_INTERVAL = 200; //ms

export class BatchedGraphQLClient extends GraphQLClient {
  subject = new Subject();

  constructor(url: string, opts?: any) {
    super(url, opts);

    const unmergable = new Subject();
    // const merged$ = new Observable();
    const buffer = this.subject.pipe(
      bufferTime(REQUEST_INTERVAL, undefined, MAX_REQUESTS)
    );

    // look into replacing subscribe
    buffer.subscribe(async (queryAddedEvents: QueryAddedEvent[]) => {
      // no requests in the last REQUEST_INTERVAL ms
      if (!queryAddedEvents.length) {
        return;
      }
      // merge the requests
      const {
        mergedQuery,
        mergedVariables,
        mergedQueryAddedEvents,
        unmergedQueryAddedEvents,
      } = mergeQueryAddedEvents(queryAddedEvents);

      // push queries that failed to merge to a separate stream to be processed
      for (const unmergedQuery of unmergedQueryAddedEvents)
        unmergable.next(unmergedQuery);

      try {
        // make the request
        const mergedQueryResult = await this.superRequest(
          mergedQuery,
          mergedVariables
        );

        //resolve the results
        resolveMergedQueryResult(mergedQueryResult, mergedQueryAddedEvents);
      } catch (e) {
        rejectAllQueryAddedEventsWithError(mergedQueryAddedEvents, e);
      }
    });

    //process unmergable requests as they come in
    unmergable.subscribe(async (event: QueryAddedEvent) => {
      try {
        const { query, variables } = event;
        const result = await this.superRequest(query, variables);
        resolveSingleQueryResult(result, event);
      } catch (e) {
        rejectQueryAddedEventWithError(event, e);
      }
    });
  }
  superRequest<T>(query: RequestDocument, variables?: any) {
    return super.request(query, variables);
  }
  request<T>(query, variables) {
    return new Promise<T>((resolve, reject) => {
      const queryAddedEvent: QueryAddedEvent = {
        query,
        variables,
        id: generateQueryAddedEventId(),
        resolve,
        reject,
      };
      this.subject.next(queryAddedEvent);
    });
  }
}

/*************
 *   types   *
 *************/

interface QueryAddedEvent {
  query: RequestDocument;
  variables: { [key: string]: unknown };
  id: string; // uuid with '-'s removed
  resolve: (data: any) => void;
  reject: (err: any) => void;
}

interface MergedQueryAddedEvents {
  mergedQuery?: RequestDocument;
  mergedVariables?: { [key: string]: unknown };
  mergedQueryAddedEvents: QueryAddedEvent[];
  unmergedQueryAddedEvents: QueryAddedEvent[];
}

/*************
 *   utils   *
 *************/
const generateQueryAddedEventId = () => uuid().replace(/-/g, "");

const aliasFieldOrVariableFn = (name, id) => `${name}_${id}`;

const removeAliasFromField = (field: string, id) => field.replace(`_${id}`, "");

const mergeQueryAddedEvents = (
  events: QueryAddedEvent[]
): MergedQueryAddedEvents => {
  const mergedQueryAddedEvents = [];
  const unmergedQueryAddedEvents = [];
  const { document, variables } = events.reduce(
    (
      acc: NewCombinedQueryBuilder | CombinedQueryBuilder,
      curr: QueryAddedEvent
    ): NewCombinedQueryBuilder | CombinedQueryBuilder => {
      const { query, variables, id } = curr;
      try {
        const parsedQuery: DocumentNode =
          typeof query === "string" ? parse(query) : query;

        const renameFn = (name) => aliasFieldOrVariableFn(name, id);
        // if this fails, event will be added to unmergedQueryAddedEvents
        acc = acc.addN(parsedQuery, [variables], renameFn, renameFn);
        mergedQueryAddedEvents.push(curr);
        return acc;
      } catch (e) {
        unmergedQueryAddedEvents.push(curr);
        return acc;
      }
    },
    combineQuery("MergedQuery")
  ) as CombinedQueryBuilder;

  const mergedQuery = document && print(document);
  const mergedVariables = variables;

  return {
    mergedQuery,
    mergedVariables,
    mergedQueryAddedEvents,
    unmergedQueryAddedEvents,
  };
};

const resolveSingleQueryResult = (queryResult: any, event: QueryAddedEvent) => {
  const { resolve } = event;
  resolve(queryResult);
};

const resolveMergedQueryResult = (
  mergedQueryResult: any,
  events: QueryAddedEvent[]
): void => {
  const aliases = Object.keys(mergedQueryResult);
  for (const event of events) {
    //figure out what data we need
    const { id } = event;

    const data = aliases.reduce((data, key) => {
      if (key.endsWith(id)) {
        data = {
          ...data,
          [removeAliasFromField(key, id)]: mergedQueryResult[key],
        };
      }
      return data;
    }, {});
    event.resolve(data);
  }
};

// error handling

const rejectQueryAddedEventWithError = (
  event: QueryAddedEvent,
  err: Error
): void => {
  const { reject } = event;
  reject(err);
};

const rejectAllQueryAddedEventsWithError = (
  events: QueryAddedEvent[],
  err: Error
): void => {
  for (const event of events) {
    const { reject } = event;
    reject(err);
  }
};
