import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";
import { ContextListener } from "dom-context";
import {
  buildSchema,
  GraphQLInputType,
  isEnumType,
  isInputObjectType,
  isListType,
  isNonNullType,
  OperationDefinitionNode,
  parse,
  typeFromAST,
} from "graphql";
import { gql } from "graphql-request";
import jwtDecode from "jwt-decode";
import {
  CANNED_APP_DOMAIN,
  CANNED_NOW,
  CANNED_TENANT_ALIAS,
  CannedGraphQLClient,
  createCannedGraphQLClient,
  fakeJwt,
  interceptCannedFetch,
  provideCannedGraphQL,
} from "../src/canned";
import { SAASQUATCH_SCHEMA_SDL } from "../src/canned/schema";
import { GRAPHQL_CONTEXT } from "../src/hooks/graphql/context";

const SIGNED_JWT = /eyJ[\w-]{10,}\.eyJ[\w-]{10,}\.[\w-]{10,}/;

describe("fakeJwt", () => {
  it("decodes like a real token but carries no signature", () => {
    const token = fakeJwt({ user: { id: "jane", accountId: "jane" } });
    expect(jwtDecode(token)).toEqual({ user: { id: "jane", accountId: "jane" } });
    expect(jwtDecode(token, { header: true })).toEqual({ alg: "none", typ: "JWT" });
    expect(token.endsWith(".")).toBe(true);
    expect(SIGNED_JWT.test(token)).toBe(false);
  });
});

