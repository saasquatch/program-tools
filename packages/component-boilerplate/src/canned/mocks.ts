import { IMockStore, isMockList, isRef } from "@graphql-tools/mock";
import {
  defaultFieldResolver,
  getNamedType,
  getNullableType,
  GraphQLFieldResolver,
  GraphQLObjectType,
  GraphQLSchema,
  isListType,
  isNonNullType,
  isObjectType,
  isScalarType,
} from "graphql";
import { fakeJwt } from "../fakeJwt";

/**
 * Per-type mocks, as @graphql-tools/mock's store calls them: `Query`, `Mutation`
 * and `Subscription` mocks get the requested field's arguments, other types get
 * none. Function-valued fields in the returned object are called with that
 * field's arguments. Values for abstract types must include `__typename`.
 */
export type Mocks = Record<string, (args?: any) => unknown>;

/**
 * A fixed "now" so canned dates (and anything rendered from them, like
 * "3 days ago") don't change between runs or snapshot builds.
 */
export const CANNED_NOW = Date.UTC(2026, 9, 1, 17, 0, 0);
const DAY = 24 * 60 * 60 * 1000;

let random: () => number = Math.random;

/** Runs `fn` with `Math.random` (used by the mock library) seeded. */
export function withSeed<T>(seed: string, fn: () => T): T {
  const original = Math.random;
  random = mulberry32(fnv1a(seed));
  Math.random = random;
  try {
    return fn();
  } finally {
    Math.random = original;
    random = original;
  }
}

function fnv1a(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const int = (min: number, max: number) =>
  Math.floor(random() * (max - min + 1)) + min;
const pick = <T>(items: readonly T[]): T => items[int(0, items.length - 1)];

const PEOPLE = [
  ["Jane", "Doe"],
  ["Marcus", "Chen"],
  ["Priya", "Patel"],
  ["Diego", "Alvarez"],
  ["Aisha", "Okafor"],
  ["Liam", "O'Brien"],
  ["Sofia", "Rossi"],
  ["Noah", "Kim"],
] as const;

const persona = () => {
  const [firstName, lastName] = pick(PEOPLE);
  const handle = `${firstName}${lastName}`.replace(/[^a-z]/gi, "");
  return {
    firstName,
    lastName,
    lastInitial: lastName[0],
    displayName: `${firstName} ${lastName}`,
    email: `${handle.toLowerCase()}@example.com`,
    referralCode: handle.toUpperCase(),
    code: handle.toUpperCase(),
    shareLink: `https://ssqt.co/${handle.toLowerCase()}`,
    shortUrl: `https://ssqt.co/${handle.toLowerCase()}`,
  };
};

const money = () => `$${int(1, 10) * 5}.00`;

/** Hex IDs from two 24-bit draws (the seeded PRNG yields 32 bits per call). */
const hexId = () =>
  int(0, 0xffffff).toString(16).padStart(6, "0") +
  int(0, 0xffffff).toString(16).padStart(6, "0");

const code = () =>
  `${pick(["SAVE", "GIFT", "FUEL", "WELCOME"])}-${int(0, 0xfffff).toString(36).toUpperCase().padStart(4, "0")}`;

/** Inline so canned stories make no network requests, even for images. */
const IMAGE =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="100%" height="100%" fill="#e7e5f5"/><text x="50%" y="50%" fill="#4225c4" font-family="sans-serif" font-size="20" text-anchor="middle" dominant-baseline="middle">Reward</text></svg>'
  );

