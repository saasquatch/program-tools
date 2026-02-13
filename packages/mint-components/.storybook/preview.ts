import { defineCustomElements } from "../dist/loader";

// Register all Stencil custom elements
defineCustomElements();

export const parameters = {
  controls: { expanded: true },
};
