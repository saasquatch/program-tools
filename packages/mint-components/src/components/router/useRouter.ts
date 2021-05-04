import { useCurrentPage } from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { pathToRegexp } from "path-to-regexp";
import debugFn from "debug";
const debug = debugFn("sq:useRouter");

type Route = {
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

    // <sqm-route>
    const routes = slot.querySelectorAll<HTMLElement & Route>(`sqm-route`);
    const routesArray = Array.from(routes);

    const route = routesArray.find((route) => {
      if (matchPath(route.path, page)?.length) return route;
    });

    let previousPath, currentPath;

    if (route) {
      previousPath = !!matchPath(route?.path, container.dataset.page);
      currentPath = !!matchPath(route?.path, page);
    } else if (template) {
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
    if (!route && !template) {
      // No matching page, display nothing
      debug("No matching page found for ", page, ", so only update container");
      // container.innerHTML = "";
      container.dataset.page = page;
      return;
    }

    debug("Page updated to ", page, template, route);

    // if pathToRegexp results truthy or page is an exact match
    if ((previousPath && currentPath) || page === container.dataset.page) {
      debug("don't rerender");
      // Same page, do not re-render
      // Reduces dom mutations, speeds up page speed
    } else if (template) {
      // const element = template.content.cloneNode(true);
      container.innerHTML = template.innerHTML;
      container.dataset.page = page;
      // container.appendChild(element);
    } else if (route) {
      if (container.firstElementChild) {
        route.parentNode.appendChild(container.lastElementChild);
        container.innerHTML = route.outerHTML;
      } else {
        container.appendChild(route);
      }

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
