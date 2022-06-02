type AllowedUsers = "PUBLIC" | "VERIFIED" | "UNVERIFIED";

type PageConfig = {
  urlPath: string;
  values: {
    title: string;
    html: string;
  };
  allowedUsers: AllowedUsers;
  disallowedUrlPath?: string;
};

type LayoutConfig = {
  key: string;
  values: {
    html: string;
  };
};

interface RenderMicrositePageResponse {
  renderMicrositePage: {
    micrositePageConfig: PageConfig;
    micrositeLayoutConfigs: LayoutConfig[];
  };
}

export type FetchPageResult = { page: PageConfig; layouts: LayoutConfig[] };

const RENDER_MICROSITE_PAGE_QUERY = `
  query RenderMicrositePage($urlPath: String!, $locale: RSLocale) {
    renderMicrositePage(urlPath: $urlPath, locale: $locale) {
      micrositePageConfig {
        urlPath
        values
        allowedUsers
        disallowedUrlPath
      }
      micrositeLayoutConfigs {
        key
        values
      }
    }
  }
`;

const pageCache: Record<string, FetchPageResult> = {};

export async function fetchPage(
  urlPath: string,
  locale?: string
): Promise<FetchPageResult> {
  if (pageCache[urlPath]) {
    console.log("Avoiding GraphQL call in lieu of cache for ", urlPath);
    return pageCache[urlPath];
  }

  try {
    const result = await fetch(
      `${window.SquatchPortal.appDomain}/api/v1/${window.SquatchPortal.tenantAlias}/graphql`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operationName: "RenderMicrositePage",
          query: RENDER_MICROSITE_PAGE_QUERY,
          variables: { urlPath, locale },
        }),
      }
    );

    if (!result.ok) {
      throw new Error("something bad happened");
    }

    const json = await result.json();
    if (json.errors) {
      throw new Error(JSON.stringify(json.errors, null, 2));
    }

    const response = json.data as RenderMicrositePageResponse;
    const pageResult = {
      page: response.renderMicrositePage.micrositePageConfig,
      layouts: response.renderMicrositePage.micrositeLayoutConfigs,
    };
    pageCache[urlPath] = pageResult;

    return pageResult;
  } catch (e: any) {
    // TODO: Handle missing page, backend should probably return a 404 page
    document.body.innerHTML = `<h1>404</h1><code><pre>${e.message}</pre></code>`;
    throw e;
  }
}
