import { setupServer } from "msw/node";
import restHandlers from "./rest.ts";
import graphqlHandlers from "./graphql.ts";

export const server = setupServer(...restHandlers, ...graphqlHandlers);
