import { FetchPageResult } from "./pages";

type LayoutPath = { key: string; element: HTMLElement }[];

let lastRenderedLayoutPath: LayoutPath = [];

export function render(pageResult: FetchPageResult) {
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
  let layouts = [...pageResult.layouts].reverse();

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
      element.shadowRoot!.innerHTML = layout.values.html;

      // Append to the parent
      parentElement.appendChild(element);
      parentElement = element;

      // Record the layout path
      layoutPath.push({ key: layout.key, element });

      console.log(" - Created element for layout", layout.key);
    }
  });

  // Finally, the innerHTML of the last element gets set to the page's html
  parentElement.innerHTML = pageResult.page.values.html;

  // Update the document title
  document.title = pageResult.page.values.title;

  // TODO: Update meta tags for things like description

  lastRenderedLayoutPath = layoutPath;
}
