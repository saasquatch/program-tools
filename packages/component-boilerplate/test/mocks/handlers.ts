import { rest } from "msw";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { graphql } from "graphql";

let prevReq: Object = {};

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
        
        # the schema allows the following query:
        type Query {
          post(id: ID!): Post
          posts: [Post]
          empty: Empty
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
      return res(ctx.json(response));
    }
  ),
];
