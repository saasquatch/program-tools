import { useCurrentPage } from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { pathToRegexp } from "path-to-regexp";
import debugFn from "debug";
const debug = debugFn("sq:useRouter");

export type Route = {
  path: string;
};

function matchPath(pattern: string, page: string) {
  if (!pattern) return;
  const regexp = pathToRegexp(pattern);
  return regexp.exec(page);
}

export function useRouter() {
  const location = useCurrentPage();

  const [slot, setSlot] = useState<HTMLElement>(undefined);
  const [container, setContainer] = useState<HTMLDivElement>(undefined);

  const page = location.pathname;

  // convert sqm-routes into templates
  useEffect(() => {
    const routes = document.querySelectorAll<HTMLElement & Route>(`sqm-route`);
    const routesArray = Array.from(routes);
    routesArray.forEach((route) => {
      const x = document.createElement("template");
      x.setAttribute("path", route.path);
      x.innerHTML = route.innerHTML;
      route.outerHTML = x.outerHTML;
    });
  }, []);

  useEffect(() => {
    if (!container || !slot) {
      debug("DOM not ready for navigation rendering on:", page);
      return;
    }

    // <template>
    const templates = slot.querySelectorAll<HTMLTemplateElement & Route>(
      `template`
    );
    const templatesArray = Array.from(templates);

    const template = templatesArray.find((template) => {
      //@ts-ignore - can't access attributes directly before template is initialized
      const path = template.attributes?.path?.nodeValue;
      if (matchPath(path, page)?.length) return template;
    });

    let previousPath, currentPath;

    if (template) {
      previousPath = !!matchPath(template?.path, container.dataset.page);
      currentPath = !!matchPath(template?.path, page);
    }

    debug({
      previousPath,
      currentPath,
      containerDatasetPage: container.dataset.page,
      page,
    });
    // if no routes found, and the old route doesn't match the new route
    if (
      // !route &&
      !template
    ) {
      // No matching page, display nothing
      debug("No matching page found for ", page, ", so render nothing");
      container.innerHTML = "";
      container.dataset.page = page;
      return;
    }

    debug(
      "Page updated to ",
      page,
      template
    );

    // if pathToRegexp results truthy or page is an exact match
    if ((previousPath && currentPath) || page === container.dataset.page) {
      debug("don't rerender");
      // Same page, do not re-render
      // Reduces dom mutations, speeds up page speed
    } else if (template) {
      container.innerHTML = template.innerHTML;
      container.dataset.page = page;
    }
  }, [slot, container, page]);

  return {
    callbacks: {
      setSlot,
      setContainer,
    },
  };
}
