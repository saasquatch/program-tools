//TODO: rename this file?
import { Subject } from "rxjs";
import { bufferTime } from "rxjs/operators";
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

    const buffer = this.subject.pipe(
      bufferTime(REQUEST_INTERVAL, undefined, MAX_REQUESTS)
    );

    // look into replacing subscribe
    buffer.subscribe(async (queryAddedEvents: QueryAddedEvent[]) => {
      // no requests in the last REQUEST_INTERVAL ms
      if (!queryAddedEvents.length) {
        return;
      }
      try {
        // merge the requests
        const { mergedQuery, mergedVariables } = mergeQueryAddedEvents(
          queryAddedEvents
        );

        // make the request
        const mergedQueryResult = await this.superRequest(
          mergedQuery,
          mergedVariables
        );

        //resolve the results
        resolveMergedQueryResult(mergedQueryResult, queryAddedEvents);
      } catch (e) {
        rejectAllQueryAddedEventsWithError(queryAddedEvents, e);
      }
    });
  }
  superRequest<T>(query, variables) {
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
  mergedQuery: RequestDocument;
  mergedVariables: { [key: string]: unknown };
  queryAddedEvents: QueryAddedEvent[];
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
  const { document: mergedQuery, variables: mergedVariables } = events.reduce(
    (
      acc: NewCombinedQueryBuilder | CombinedQueryBuilder,
      curr: QueryAddedEvent
    ): CombinedQueryBuilder => {
      const { query, variables, id } = curr;
      const parsedQuery: DocumentNode =
        typeof query === "string" ? parse(query) : query;

      const renameFn = (name) => aliasFieldOrVariableFn(name, id);
      return acc.addN(parsedQuery, [variables], renameFn, renameFn);
    },
    combineQuery("MergedQuery")
  ) as CombinedQueryBuilder;

  return {
    mergedQuery: print(mergedQuery),
    mergedVariables,
    queryAddedEvents: events,
  };
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

const rejectAllQueryAddedEventsWithError = (
  events: QueryAddedEvent[],
  err: Error
): void => {
  for (const event of events) {
    const { reject } = event;
    reject(err);
  }
};
