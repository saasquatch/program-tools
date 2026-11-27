import { http, HttpResponse } from "msw";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { graphql } from "graphql";

type RecordedRequest = { id: string; body: any };

let prevReq: RecordedRequest | {} = {};
let prevReqs: RecordedRequest[] = [];
const lock = {
  locked: false,
  unlock: null as null | (() => void),
};

// Servers may list errors in any order; this reverses them for the next GraphQL response
let reverseNextErrors = false;

// block requests on demand
async function maybeLock() {
  if (!lock.locked) return;
  lock.locked = false;
  await new Promise<void>((resolve) => {
    lock.unlock = () => {
      console.log("maybeLocked is UNLOCKED!");
      resolve();
    };
  });
  lock.unlock = null;
}

export const handlers = [
  http.get("/lastquery", ({ request }) => {
    const count = new URL(request.url).searchParams.get("n");
    if (count) {
      return HttpResponse.json(prevReqs.slice(-1 * Number(count)));
    }
    return HttpResponse.json(prevReq);
  }),

  http.post("/lock", () => {
    if (lock.locked) {
      return new HttpResponse(null, { status: 500, statusText: "Already locked" });
    }
    lock.locked = true;
    return new HttpResponse(null, { status: 200 });
  }),

  http.post("/unlock", () => {
    if (!lock.unlock) {
      return new HttpResponse(null, { status: 500, statusText: "Already unlocked" });
    }
    lock.unlock();
    return new HttpResponse(null, { status: 200 });
  }),

  http.post("/reverse-errors", () => {
    reverseNextErrors = true;
    return new HttpResponse(null, { status: 200 });
  }),

  // todo: replace with proper graphql mock
  http.post(
    "https://app.referralsaasquatch.com/api/v1/test_faketenant/graphql",
    async ({ request, requestId }) => {
      const body = (await request.json()) as any;
      await maybeLock();
      // Example taken from graphql-tools docs
      const typeDefs = `

        directive @limit(
          count: Int = 5
        ) on QUERY

        type Author {
          id: ID! # the ! means that every author object _must_ have an id
          firstName: String
          lastName: String
          """
          the list of Posts by this author
          """
          posts: [Post]
        }
        
        type Post {
          id: ID!
          title: String
          author: Author
          votes: Int
        }

        type Empty {
          empty: String
        }

        type WillThrowError {
          id: ID!
          valueyouwillnotget: String
        }
        
        # the schema allows the following query:
        type Query {
          post(id: ID!): Post
          posts: [Post]
          author: Author
          empty: Empty
          willthrowerror: WillThrowError
          willthrowerrorvarreq(id: ID!): WillThrowError
        }
        
        # this schema allows the following mutation:
        type Mutation {
          upvotePost (
            postId: ID!
          ): Post
        }
        
        # we need to tell the server which types represent the root query
        # and root mutation types. We call them RootQuery and RootMutation by convention.
        schema {
          query: Query
          mutation: Mutation
        }
    `;

      const resolvers = {
        Query: {
          empty() {
            return null;
          },
          willthrowerror() {
            throw new Error("Intentional Testing Error");
          },
          willthrowerrorvarreq() {
            throw new Error("Intentional Testing Error");
          },
        },
      };
      // Make a GraphQL schema with no resolvers
      const schema = makeExecutableSchema({ typeDefs, resolvers });

      // Create a new schema with mocks
      const schemaWithMocks = addMocksToSchema({
        schema,
        preserveResolvers: true,
      });

      const query = body.query;
      const variables = body.variables;

      const response = await graphql({
        schema: schemaWithMocks,
        source: query,
        variableValues: variables,
      });

      if (reverseNextErrors) {
        reverseNextErrors = false;
        response.errors = response.errors && [...response.errors].reverse();
      }

      // Request objects don't serialize, so record what the tests inspect
      const recorded = { id: requestId, body };
      prevReq = recorded;
      // with batching we need to look back at the previous few requests
      prevReqs.push(recorded);
      return HttpResponse.json(response);
    }
  ),
];