describe("CannedGraphQLClient", () => {
  const client = createCannedGraphQLClient();

  const VIEWER = gql`
    query {
      viewer {
        ... on User {
          firstName
          lastName
          email
          referralCode
          shareLink(programId: "referral-program")
          referrals(limit: 3) {
            totalCount
            data {
              id
              dateReferralStarted
            }
          }
        }
      }
    }
  `;

  it("is deterministic for the same query and variables", async () => {
    expect(await client.request(VIEWER)).toEqual(await client.request(VIEWER));
  });

  it("varies with the seed", async () => {
    const other = createCannedGraphQLClient({ seed: "other" });
    expect(await other.request(VIEWER)).not.toEqual(await client.request(VIEWER));
  });

  it("resolves the viewer as a logged-in User with one consistent persona", async () => {
    const { viewer } = await client.request(VIEWER);
    expect(viewer.firstName).toMatch(/^[A-Z][a-z]+$/);
    const handle = `${viewer.firstName}${viewer.lastName}`.replace(/[^a-z]/gi, "");
    expect(viewer.email).toBe(`${handle.toLowerCase()}@example.com`);
    expect(viewer.referralCode).toBe(handle.toUpperCase());
  });

  it("returns as many rows as totalCount says, within the limit", async () => {
    const { viewer } = await client.request(VIEWER);
    expect(viewer.referrals.data).toHaveLength(viewer.referrals.totalCount);
    expect(viewer.referrals.totalCount).toBeLessThanOrEqual(3);
  });

  it("returns dates as epoch millis in the 90 days before CANNED_NOW", async () => {
    const { viewer } = await client.request(VIEWER);
    for (const { dateReferralStarted } of viewer.referrals.data) {
      expect(typeof dateReferralStarted).toBe("number");
      expect(dateReferralStarted).toBeLessThan(CANNED_NOW);
      expect(dateReferralStarted).toBeGreaterThanOrEqual(CANNED_NOW - 90 * 864e5);
    }
  });

  it("keeps invoice taxes below earnings, as the invoice table assumes", async () => {
    const res = await client.request(gql`
      query {
        viewer {
          ... on User {
            impactConnection {
              publisher {
                invoices(limit: 5) {
                  data {
                    id
                    totalAmount
                    totalVatAmount
                    downloadUrl
                  }
                }
              }
            }
          }
        }
      }
    `);
    const invoices = res.viewer.impactConnection.publisher.invoices.data;
    expect(invoices.length).toBeGreaterThan(0);
    for (const invoice of invoices) {
      expect(invoice.totalAmount - invoice.totalVatAmount).toBeGreaterThan(0);
      expect(invoice.id).toMatch(/^[0-9a-f]{12}$/);
      expect(invoice.downloadUrl).toMatch(/^https:\/\//);
    }
  });

  it("serves images inline so stories make no network requests", async () => {
    const res = await client.request(gql`
      query {
        viewer {
          ... on User {
            visibleRewardExchangeItems(limit: 20, offset: 0) {
              data {
                imageUrl
              }
            }
          }
        }
      }
    `);
    const items = res.viewer.visibleRewardExchangeItems.data;
    expect(items.length).toBeGreaterThan(0);
    for (const { imageUrl } of items) {
      expect(imageUrl).toMatch(/^data:image\/svg\+xml,/);
    }
  });

  it("formats money like the API", async () => {
    const res = await client.request(gql`
      query {
        viewer {
          ... on User {
            rewards {
              data {
                prettyValue
              }
            }
          }
        }
      }
    `);
    for (const { prettyValue } of res.viewer.rewards.data) {
      expect(prettyValue).toMatch(/^\$\d+\.00$/);
    }
  });

  it("rejects a query the real API would reject, with a ClientError", async () => {
    await expect(
      client.request(gql`
        query {
          viewer {
            ... on User {
              notARealField
            }
          }
        }
      `)
    ).rejects.toMatchObject({
      response: { errors: [expect.objectContaining({ message: expect.stringContaining("notARealField") })] },
    });
  });

  it("lets a story override specific fields", async () => {
    const custom = createCannedGraphQLClient({
      mocks: {
        Query: () => ({
          renderWidget: () => ({
            widgetConfig: { values: { htmlTemplate: "<sqm-portal-container />" } },
          }),
        }),
      },
    });
    const res = await custom.request(
      gql`
        query getWidget($widgetType: WidgetType!) {
          renderWidget(widgetType: $widgetType) {
            widgetConfig {
              values
            }
          }
        }
      `,
      { widgetType: "p/referral-program/w/referrerWidget" }
    );
    expect(res.renderWidget.widgetConfig.values).toEqual({
      htmlTemplate: "<sqm-portal-container />",
    });
  });

  it("leaves Math.random untouched", async () => {
    const original = Math.random;
    await client.request(VIEWER);
    expect(Math.random).toBe(original);
  });
});

describe("interceptCannedFetch", () => {
  const ENDPOINT = `${CANNED_APP_DOMAIN}/api/v1/${CANNED_TENANT_ALIAS}/graphql`;
  const LOCALE = `query { viewer { ... on User { locale firstName } } }`;

  beforeAll(() => {
    // jsdom (Jest 26) has no fetch Response; a minimal one is enough here.
    if (typeof (global as any).Response === "undefined") {
      (global as any).Response = class {
        constructor(private body: string, public init: any) {}
        get ok() { return this.init.status < 300; }
        async json() { return JSON.parse(this.body); }
      };
    }
  });

  it("answers the canned endpoint, as raw-fetch callers like fetchLocale need", async () => {
    const real = jest.fn();
    window.fetch = real as any;
    const restore = interceptCannedFetch(
      createCannedGraphQLClient({ mocks: { User: () => ({ locale: "tr" }) } })
    );

    const res = await window.fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ query: LOCALE }),
    });
    const { data } = await res.json();
    expect(data.viewer.locale).toBe("tr");
    // the persona still applies to the rest of the user
    expect(data.viewer.firstName).toMatch(/^[A-Z][a-z]+$/);
    expect(real).not.toHaveBeenCalled();

    restore();
    expect(window.fetch).toBe(real);
  });

  it("passes every other URL to the real fetch", async () => {
    const real = jest.fn().mockResolvedValue("network");
    window.fetch = real as any;
    const restore = interceptCannedFetch(createCannedGraphQLClient());

    await expect(window.fetch("https://fast.ssqt.io/font.css")).resolves.toBe("network");
    await expect(
      window.fetch("https://app.referralsaasquatch.com/api/v1/x/graphql", { method: "POST", body: "{}" })
    ).resolves.toBe("network");
    expect(real).toHaveBeenCalledTimes(2);
    restore();
  });

  it("returns GraphQL errors in the body, like the API", async () => {
    window.fetch = jest.fn() as any;
    const restore = interceptCannedFetch(createCannedGraphQLClient());
    const res = await window.fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ query: "query { notAField }" }),
    });
    const body = await res.json();
    expect(body.errors[0].message).toContain("notAField");
    restore();
  });
});

