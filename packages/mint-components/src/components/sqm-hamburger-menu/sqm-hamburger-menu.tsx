import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
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

  @Prop() position?: string = "right";

  disconnectedCallback() {}

  render() {
    const props = getProps(this);

    return (
      <HamburgerMenuView {...props}>
        <slot />
      </HamburgerMenuView>
    );
  }
}
