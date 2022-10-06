import { GrapesJSModel } from "@saasquatch/stencil-grapes-plugin";

export const ShoelaceComponents: GrapesJSModel[] = [
  {
    tag: "sl-details",
    name: "Details",
    traits: [
      {
        type: "string",
        name: "summary",
        title: "Label",
      },
    ],
  },
  {
    tag: "sl-tab",
    name: "Tab",
    traits: [
      {
        type: "string",
        name: "panel",
        title: "Panel ID",
      },
    ],
  },
  {
    tag: "sl-tab-panel",
    name: "Tab Panel",
    traits: [
      {
        type: "string",
        name: "name",
        title: "Panel ID",
      },
    ],
  },
  {
    tag: "sl-tab-group",
    name: "Tab Group",
    traits: [
      {
        type: "string",
        name: "placement",
        title: "Placement of Tabs",
        enum: ["top", "right", "bottom", "left"],
      },
    ],
  },
  {
    tag: "sl-skeleton",
    name: "Loading Skeleton",
    traits: [],
  },
];
