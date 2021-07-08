// src/mocks/server.js
import { setupServer } from "msw/node";
import { handlers, spies as spyList } from "./handlers";
import {
  authenticateSpy,
  createUserSpy,
  oobCodeSpy,
  resetPasswordSpy,
} from "./mockFirebase";

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);

export const spies = [
  ...spyList,
  authenticateSpy,
  createUserSpy,
  oobCodeSpy,
  resetPasswordSpy,
];
