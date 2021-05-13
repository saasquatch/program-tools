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
import {
  FragmentDefinitionNode,
  FragmentSpreadNode,
  OperationDefinitionNode,
  parse,
} from "graphql";

jest.mock("../src/hooks/graphql/useGraphQLClient");
const client = new BatchedGraphQLClient(
  "https://app.referralsaasquatch.com/api/v1/test_faketenant/graphql"
);
// @ts-ignore -- typescript doesn't know that Jest has mocked this function in the above `jest.mock` function
useGraphQLClient.mockImplementation(() => client);

setImplementation(React);

const MOCK_TEST = gql`
  query MockTest($id: ID!) {
    post(id: $id) {
      title
    }
  }
`;

const MOCK_TEST_2 = gql`
  query MockTest($id: ID!) {
    post(id: $id) {
      title
      id
    }
  }
`;

const EMPTY = gql`
  query {
    empty {
      empty
    }
  }
`;

const ERRORS = gql`
  query {
    willthrowerror {
      valueyouwillnotget
    }
  }
`;

const ERRORS_VAR = gql`
  query ErrorsWithVar($id: ID!) {
    willthrowerrorvarreq(id: $id) {
      valueyouwillnotget
    }
  }
`;

describe("Mock Service Workers", () => {
  test("MockTest", async () => {
    const variables = { id: 6 };

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
    expect(result.current.data).not.toEqual(undefined);
    expect(result.current.data).toHaveProperty("post");
    expect(result.current.data.post).toHaveProperty("title");
    expect(typeof result.current.data.post.title).toEqual("string");
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
    const hook = () => useQuery(MOCK_TEST, { id: 4 });

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

    await waitFor(() => !result.current.loading);

    expect(result.current.loading).toBe(false);
    expect(result.current.data).not.toEqual(undefined);
  });
});

