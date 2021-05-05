//TODO: rename this file
import { Subject } from "rxjs";
import { bufferTime } from "rxjs/operators";
import { v4 as uuid } from "uuid";
import { RequestDocument } from "graphql-request/dist/types";
import { GraphQLClient } from "graphql-request";
import { print, parse } from "graphql";

import combineQuery from "graphql-combine-query";
// import { GraphQLClient } from "graphql-request";
// import { ContextProvider } from "dom-context";
// import { getEnvironmentSDK } from "..";

// const CONTEXT_NAME = "sq:user-identity";

// export type UserIdentity = {
//   id: string;
//   accountId: string;
//   jwt?: string;
// };

//naive solution: bufferTime
const MAX_REQUESTS = 10;
const REQUEST_INTERVAL = 100;

const subject = new Subject();

//todo: improve types
interface QueryObj {
  query: RequestDocument;
  variables: any;
  cb: Function;
}

// export function getTenantAlias(): string {
//   const sdk = getEnvironmentSDK();
//   switch (sdk.type) {
//     case "SquatchAndroid":
//     case "SquatchJS2":
//       return sdk.widgetIdent.tenantAlias;
//     case "SquatchAdmin":
//     case "None":
//       return "demo";
//     case "SquatchPortal":
//       return sdk.env.tenantAlias;
//   }
// }

// const DEFAULT_DOMAIN = "https://app.referralsaasquatch.com";
// export function getAppDomain(): string {
//   const sdk = getEnvironmentSDK();
//   switch (sdk.type) {
//     case "SquatchAndroid":
//     case "SquatchJS2":
//       return sdk.widgetIdent.appDomain;
//     case "SquatchPortal":
//       return sdk.env?.appDomain || DEFAULT_DOMAIN;
//     case "SquatchAdmin":
//     case "None":
//       return DEFAULT_DOMAIN;
//   }
// }

// function _lazilyStartGlobally() {
//   const globalProvider = window.squatchUserIdentity;
//   if (!globalProvider) {
//     // Lazily creates a global provider
//     window.squatchUserIdentity = new ContextProvider<UserIdentity>({
//       element: document.documentElement,
//       initialState: _getInitialValue(),
//       contextName: CONTEXT_NAME,
//     }).start();
//   }
// }

// function _getInitialValue(): UserIdentity | undefined {
//   const sdk = getEnvironmentSDK();
//   switch (sdk.type) {
//     case "SquatchAndroid":
//     case "SquatchJS2":
//       return {
//         id: sdk.widgetIdent.userId,
//         accountId: sdk.widgetIdent.accountId,
//         jwt: sdk.widgetIdent.token,
//       };
//     case "SquatchPortal":
//       // TODO: Could this come from localstorage? Or a cookie?
//       return undefined;
//     case "SquatchAdmin":
//     case "None":
//       // Not logged in for admin portal / none default case
//       return undefined;
//   }
// }

// function createGraphQlClient(): GraphQLClient {
//   const uri = getAppDomain() + "/api/v1/" + getTenantAlias() + "/graphql";
//   const headers = {
//     Authorization: `Bearer ${useToken() || ""}`,
//   };
//   const newClient = new GraphQLClient(uri, {
//     headers,
//   });
//   return newClient;
// }
const gqlClient = new GraphQLClient(
  "https://staging.referralsaasquatch.com/api/v1/test_a8b41jotf8a1v/graphql",
  {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6ImVuZ2xpc2hlZHdhcmQiLCJpZCI6ImVuZ2xpc2hlZHdhcmQifX0.EMWxwv_pkNFUV2Mmqd-FEctDD7a63ut1mhwXvwkj5V0",
    },
  }
);
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
  bufferTime(REQUEST_INTERVAL, undefined, MAX_REQUESTS)
);

// look into replacing subscribe
buffer.subscribe(async (queryObjArray: QueryObj[]) => {
  if (!queryObjArray.length) {
    return;
  }
  // merge the requests and send them
  //  const queryName = queryObjArray.map(queryObj => queryObj.query.).join('_')
  const mergedQuery = combineQuery("BatchedUserQuery");
  let newDocument;
  let newVariables;
  for (const queryObj of queryObjArray) {
    const { query, variables } = queryObj;
    const parsedQuery = typeof query === "string" ? parse(query) : query;
    console.log(parsedQuery);
    // make reliable
    const id = uuid().replace(/\d+/g, "").replace(/-/g, "");
    (queryObj as any).id = id;
    // const renameFn = (name) => id;
    const renameFn = (name) => `${name}_${id}`;
    const newQuery = mergedQuery.addN(
      parsedQuery,
      [variables],
      undefined,
      renameFn
    );
    newDocument = newQuery.document;
    newVariables = newQuery.variables;
  }
  //request client

  const queryStr = print(newDocument);
  console.log(queryStr);
  const result = await gqlClient.request(queryStr, newVariables || {});
  console.log(result);

  const aliases = Object.keys(result);
  for (const queryObj2 of queryObjArray) {
    //figure out what data we need
    const id = (queryObj2 as any).id;

    // if only one top level field, remove _name and just use this
    // const data = result[id]

    const data = aliases.reduce((data, key) => {
      if (key.endsWith(id)) {
        data = { ...data, [key.replace(`_${id}`, "")]: result[key] };
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
