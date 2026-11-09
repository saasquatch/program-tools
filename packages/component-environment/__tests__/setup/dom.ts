import { JSDOM } from "jsdom";
const dom = new JSDOM("", { url: "https://app.example.com/" });
(globalThis as any).window = dom.window;
(globalThis as any).document = dom.window.document;
(globalThis as any).Event = dom.window.Event;
