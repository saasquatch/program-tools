interface Window {
  SquatchPortal: {
    appDomain: string;
    tenantAlias: string;
  };
}

interface RenderMicrositePageResponse {
  renderMicrositePage: {
    micrositePageConfig: {
      urlPath: string;
      values: {
        title: string;
        html: string;
      };
    };
    micrositeLayoutConfigs: {
      key: string;
      values: {
        html: string;
      };
    }[];
  };
}

const query = `
  query RenderMicrositePage($urlPath: String!) {
    renderMicrositePage(urlPath: $urlPath) {
      micrositePageConfig {
        urlPath
        values
      }
      micrositeLayoutConfigs {
        key
        values
      }
    }
  }
`;

const pageCache: Record<string, RenderMicrositePageResponse> = {};

type LayoutPath = { key: string; element: HTMLElement }[];
let lastRenderedLayoutPath: LayoutPath = [];

async function fetchPage(urlPath: string) {
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
          query,
          variables: { urlPath },
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
    pageCache[urlPath] = response;
    return response;
  } catch (e: any) {
    // TODO: Handle missing page, backend should probably return a 404 page
    document.body.innerHTML = `<h1>404</h1><code><pre>${e.message}</pre></code>`;
    throw e;
  }
}

async function render(pathname: string) {
  console.log("RENDER", pathname);

  const page = await fetchPage(pathname);

  const layoutPath: LayoutPath = [];
  let parentElement = document.body;

  // Remove the last rendered page content, it's in the innerHTML of the last rendered
  // layout path element
  if (lastRenderedLayoutPath.length > 0) {
    lastRenderedLayoutPath[
      lastRenderedLayoutPath.length - 1
    ].element.innerHTML = "";
  }

  // Apply the layouts in reverse
  let layouts = [...page.renderMicrositePage.micrositeLayoutConfigs].reverse();

  layouts.forEach((layout, i) => {
    if (lastRenderedLayoutPath[i]?.key === layout.key) {
      // If this is the same layout in the same position as last time, we can reuse the element
      console.log(" - Reusing element for layout", layout.key);
      parentElement = lastRenderedLayoutPath[i].element;
      layoutPath.push({ key: layout.key, element: parentElement });
    } else {
      // Otherwise we have to remove everything from i onwards
      lastRenderedLayoutPath.splice(i).forEach((layout) => {
        console.log(" - Removing element for layout", layout.key);
        layout.element.remove();
      });

      // Create a new element with display: contents
      const element = document.createElement("div");
      element.style.display = "contents";
      element.id = layout.key;

      // Attach a shadow root and set the layout
      element.attachShadow({ mode: "open" });
      element.shadowRoot!.innerHTML = layout.values.html;

      // Append to the parent
      parentElement.appendChild(element);
      parentElement = element;

      // Record the layout path
      layoutPath.push({ key: layout.key, element });

      console.log(" - Created element for layout", layout.key);
    }
  });

  // Finally, the innerHTML of the last element gets set to the page's html
  parentElement.innerHTML =
    page.renderMicrositePage.micrositePageConfig.values.html;
  document.title = page.renderMicrositePage.micrositePageConfig.values.title;

  lastRenderedLayoutPath = layoutPath;
}

function main() {
  function wrapHistoryFunction(functionName: string) {
    const orig = (window.history as any)[functionName];
    return function (...args: any[]) {
      const returnValue = orig.apply(window.history, args);
      const event = new Event(functionName);
      window.dispatchEvent(event);
      return returnValue;
    };
  }

  history.pushState = wrapHistoryFunction("pushState");
  history.replaceState = wrapHistoryFunction("replaceState");

  window.addEventListener("popstate", () => render(window.location.pathname));
  window.addEventListener("pushState", () => render(window.location.pathname));
  window.addEventListener("replaceState", () =>
    render(window.location.pathname)
  );

  window.history.replaceState(undefined, "", "");
}

window.addEventListener("load", main);
