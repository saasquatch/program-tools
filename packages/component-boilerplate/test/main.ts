import {
  setImplementation,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "@saasquatch/universal-hooks";
// import {
//   act,
//   renderHook,
//   setTestImplementation,
// } from "@saasquatch/universal-hooks-testing-library";
import * as React from "react";
import * as ReactTestLib from "@testing-library/react-hooks";
import { act, renderHook } from "@testing-library/react-hooks";
import { useQuery } from "../src/hooks/graphql/useQuery";
import { gql, GraphQLClient } from "graphql-request";
import { RequestDocument } from "graphql-request/dist/types";

import useGraphQLClient from "../src/hooks/graphql/useGraphQLClient";
jest.mock("../src/hooks/graphql/useGraphQLClient");
// @ts-ignore -- typescript doesn't know that Jest has mocked this function in the above `jest.mock` function
useGraphQLClient.mockImplementation(
  () =>
    new GraphQLClient(
      "https://app.referralsaasquatch.com/api/v1/test_faketenant/graphql"
    )
);

setImplementation(React);
// setTestImplementation(ReactTestLib);

const spyGraphQLRequest = jest.spyOn(GraphQLClient.prototype, "request");

const renderCounter = jest.fn(() => {});

function useTesting() {
  // nobody should actually use useHost's return value
  // if they do, mock them
  // setUseHostImplementation(() => null);
  renderCounter();
}

// an actual query causes 3 renders, whereas a cached query causes 1
function renderTypeTracker() {
  let prev = 0;
  let curr = 0;
  return () => {
    curr = renderCounter.mock.calls.length;
    let ret: "CACHED" | "UNCACHED" | "UNKNOWN";
    switch (curr - prev) {
      case 1:
        ret = "CACHED";
        break;
      case 3:
        ret = "UNCACHED";
        break;
      default:
        ret = "UNKNOWN";
        break;
    }
    prev = curr;
    return ret;
  };
}

function queryFiredTracker() {
  let prev = 0;
  let curr = 0;
  return () => {
    curr = spyGraphQLRequest.mock.calls.length;
    const ret = curr - prev !== 0;
    prev = curr;
    return ret;
  };
}

// NOTE: always put effects in an act block like this:
//   await act(async () => {...code...})
// even if there is no await inside, it can prevent async errors

describe("Mock Service Workers", () => {
  const HELLO_QUERY = gql`
    query MockTest($name: String!) {
      greeting(name: $name) {
        message
      }
    }
  `;

  test("HelloQuery", async () => {
    const variables = { name: "Robert" };
    const resolvedData = { greeting: { message: "Hello, Robert!" } };

    function hook() {
      return useQuery(HELLO_QUERY, variables);
    }

    let result: { current: ReturnType<typeof hook> };
    await act(async () => {
      const rendered = renderHook(hook);
      await rendered.waitForNextUpdate();
      await rendered.waitForValueToChange(
        () => rendered.result.current.loading
      );
      result = rendered.result;
    });

    console.log("Loading query data");
    console.log(result.current);
    expect(result.current.data).toEqual(resolvedData);
  });
});

describe("useQuery", () => {
  afterEach(() => {
    spyGraphQLRequest.mockReset();
    renderCounter.mockReset();
  });

  test("empty", async () => {
    const query = gql``;
    const variables = {};
    const resolvedData = {};

    spyGraphQLRequest.mockResolvedValue(resolvedData);
    const queryFired = queryFiredTracker();

    function hook() {
      useTesting();
      return useQuery(query, variables);
    }
    let result: { current: ReturnType<typeof hook> };
    await act(async () => {
      result = renderHook(hook)["result"];
    });

    expect(queryFired()).toBe(true);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(query, variables);
    expect(result.current.data).toBe(resolvedData);
  });

  test("basic", async () => {
    const query = gql`invalid graphql query`;
    const variables = { total: "nonsense" };
    const resolvedData = Symbol("arbitrary data of arbitrary type");

    spyGraphQLRequest.mockResolvedValue(resolvedData);
    const queryFired = queryFiredTracker();

    function hook() {
      useTesting();
      return useQuery(query, variables);
    }
    let result: { current: ReturnType<typeof hook> };
    await act(async () => {
      result = renderHook(hook)["result"];
    });

    expect(queryFired()).toBe(true);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(query, variables);
    expect(result.current.data).toBe(resolvedData);
  });

  test("caches on identical query", async () => {
    const query = gql`invalid graphql query`;
    const variables = { total: "nonsense" };
    const resolvedData = Symbol("arbitrary data of arbitrary type");

    spyGraphQLRequest.mockResolvedValue(resolvedData);
    const renderType = renderTypeTracker();
    const queryFired = queryFiredTracker();

    function hook({ q, v }: { q: RequestDocument; v: unknown }) {
      useTesting();
      return useQuery(q, v);
    }
    let result: { current: ReturnType<typeof hook> };
    let rerender: (props?: { q: RequestDocument; v: unknown }) => void;
    await act(async () => {
      const ret = renderHook(hook, {
        initialProps: { q: query, v: variables },
      });
      ({ result, rerender } = ret);
    });

    expect(renderType()).toBe("UNCACHED");
    expect(queryFired()).toBe(true);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(query, variables);
    expect(result.current.data).toBe(resolvedData);

    await act(async () => {
      rerender({ q: query, v: variables });
    });

    expect(renderType()).toBe("CACHED");
    expect(queryFired()).toBe(false);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(query, variables);
    expect(result.current.data).toBe(resolvedData);
  });

  test("cache miss on new query", async () => {
    const queryA = gql`A`;
    const queryB = gql`B`;
    const variables = { total: "nonsense" };
    const resolvedData = Symbol("arbitrary data of arbitrary type");

    spyGraphQLRequest.mockResolvedValue(resolvedData);
    const renderType = renderTypeTracker();
    const queryFired = queryFiredTracker();

    function hook({ q, v }: { q: RequestDocument; v: unknown }) {
      useTesting();
      return useQuery(q, v);
    }
    let result: { current: ReturnType<typeof hook> };
    let rerender: (props?: { q: RequestDocument; v: unknown }) => void;
    await act(async () => {
      const ret = renderHook(hook, {
        initialProps: { q: queryA, v: variables },
      });
      ({ result, rerender } = ret);
    });

    expect(renderType()).toBe("UNCACHED");
    expect(queryFired()).toBe(true);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryA, variables);
    expect(result.current.data).toBe(resolvedData);

    await act(async () => {
      rerender({ q: queryB, v: variables });
    });

    expect(renderType()).toBe("UNCACHED");
    expect(queryFired()).toBe(true);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryB, variables);
    expect(result.current.data).toBe(resolvedData);
  });

  test("cache miss on new variables", async () => {
    const query = gql`invalid graphql query`;
    const variablesA = { a: "A" };
    const variablesB = { b: "B" };
    const resolvedData = Symbol("arbitrary data of arbitrary type");

    spyGraphQLRequest.mockResolvedValue(resolvedData);
    const renderType = renderTypeTracker();
    const queryFired = queryFiredTracker();

    function hook({ q, v }: { q: RequestDocument; v: unknown }) {
      useTesting();
      return useQuery(q, v);
    }
    let result: { current: ReturnType<typeof hook> };
    let rerender: (props?: { q: RequestDocument; v: unknown }) => void;
    await act(async () => {
      const ret = renderHook(hook, {
        initialProps: { q: query, v: variablesA },
      });
      ({ result, rerender } = ret);
    });

    expect(renderType()).toBe("UNCACHED");
    expect(queryFired()).toBe(true);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(query, variablesA);
    expect(result.current.data).toBe(resolvedData);

    await act(async () => {
      rerender({ q: query, v: variablesB });
    });

    expect(renderType()).toBe("UNCACHED");
    expect(queryFired()).toBe(true);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(query, variablesB);
    expect(result.current.data).toBe(resolvedData);
  });

  test("cache hit on deep equal variables", async () => {
    const query = gql`hello`;
    const variablesA = { really: { really: "super" }, deep: { equal: "ity" } };
    const variablesB = { really: { really: "super" }, deep: { equal: "ity" } };
    const resolvedData = Symbol("arbitrary data of arbitrary type");

    spyGraphQLRequest.mockResolvedValue(resolvedData);
    const renderType = renderTypeTracker();
    const queryFired = queryFiredTracker();

    function hook({ q, v }: { q: RequestDocument; v: unknown }) {
      useTesting();
      return useQuery(q, v);
    }
    let result: { current: ReturnType<typeof hook> };
    let rerender: (props?: { q: RequestDocument; v: unknown }) => void;
    await act(async () => {
      const ret = renderHook(hook, {
        initialProps: { q: query, v: variablesA },
      });
      ({ result, rerender } = ret);
    });

    expect(renderType()).toBe("UNCACHED");
    expect(queryFired()).toBe(true);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(query, variablesA);
    expect(result.current.data).toBe(resolvedData);

    await act(async () => {
      rerender({ q: query, v: variablesB });
    });

    expect(renderType()).toBe("CACHED");
    expect(queryFired()).toBe(false);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(query, variablesA);
    expect(result.current.data).toBe(resolvedData);
  });

  test("cache miss on new query and variables", async () => {
    const queryA = gql`A`;
    const queryB = gql`B`;
    const variablesA = { a: "A" };
    const variablesB = { b: "B" };
    const resolvedData = Symbol("arbitrary data of arbitrary type");

    spyGraphQLRequest.mockResolvedValue(resolvedData);
    const renderType = renderTypeTracker();
    const queryFired = queryFiredTracker();

    function hook({ q, v }: { q: RequestDocument; v: unknown }) {
      useTesting();
      return useQuery(q, v);
    }
    let result: { current: ReturnType<typeof hook> };
    let rerender: (props?: { q: RequestDocument; v: unknown }) => void;
    await act(async () => {
      const ret = renderHook(hook, {
        initialProps: { q: queryA, v: variablesA },
      });
      ({ result, rerender } = ret);
    });

    expect(renderType()).toBe("UNCACHED");
    expect(queryFired()).toBe(true);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryA, variablesA);
    expect(result.current.data).toBe(resolvedData);

    await act(async () => {
      rerender({ q: queryB, v: variablesB });
    });

    expect(renderType()).toBe("UNCACHED");
    expect(queryFired()).toBe(true);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryB, variablesB);
    expect(result.current.data).toBe(resolvedData);
  });

  test("cache only stores 1 entry", async () => {
    const queryA = gql`A`;
    const queryB = gql`B`;
    const variablesA = { a: "A" };
    const variablesB = { b: "B" };
    const resolvedData = Symbol("arbitrary data of arbitrary type");

    spyGraphQLRequest.mockResolvedValue(resolvedData);
    const renderType = renderTypeTracker();
    const queryFired = queryFiredTracker();

    function hook({ q, v }: { q: RequestDocument; v: unknown }) {
      useTesting();
      return useQuery(q, v);
    }
    let result: { current: ReturnType<typeof hook> };
    let rerender: (props?: { q: RequestDocument; v: unknown }) => void;
    await act(async () => {
      const ret = renderHook(hook, {
        initialProps: { q: queryA, v: variablesA },
      });
      ({ result, rerender } = ret);
    });

    expect(renderType()).toBe("UNCACHED");
    expect(queryFired()).toBe(true);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryA, variablesA);
    expect(result.current.data).toBe(resolvedData);

    await act(async () => {
      rerender({ q: queryB, v: variablesB });
    });

    expect(renderType()).toBe("UNCACHED");
    expect(queryFired()).toBe(true);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryB, variablesB);
    expect(result.current.data).toBe(resolvedData);

    await act(async () => {
      rerender({ q: queryA, v: variablesA });
    });

    expect(renderType()).toBe("UNCACHED");
    expect(queryFired()).toBe(true);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryA, variablesA);
    expect(result.current.data).toBe(resolvedData);

    await act(async () => {
      rerender({ q: queryB, v: variablesB });
    });

    expect(renderType()).toBe("UNCACHED");
    expect(queryFired()).toBe(true);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryB, variablesB);
    expect(result.current.data).toBe(resolvedData);
  });

  test("loading while query hasn't returned", async () => {
    const query = gql`invalid graphql query`;
    const variables = { total: "nonsense" };
    const resolvedData = Symbol("arbitrary data of arbitrary type");

    let unblock: Function;
    const loadingBlocker = new Promise((resolve, _) => {
      unblock = () => resolve(resolvedData);
    });

    spyGraphQLRequest.mockReturnValue(loadingBlocker);
    const queryFired = queryFiredTracker();

    function hook() {
      useTesting();
      return useQuery(query, variables);
    }
    let result: { current: ReturnType<typeof hook> };
    await act(async () => {
      result = renderHook(hook)["result"];
    });

    expect(queryFired()).toBe(true);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(query, variables);
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(undefined);

    await act(async () => {
      unblock();
    });

    expect(queryFired()).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(resolvedData);
  });
});
