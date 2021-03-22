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
// import * as ReactTestLib from "@testing-library/react-hooks";
import {
  act,
  renderHook,
  RenderHookResult,
} from "@testing-library/react-hooks";
import { setUseHostImplementation, useProgramId, useQuery } from "../dist";
import { gql, GraphQLClient } from "graphql-request";
import * as environment from "../src/environment/environment";
import { SquatchPortalInstance } from "../src/environment/SquatchPortal";
import { RequestDocument } from "graphql-request/dist/types";

setImplementation(React);
// setTestImplementation(ReactTestLib);

const spyGraphQLRequest = jest.spyOn(GraphQLClient.prototype, "request");
const renderCounter = jest.fn(() => {});

function useTesting() {
  // nobody should actually use useHost's return value
  // if they do, mock them
  setUseHostImplementation(() => null);
  renderCounter();
}

// NOTE: always put effects in an act block like this:
//   await act(async () => {...code...})
// even if there is no await inside, it can prevent async errors

// patterns to note:
// - an actual query causes 3 renders, whereas a cached query causes 1

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

    function hook() {
      useTesting();
      return useQuery(query, variables);
    }
    let result: { current: ReturnType<typeof hook> };
    await act(async () => {
      result = renderHook(hook)["result"];
    });

    expect(spyGraphQLRequest).toBeCalledTimes(1);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(query, variables);
    expect(result.current.data).toBe(resolvedData);
  });

  test("basic", async () => {
    const query = gql`invalid graphql query`;
    const variables = { total: "nonsense" };
    const resolvedData = Symbol("arbitrary data of arbitrary type");

    spyGraphQLRequest.mockResolvedValue(resolvedData);

    function hook() {
      useTesting();
      return useQuery(query, variables);
    }
    let result: { current: ReturnType<typeof hook> };
    await act(async () => {
      result = renderHook(hook)["result"];
    });

    expect(spyGraphQLRequest).toBeCalledTimes(1);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(query, variables);
    expect(result.current.data).toBe(resolvedData);
  });

  test("caches on identical query", async () => {
    const query = gql`invalid graphql query`;
    const variables = { total: "nonsense" };
    const resolvedData = Symbol("arbitrary data of arbitrary type");

    spyGraphQLRequest.mockResolvedValue(resolvedData);

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

    expect(renderCounter).toHaveBeenCalledTimes(3);
    expect(spyGraphQLRequest).toBeCalledTimes(1);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(query, variables);
    expect(result.current.data).toBe(resolvedData);

    await act(async () => {
      rerender({ q: query, v: variables });
    });

    expect(renderCounter).toHaveBeenCalledTimes(4);
    expect(spyGraphQLRequest).toBeCalledTimes(1);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(query, variables);
    expect(result.current.data).toBe(resolvedData);
  });

  test("cache miss on new query", async () => {
    const queryA = gql`A`;
    const queryB = gql`B`;
       const variables = { total: "nonsense" };
    const resolvedData = Symbol("arbitrary data of arbitrary type");

    spyGraphQLRequest.mockResolvedValue(resolvedData);

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

    expect(renderCounter).toHaveBeenCalledTimes(3);
    expect(spyGraphQLRequest).toBeCalledTimes(1);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryA, variables);
    expect(result.current.data).toBe(resolvedData);

    await act(async () => {
      rerender({ q: queryB, v: variables });
    });

    expect(renderCounter).toHaveBeenCalledTimes(6);
    expect(spyGraphQLRequest).toBeCalledTimes(2);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryB, variables);
    expect(result.current.data).toBe(resolvedData);
  });

  test("cache miss on new variables", async () => {
    const query = gql`invalid graphql query`;
    const variablesA = { a: "A" };
    const variablesB = { b: "B" };
    const resolvedData = Symbol("arbitrary data of arbitrary type");

    spyGraphQLRequest.mockResolvedValue(resolvedData);

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

    expect(renderCounter).toHaveBeenCalledTimes(3);
    expect(spyGraphQLRequest).toBeCalledTimes(1);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(query, variablesA);
    expect(result.current.data).toBe(resolvedData);

    await act(async () => {
      rerender({ q: query, v: variablesB });
    });

    expect(renderCounter).toHaveBeenCalledTimes(6);
    expect(spyGraphQLRequest).toBeCalledTimes(2);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(query, variablesB);
    expect(result.current.data).toBe(resolvedData);
  })

  test("cache miss on new query variables", async () => {
    const queryA = gql`A`;
    const queryB = gql`B`;
    const variablesA = { a: "A" };
    const variablesB = { b: "B" };
    const resolvedData = Symbol("arbitrary data of arbitrary type");

    spyGraphQLRequest.mockResolvedValue(resolvedData);

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

    expect(renderCounter).toHaveBeenCalledTimes(3);
    expect(spyGraphQLRequest).toBeCalledTimes(1);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryA, variablesA);
    expect(result.current.data).toBe(resolvedData);

    await act(async () => {
      rerender({ q: queryB, v: variablesB });
    });

    expect(renderCounter).toHaveBeenCalledTimes(6);
    expect(spyGraphQLRequest).toBeCalledTimes(2);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryB, variablesB);
    expect(result.current.data).toBe(resolvedData);
  })

  test("cache only stores 1 entry", async () => {
    const queryA = gql`A`;
    const queryB = gql`B`;
    const variablesA = { a: "A" };
    const variablesB = { b: "B" };
    const resolvedData = Symbol("arbitrary data of arbitrary type");

    spyGraphQLRequest.mockResolvedValue(resolvedData);

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

    expect(renderCounter).toHaveBeenCalledTimes(3);
    expect(spyGraphQLRequest).toBeCalledTimes(1);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryA, variablesA);
    expect(result.current.data).toBe(resolvedData);

    await act(async () => {
      rerender({ q: queryB, v: variablesB });
    });

    expect(renderCounter).toHaveBeenCalledTimes(6);
    expect(spyGraphQLRequest).toBeCalledTimes(2);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryB, variablesB);
    expect(result.current.data).toBe(resolvedData);

    await act(async () => {
      rerender({ q: queryA, v: variablesA });
    });

    expect(renderCounter).toHaveBeenCalledTimes(9);
    expect(spyGraphQLRequest).toBeCalledTimes(3);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryA, variablesA);
    expect(result.current.data).toBe(resolvedData);

    await act(async () => {
      rerender({ q: queryB, v: variablesB });
    });

    expect(renderCounter).toHaveBeenCalledTimes(12);
    expect(spyGraphQLRequest).toBeCalledTimes(4);
    expect(spyGraphQLRequest).toHaveBeenLastCalledWith(queryB, variablesB);
    expect(result.current.data).toBe(resolvedData);
  })

});
