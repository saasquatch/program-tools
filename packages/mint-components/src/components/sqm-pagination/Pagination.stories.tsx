import { h } from "@stencil/core";
import { PaginationView } from "./sqm-pagination-view";

export default {
  title: "Components/Link Button",
};

const defaultProps = {
  link: "https://example.com",
  openInNewTab: false,
  buttonText: "Button Text",
};

export const Default = () => {
  return <sqm-pagination></sqm-pagination>;
};
