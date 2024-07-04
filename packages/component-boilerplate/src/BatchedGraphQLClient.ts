import { DocumentNode, parse, print } from "graphql";
import combineQuery, {
  CombinedQueryBuilder,
  NewCombinedQueryBuilder,
} from "graphql-combine-query";
import { GraphQLClient } from "graphql-request";
import { ClientError, RequestDocument } from "graphql-request/dist/types";
import { nanoid } from "nanoid";
import { Subject } from "rxjs";
import { bufferTime } from "rxjs/operators";

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

      // If there are no merged queries, all were unmergeable and we can exit here
      if (!mergedQueryAddedEvents.length) {
        return;
      }

      try {
        // make the request
        const mergedQueryResult = await this.superRequest(
          mergedQuery,
          mergedVariables
        );
        //resolve the results
        resolveMergedQueryResult(mergedQueryResult, mergedQueryAddedEvents);
      } catch (e) {
        // So, there is possibly both data and errors here.
        if (e instanceof ClientError) {
          const { data, errors } = e.response;
          if (!data) {
            return rejectAllQueryAddedEventsWithError(
              mergedQueryAddedEvents,
              e
            );
          }
          const aliases = Object.keys(data);
          let eventsToResolve = [...mergedQueryAddedEvents];
          // reject all that errored:
          for (const error of errors) {
            let erroredEvent: QueryAddedEvent;
            // todo: this needs testing, is path going to work??
            error.path.find((key, index, path) => {
              if (aliases.includes(key)) {
                const erroredId = getIdFromAliasedField(key);
                const indexOfErroredEvent = eventsToResolve.findIndex(
                  (event) => event.id === erroredId
                );
                if (indexOfErroredEvent === -1) return false;
                // remove from aliases
                aliases.splice(index, 1);
                // remove from events
                erroredEvent = eventsToResolve.splice(
                  indexOfErroredEvent,
                  1
                )[0];
                // rebuild data
                const eventSpecificData = removeAliasesFromDataResult(
                  e.response.data,
                  erroredEvent
                );
                // fix path
                path[index] = removeAliasFromField(path[index], erroredId);
                const { query, variables } = erroredEvent;
                // rebuild error to be event specific
                const errorResponse = {
                  ...e.response,
                  errors: [error],
                  data: eventSpecificData,
                  path,
                };
                const newError = new ClientError(errorResponse, {
                  query: typeof query !== "string" ? print(query) : query,
                  variables,
                });
                rejectQueryAddedEventWithError(erroredEvent, newError);
                return true;
              }
              return false;
            });
          }
          // resolve the rest:
          resolveMergedQueryResult(data, eventsToResolve);
        } else rejectAllQueryAddedEventsWithError(mergedQueryAddedEvents, e);
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
    return super.request<T>(query, variables);
  }

  request<T>(query, variables, options) {
    return new Promise<T>((resolve, reject) => {
      const queryAddedEvent: QueryAddedEvent = {
        query,
        variables,
        id: generateQueryAddedEventId(),
        options,
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
  id: string; // nanoid with '-'s removed
  options: {
    merge: boolean;
  };
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
// Remove dashes and underscores from alias
const generateQueryAddedEventId = () => nanoid().replace(/[-_]/g, "");

// Numbers not allowed in graphQL alias, so ID must be added to the end
const aliasFieldOrVariableFn = (name, id) => `${name}_${id}`;

// ID will always be at the end of the alias separated by a single "_"
const removeAliasFromField = (field: string, id: string) =>
  field.replace(`_${id}`, "");

const getIdFromAliasedField = (field: string): string => {
  const fieldArray = field.split("_");
  return fieldArray[fieldArray.length - 1];
};

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
      const { query, variables, id, options } = curr;
      if (!options?.merge) {
        unmergedQueryAddedEvents.push(curr);
        return acc;
      }
      try {
        const parsedQuery: DocumentNode =
          typeof query === "string" ? parse(query) : query;
        // if fragment exists, this request should be processed separately
        const fragmentDefinition = parsedQuery.definitions.find(
          (node) => node.kind === "FragmentDefinition"
        );
        // '@' is reserved for directives, and since both top level and nested directives are broken, we dont want any.
        const queryStr = typeof query === "string" ? query : print(query);
        const containsDirective = /@/.test(queryStr);

        if (fragmentDefinition || containsDirective) {
          unmergedQueryAddedEvents.push(curr);
          return acc;
        }

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
    combineQuery("BatchedQuery")
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

const removeAliasesFromDataResult = (
  queryResult: any,
  event: QueryAddedEvent
) => {
  if (!queryResult) return queryResult;
  const aliases = Object.keys(queryResult);
  const { id } = event;
  return aliases.reduce((data, key) => {
    if (key.endsWith(id)) {
      data = {
        ...data,
        [removeAliasFromField(key, id)]: queryResult[key],
      };
    }
    return data;
  }, {});
};

const resolveSingleQueryResult = (queryResult: any, event: QueryAddedEvent) => {
  const { resolve } = event;
  resolve(queryResult);
};

const resolveMergedQueryResult = (
  mergedQueryResult: any,
  events: QueryAddedEvent[]
): void => {
  for (const event of events) {
    //figure out what data we need
    const data = removeAliasesFromDataResult(mergedQueryResult, event);
    event.resolve(data);
  }
};

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
