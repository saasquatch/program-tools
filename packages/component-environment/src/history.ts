import { getEnvironment } from "./environment";
import { debug as _debug } from "./debug";

const debug = (...args: any[]) => _debug("history", ...args);

interface PartialPath {
  pathname: string;
  search?: string;
  hash?: string;
}

export interface HistoryEntry extends PartialPath {
  state?: object;
}

type To = string | PartialPath;

interface ListenableHistory {
  listen(fn: () => void): () => void;
  push(to: To, state?: object): void;
  replace(to: To, state?: object): void;
  back(): void;
  forward(): void;
  go(delta?: number): void;
  location: HistoryEntry;
}

declare global {
  interface Window {
    squatchHistory: ListenableHistory;
  }
}

function normalizeTo(to: To): string | URL {
  if (typeof to === "string") return to;
  const url = new URL(to.pathname, window.origin);
  if (to.search) url.search = to.search;
  if (to.hash) url.hash = to.hash;
  return url;
}

export class BrowserHistory implements ListenableHistory {
  private listeners: Set<() => void> = new Set();

  constructor() {
    window.addEventListener("popstate", this.notify.bind(this));
    window.addEventListener("pushState", this.notify.bind(this));
    window.addEventListener("replaceState", this.notify.bind(this));
  }

  listen(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    debug("notifying listeners of route change", this.location);
    if (this.listeners) {
      this.listeners.forEach((listener) => listener());
    }
  }

  get location() {
    return {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      state: window.history.state,
    };
  }

  back() {
    this.go(-1);
  }

  forward() {
    this.go(1);
  }

  go(delta: number) {
    window.history.go(delta);
  }

  push(to: To, state?: object) {
    const url = normalizeTo(to);
    window.history.pushState(state, "", url);
  }

  replace(to: To, state?: object) {
    const url = normalizeTo(to);
    window.history.replaceState(state, "", url);
  }
}

export class MemoryHistory implements ListenableHistory {
  private history: HistoryEntry[] = [{ pathname: "/", search: "", hash: "" }];
  private index = 0;
  private listeners: Set<() => void> = new Set();

  listen(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private current() {
    return this.history[this.index];
  }

  get state() {
    return this.current().state;
  }

  notify() {
    debug("notifying listeners of route change", this.location);
    this.listeners.forEach((listener) => listener());
  }

  get location() {
    return this.history[this.index];
  }

  back() {
    this.go(-1);
  }

  forward() {
    this.go(1);
  }

  go(delta: number) {
    this.index += delta;
    if (this.index < 0) this.index = 0;
    if (this.index >= this.history.length) this.index = this.history.length - 1;
    this.notify();
  }

  push(to: To, state?: object) {
    let entry: HistoryEntry;
    if (typeof to === "string") {
      entry = {
        pathname: to,
        search: this.history[this.index].search,
        hash: this.history[this.index].hash,
        state,
      };
    } else {
      entry = {
        ...to,
        state,
      };
    }
    this.index++;
    this.history.splice(this.index, this.history.length, entry);
    this.notify();
  }

  replace(to: To, state?: object) {
    if (typeof to === "string") {
      this.history[this.index] = {
        pathname: to,
        search: this.history[this.index].search,
        hash: this.history[this.index].hash,
        state,
      };
    } else {
      this.history[this.index] = {
        ...to,
        state,
      };
    }
    this.notify();
  }
}

function createHistory() {
  if (getEnvironment() === "SquatchPortal") {
    function wrapHistoryFunction(functionName: string) {
      const orig = (window.history as any)[functionName];
      return function (...args: any[]) {
        const returnValue = orig.apply(window.history, args);
        const event = new Event(functionName);
        window.dispatchEvent(event);
        return returnValue;
      };
    }

    window.history.pushState = wrapHistoryFunction("pushState");
    window.history.replaceState = wrapHistoryFunction("replaceState");

    return new BrowserHistory();
  } else {
    return new MemoryHistory();
  }
}

function lazyHistory() {
  window.squatchHistory = window.squatchHistory || createHistory();
  return window.squatchHistory;
}

export class LazyHistory implements ListenableHistory {
  get location() {
    return lazyHistory().location;
  }

  listen(fn: () => void) {
    return lazyHistory().listen(fn);
  }

  back() {
    lazyHistory().back();
  }

  forward() {
    lazyHistory().forward();
  }

  go(delta: number) {
    lazyHistory().go(delta);
  }

  push(to: To, state?: object) {
    lazyHistory().push(to, state);
  }

  replace(to: To, state?: object) {
    lazyHistory().replace(to, state);
  }
}

export default new LazyHistory();
