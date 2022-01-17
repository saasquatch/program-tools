interface Window {
  CDN: {
    init(options: CdnOptions): void;
    get(): string;
  };
}

interface Tag {
  tag: string;
  appendTo?: "body" | "head";
  attrs: Record<string, string>;
}

interface CdnOptions {
  defaultCdn: string;
  cookieName?: string;
  tags?: Tag[];
}

window.CDN = (() => {
  const DEFAULT_COOKIE_NAME = "CDN";

  function isValid(str: any): str is string {
    if (typeof str !== "string" || !str) return false;
    return str.length !== 0 && str.trim().length !== 0;
  }

  function getCookie(name: string) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      name +
      "=" +
      (value || "") +
      expires +
      "; path=/; secure; samesite=strict";
  }

  function appendTags(tags?: Tag[]) {
    if (typeof tags === "undefined") {
      return;
    }
    if (typeof tags !== "object") {
      throw new Error(`Invalid tags object: ${tags}`);
    }
    if (tags.length === 0) return;

    for (let tag of tags) {
      try {
        const el = window.document.createElement(tag.tag);
        if (typeof tag.attrs === "object") {
          for (let attr of Object.keys(tag.attrs)) {
            const value =
              typeof tag.attrs[attr] === "string"
                ? tag.attrs[attr].replace("%cdn%", currentCdn)
                : tag.attrs[attr];
            el.setAttribute(attr, value);
          }
        }
        if (!tag.appendTo || tag.appendTo === "body") {
          window.document.body.appendChild(el);
        } else if (tag.appendTo === "head") {
          window.document.head.appendChild(el);
        }
      } catch (e) {
        throw new Error(`Failed to create tag ${tag}, ${e}`);
      }
    }
  }

  let currentCdn: string;

  return {
    get: () => {
      return currentCdn;
    },
    init: (options: CdnOptions) => {
      const cookieName = options.cookieName || DEFAULT_COOKIE_NAME;

      if (!options.defaultCdn) {
        throw new Error("A defaultCdn must be provided");
      }

      currentCdn = getCookie(cookieName) || options.defaultCdn;

      function appendDiv(pending: boolean) {
        const currentCookieValue = getCookie(cookieName);

        // Don't show when cookie is empty
        if (!isValid(currentCookieValue)) return;

        const style = `
          position: absolute; 
          top:0; 
          right: 0;
          z-index: 999; 
          background: #FFF; 
          border: 1px solid red; 
        `;

        const pendingText = pending ? " (pending)" : "";
        const elem = window.document.createElement("div");
        elem.style.cssText = style;
        elem.innerText = `${cookieName} cookie: ${currentCookieValue}${pendingText}`;
        window.document.body.appendChild(elem);
      }

      try {
        const url = new URL(window.document.location.href);
        let newCdn = url.searchParams.get("cdn");
        let pending = false;

        if (isValid(newCdn)) {
          newCdn = decodeURIComponent(newCdn);
          const currentCookieValue = getCookie(cookieName);

          const wantsToRevert = newCdn === "none";
          const wantsToChange = currentCookieValue !== newCdn;

          if (wantsToRevert && isValid(currentCookieValue)) {
            if (window.confirm("Revert to the default CDN?")) {
              pending = true;
              setCookie(cookieName, "", 30);
            }
          } else if (wantsToChange && !wantsToRevert) {
            if (window.confirm(`Change your CDN to ${newCdn}?`)) {
              pending = true;
              setCookie(cookieName, newCdn, 30);
            }
          }

          if (pending) {
            window.location.reload();
          }
        }

        appendDiv(pending);
        appendTags(options.tags);
      } catch (e) {
        // Ignore errors
        if (console && console.error) {
          console.error("Failed to initialize CDN", e);
        }
      }
    }
  };
})();
