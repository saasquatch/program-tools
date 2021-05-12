import { rest } from "msw";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { graphql } from "graphql";

let prevReq: Object = {};
let prevReqs: Object[] = [];
const lock = {
  locked: false,
  unlock: null as null | (() => void),
};

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
  rest.get("/lastquery", (req, res, ctx) => {
    const count = req.url.searchParams.get("n");
    if (count) {
      const lastN = prevReqs.slice(-1 * Number(count));
      return res(ctx.body(JSON.stringify(lastN)));
    }
    return res(ctx.body(JSON.stringify(prevReq)));
  }),

  rest.post("/lock", (req, res, ctx) => {
    if (lock.locked) {
      return res(ctx.status(500, "Already locked"));
    }
    lock.locked = true;
    return res(ctx.status(200));
  }),

  rest.post("/unlock", (req, res, ctx) => {
    if (!lock.unlock) {
      return res(ctx.status(500, "Already unlocked"));
    }
    lock.unlock();
    return res(ctx.status(200));
  }),

  // todo: replace with proper graphql mock
  rest.post(
    "https://app.referralsaasquatch.com/api/v1/test_faketenant/graphql",
    async (req, res, ctx) => {
      await maybeLock();
      // Example taken from graphql-tools docs
      const typeDefs = `
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

      const query = (req.body as any).query;
      const variables = (req.body as any).variables;

      const response = await graphql({
        schema: schemaWithMocks,
        source: query,
        variableValues: variables,
      });

      prevReq = req;
      // with batching we need to look back at the previous few requests
      prevReqs.push(req);
      return res(ctx.json(response));
    }
  ),
];
