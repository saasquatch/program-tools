interface Window {
  SquatchPortal: {
    appDomain: string;
    tenantAlias: string;
  };
}

interface Layout {
  key: string;
  html: string;
}

interface Page {
  html: string;
  layouts: Layout[];
}

const rootLayout = {
  key: "root",
  html: `
  <div style="width: 100%; background-color: teal; padding: 12px;">
    <button onClick="window.history.pushState(undefined, '', '/');">
      Index
    </button>
    <button onClick="window.history.pushState(undefined, '', '/route1');">
      Route1
    </button>
    <button onClick="window.history.pushState(undefined, '', '/route2');">
      Route2
    </button>
    <button onClick="window.history.pushState(undefined, '', '/route3');">
      Route3
    </button>
    <button onClick="window.history.pushState(undefined, '', '/different');">
      Different Hierarchy
    </button>
  </div>
  <div style="width: 100%; background-color: pink; padding: 12px; font-size: 16px; font-weight: bold">
    Header
  </div>
  <div style="width: 100%; background-color: beige; padding: 12px; font-size: 16px; font-weight: bold">
    <slot></slot>
  </div>
  <div style="width: 100%; background-color: cornflowerblue; padding: 12px; font-size: 16px; font-weight: bold">
    Footer
  </div>
`,
};

const innerLayout = {
  key: "inner",
  html: `
  <div style="width: 75%; background-color: peachpuff; padding: 25px; position: relative">
    <span style="position: absolute; top: 0; left: 0; text-transform: uppercase; font-size: 10px; color: #999">inner layout</span>
    <slot></slot>
  </div>
`,
};

const anotherLayout = {
  key: "another",
  html: `
  <div style="width: 50%; background-color: mediumspringgreen; padding: 25px; position: relative">
    <span style="position: absolute; top: 0; left: 0; text-transform: uppercase; font-size: 10px; color: #999">another layout</span>
    <slot></slot>
  </div>
`,
};

const differentHierarchy1 = {
  key: "diff1",
  html: `
    <button onClick="window.history.pushState(undefined, '', '/');">
      Back
    </button>
  <div style="width: 100%; background-color: mediumspringgreen; padding: 25px; position: relative">
    <span style="position: absolute; top: 0; left: 0; text-transform: uppercase; font-size: 10px; color: #999">different hierarchy 1</span>
    <slot></slot>
  </div>
  `,
};

const differentHierarchy2 = {
  key: "diff2",
  html: `
  <div style="width: 80%; background-color: pink; padding: 25px; position: relative">
    <span style="position: absolute; top: 0; left: 0; text-transform: uppercase; font-size: 10px; color: #999">different hierarchy 2</span>
    <slot></slot>
  </div>
  `,
};

const differentHierarchy3 = {
  key: "diff3",
  html: `
  <div style="width: 80%; background-color: teal; padding: 25px; position: relative">
    <span style="position: absolute; top: 0; left: 0; text-transform: uppercase; font-size: 10px; color: #999">different hierarchy 3</span>
    <slot></slot>
  </div>
  `,
};

const differentHierarchy4 = {
  key: "diff4",
  html: `
  <div style="width: 80%; background-color: salmon; padding: 25px; position: relative">
    <span style="position: absolute; top: 0; left: 0; text-transform: uppercase; font-size: 10px; color: #999">different hierarchy 4</span>
    <slot></slot>
  </div>
  `,
};

const pages: Record<string, Page> = {
  "/": {
    html: `
      <div style="width: 100%; padding: 25px; position: relative; background-color: whitesmoke">
        <span style="position: absolute; top: 0; left: 0; text-transform: uppercase; font-size: 10px; color: #999">page</span>
        I am the root page.
      </div>
    `,
    layouts: [innerLayout, rootLayout],
  },
  "/route1": {
    html: `
      <div style="width: 100%; padding: 25px; position: relative; background-color: whitesmoke">
        <span style="position: absolute; top: 0; left: 0; text-transform: uppercase; font-size: 10px; color: #999">page</span>
        I am the <span style="color: red">/route1</span> page.
      </div>
    `,
    layouts: [innerLayout, rootLayout],
  },
  "/route2": {
    html: `
      <div style="width: 100%; padding: 25px; position: relative; background-color: whitesmoke">
        <span style="position: absolute; top: 0; left: 0; text-transform: uppercase; font-size: 10px; color: #999">page</span>
        I am the <span style="color: blue">/route2</span> page.
      </div>
    `,
    layouts: [innerLayout, rootLayout],
  },
  "/route3": {
    html: `
      <div style="width: 100%; padding: 25px; position: relative; background-color: whitesmoke">
        <span style="position: absolute; top: 0; left: 0; text-transform: uppercase; font-size: 10px; color: #999">page</span>
        And one more for good measure, with another layout.
      </div>
    `,
    layouts: [anotherLayout, innerLayout, rootLayout],
  },
  "/different": {
    html: `
      <div style="width: 100%; padding: 25px; position: relative; background-color: whitesmoke">
        <span style="position: absolute; top: 0; left: 0; text-transform: uppercase; font-size: 10px; color: #999">page</span>
        A totally different layout hierarchy
      </div>
    `,
    layouts: [
      differentHierarchy4,
      differentHierarchy3,
      differentHierarchy2,
      differentHierarchy1,
    ],
  },
};

type LayoutPath = { key: string; element: HTMLElement }[];
let lastRenderedLayoutPath: LayoutPath = [];

async function render(pathname: string) {
  console.log("RENDER", pathname);

  // TODO: Here is where we fetch the page from GraphQL and get given all the layouts
  const page = pages[pathname];

  const layoutPath: LayoutPath = [];
  let parentElement = document.body;

  // Remove the last rendered page content, it's in the innerHTML of the last rendered
  // layout path element
  if (lastRenderedLayoutPath.length > 0) {
    lastRenderedLayoutPath[
      lastRenderedLayoutPath.length - 1
    ].element.innerHTML = "";
  }

  // Apply the layouts in reverse
  let layouts = [...page.layouts].reverse();

  layouts.forEach((layout, i) => {
    if (lastRenderedLayoutPath[i]?.key === layout.key) {
      // If this is the same layout in the same position as last time, we can reuse the element
      console.log(" - Reusing element for layout", layout.key);
      parentElement = lastRenderedLayoutPath[i].element;
      layoutPath.push({ key: layout.key, element: parentElement });
    } else {
      // Otherwise we have to remove everything from i onwards
      lastRenderedLayoutPath.splice(i).forEach((layout) => {
        console.log(" - Removing element for layout", layout.key);
        layout.element.remove();
      });

      // Create a new element with display: contents
      const element = document.createElement("div");
      element.style.display = "contents";
      element.id = layout.key;

      // Attach a shadow root and set the layout
      element.attachShadow({ mode: "open" });
      element.shadowRoot!.innerHTML = layout.html;

      // Append to the parent
      parentElement.appendChild(element);
      parentElement = element;

      // Record the layout path
      layoutPath.push({ key: layout.key, element });

      console.log(" - Created element for layout", layout.key);
    }
  });

  // Finally, the innerHTML of the last element gets set to the page's html
  parentElement.innerHTML = page.html;

  lastRenderedLayoutPath = layoutPath;
}

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

  window.addEventListener("popstate", () => render(window.location.pathname));
  window.addEventListener("pushState", () => render(window.location.pathname));
  window.addEventListener("replaceState", () =>
    render(window.location.pathname)
  );

  window.history.replaceState(undefined, "", "");
}

window.addEventListener("load", main);