describe("useQuery", () => {
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
  });

  test("basic", async () => {
    const query = MOCK_TEST;
    const variables = { id: 4 };

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

    expect(result.current.data).not.toEqual(undefined);
    expect(result.current.data).toHaveProperty("post");
    expect(result.current.data.post).toHaveProperty("title");
    expect(typeof result.current.data.post.title).toEqual("string");
  });

  test("caches on identical query", async () => {
    const query = MOCK_TEST;
    const variables = { id: 3 };

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

    expect(result.current.data).not.toEqual(undefined);
    expect(result.current.data).toHaveProperty("post");
    expect(result.current.data.post).toHaveProperty("title");
    expect(typeof result.current.data.post.title).toEqual("string");

    const recievedA = await axios.get("/lastquery");

    await act(async () => {
      rerender({ q: query, v: variables });
    });

    expect(result.current.data).not.toEqual(undefined);
    expect(result.current.data).toHaveProperty("post");
    expect(result.current.data.post).toHaveProperty("title");
    expect(typeof result.current.data.post.title).toEqual("string");

    const recievedB = await axios.get("/lastquery");

    expect(recievedB.data.id).toBe(recievedA.data.id);
  });

  test("cache miss on new query", async () => {
    const queryA = MOCK_TEST;
    const queryB = MOCK_TEST_2;
    const variables = { id: 3 };
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

    expect(result.current.data).not.toEqual(undefined);
    expect(result.current.data).toHaveProperty("post");
    expect(result.current.data.post).toHaveProperty("title");
    expect(result.current.data.post).not.toHaveProperty("id");
    expect(typeof result.current.data.post.title).toEqual("string");

    const recievedA = await axios.get("/lastquery");

    await act(async () => {
      rerender({ q: queryB, v: variables });
      await waitForNextUpdate();
      await waitForValueToChange(() => result.current.loading);
    });

    expect(result.current.data).not.toEqual(undefined);
    expect(result.current.data).toHaveProperty("post");
    expect(result.current.data.post).toHaveProperty("title");
    expect(result.current.data.post).toHaveProperty("id");
    expect(typeof result.current.data.post.title).toEqual("string");
    expect(typeof result.current.data.post.id).toEqual("string");

    const recievedB = await axios.get("/lastquery");

    expect(recievedB.data.id).not.toBe(recievedA.data.id);
  });

  test("cache miss on new variables", async () => {
    const query = MOCK_TEST_2;
    const variablesA = { id: 2 };
    const variablesB = { id: 4 };

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

    expect(result.current.data).not.toEqual(undefined);
    expect(result.current.data).toHaveProperty("post");
    expect(result.current.data.post).toHaveProperty("title");
    expect(result.current.data.post).toHaveProperty("id");
    expect(typeof result.current.data.post.title).toEqual("string");
    expect(typeof result.current.data.post.id).toEqual("string");

    const recievedA = await axios.get("/lastquery");

    await act(async () => {
      rerender({ q: query, v: variablesB });
      await waitForNextUpdate();
      await waitForValueToChange(() => result.current.loading);
    });

    expect(result.current.data).not.toEqual(undefined);
    expect(result.current.data).toHaveProperty("post");
    expect(result.current.data.post).toHaveProperty("title");
    expect(result.current.data.post).toHaveProperty("id");
    expect(typeof result.current.data.post.title).toEqual("string");
    expect(typeof result.current.data.post.id).toEqual("string");

    const recievedB = await axios.get("/lastquery");

    expect(recievedB.data.id).not.toBe(recievedA.data.id);
  });

  test("cache miss on new query and variables", async () => {
    const queryA = MOCK_TEST;
    const queryB = MOCK_TEST_2;
    const variablesA = { id: 6 };
    const variablesB = { id: 8 };

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

    expect(result.current.data).not.toEqual(undefined);
    expect(result.current.data).toHaveProperty("post");
    expect(result.current.data.post).toHaveProperty("title");
    expect(typeof result.current.data.post.title).toEqual("string");

    const recievedA = await axios.get("/lastquery");

    await act(async () => {
      rerender({ q: queryB, v: variablesB });
      await waitForNextUpdate();
      await waitForValueToChange(() => result.current.loading);
    });

    expect(result.current.data).not.toEqual(undefined);
    expect(result.current.data).toHaveProperty("post");
    expect(result.current.data.post).toHaveProperty("title");
    expect(result.current.data.post).toHaveProperty("id");
    expect(typeof result.current.data.post.title).toEqual("string");
    expect(typeof result.current.data.post.id).toEqual("string");

    const recievedB = await axios.get("/lastquery");

    expect(recievedB.data.id).not.toBe(recievedA.data.id);
  });

  test("cache only stores 1 entry", async () => {
    const queryA = MOCK_TEST;
    const queryB = MOCK_TEST_2;
    const variablesA = { id: 6 };
    const variablesB = { id: 8 };

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

    expect(result.current.data).not.toEqual(undefined);
    expect(result.current.data).toHaveProperty("post");
    expect(result.current.data.post).toHaveProperty("title");
    expect(typeof result.current.data.post.title).toEqual("string");

    const recievedA = await axios.get("/lastquery");

    await act(async () => {
      rerender({ q: queryB, v: variablesB });
      await waitForNextUpdate();
      await waitForValueToChange(() => result.current.loading);
    });

    expect(result.current.data).not.toEqual(undefined);
    expect(result.current.data).toHaveProperty("post");
    expect(result.current.data.post).toHaveProperty("title");
    expect(result.current.data.post).toHaveProperty("id");
    expect(typeof result.current.data.post.title).toEqual("string");
    expect(typeof result.current.data.post.id).toEqual("string");

    const recievedB = await axios.get("/lastquery");

    expect(recievedB.data.id).not.toBe(recievedA.data.id);

    await act(async () => {
      rerender({ q: queryA, v: variablesA });
      await waitForNextUpdate();
      await waitForValueToChange(() => result.current.loading);
    });

    expect(result.current.data).not.toEqual(undefined);
    expect(result.current.data).toHaveProperty("post");
    expect(result.current.data.post).toHaveProperty("title");
    expect(typeof result.current.data.post.title).toEqual("string");

    const recievedC = await axios.get("/lastquery");

    expect(recievedC.data.id).not.toBe(recievedB.data.id);
    expect(recievedC.data.id).not.toBe(recievedA.data.id);
  });

  test("loading while query hasn't returned", async () => {
    const query = MOCK_TEST;
    const variables = { id: "test" };
    const resolvedData = { empty: null };

    function hook() {
      return useQuery(query, variables);
    }

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

    await waitFor(() => !result.current.loading);

    expect(result.current.loading).toBe(false);
    expect(result.current.data).not.toEqual(undefined);
    expect(result.current.data).toHaveProperty("post");
    expect(result.current.data.post).toHaveProperty("title");
    expect(typeof result.current.data.post.title).toEqual("string");
  });

  describe("query batching", () => {
    test("basic batching", async () => {
      const query = MOCK_TEST;
      const variables = { id: 3 };
      const query2 = MOCK_TEST_2;
      const variables2 = { id: 4 };
      function hook() {
        return useQuery(query, variables);
      }
      function hook2() {
        return useQuery(query2, variables2);
      }
      let result: { current: ReturnType<typeof hook> };
      let result2: { current: ReturnType<typeof hook> };
      await act(async () => {
        const rendered = renderHook(hook);
        const rendered2 = renderHook(hook2);

        await rendered.waitForNextUpdate();
        await rendered.waitForValueToChange(
          () => rendered2.result.current.loading
        );
        result = rendered.result;
        result2 = rendered2.result;
      });

      expect(result.current.data).not.toEqual(undefined);
      expect(result.current.data).toHaveProperty("post");
      expect(result.current.data.post).toHaveProperty("title");
      expect(typeof result.current.data.post.title).toEqual("string");

      expect(result2.current.data).not.toEqual(undefined);
      expect(result2.current.data).toHaveProperty("post");
      expect(result2.current.data.post).toHaveProperty("title");
      expect(result2.current.data.post).toHaveProperty("id");
      expect(typeof result2.current.data.post.title).toEqual("string");
      expect(typeof result2.current.data.post.id).toEqual("string");

      const recieved = await axios.get("/lastquery");
      const body = recieved.data.body;
      expect(Object.keys(body.variables).length).toEqual(2);
      expect(
        (parse(body.query).definitions[0] as OperationDefinitionNode)
          .selectionSet.selections.length
      ).toEqual(2);
    });

    test("query can't be batched", async () => {
      const query = MOCK_TEST;
      const queryid = "aVerySpecificQueryID";
      const query2 = gql`
            query {
              -
            }
          `;
      const query2Vars = { test: 3 };
      function hook() {
        return useQuery(query, { id: queryid });
      }
      function hook2() {
        return useQuery(query2, query2Vars);
      }
      let result: { current: ReturnType<typeof hook> };
      let result2: { current: ReturnType<typeof hook> };
      await act(async () => {
        const rendered = renderHook(hook);
        const rendered2 = renderHook(hook2);

        await rendered.waitForNextUpdate();
        await rendered.waitForValueToChange(
          () => rendered2.result.current.loading
        );
        result = rendered.result;
        result2 = rendered2.result;
      });

      expect(result.current.data).not.toEqual(undefined);
      expect(result.current.data).toHaveProperty("post");
      expect(result.current.data.post).toHaveProperty("title");
      expect(typeof result.current.data.post.title).toEqual("string");

      expect(result2.current.data).toEqual(undefined);
      expect(result2.current.errors).toBeDefined();
      expect(result2.current.errors.response.errors.length).toEqual(1);

      const recieved = await axios.get("/lastquery?n=2");
      const [res1, res2] = recieved.data;
      // unbatchable query is sent by itself without batching
      expect(res1.body.query).toEqual(query2);
      expect(res1.body.variables).toStrictEqual(query2Vars);

      //batched query only has one entry
      expect(
        (parse(res2.body.query).definitions[0] as OperationDefinitionNode)
          .selectionSet.selections.length
      ).toEqual(1);
      expect(Object.values(res2.body.variables)[0]).toEqual(queryid);
    });

    test("batched queries errors", async () => {
      const query = ERRORS;
      const query2 = ERRORS;

      function hook() {
        return useQuery(query, {});
      }
      function hook2() {
        return useQuery(query2, {});
      }
      let result: { current: ReturnType<typeof hook> };
      let result2: { current: ReturnType<typeof hook> };
      await act(async () => {
        const rendered = renderHook(hook);
        const rendered2 = renderHook(hook2);
        await rendered.waitForNextUpdate();
        await rendered.waitForValueToChange(
          () => rendered2.result.current.loading
        );
        result = rendered.result;
        result2 = rendered2.result;
      });

      expect(result.current.data).toEqual(undefined);
      expect(result.current.errors.request.query).toEqual(query);
      expect(result.current.errors).toBeDefined();
      expect(result.current.errors.response.data).toStrictEqual({
        willthrowerror: null,
      });
      expect(result.current.errors.response.errors[0].message).toEqual(
        "Intentional Testing Error"
      );
      expect(result.current.errors.response.errors.length).toEqual(1);

      expect(result2.current.data).toEqual(undefined);
      expect(result2.current.errors.request.query).toEqual(query2);
      expect(result2.current.errors).toBeDefined();
      expect(result2.current.errors.response.data).toStrictEqual({
        willthrowerror: null,
      });
      expect(result2.current.errors.response.errors[0].message).toEqual(
        "Intentional Testing Error"
      );
      expect(result2.current.errors.response.errors.length).toEqual(1);

      const recieved = await axios.get("/lastquery");
      const body = recieved.data.body;
      // query still should have been batched properly
      expect(
        (parse(body.query).definitions[0] as OperationDefinitionNode)
          .selectionSet.selections.length
      ).toEqual(2);
    });

    test("batched query with variables errors", async () => {
      const query = ERRORS_VAR;
      const vars = { id: "qwe" };
      const query2 = ERRORS_VAR;
      const vars2 = { id: "oiu" };

      function hook() {
        return useQuery(query, vars);
      }
      function hook2() {
        return useQuery(query2, vars2);
      }
      let result: { current: ReturnType<typeof hook> };
      let result2: { current: ReturnType<typeof hook> };
      await act(async () => {
        const rendered = renderHook(hook);
        const rendered2 = renderHook(hook2);
        await rendered.waitForNextUpdate();
        await rendered.waitForValueToChange(
          () => rendered2.result.current.loading
        );
        result = rendered.result;
        result2 = rendered2.result;
      });

      expect(result.current.data).toEqual(undefined);
      expect(result.current.errors.request.query).toEqual(query);
      expect(result.current.errors.request.variables).toStrictEqual(vars);
      expect(result.current.errors).toBeDefined();
      expect(result.current.errors.response.data).toStrictEqual({
        willthrowerrorvarreq: null,
      });
      expect(result.current.errors.response.errors.length).toEqual(1);
      expect(result.current.errors.response.errors[0].message).toEqual(
        "Intentional Testing Error"
      );

      expect(result2.current.data).toEqual(undefined);
      expect(result2.current.errors.request.query).toEqual(query2);
      expect(result2.current.errors.request.variables).toStrictEqual(vars2);
      expect(result2.current.errors).toBeDefined();
      expect(result2.current.errors.response.data).toStrictEqual({
        willthrowerrorvarreq: null,
      });
      expect(result2.current.errors.response.errors.length).toEqual(1);
      expect(result2.current.errors.response.errors[0].message).toEqual(
        "Intentional Testing Error"
      );

      const recieved = await axios.get("/lastquery");
      const body = recieved.data.body;
      // query still should have been batched properly
      expect(
        (parse(body.query).definitions[0] as OperationDefinitionNode)
          .selectionSet.selections.length
      ).toEqual(2);
    });

    test("single query errors in batched query", async () => {
      const query = MOCK_TEST;
      const variables = { id: 66 };
      const query2 = ERRORS;

      function hook() {
        return useQuery(query, variables);
      }
      function hook2() {
        return useQuery(query2, {});
      }
      let result: { current: ReturnType<typeof hook> };
      let result2: { current: ReturnType<typeof hook> };
      await act(async () => {
        const rendered = renderHook(hook);
        const rendered2 = renderHook(hook2);
        await rendered.waitForNextUpdate();
        await rendered.waitForValueToChange(
          () => rendered2.result.current.loading
        );
        result = rendered.result;
        result2 = rendered2.result;
      });

      expect(result.current.data).not.toEqual(undefined);
      expect(result.current.data).toHaveProperty("post");
      expect(result.current.data.post).toHaveProperty("title");
      expect(typeof result.current.data.post.title).toEqual("string");
      expect(result.current.errors).toEqual(undefined);

      expect(result2.current.data).toEqual(undefined);
      expect(result2.current.errors).toBeDefined();
      expect(result2.current.errors.request.query).toEqual(query2);
      expect(result2.current.errors.response.data).toStrictEqual({
        willthrowerror: null,
      });
      expect(result2.current.errors.response.errors[0].message).toEqual(
        "Intentional Testing Error"
      );
      expect(result2.current.errors.response.errors.length).toEqual(1);

      const recieved = await axios.get("/lastquery");
      const body = recieved.data.body;
      // query still should have been batched properly
      expect(
        (parse(body.query).definitions[0] as OperationDefinitionNode)
          .selectionSet.selections.length
      ).toEqual(2);
    });

    test("batching with fragments", async () => {
      const FRAGMENT_QUERY = gql`
        fragment NameParts on Author {
          firstName
          lastName
        }
        query {
          author {
            ...NameParts
          }
        }
      `;
      const query = MOCK_TEST;
      const variables = { id: "testMockId" };
      const query2 = FRAGMENT_QUERY;
      const variables2 = {};
      function hook() {
        return useQuery(query, variables);
      }
      function hook2() {
        return useQuery(query2, variables2);
      }
      let result: { current: ReturnType<typeof hook> };
      let result2: { current: ReturnType<typeof hook> };
      await act(async () => {
        const rendered = renderHook(hook);
        const rendered2 = renderHook(hook2);

        await rendered.waitForNextUpdate();
        await rendered.waitForValueToChange(
          () => rendered2.result.current.loading
        );
        result = rendered.result;
        result2 = rendered2.result;
      });

      expect(result.current.data).not.toEqual(undefined);
      expect(result.current.data).toHaveProperty("post");
      expect(result.current.data.post).toHaveProperty("title");
      expect(typeof result.current.data.post.title).toEqual("string");

      expect(result2.current.data).not.toEqual(undefined);
      expect(result2.current.data).toHaveProperty("author");
      expect(result2.current.data.author).toHaveProperty("firstName");
      expect(result2.current.data.author).toHaveProperty("lastName");
      expect(typeof result2.current.data.author.firstName).toEqual("string");
      expect(typeof result2.current.data.author.lastName).toEqual("string");

      const recieved = await axios.get("/lastquery?n=2");
      const [res1, res2] = recieved.data;
      // unbatchable query is sent by itself without batching
      expect(res1.body.query).toEqual(query2);
      expect(res1.body.variables).toStrictEqual(variables2);

      //batched query only has one entry
      expect(
        (parse(res2.body.query).definitions[0] as OperationDefinitionNode)
          .selectionSet.selections.length
      ).toEqual(1);
      expect(Object.values(res2.body.variables)[0]).toEqual("testMockId");
    });

    test("batching with multiple fragments with conflicting names", async () => {
      const FRAGMENT_QUERY = gql`
        fragment NameParts on Author {
          firstName
          lastName
        }
        query {
          author {
            ...NameParts
          }
        }
      `;

      const FRAGMENT_QUERY_2 = gql`
        fragment NameParts on Author {
          firstName
        }
        query {
          author {
            ...NameParts
          }
        }
      `;
      const query = FRAGMENT_QUERY;
      const variables = {};
      const query2 = FRAGMENT_QUERY_2;
      const variables2 = {};
      function hook() {
        return useQuery(query, variables);
      }
      function hook2() {
        return useQuery(query2, variables2);
      }
      let result: { current: ReturnType<typeof hook> };
      let result2: { current: ReturnType<typeof hook> };
      await act(async () => {
        const rendered = renderHook(hook);
        const rendered2 = renderHook(hook2);

        await rendered.waitForNextUpdate();
        await rendered.waitForValueToChange(
          () => rendered2.result.current.loading
        );
        result = rendered.result;
        result2 = rendered2.result;
      });

      expect(result.current.data).not.toEqual(undefined);
      expect(result.current.data).toHaveProperty("author");
      expect(result.current.data.author).toHaveProperty("firstName");
      expect(result.current.data.author).toHaveProperty("lastName");
      expect(typeof result.current.data.author.firstName).toEqual("string");
      expect(typeof result.current.data.author.lastName).toEqual("string");

      expect(result2.current.data).not.toEqual(undefined);
      expect(result2.current.data).toHaveProperty("author");
      expect(result2.current.data.author).toHaveProperty("firstName");
      expect(result2.current.data.author).not.toHaveProperty("lastName");
      expect(typeof result2.current.data.author.firstName).toEqual("string");

      const recieved = await axios.get("/lastquery?n=2");
      const [res1, res2] = recieved.data;
      // unbatchable query is sent by itself without batching
      expect(res1.body.query).toEqual(query);
      expect(res1.body.variables).toStrictEqual(variables);

      // unbatchable query is sent by itself without batching
      expect(res2.body.query).toEqual(query2);
      expect(res2.body.variables).toStrictEqual(variables2);
    });

    test("batching with inline fragments", async () => {
      const FRAGMENT_QUERY = gql`
        query {
          author {
            ... on Author {
              firstName
              lastName
            }
          }
        }
      `;
      const query = FRAGMENT_QUERY;
      const variables = {};
      const query2 = MOCK_TEST;
      const variables2 = { id: 4 };
      function hook() {
        return useQuery(query, variables);
      }
      function hook2() {
        return useQuery(query2, variables2);
      }
      let result: { current: ReturnType<typeof hook> };
      let result2: { current: ReturnType<typeof hook> };
      await act(async () => {
        const rendered = renderHook(hook);
        const rendered2 = renderHook(hook2);

        await rendered.waitForNextUpdate();
        await rendered.waitForValueToChange(
          () => rendered2.result.current.loading
        );
        result = rendered.result;
        result2 = rendered2.result;
      });

      const recieved = await axios.get("/lastquery");
      const body = recieved.data.body;

      expect(result.current.data).not.toEqual(undefined);
      expect(result.current.data).toHaveProperty("author");
      expect(result.current.data.author).toHaveProperty("firstName");
      expect(result.current.data.author).toHaveProperty("lastName");
      expect(typeof result.current.data.author.firstName).toEqual("string");
      expect(typeof result.current.data.author.lastName).toEqual("string");

      expect(result2.current.data).not.toEqual(undefined);
      expect(result2.current.data).toHaveProperty("post");
      expect(result2.current.data.post).toHaveProperty("title");
      expect(typeof result2.current.data.post.title).toEqual("string");

      const operationDefinition = parse(body.query).definitions.find(
        (op: OperationDefinitionNode | FragmentDefinitionNode) => {
          return op.kind === "OperationDefinition";
        }
      ) as OperationDefinitionNode;
      expect(operationDefinition).toBeDefined();
      expect(operationDefinition.selectionSet.selections.length).toEqual(2);
    });

    test("batching with mutation", async () => {
      const query = MOCK_TEST;
      const variables = { id: 33333 };
      const query2 = gql`
        mutation UpvotePost($postId: ID!) {
          upvotePost(postId: $postId) {
            title
            votes
          }
        }
      `;
      const variables2 = { postId: 4 };
      function hook() {
        return useQuery(query, variables);
      }
      function hook2() {
        return useQuery(query2, variables2);
      }
      let result: { current: ReturnType<typeof hook> };
      let result2: { current: ReturnType<typeof hook> };
      await act(async () => {
        const rendered = renderHook(hook);
        const rendered2 = renderHook(hook2);

        await rendered.waitForNextUpdate();
        await rendered.waitForValueToChange(
          () => rendered2.result.current.loading
        );
        result = rendered.result;
        result2 = rendered2.result;
      });

      expect(result.current.data).not.toEqual(undefined);
      expect(result.current.data).toHaveProperty("post");
      expect(result.current.data.post).toHaveProperty("title");
      expect(typeof result.current.data.post.title).toEqual("string");

      expect(result2.current.data).not.toEqual(undefined);
      expect(result2.current.data).toHaveProperty("upvotePost");
      expect(result2.current.data.upvotePost).toHaveProperty("title");
      expect(result2.current.data.upvotePost).toHaveProperty("votes");
      expect(typeof result2.current.data.upvotePost.title).toEqual("string");
      expect(typeof result2.current.data.upvotePost.votes).toEqual("number");

      const recieved = await axios.get("/lastquery?n=2");
      const [res1, res2] = recieved.data;
      // unbatchable query is sent by itself without batching
      expect(res1.body.query).toEqual(query2);
      expect(res1.body.variables).toStrictEqual(variables2);

      //batched query only has one entry
      expect(
        (parse(res2.body.query).definitions[0] as OperationDefinitionNode)
          .selectionSet.selections.length
      ).toEqual(1);
      expect(Object.values(res2.body.variables)[0]).toEqual(33333);
    });

    test("batching with nested directive", async () => {
      const query = gql`
        query Conditional($id: ID!, $condition: Boolean!) {
          post(id: $id) {
            title @include(if: $condition)
          }
        }
      `;
      const variables = { condition: true, id: 3 };
      const variables2 = { condition: false, id: 4 };
      function hook() {
        return useQuery(query, variables);
      }
      function hook2() {
        return useQuery(query, variables2);
      }
      let result: { current: ReturnType<typeof hook> };
      let result2: { current: ReturnType<typeof hook> };
      await act(async () => {
        const rendered = renderHook(hook);
        const rendered2 = renderHook(hook2);

        await rendered.waitForNextUpdate();
        await rendered.waitForValueToChange(
          () => rendered2.result.current.loading
        );

        result = rendered.result;
        result2 = rendered2.result;
      });

      expect(result.current.data).not.toEqual(undefined);
      expect(result.current.data).toHaveProperty("post");
      expect(result.current.data.post).toHaveProperty("title");
      expect(typeof result.current.data.post.title).toEqual("string");

      expect(result2.current.data).not.toEqual(undefined);
      expect(result2.current.data).toHaveProperty("post");
      expect(result2.current.data.post).not.toHaveProperty("title");

      const recieved = await axios.get("/lastquery?n=2");
      const [res1, res2] = recieved.data;
      // unbatchable query is sent by itself without batching
      expect(res1.body.query).toEqual(query);
      expect(res1.body.variables).toStrictEqual(variables);

      // unbatchable query is sent by itself without batching
      expect(res2.body.query).toEqual(query);
      expect(res2.body.variables).toStrictEqual(variables2);
    });

    test("batching with top level directive", async () => {
      const query = gql`
        query Limited($id: ID!, $count: Int!) @limit(count: $count) {
          post(id: $id) {
            title
          }
        }
      `;
      const variables = { count: 4, id: 3 };
      const variables2 = { count: 5, id: 4 };
      function hook() {
        return useQuery(query, variables);
      }
      function hook2() {
        return useQuery(query, variables2);
      }
      let result: { current: ReturnType<typeof hook> };
      let result2: { current: ReturnType<typeof hook> };
      await act(async () => {
        const rendered = renderHook(hook);
        const rendered2 = renderHook(hook2);

        await rendered.waitForNextUpdate();
        await rendered.waitForValueToChange(
          () => rendered2.result.current.loading
        );
        result = rendered.result;
        result2 = rendered2.result;
      });

      expect(result.current.data).not.toEqual(undefined);
      expect(result.current.data).toHaveProperty("post");
      expect(result.current.data.post).toHaveProperty("title");
      expect(typeof result.current.data.post.title).toEqual("string");

      expect(result.current.data).not.toEqual(undefined);
      expect(result.current.data).toHaveProperty("post");
      expect(result.current.data.post).toHaveProperty("title");
      expect(typeof result.current.data.post.title).toEqual("string");

      const recieved = await axios.get("/lastquery?n=2");
      const [res1, res2] = recieved.data;
      // unbatchable query is sent by itself without batching
      expect(res1.body.query).toEqual(query);
      expect(res1.body.variables).toStrictEqual(variables);

      // unbatchable query is sent by itself without batching
      expect(res2.body.query).toEqual(query);
      expect(res2.body.variables).toStrictEqual(variables2);
    });
  });
});
