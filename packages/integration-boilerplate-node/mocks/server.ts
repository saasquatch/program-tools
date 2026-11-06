import { setupServer } from "msw/node";
import graphqlHandlers from "./graphql.ts";
import restHandlers from "./rest.ts";

export const server = setupServer(...restHandlers, ...graphqlHandlers);
