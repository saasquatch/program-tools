import { setImplementation } from "@saasquatch/universal-hooks";
// use React testing lib until i implement async utils
// which may or may not happen
// import {
//   act,
//   renderHook,
//   setTestImplementation,
// } from "@saasquatch/universal-hooks-testing-library";
import * as React from "react";
// import * as ReactTestLib from "@testing-library/react-hooks";
import { act, renderHook } from "@testing-library/react-hooks";
import { useQuery } from "../src/hooks/graphql/useQuery";
import { gql } from "graphql-request";
import axios from "axios";

import useGraphQLClient from "../src/hooks/graphql/useGraphQLClient";
import { RequestDocument } from "graphql-request/dist/types";
import { BatchedGraphQLClient } from "../src/environment/BatchedGraphQLClient";
jest.mock("../src/hooks/graphql/useGraphQLClient");
// @ts-ignore -- typescript doesn't know that Jest has mocked this function in the above `jest.mock` function
useGraphQLClient.mockImplementation(
  () =>
    new BatchedGraphQLClient(
      "https://app.referralsaasquatch.com/api/v1/test_faketenant/graphql"
    )
);

setImplementation(React);

describe("Mock Service Workers", () => {
  const MOCK_TEST = gql`
    query MockTest($name: String!) {
      greeting(name: $name) {
        message
      }
    }
  `;

  const EMPTY = gql`
    query Empty {
      empty
    }
  `;

  test("MockTest", async () => {
    const variables = { name: "Robert" };
    const resolvedData = { greeting: { message: "Hello, Robert!" } };

    function hook() {
      return useQuery(MOCK_TEST, variables);
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

    expect(result.current.data).toStrictEqual(resolvedData);
  });

  test("Empty", async () => {
    const variables = {};
    const resolvedData = { empty: null };

    function hook() {
      return useQuery(EMPTY, variables);
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

    expect(result.current.data).toStrictEqual(resolvedData);
  });

  test("Loading", async () => {
    const hook = () => useQuery(EMPTY, {});

    // await axios.post("/lock");

    let result: { current: ReturnType<typeof hook> };
    let rerender: (props?: { q: RequestDocument; v: unknown }) => void;
    let waitForNextUpdate: (opts?: { timeout?: number }) => Promise<void>;
    let waitForValueToChange: (selector: () => unknown) => Promise<void>;
    let waitFor: (f: () => boolean | void) => Promise<void>;
    await act(async () => {
      const ret = renderHook(hook);
      ({
        result,
        rerender,
        waitForNextUpdate,
        waitForValueToChange,
        waitFor,
      } = ret);
      await waitForNextUpdate();
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();

    // await act(async () => {
    //   await axios.post("/unlock");
    // });
    console.log(2);
    await waitFor(() => !result.current.loading);

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toStrictEqual({ empty: null });
  });
});

describe("useQuery", () => {
  const EMPTY = gql`
    query Empty {
      empty
    }
  `;

  const EMPTY2 = gql`
    query Empty2 {
      empty
    }
  `;

  const ECHO = gql`
    query Echo($color: String!) {
      echo {
        color
      }
    }
  `;

  test("empty", async () => {
    const query = EMPTY;
    const variables = {};
    const resolvedData = { empty: null };

    function hook() {
      return useQuery(query, variables);
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

    expect(result.current.data).toStrictEqual(resolvedData);

    // const recieved = await axios.get("/lastquery");
    // expect(recieved.data.body).toStrictEqual({
    //   query: query.toString(),
    //   variables,
    // });
  });

  test("basic", async () => {
    const query = ECHO;
    const variables = { color: "green" };
    const resolvedData = { echo: { color: "green" } };

    function hook() {
      return useQuery(query, variables);
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

    expect(result.current.data).toStrictEqual(resolvedData);

    // const recieved = await axios.get("/lastquery");
    // expect(recieved.data.body).toStrictEqual({
    //   query: query.toString(),
    //   variables,
    // });
  });

  test("caches on identical query", async () => {
    const query = ECHO;
    const variables = { color: "green" };
    const resolvedData = { echo: { color: "green" } };

    function hook({ q, v }: { q: RequestDocument; v: unknown }) {
      return useQuery(q, v);
    }
    let result: { current: ReturnType<typeof hook> };
    let rerender: (props?: { q: RequestDocument; v: unknown }) => void;
    await act(async () => {
      const ret = renderHook(hook, {
        initialProps: { q: query, v: variables },
      });
      await ret.waitForNextUpdate();
      await ret.waitForValueToChange(() => ret.result.current.loading);
      ({ result, rerender } = ret);
    });

    expect(result.current.data).toStrictEqual(resolvedData);

    const recievedA = await axios.get("/lastquery");
    // expect(recievedA.data.body).toStrictEqual({
    //   query: query.toString(),
    //   variables,
    // });

    await act(async () => {
      rerender({ q: query, v: variables });
    });

    expect(result.current.data).toStrictEqual(resolvedData);

    const recievedB = await axios.get("/lastquery");
    // expect(recievedB.data.body).toStrictEqual({
    //   query: query.toString(),
    //   variables,
    // });

    expect(recievedB.data.id).toBe(recievedA.data.id);
  });

  test("cache miss on new query", async () => {
    const queryA = EMPTY;
    const queryB = EMPTY2;
    const variables = {};
    const resolvedData = { empty: null };

    function hook({ q, v }: { q: RequestDocument; v: unknown }) {
      return useQuery(q, v);
    }
    let result: { current: ReturnType<typeof hook> };
    let rerender: (props?: { q: RequestDocument; v: unknown }) => void;
    let waitForNextUpdate: () => Promise<void>;
    let waitForValueToChange: (selector: () => unknown) => Promise<void>;
    await act(async () => {
      const ret = renderHook(hook, {
        initialProps: { q: queryA, v: variables },
      });
      ({ result, rerender, waitForNextUpdate, waitForValueToChange } = ret);
      await waitForNextUpdate();
      await waitForValueToChange(() => result.current.loading);
    });

    expect(result.current.data).toStrictEqual(resolvedData);

    const recievedA = await axios.get("/lastquery");
    // expect(recievedA.data.body).toStrictEqual({
    //   query: queryA.toString(),
    //   variables,
    // });

    await act(async () => {
      rerender({ q: queryB, v: variables });
      await waitForNextUpdate();
      await waitForValueToChange(() => result.current.loading);
    });

    expect(result.current.data).toStrictEqual(resolvedData);

    const recievedB = await axios.get("/lastquery");
    // expect(recievedB.data.body).toStrictEqual({
    //   query: queryB.toString(),
    //   variables,
    // });

    expect(recievedB.data.id).not.toBe(recievedA.data.id);
  });

  test("cache miss on new variables", async () => {
    const query = ECHO;
    const variablesA = { color: "Aquamarine" };
    const variablesB = { color: "Blue" };
    const resolvedDataA = { echo: { color: "Aquamarine" } };
    const resolvedDataB = { echo: { color: "Blue" } };

    function hook({ q, v }: { q: RequestDocument; v: unknown }) {
      return useQuery(q, v);
    }
    let result: { current: ReturnType<typeof hook> };
    let rerender: (props?: { q: RequestDocument; v: unknown }) => void;
    let waitForNextUpdate: () => Promise<void>;
    let waitForValueToChange: (selector: () => unknown) => Promise<void>;
    await act(async () => {
      const ret = renderHook(hook, {
        initialProps: { q: query, v: variablesA },
      });
      ({ result, rerender, waitForNextUpdate, waitForValueToChange } = ret);
      await waitForNextUpdate();
      await waitForValueToChange(() => result.current.loading);
    });

    expect(result.current.data).toStrictEqual(resolvedDataA);

    const recievedA = await axios.get("/lastquery");
    // expect(recievedA.data.body).toStrictEqual({
    //   query: query.toString(),
    //   variables: variablesA,
    // });

    await act(async () => {
      rerender({ q: query, v: variablesB });
      await waitForNextUpdate();
      await waitForValueToChange(() => result.current.loading);
    });

    expect(result.current.data).toStrictEqual(resolvedDataB);

    const recievedB = await axios.get("/lastquery");
    // expect(recievedB.data.body).toStrictEqual({
    //   query: query.toString(),
    //   variables: variablesB,
    // });

    expect(recievedB.data.id).not.toBe(recievedA.data.id);
  });

  test("cache miss on new query and variables", async () => {
    const queryA = EMPTY;
    const queryB = ECHO;
    const variablesA = {};
    const variablesB = { color: "Blue" };
    const resolvedDataA = { empty: null };
    const resolvedDataB = { echo: { color: "Blue" } };

    function hook({ q, v }: { q: RequestDocument; v: unknown }) {
      return useQuery(q, v);
    }
    let result: { current: ReturnType<typeof hook> };
    let rerender: (props?: { q: RequestDocument; v: unknown }) => void;
    let waitForNextUpdate: () => Promise<void>;
    let waitForValueToChange: (selector: () => unknown) => Promise<void>;
    await act(async () => {
      const ret = renderHook(hook, {
        initialProps: { q: queryA, v: variablesA },
      });
      ({ result, rerender, waitForNextUpdate, waitForValueToChange } = ret);
      await waitForNextUpdate();
      await waitForValueToChange(() => result.current.loading);
    });

    expect(result.current.data).toStrictEqual(resolvedDataA);

    const recievedA = await axios.get("/lastquery");
    // expect(recievedA.data.body).toStrictEqual({
    //   query: queryA.toString(),
    //   variables: variablesA,
    // });

    await act(async () => {
      rerender({ q: queryB, v: variablesB });
      await waitForNextUpdate();
      await waitForValueToChange(() => result.current.loading);
    });

    expect(result.current.data).toStrictEqual(resolvedDataB);

    const recievedB = await axios.get("/lastquery");
    // expect(recievedB.data.body).toStrictEqual({
    //   query: queryB.toString(),
    //   variables: variablesB,
    // });

    expect(recievedB.data.id).not.toBe(recievedA.data.id);
  });

  test("cache only stores 1 entry", async () => {
    const queryA = EMPTY;
    const queryB = ECHO;
    const variablesA = {};
    const variablesB = { color: "Blue" };
    const resolvedDataA = { empty: null };
    const resolvedDataB = { echo: { color: "Blue" } };

    function hook({ q, v }: { q: RequestDocument; v: unknown }) {
      return useQuery(q, v);
    }
    let result: { current: ReturnType<typeof hook> };
    let rerender: (props?: { q: RequestDocument; v: unknown }) => void;
    let waitForNextUpdate: () => Promise<void>;
    let waitForValueToChange: (selector: () => unknown) => Promise<void>;
    await act(async () => {
      const ret = renderHook(hook, {
        initialProps: { q: queryA, v: variablesA },
      });
      ({ result, rerender, waitForNextUpdate, waitForValueToChange } = ret);
      await waitForNextUpdate();
      await waitForValueToChange(() => result.current.loading);
    });

    expect(result.current.data).toStrictEqual(resolvedDataA);

    const recievedA = await axios.get("/lastquery");
    // expect(recievedA.data.body).toStrictEqual({
    //   query: queryA.toString(),
    //   variables: variablesA,
    // });

    await act(async () => {
      rerender({ q: queryB, v: variablesB });
      await waitForNextUpdate();
      await waitForValueToChange(() => result.current.loading);
    });

    expect(result.current.data).toStrictEqual(resolvedDataB);

    const recievedB = await axios.get("/lastquery");
    // expect(recievedB.data.body).toStrictEqual({
    //   query: queryB.toString(),
    //   variables: variablesB,
    // });

    expect(recievedB.data.id).not.toBe(recievedA.data.id);

    await act(async () => {
      rerender({ q: queryA, v: variablesA });
      await waitForNextUpdate();
      await waitForValueToChange(() => result.current.loading);
    });

    expect(result.current.data).toStrictEqual(resolvedDataA);

    const recievedC = await axios.get("/lastquery");
    // expect(recievedC.data.body).toStrictEqual({
    //   query: queryA.toString(),
    //   variables: variablesA,
    // });

    expect(recievedC.data.id).not.toBe(recievedB.data.id);
    expect(recievedC.data.id).not.toBe(recievedA.data.id);
  });

  test("loading while query hasn't returned", async () => {
    const query = EMPTY;
    const variables = {};
    const resolvedData = { empty: null };

    function hook() {
      return useQuery(query, variables);
    }

    // await axios.post("/lock");

    let result: { current: ReturnType<typeof hook> };
    let waitForNextUpdate: () => Promise<void>;
    let waitFor: (
      f: () => boolean | void,
      opts?: { interval?: number; timeout?: number }
    ) => Promise<void>;
    await act(async () => {
      const ret = renderHook(hook);
      ({ result, waitForNextUpdate, waitFor } = ret);
      await waitForNextUpdate();
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();

    // await act(async () => {
    //   await axios.post("/unlock");
    // });
    await waitFor(() => !result.current.loading);

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toStrictEqual(resolvedData);
  });
});