/** String values by field name: realistic beats "Hello World" in a story. */
function stringFor(fieldName: string, parentType: string): string {
  const f = fieldName.toLowerCase();
  const p = lowerKeys(persona());
  if (f in p) return p[f];
  if (f.startsWith("pretty") || f === "formatrewardprettyvalue") return money();
  if (f === "balance") return money();
  if (/image|logo|icon|avatar|picture/.test(f)) return IMAGE;
  if (f === "textvalue") return String(int(1, 25));
  if (f.endsWith("code") && !/country|currency|postal|error|reason|language/.test(f)) {
    return code();
  }
  if (f.endsWith("url") || f.endsWith("link")) {
    return `https://example.com/${parentType.toLowerCase()}/${fieldName}`;
  }
  if (f === "currency" || f === "currencycode") return "USD";
  if (f === "unit" || f.endsWith("unit")) return "USD";
  if (f.includes("country")) return "US";
  if (f === "locale") return "en_US";
  if (f === "id" || f.endsWith("id") || f === "uid" || f === "key") return hexId();
  if (f === "name") return `${parentType} ${int(1, 9)}`;
  if (f === "description") return "Give $10, get $10 when your friend signs up";
  if (f === "status") return "ACTIVE";
  if (f.includes("phone")) return "+1 604-555-0134";
  if (f.includes("postalcode")) return "V6B 1A1";
  if (f.includes("city")) return "Vancouver";
  if (f.includes("state") || f.includes("region")) return "BC";
  if (f.includes("address")) return "123 Main St";
  if (f.includes("message") || f.includes("error")) return "";
  return `Example ${fieldName}`;
}

const lowerKeys = (o: Record<string, string>) => {
  const out: Record<string, string> = {};
  for (const k of Object.keys(o)) out[k.toLowerCase()] = o[k];
  return out;
};

/**
 * A generator for scalar fields whose realistic value depends on the field's
 * name. The store doesn't tell scalar mocks which field they're for, so these
 * are attached to each object type in `fieldMocks`.
 */
function fieldValue(
  scalar: string,
  fieldName: string,
  parentType: string,
  nullable: boolean
): (() => unknown) | undefined {
  const f = fieldName.toLowerCase();
  switch (scalar) {
    case "String":
      return () =>
        // Views treat any reason code as "unavailable"; the API sends none for available items.
        nullable && /reasoncode$/.test(f) ? null : stringFor(fieldName, parentType);
    case "Boolean":
      if (/^(is)?enabled$|^valid$|^success$|^available$|^connected$/.test(f)) return () => true;
      if (/hold|error|fraud/.test(f)) return () => false;
      return undefined;
    case "Float":
      // Taxes and fees stay below the smallest amount, so "after tax" is always positive.
      if (/vat|tax|fee/.test(f)) return () => int(100, 1500) / 100;
      return undefined;
    case "Long":
      if (f.startsWith("date")) return () => CANNED_NOW - int(1, 90) * DAY;
      return undefined;
  }
  return undefined;
}

/** Scalars get values that match how the real API serializes them. */
const scalarMocks: Mocks = {
  String: () => "Example",
  ID: () => hexId(),
  Boolean: () => random() < 0.5,
  Int: () => int(1, 25),
  Float: () => int(2000, 40000) / 100,
  Long: () => int(1, 25),
  RSDate: () => CANNED_NOW - int(1, 90) * DAY,
  RSCountryCode: () => "US",
  RSCurrencyCode: () => "USD",
  RSLanguageCode: () => "en",
  RSLocale: () => "en_US",
  RSTimeZoneId: () => "America/Vancouver",
  RSJsonNode: () => ({}),
  RSShallowMap: () => ({}),
  JsonSchema: () => ({ type: "object", properties: {} }),
  JsonPointer: () => "/",
  JSONata: () => "true",
  GraphQLQueryString: () => "{ viewer { ... on User { id } } }",
  DateTimeFormatPattern: () => "yyyy-MM-dd",
  IsoDuration: () => "P1M",
  IsoInterval: () => "2026-09-01T00:00:00Z/2026-10-01T00:00:00Z",
  RSRelativeTimeframe: () => "P1Y",
  JobType: () => "EXPORT",
  PredefinedRewardType: () => "CREDIT",
  RewardUnitSettingsId: () => "CASH/USD",
  SegmentKey: () => "vip",
  SegmentOperation: () => "ADD",
  TranslatableAssetId: () => "asset",
  TranslationInstanceId: () => "default",
  WebhookType: () => "user.created",
  WebhookTypeOperation: () => "SUBSCRIBE",
  WidgetType: () => "p/referral-program/w/referrerWidget",
};

