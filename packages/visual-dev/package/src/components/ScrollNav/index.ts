import { ScrollNavView, ScrollNavItemView } from "./ScrollNav";

const ScrollNavNamespace = Object.assign(ScrollNavView, {
  ItemView: ScrollNavItemView,
});
export { ScrollNavNamespace as ScrollNavView };
