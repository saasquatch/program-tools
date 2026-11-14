import { getUserIdentity } from "./contexts/UserIdentityContext.ts";
import { debug as _debug } from "./debug.ts";
import { getAppDomain, getTenantAlias } from "./environment.ts";
import { LOCALE_CONTEXT_NAME } from "./types.ts";

const debug = (...args: any[]) => _debug(LOCALE_CONTEXT_NAME, ...args);

const GET_LOCALE = `
  query {
    viewer {
      ... on User {
        locale
      }
    }
  }
`;

interface GetLocaleResponse {
  data: {
    viewer: {
      locale: string | null;
    };
  };
}

function isGetLocaleResponse(value: unknown): value is GetLocaleResponse {
  if (typeof value !== "object" || value === null || !("data" in value)) {
    return false;
  }
  const { data } = value;
  if (typeof data !== "object" || data === null || !("viewer" in data)) {
    return false;
  }
  const { viewer } = data;
  return (
    typeof viewer === "object" &&
    viewer !== null &&
    "locale" in viewer &&
    (typeof viewer.locale === "string" || viewer.locale === null)
  );
}

export async function fetchLocale(): Promise<string | undefined> {
  debug("Fetching locale from GraphQL for current user");

  try {
    const result = await fetch(
      `${getAppDomain()}/api/v1/${getTenantAlias()}/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUserIdentity()?.jwt}`,
        },
        body: JSON.stringify({
          query: GET_LOCALE,
        }),
      },
    );

    if (!result.ok) {
      throw new Error("Failed to fetch locale");
    }

    const json: unknown = await result.json();
    if (
      typeof json === "object" &&
      json !== null &&
      "errors" in json &&
      json.errors
    ) {
      throw new Error(JSON.stringify(json.errors, null, 2));
    }

    return isGetLocaleResponse(json)
      ? json.data.viewer.locale || undefined
      : undefined;
  } catch (e) {
    debug(
      `Failed to fetch locale for current user`,
      e instanceof Error ? e.message : e,
    );
    return undefined;
  }
}
