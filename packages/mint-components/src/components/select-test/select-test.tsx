import { Component, h, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";

/**
 *
 * @uiName Big Stat
 * @slot the description of the component
 */
@Component({
  tag: "select-test",
  styleUrl: "select-test.scss",
  shadow: true,
})
export class SelectTest {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <sl-select>
        <sl-menu-item value="option-1">Option 1</sl-menu-item>
        <sl-menu-item value="option-2">Option 2</sl-menu-item>
        <sl-menu-divider></sl-menu-divider>
        <sl-menu-item value="option-4">Option 4</sl-menu-item>
        <sl-menu-item value="option-5">Option 5</sl-menu-item>
      </sl-select>
    );
  }
}
