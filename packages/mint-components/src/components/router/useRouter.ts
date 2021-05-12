import { useCurrentPage, useHost } from "@saasquatch/component-boilerplate";
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

  const host = useHost();
  const [slot, setSlot] = useState<HTMLElement>(undefined);
  const [container, setContainer] = useState<HTMLDivElement>(undefined);

  const page = location.pathname;

  // convert sqm-routes into templates
  useEffect(() => {
    const routes = host.querySelectorAll<HTMLElement & Route>(`sqm-route`);
    const routesArray = Array.from(routes);
    routesArray.forEach((route) => {
      const newTemplate = document.createElement("template");
      newTemplate.setAttribute("path", route.path);
      newTemplate.innerHTML = route.innerHTML;
      route.parentNode.appendChild(newTemplate);
      route.parentNode.removeChild(route);
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
      //@ts-ignore
      const path = template.attributes?.path?.nodeValue;
      if (matchPath(path, page)?.length) return template;
    });

    //@ts-ignore - can't access template attributes directly
    const templatePath = template?.attributes?.path?.nodeValue;

    debug({
      containerDatasetPage: container.dataset.page,
      templatePath,
      page,
    });
    // if no routes found, and the old route doesn't match the new route
    if (!template) {
      // No matching page, display nothing
      debug("No matching page found for ", page, ", so render nothing");
      container.innerHTML = "";
      container.dataset.page = page;
      return;
    }

    debug("Page updated to ", page, template);

    // if pathToRegexp results truthy or page is an exact match
    if (!!matchPath(templatePath, container.dataset.page)) {
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
