import { server, spies } from "./__tests__/mocks/server";
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  spies.forEach((spy) => spy.resetHistory());
});
// Clean up after the tests are finished.
afterAll(() => server.close());
