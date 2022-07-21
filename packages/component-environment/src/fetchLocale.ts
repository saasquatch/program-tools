import { getAppDomain, getTenantAlias } from "./environment";
import { getUserIdentity } from "./contexts/UserIdentityContext";
import { LOCALE_CONTEXT_NAME } from "./types";
import { debug as _debug } from "./debug";

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
      }
    );

    if (!result.ok) {
      throw new Error("Failed to fetch locale");
    }

    const json = await result.json();
    if (json.errors) {
      throw new Error(JSON.stringify(json.errors, null, 2));
    }

    return (json as GetLocaleResponse).data.viewer.locale || undefined;
  } catch (e) {
    debug(`Failed to fetch locale for current user`, (e as Error).message);
    return undefined;
  }
}