describe("provideCannedGraphQL", () => {
  it("provides the client to descendants and stops on cleanup", () => {
    const parent = document.createElement("div");
    const child = document.createElement("div");
    parent.appendChild(child);
    document.body.appendChild(parent);

    const stop = provideCannedGraphQL(parent);
    const received: unknown[] = [];
    const listener = new ContextListener({
      element: child,
      contextName: GRAPHQL_CONTEXT,
      onChange: (next) => received.push(next),
    }).start();
    expect(received[0]).toBeInstanceOf(CannedGraphQLClient);

    stop();
    listener.stop();
    parent.remove();
  });
});

// Every static query mint and bedrock ship must be answerable, so their
// stories can render entirely from canned data.
describe("queries in sibling packages", () => {
  const roots = ["../../mint-components/src", "../../bedrock-components/src"]
    .map((p) => join(__dirname, p))
    .filter(existsSync);

  const files: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.tsx?$/.test(name)) files.push(path);
    }
  };
  roots.forEach(walk);

  const queries: (readonly [string, string])[] = [];
  for (const file of files) {
    const source = readFileSync(file, "utf8");
    const pattern = /gql`([\s\S]*?)`/g;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(source))) {
      const body = match[1];
      if (body.trim() && !body.includes("${")) {
        queries.push([file.split("/src/")[1], body] as const);
      }
    }
  }

  (queries.length ? it.each(queries) : it.skip.each([["none", ""]]))(
    "answers %s",
    async (_file, body) => {
      await expect(
        createCannedGraphQLClient().request(body, requiredVariables(body))
      ).resolves.toBeDefined();
    }
  );
});

/** Stand-in values for an operation's required variables, as its hook would pass. */
function requiredVariables(body: string): Record<string, unknown> {
  const schema = buildSchema(SAASQUATCH_SCHEMA_SDL);
  const operation = parse(body).definitions.find(
    (d): d is OperationDefinitionNode => d.kind === "OperationDefinition"
  );
  const variables: Record<string, unknown> = {};
  for (const def of operation?.variableDefinitions ?? []) {
    const type = typeFromAST(schema, def.type as any) as GraphQLInputType;
    if (isNonNullType(type)) variables[def.variable.name.value] = sampleInput(type);
  }
  return variables;
}

function sampleInput(type: GraphQLInputType): unknown {
  const nullable = isNonNullType(type) ? type.ofType : type;
  if (isListType(nullable)) return [sampleInput(nullable.ofType)];
  if (isEnumType(nullable)) return nullable.getValues()[0].value;
  if (isInputObjectType(nullable)) {
    const value: Record<string, unknown> = {};
    for (const field of Object.values(nullable.getFields())) {
      if (isNonNullType(field.type)) value[field.name] = sampleInput(field.type);
    }
    return value;
  }
  return SAMPLE_SCALARS[nullable.name] ?? "sample";
}

const SAMPLE_SCALARS: Record<string, unknown> = {
  Int: 1,
  Float: 1.5,
  Long: 1,
  Boolean: true,
  ID: "sample-id",
  RSDate: CANNED_NOW,
  RSJsonNode: {},
  RSShallowMap: {},
  WidgetType: "p/referral-program/w/referrerWidget",
  RSLocale: "en_US",
  RSCountryCode: "US",
  RSCurrencyCode: "USD",
};
