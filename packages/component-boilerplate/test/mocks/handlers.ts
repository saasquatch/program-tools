import {
  parse,
  OperationDefinitionNode,
  SelectionNode,
  FragmentDefinitionNode,
  FieldNode,
  FragmentSpreadNode,
} from "graphql";
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

        type Echo {
          color: String
        }
        type Empty {
          name: String
        }
        
        # the schema allows the following query:
        type Query {
          post(id: ID!): Post
          posts: [Post]
          echo(color: String): Echo
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

      // Make a GraphQL schema with no resolvers
      const schema = makeExecutableSchema({ typeDefs });

      const mocks = {
        Echo: (_, vars) => {
          console.log("echo", vars);
          return {
            color: vars["color"],
          };
        },
        Empty: () => ({ empty: null }),
      };

      // Create a new schema with mocks
      const schemaWithMocks = addMocksToSchema({
        schema,
        mocks,
        preserveResolvers: false,
      });
      //   resolvers: () => ({
      //     Query: {
      //       Empty: () => {
      //         console.log("hello");
      //         return {
      //           empty: null,
      //         };
      //       },
      //     },
      //   }),
      // } as any);
      const query = (req.body as any).query;
      const variables = (req.body as any).variables;
      // const parsedQuery = parse(JSON.stringify(query));
      // console.log("?");

      const response = await graphql({
        schema: schemaWithMocks,
        source: query,
        variableValues: variables,
      });
      console.log(response);
      // console.log(parsedQuery);
      // const response = await (parsedQuery
      //   .definitions[0] as OperationDefinitionNode).selectionSet.selections.reduce(
      //   async (response: any, selection: FieldNode | FragmentSpreadNode) => {
      //     const alias = (selection as any).alias.value;
      //     const id = alias.split("_")[1];
      //     switch (selection.name.value) {
      //       case "greeting":
      //         return {
      //           ...response,
      //           [alias]: {
      //             message: `Hello, ${variables[`name_${id}`]}!`,
      //           },
      //         };
      //       case "empty":
      //         return {
      //           ...response,
      //           [alias]: null,
      //         };
      //       case "echo":
      //         return {
      //           ...response,
      //           [alias]: Object.keys(variables).reduce(
      //             (variables, aliasedVar) =>
      //               aliasedVar.endsWith(id)
      //                 ? {
      //                     ...variables,
      //                     [aliasedVar.replace(`_${id}`, "")]: variables[
      //                       aliasedVar
      //                     ],
      //                   }
      //                 : { ...variables },
      //             {}
      //           ),
      //         };
      //       default:
      //         return await graphql({
      //           schema: schemaWithMocks,
      //           source: query,
      //           variableValues: variables,
      //         });
      //     }
      //   },
      //   {}
      // );
      prevReq = req;
      return res(ctx.json(response));
    }
  ),
];
