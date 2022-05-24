import { r as registerInstance, h as h$1, j as Host } from './index-832bd454.js';
import { d as browser, m as useState, i as useEffect, n as h } from './stencil-hooks.module-f4b05383.js';
import { l as ln, P } from './index.module-b74a7f69.js';
import { p as pathToRegexp } from './index-eccbb333.js';
import './extends-c31f1eff.js';

const debug = browser("sq:useRouter");
function matchPath(pattern, page) {
  if (!pattern)
    return;
  const regexp = pathToRegexp(pattern);
  return regexp.exec(page);
}
function useRouter() {
  const location = ln();
  const host = P();
  const [slot, setSlot] = useState(undefined);
  const [container, setContainer] = useState(undefined);
  const page = location.pathname;
  // convert sqm-routes into templates
  useEffect(() => {
    const routes = host.querySelectorAll(`sqm-route`);
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
    var _a, _b;
    if (!container || !slot) {
      debug("DOM not ready for navigation rendering on:", page);
      return;
    }
    // <template>
    const templates = slot.querySelectorAll(`template`);
    const templatesArray = Array.from(templates);
    const template = templatesArray.find((template) => {
      var _a, _b, _c;
      //@ts-ignore
      const path = (_b = (_a = template.attributes) === null || _a === void 0 ? void 0 : _a.path) === null || _b === void 0 ? void 0 : _b.nodeValue;
      if ((_c = matchPath(path, page)) === null || _c === void 0 ? void 0 : _c.length)
        return template;
    });
    //@ts-ignore - can't access template attributes directly
    const templatePath = (_b = (_a = template === null || template === void 0 ? void 0 : template.attributes) === null || _a === void 0 ? void 0 : _a.path) === null || _b === void 0 ? void 0 : _b.nodeValue;
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
    }
    else if (template) {
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

const sqmRouterCss = "sqm-router{display:contents}";

let SqmRouter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const { callbacks } = useRouter();
    return (h$1(Host, null, h$1("div", { ref: callbacks.setSlot, style: { display: "none" } }, h$1("slot", null)), h$1("div", { style: { display: "contents" }, ref: callbacks.setContainer })));
  }
};
SqmRouter.style = sqmRouterCss;

export { SqmRouter as sqm_router };
