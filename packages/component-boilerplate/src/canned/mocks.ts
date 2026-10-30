import { MockList } from "@graphql-tools/mock";
import {
  GraphQLObjectType,
  GraphQLResolveInfo,
  GraphQLSchema,
  isListType,
  isNonNullType,
} from "graphql";

export type Mocks = Record<string, (...args: any[]) => unknown>;

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

const fieldInfo = (info?: GraphQLResolveInfo) => ({
  fieldName: info?.fieldName ?? "",
  parentType: info?.parentType?.name ?? "",
});

/** Scalars get values that match how the real API serializes them. */
const scalarMocks: Mocks = {
  String: (_r, _a, _c, info) => {
    const { fieldName, parentType } = fieldInfo(info);
    return stringFor(fieldName, parentType);
  },
  ID: () => hexId(),
  Boolean: (_r, _a, _c, info) => {
    const f = fieldInfo(info).fieldName.toLowerCase();
    if (/^(is)?enabled$|^valid$|^success$|^available$|^connected$/.test(f)) {
      return true;
    }
    if (/hold|error|fraud/.test(f)) return false;
    return random() < 0.5;
  },
  Int: () => int(1, 25),
  Float: (_r, _a, _c, info) => {
    const f = fieldInfo(info).fieldName.toLowerCase();
    // Taxes and fees stay a small fraction of amounts, so "after tax" is positive.
    if (/vat|tax|fee/.test(f)) return int(100, 2500) / 100;
    return int(2000, 40000) / 100;
  },
  Long: (_r, _a, _c, info) => {
    const f = fieldInfo(info).fieldName.toLowerCase();
    if (f.startsWith("date")) return CANNED_NOW - int(1, 90) * DAY;
    return int(1, 25);
  },
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

/**
 * Object types that look like a person get one consistent persona, so a row's
 * name, email, code and share link agree with each other.
 */
function personMocks(schema: GraphQLSchema): Mocks {
  const mocks: Mocks = {};
  for (const type of Object.values(schema.getTypeMap())) {
    if (!(type instanceof GraphQLObjectType) || type.name.startsWith("__")) {
      continue;
    }
    const fields = type.getFields();
    if (!("firstName" in fields) && !("email" in fields)) continue;
    mocks[type.name] = () => {
      const p = persona();
      const out: Record<string, string> = {};
      for (const k of Object.keys(p)) if (k in fields) out[k] = p[k];
      return out;
    };
  }
  return mocks;
}

/**
 * Paginated `*List` types (`{ data, totalCount, count }`) return a few rows
 * whose count agrees with `totalCount`, honouring a `limit` argument.
 */
function listMocks(schema: GraphQLSchema): Mocks {
  const mocks: Mocks = {};
  for (const type of Object.values(schema.getTypeMap())) {
    if (!(type instanceof GraphQLObjectType)) continue;
    const fields = type.getFields();
    const data = fields.data;
    if (!data || !isListType(isNonNullType(data.type) ? data.type.ofType : data.type)) {
      continue;
    }
    mocks[type.name] = (_root, args) => {
      const limit = typeof args?.limit === "number" ? args.limit : 5;
      const rows = Math.min(limit, int(3, 5));
      const result: Record<string, unknown> = { data: () => new MockList(rows) };
      if ("totalCount" in fields) result.totalCount = rows;
      if ("count" in fields) result.count = rows;
      return result;
    };
  }
  return mocks;
}

/**
 * Interfaces the stories are written against get the implementation the real
 * API returns for a logged-in widget user, rather than a random one.
 */
const abstractMocks: Mocks = {
  Viewer: () => ({ __typename: "User" }),
  WidgetConfig: () => ({ __typename: "ProgramWidgetConfig" }),
};

export function defaultMocks(schema: GraphQLSchema): Mocks {
  return {
    ...scalarMocks,
    ...personMocks(schema),
    ...listMocks(schema),
    ...abstractMocks,
  };
}

/** Story mocks are merged over the defaults for the same type. */
export function mergeMocks(base: Mocks, overrides: Mocks = {}): Mocks {
  const merged: Mocks = { ...base };
  for (const [typeName, override] of Object.entries(overrides)) {
    const fallback = base[typeName];
    merged[typeName] = fallback
      ? (...args: any[]) => {
          const a = fallback(...args);
          const b = override(...args);
          return isPlainObject(a) && isPlainObject(b) ? { ...a, ...b } : b;
        }
      : override;
  }
  return merged;
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v) && !(v instanceof MockList);

