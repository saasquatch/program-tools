import { useCurrentPage } from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { pathToRegexp } from "path-to-regexp";
import debugFn from "debug";
const debug = debugFn("sq:useRouter");

type Route = {
  path: string;
};

function matchPath(pattern: string, page: string) {
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
    const template = slot.querySelector<HTMLTemplateElement & Route>(
      `template[path="${page}"]`
    );

    const routes = slot.querySelectorAll<HTMLElement & Route>(`sqm-route`);
    const routesArray = Array.from(routes);

    const route = routesArray.find((route) => {
      if (matchPath(route.path, page)?.length) return route;
    });

    // const route = slot.querySelector<HTMLElement>(`sqm-route[path="${page}"]`);

    debug({ routes, page, route, container });
    if (!route && !template) {
      // No matching page, display nothing
      debug("No matching page found for ", page, " so displaying nothing");
      container.innerHTML = "";
      container.dataset.page = page;
      return;
    }

    debug("Page updated to ", page, template, route);

    let previousPath, currentPath;

    if (route) {
      previousPath = !!matchPath(route?.path, container.dataset.page);
      currentPath = !!matchPath(route?.path, page);
    }

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
      container.innerHTML = route.innerHTML;
      debug("route container innerHTML:", container.innerHTML);
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
