import { Component, h, Host, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useProgramMenu } from "./useProgramMenu";
import { getProps } from "../../utils/utils";

/**
 * @uiName Portal Menu
 */
@Component({
  tag: "sqm-program-menu",
  styleUrl: "sqm-program-menu.scss",
  shadow: false,
})
export class ProgramMenu {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { data, ref } = useProgramMenu(getProps(this));
    return (
      <Host style={{ display: "contents" }}>
        <sl-select
          style={{ paddingBottom: "var(--sl-spacing-large)" }}
          value={data.programId}
          ref={(r) => (ref.current = r)}
        >
          <slot />
        </sl-select>
      </Host>
    );
  }
}
