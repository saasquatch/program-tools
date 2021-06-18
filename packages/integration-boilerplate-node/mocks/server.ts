import { setupServer } from "msw/node";
import restHandlers from "./rest";

export const server = setupServer(...restHandlers);
