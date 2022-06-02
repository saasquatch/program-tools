import { route } from "./router";

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

  window.addEventListener("popstate", () => route(window.location.pathname));
  window.addEventListener("pushState", () => route(window.location.pathname));
  window.addEventListener("replaceState", () =>
    route(window.location.pathname)
  );

  window.history.replaceState(undefined, "", "");
}

window.addEventListener("load", main);
