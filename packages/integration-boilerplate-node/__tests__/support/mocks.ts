/*
 * Call-tracking mocks built on node:test's mock.fn(), which works standalone
 * (no test runner required). The thin registry exists only because the mock
 * tracker has no tracker-level resetCalls(); the Before hook must reset each
 * mock's call history between scenarios (the equivalent of vitest's
 * `clearMocks: true`).
 */

import { mock } from "node:test";

type AnyFn = (...args: any[]) => any;

export type Mock<F extends AnyFn = AnyFn> = ReturnType<typeof mock.fn<F>>;

const registry: Mock[] = [];

export function makeMock<F extends AnyFn>(impl: F): Mock<F> {
  const fn = mock.fn(impl);
  registry.push(fn as Mock);
  return fn;
}

export function resetAllMocks(): void {
  for (const fn of registry) {
    fn.mock.resetCalls();
  }
}
