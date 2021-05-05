//TODO: rename this file
import { Subject } from "rxjs";
import { bufferTime } from "rxjs/operators";
import { v4 as uuid } from "uuid";
import { RequestDocument } from "graphql-request/dist/types";
import useGraphQLClient from "../hooks/graphql/useGraphQLClient";

import combineQuery from "graphql-combine-query";
import { GraphQLClient } from "graphql-request";

//naive solution: bufferTime
const MAX_REQUESTS_UNTIL_PROCESS = 10;
const REQUEST_INTERVAL = 300;
const subject = new Subject();

interface QueryObj {
  query: RequestDocument;
  variables: any;
  cb: Function;
}

// const res = await new Promise((resolve, reject) => {
//   addQuery({
//     query,
//     variables,
//     cb: (err, result) => {
//       if (err) reject(err);
//       resolve(result);
//     },
//   });
// });

export function addQuery(queryObj: any) {
  subject.next(queryObj);
}

const buffer = subject.pipe(
  bufferTime(REQUEST_INTERVAL, undefined, MAX_REQUESTS_UNTIL_PROCESS)
);

buffer.subscribe(async (queryObjArray: QueryObj[]) => {
  // merge the requests and send them
  //  const queryName = queryObjArray.map(queryObj => queryObj.query.).join('_')
  const mergedQuery = combineQuery("BatchedUserQuery");
  let newDocument;
  let newVariables;
  for (const queryObj of queryObjArray) {
    const { query, variables } = queryObj;
    const id = uuid();
    (queryObj as any).id = id;
    // const renameFn = (name) => id;
    const renameFn = (name) => `${id}_${name}`;
    const newQuery = mergedQuery.addN(
      query as any,
      [variables],
      undefined,
      renameFn
    );
    newDocument = newQuery.document;
    newVariables = newQuery.variables;
  }
  //request
  const client: GraphQLClient = useGraphQLClient();

  const { data: result } = await client.request(newDocument, newVariables);

  const aliases = Object.keys(result);
  for (const queryObj2 of queryObjArray) {
    //figure out what data we need
    const id = (queryObj2 as any).id;

    // if only one top level field, remove _name and just use this
    // const data = result[id]

    const data = aliases.reduce((data, key) => {
      if (key.startsWith(id)) {
        data = { ...data, [key.replace(`${id}_`, "")]: result[key] };
      }
      return data;
    }, {});

    queryObj2.cb(null, { data });
  }
});

//
// const bufferWithMinAndMaxTime

// //
// const bufferWithMaxItems
