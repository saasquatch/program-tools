import { renderWidget } from "./renderWidget";
import "./style.css";

const prefix = "micro-testing";
const defaults = {
  tenantAlias: undefined,
  mintSource:
    "https://fast-staging.ssqt.io/npm/@saasquatch/mint-components@latest/dist/mint-components/mint-components.esm.min.js",
  bedrockSource:
    "https://fast.ssqt.io/npm/@saasquatch/bedrock-components@latest/dist/bedrock-components/bedrock-components.esm.min.js",
} as Record<string, any>;

const localStorage = window.localStorage;

let routerScript: HTMLScriptElement | null = null;

function get(key: string) {
  const value = localStorage.getItem(`${prefix}:${key}`);
  return value && value !== "undefined" ? value : undefined;
}
function set(key: string, value: string) {
  return localStorage.setItem(`${prefix}:${key}`, value);
}

export function sync() {
  return {
    tenantAlias: get("tenantAlias") || defaults["tenantAlias"],
    mintSource: get("mintSource") || defaults["mintSource"],
    bedrockSource: get("bedrockSource") || defaults["bedrockSource"],
  };
}

function setupForm() {
  const current = sync();

  const form = document.querySelector("form#setupForm")!;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    for (const f of formData.entries()) {
      set(f[0], f[1] as string);
    }

    window.location.reload();
  });

  const mintScript = document.createElement("script");
  mintScript.type = "module";
  mintScript.src = current.mintSource;

  const bedrockScript = document.createElement("script");
  bedrockScript.type = "module";
  bedrockScript.src = current.bedrockSource;

  if (mintScript.src) document.head.appendChild(mintScript);
  if (bedrockScript.src) document.head.appendChild(bedrockScript);

  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    if (!get(input.name))
      input.value = current[input.name as keyof typeof current] || "";
    else input.value = get(input.name)!;
  });
}

function showMicrosite() {
  wipeWidget();

  const { tenantAlias } = sync();
  // @ts-expect-error
  window.SquatchPortal = {
    tenantAlias: tenantAlias,
    appDomain: "https://staging.referralsaasquatch.com",
  } as any;

  const routerSrc =
    "https://staging.referralsaasquatch.com/npm/@saasquatch/microsite-router@next/dist/bundle.js";

  if (!routerScript) {
    routerScript = document.createElement("script");
    routerScript.src = routerSrc;
    routerScript.type = "module";
    document.body.appendChild(routerScript);
  }

  setTimeout(() => {
    // Force load event
    dispatchEvent(new Event("load"));
  }, 1000);
}

function wipeWidget() {
  const frame = document.body.querySelector("iframe#squatchFrame");
  frame?.remove();
}

function wipeMicrosite() {
  // @ts-expect-error
  window.SquatchPortal = null;
  // @ts-expect-error
  delete window.SquatchPortal;

  if (routerScript) {
    document.body.removeChild(routerScript);
    routerScript = null;
  }
  const micrositeBase = document.getElementById("microsite-base");
  micrositeBase?.remove();
}

function showWidget() {
  wipeMicrosite();

  renderWidget({
    programId: "35203",
    widgetType: "p/35203/w/websiteReferralWidget",
  });
}

function registerBtns() {
  const hideBtn = document.querySelector("#hideBtn")!;
  const showBtn = document.querySelector("#showBtn")!;
  const setup = document.querySelector("div#formWrapper")!;

  hideBtn.addEventListener("click", () => {
    setup.className = "hide";
    showBtn.className = "show";
  });
  showBtn.addEventListener("click", () => {
    setup.className = "show";
    showBtn.className = "hide";
  });
}

function registerModeBtns() {
  const micrositeBtn = document.querySelector("#micrositeBtn")!;
  const widgetBtn = document.querySelector("#widgetBtn")!;

  micrositeBtn.addEventListener("click", () => {
    micrositeBtn.className = "active";
    widgetBtn.className = "";

    showMicrosite();
  });
  widgetBtn.addEventListener("click", () => {
    micrositeBtn.className = "";
    widgetBtn.className = "active";

    showWidget();
  });
}

setupForm();
registerBtns();
registerModeBtns();
