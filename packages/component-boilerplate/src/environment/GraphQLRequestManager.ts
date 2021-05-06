//TODO: rename this file?
import { Subject } from "rxjs";
import { bufferTime } from "rxjs/operators";
import { v4 as uuid } from "uuid";
import { RequestDocument } from "graphql-request/dist/types";
import { GraphQLClient } from "graphql-request";
import { print, parse, DocumentNode, getOperationAST } from "graphql";

//TODO: replace this package with some util functions and remove.
import combineQuery from "graphql-combine-query";

const MAX_REQUESTS = 10;
const REQUEST_INTERVAL = 500; //ms

const subject = new Subject();

const gqlClient = new GraphQLClient(
  "https://staging.referralsaasquatch.com/api/v1/test_a8b41jotf8a1v/graphql",
  {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6ImVuZ2xpc2hlZHdhcmQiLCJpZCI6ImVuZ2xpc2hlZHdhcmQifX0.EMWxwv_pkNFUV2Mmqd-FEctDD7a63ut1mhwXvwkj5V0",
    },
  }
);

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

const generateQueryAddedEventId = () => uuid().replace(/-/g, "");

const aliasFieldOrVariableFn = (name, id) => `${name}_${id}`;

const removeAliasFromField = (field: string, id) => field.replace(`_${id}`, "");

export function addQuery<T>(
  query: RequestDocument,
  variables: { [key: string]: unknown }
) {
  return new Promise<T>((resolve, reject) => {
    const QueryAddedEvent: QueryAddedEvent = {
      query,
      variables,
      id: generateQueryAddedEventId(),
      resolve,
      reject,
    };
    subject.next(QueryAddedEvent);
  });
}

const buffer = subject.pipe(
  bufferTime(REQUEST_INTERVAL, undefined, MAX_REQUESTS)
);

const mergeQueryAddedEvents = (
  events: QueryAddedEvent[]
): MergedQueryAddedEvents => {
  let mergedQueryBuilder = combineQuery("") as any;
  let mergedQueryName = "";
  let mergedQuery;
  let mergedVariables;
  for (const queryAddedEvent of events) {
    const { query, variables, id } = queryAddedEvent;
    const parsedQuery: DocumentNode =
      typeof query === "string" ? parse(query) : query;

    const renameFn = (name) => aliasFieldOrVariableFn(name, id);
    mergedQueryBuilder = mergedQueryBuilder.addN(
      parsedQuery,
      [variables],
      renameFn,
      renameFn
    );

    const operationNames = parsedQuery.definitions
      .reduce((acc, def) => {
        if (def && def.kind === "OperationDefinition" && def.name) {
          acc.push(def.name);
        }
        return acc;
      }, [])
      .join("_");
    mergedQueryName = mergedQueryName
      ? `${mergedQueryName}_${operationNames}`
      : mergedQueryName;
    mergedQuery = mergedQueryBuilder.document;
    mergedVariables = mergedQueryBuilder.variables || {};
  }
  // replace operation name
  mergedQuery.definitions.find((def) => {
    if (def.kind === "OperationDefinition") def.name = mergedQueryName;
  });
  mergedQuery = print(mergedQuery);
  console.log(mergedQuery);
  return {
    mergedQuery,
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
    const mergedQueryResult = await gqlClient.request(
      mergedQuery,
      mergedVariables
    );

    //resolve the results
    resolveMergedQueryResult(mergedQueryResult, queryAddedEvents);
  } catch (e) {
    rejectAllQueryAddedEventsWithError(queryAddedEvents, e);
  }
});
