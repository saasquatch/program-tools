import { addMocksToSchema } from "@graphql-tools/mock";
import { buildSchema, formatError, graphqlSync, GraphQLSchema, print } from "graphql";
import { ClientError } from "graphql-request";
import { RequestDocument } from "graphql-request/dist/types";
import { ContextProvider } from "dom-context";
import { useEffect, useMemo } from "@saasquatch/universal-hooks";
import { setUserIdentity } from "../hooks/environment";
import { GRAPHQL_CONTEXT } from "../hooks/graphql/context";
import { fakeJwt } from "../fakeJwt";
import { CANNED_NOW, defaultMocks, mergeMocks, Mocks, withSeed } from "./mocks";
import { SAASQUATCH_SCHEMA_SDL, SAASQUATCH_SCHEMA_SOURCE } from "./schema";

export { CANNED_NOW, fakeJwt, SAASQUATCH_SCHEMA_SOURCE };
export type { Mocks };

/**
 * `.invalid` can never resolve (RFC 2606), so a query that somehow skips the
 * canned client fails loudly instead of reaching a real SaaSquatch server.
 */
export const CANNED_TENANT_ALIAS = "test_canned";
export const CANNED_APP_DOMAIN = "https://canned.invalid";

let schema: GraphQLSchema | undefined;
function getSchema(): GraphQLSchema {
  if (!schema) schema = buildSchema(SAASQUATCH_SCHEMA_SDL);
  return schema;
}

export interface CannedOptions {
  /** Per-type mocks merged over the realistic defaults, e.g. `{ Query: () => ({ ... }) }`. */
  mocks?: Mocks;
  /** Changes every generated value while keeping each response deterministic. */
  seed?: string;
}

/**
 * Answers any query or mutation valid against the SaaSquatch schema with
 * realistic, deterministic data. Implements the one method hooks call on
 * `BatchedGraphQLClient`, so it can be provided in its place.
 */
export class CannedGraphQLClient {
  private readonly schema: GraphQLSchema;

  constructor(private readonly options: CannedOptions = {}) {
    const base = getSchema();
    this.schema = addMocksToSchema({
      schema: base,
      mocks: mergeMocks(defaultMocks(base), options.mocks),
    });
  }

  async request<T = any>(
    document: RequestDocument,
    variables?: Record<string, unknown>,
    _options?: unknown
  ): Promise<T> {
    const query = typeof document === "string" ? document : print(document);
    const seed = `${this.options.seed ?? ""}|${query}|${JSON.stringify(variables ?? {})}`;
    const result = withSeed(seed, () =>
      graphqlSync({ schema: this.schema, source: query, variableValues: variables })
    );
    if (result.errors?.length) {
      throw new ClientError(
        // The wire format, which is what a network ClientError carries.
        { data: result.data, errors: result.errors.map(formatError) as any, status: 200 },
        { query, variables }
      );
    }
    return result.data as T;
  }
}

export function createCannedGraphQLClient(options?: CannedOptions) {
  return new CannedGraphQLClient(options);
}

/**
 * Provides a canned client to every component under `element`, in place of
 * the network client `useGraphQLClient` would otherwise create.
 *
 * @returns a function that stops providing it
 */
export function provideCannedGraphQL(
  element: HTMLElement,
  clientOrOptions?: CannedGraphQLClient | CannedOptions
): () => void {
  const client =
    clientOrOptions instanceof CannedGraphQLClient
      ? clientOrOptions
      : createCannedGraphQLClient(clientOrOptions);
  const provider = new ContextProvider<CannedGraphQLClient>({
    element,
    contextName: GRAPHQL_CONTEXT,
    initialState: client,
  }).start();
  return () => provider.stop();
}

/**
 * Answers `fetch` calls to the canned GraphQL endpoint from `client`. Some
 * code (e.g. component-environment's locale lookup) calls `fetch` directly
 * instead of going through a GraphQL client, so a context provider alone can't
 * reach it. Every other URL goes to the real `fetch` untouched.
 *
 * @returns a function that restores the original `fetch`
 */
export function interceptCannedFetch(client: CannedGraphQLClient): () => void {
  const original = window.fetch;
  const endpoint = `${CANNED_APP_DOMAIN}/api/v1/${CANNED_TENANT_ALIAS}/graphql`;
  const json = (body: unknown) =>
    new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    if (url !== endpoint) return original.call(this, input, init);
    const { query, variables } = JSON.parse(String(init?.body ?? "{}"));
    try {
      return json({ data: await client.request(query, variables) });
    } catch (e) {
      return json({
        data: e?.response?.data ?? null,
        errors: e?.response?.errors ?? [{ message: String(e) }],
      });
    }
  };
  return () => {
    window.fetch = original;
  };
}

export interface CannedUser {
  id: string;
  accountId: string;
  email?: string;
}

export interface CannedEnvironmentOptions extends CannedOptions {
  user?: CannedUser;
  programId?: string;
  /** Extra `window.widgetIdent` fields, e.g. `engagementMedium` or `locale`. */
  widgetIdent?: Record<string, unknown>;
}

/**
 * Story setup: a widget environment for a canned tenant, a logged-in user with
 * a fake JWT, and canned GraphQL for every component the story renders, plus
 * any direct `fetch` to the canned endpoint. Everything is undone when the
 * story unmounts.
 *
 * The client is provided on `document.body` (context requests are `composed`,
 * so they reach it from inside shadow roots) because this entry must not
 * bundle its own copy of `useHost`, whose implementation the main entry holds.
 *
 * A `widgetIdent.locale` is also returned as the user's stored locale, which
 * the locale lookup otherwise prefers over `widgetIdent`.
 */
export function useCannedEnvironment(options: CannedEnvironmentOptions = {}) {
  const { user, programId, widgetIdent, ...canned } = options;

  // Stories set only the fields their components read; identity comes from setUserIdentity.
  (window as any).widgetIdent = {
    tenantAlias: CANNED_TENANT_ALIAS,
    appDomain: CANNED_APP_DOMAIN,
    programId,
    ...widgetIdent,
  };

  const stop = useMemo(() => {
    const locale = widgetIdent?.locale;
    const client = createCannedGraphQLClient({
      ...canned,
      mocks: locale
        ? mergeMocks({ User: () => ({ locale }) }, canned.mocks)
        : canned.mocks,
    });
    const stopProviding = provideCannedGraphQL(document.body, client);
    const stopIntercepting = interceptCannedFetch(client);
    return () => {
      stopProviding();
      stopIntercepting();
    };
  }, []);

  useEffect(() => {
    if (user) {
      setUserIdentity({
        id: user.id,
        accountId: user.accountId,
        email: user.email,
        jwt: fakeJwt({ user }),
      });
    }
    return () => {
      stop();
      window.widgetIdent = undefined;
      setUserIdentity(undefined);
    };
  }, []);
}