const objectTypes = (schema: GraphQLSchema) =>
  Object.values(schema.getTypeMap()).filter(
    (type): type is GraphQLObjectType => isObjectType(type) && !type.name.startsWith("__")
  );

/** Field-name-aware scalar values for every object type, generated lazily per field. */
function fieldMocks(schema: GraphQLSchema): Mocks {
  const mocks: Mocks = {};
  for (const type of objectTypes(schema)) {
    const values: Record<string, () => unknown> = {};
    for (const field of Object.values(type.getFields())) {
      const scalar = getNullableType(field.type);
      if (!isScalarType(scalar)) continue;
      const value = fieldValue(scalar.name, field.name, type.name, !isNonNullType(field.type));
      if (value) values[field.name] = value;
    }
    if (Object.keys(values).length) mocks[type.name] = () => ({ ...values });
  }
  return mocks;
}

/**
 * Object types that look like a person get one consistent persona, so a row's
 * name, email, code and share link agree with each other. These are plain
 * values, not functions, so the store saves them together with the first field
 * it generates.
 */
function personMocks(schema: GraphQLSchema): Mocks {
  const mocks: Mocks = {};
  for (const type of objectTypes(schema)) {
    const fields = type.getFields();
    if (!("firstName" in fields) && !("email" in fields)) continue;
    const stringFields = Object.keys(fields).filter(
      (name) => getNullableType(fields[name].type).toString() === "String"
    );
    mocks[type.name] = () => {
      const p = persona();
      const out: Record<string, string> = {};
      for (const k of stringFields) if (k in p) out[k] = p[k];
      return out;
    };
  }
  return mocks;
}

/** Paginated `*List` types: `{ data, totalCount, count }`, keyed by type name. */
function listTypes(schema: GraphQLSchema): Map<string, GraphQLObjectType> {
  const lists = new Map<string, GraphQLObjectType>();
  for (const type of objectTypes(schema)) {
    const data = type.getFields().data;
    if (data && isListType(getNullableType(data.type))) lists.set(type.name, type);
  }
  return lists;
}

/** 6–12 items: more than one page for tables showing 4 or 5 per page. */
const listTotal = (typeName: string) => 6 + (fnv1a(typeName) % 7);

/**
 * Paginated `*List` types page through a collection whose size depends only on
 * the type, so `totalCount` stays the same on every page.
 */
function listMocks(schema: GraphQLSchema): Mocks {
  const mocks: Mocks = {};
  for (const [name, type] of listTypes(schema)) {
    if (!("totalCount" in type.getFields())) continue;
    const total = listTotal(name);
    mocks[name] = () => ({ totalCount: total });
  }
  return mocks;
}

/**
 * The store doesn't give type mocks the arguments of the field that returned
 * them, so fields returning a `*List` slice it here with `offset`/`limit`, like
 * the API does. Data or counts set by a mock take priority.
 */
