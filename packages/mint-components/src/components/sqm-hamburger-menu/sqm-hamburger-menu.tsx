import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, State } from "@stencil/core";
import { HamburgerMenuView } from "./sqm-hamburger-menu-view";

/**
 *
 * @uiName Hamburger menu
 * @slot the navigation items shown in menu
 */
@Component({
  tag: "sqm-hamburger-menu",
  shadow: true,
})
export class HamburgerMenu {
  @State()
  ignored = true;

  disconnectedCallback() {}

  render() {
    const itemsSlot = <slot />;
    return <HamburgerMenuView {...itemsSlot} />;
  }
}
