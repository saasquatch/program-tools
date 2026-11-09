import { JSDOM } from "jsdom";
const dom = new JSDOM("", { url: "https://app.example.com/" });
Object.defineProperties(globalThis, {
  window: {
    value: dom.window,
    writable: true,
    configurable: true,
    enumerable: true,
  },
  document: {
    value: dom.window.document,
    writable: true,
    configurable: true,
    enumerable: true,
  },
  Event: {
    value: dom.window.Event,
    writable: true,
    configurable: true,
    enumerable: true,
  },
});