export function paginationResolvers(schema: GraphQLSchema, mocks: Mocks) {
  return (store: IMockStore) => {
    const lists = listTypes(schema);
    const resolvers: Record<string, Record<string, GraphQLFieldResolver<unknown, unknown>>> = {};
    const isRoot = (type: GraphQLObjectType) =>
      [schema.getQueryType(), schema.getMutationType(), schema.getSubscriptionType()].includes(type);

    for (const type of objectTypes(schema)) {
      for (const field of Object.values(type.getFields())) {
        const list = lists.get(getNullableType(field.type).toString());
        if (!list) continue;
        const listFields = list.getFields();
        const total = listTotal(list.name);

        (resolvers[type.name] ??= {})[field.name] = (source, args, context, info) => {
          if (!isRef(source) && !isRoot(type)) {
            return defaultFieldResolver(source, args, context, info);
          }
          const ref = store.get({
            typeName: type.name,
            key: isRef(source) ? source.$ref.key : "ROOT",
            fieldName: field.name,
            fieldArgs: args,
          });
          if (!isRef(ref)) return ref;

          const offset = typeof args.offset === "number" ? Math.max(0, args.offset) : 0;
          const limit = typeof args.limit === "number" ? args.limit : total;
          const rows = Math.max(0, Math.min(limit, total - offset));
          const mocked = (mocks[list.name]?.() ?? {}) as Record<string, unknown>;
          const set = (fieldName: string, value: unknown) =>
            store.set({ typeName: list.name, key: ref.$ref.key, fieldName, value, noOverride: true });
          // The store generates each undefined item, as it does for an unmocked list.
          if (!("data" in mocked)) set("data", Array.from({ length: rows }));
          if ("count" in listFields && !("count" in mocked)) set("count", rows);
          return ref;
        };
      }
    }
    return resolvers;
  };
}

/**
 * Interfaces the stories are written against get the implementation the real
 * API returns for a logged-in widget user, rather than a random one.
 */
const abstractMocks: Mocks = {
  Viewer: () => ({ __typename: "User" }),
  WidgetConfig: () => ({ __typename: "ProgramWidgetConfig" }),
};

/** The user an auth mutation signs in when its input has no email, e.g. Google login. */
const CANNED_AUTH_EMAIL = "jane@example.com";

/**
 * Login and registration hooks decode the returned token to set the user
 * identity, so every mutation returning a session gets a token for the email it
 * was given. Derived from the input rather than generated: nothing random
 * reaches a token.
 */
function authMocks(schema: GraphQLSchema): Mocks {
  const fields = Object.values(schema.getMutationType()?.getFields() ?? {}).filter(
    (field) => getNamedType(field.type).name === "ManagedIdentityAuthenticationResult"
  );
  if (!fields.length) return {};
  const session = (email: string) => ({
    email,
    token: fakeJwt({ user: { id: email, accountId: email, email } }),
  });
  const mutations: Record<string, unknown> = {};
  for (const field of fields) {
    mutations[field.name] = (args: Record<string, { email?: unknown }>) => {
      const email = Object.values(args ?? {})
        .map((input) => input?.email)
        .find((value): value is string => typeof value === "string");
      return session(email ?? CANNED_AUTH_EMAIL);
    };
  }
  return {
    ManagedIdentityAuthenticationResult: () => session(CANNED_AUTH_EMAIL),
    Mutation: () => mutations,
  };
}

/** Responses whose shape the calling hook relies on, not just their types. */
const responseMocks: Mocks = {
  Mutation: () => ({
    // Saving a user returns what was saved, as the API does.
    upsertUser: ({ userInput }: { userInput: Record<string, unknown> }) => {
      const saved: Record<string, unknown> = {};
      for (const key of Object.keys(userInput)) {
        const value = userInput[key];
        if (value === null || typeof value !== "object") saved[key] = value;
      }
      return saved;
    },
  }),
};

export function defaultMocks(schema: GraphQLSchema): Mocks {
  return mergeMocks(
    {
      ...scalarMocks,
      ...mergeMocks(mergeMocks(fieldMocks(schema), personMocks(schema)), listMocks(schema)),
      ...abstractMocks,
      ...authMocks(schema),
    },
    responseMocks
  );
}

/** Story mocks are merged over the defaults for the same type. */
export function mergeMocks(base: Mocks, overrides: Mocks = {}): Mocks {
  const merged: Mocks = { ...base };
  for (const [typeName, override] of Object.entries(overrides)) {
    const fallback = base[typeName];
    merged[typeName] = fallback
      ? (args?: any) => {
          const a = fallback(args);
          const b = override(args);
          return isPlainObject(a) && isPlainObject(b) ? { ...a, ...b } : b;
        }
      : override;
  }
  return merged;
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v) && !isMockList(v);

