import { Component, h, Host, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import deepmerge from "deepmerge";
import { useProgramMenu } from "./useProgramMenu";
import { getProps } from "../../utils/utils";

/**
 * @uiName Portal Frame
 */
@Component({
  tag: "sqm-program-menu",
  styleUrl: "sqm-program-menu.scss",
  shadow: true,
})
export class ProgramMenu {
  @State()
  ignored = true;

  /**
   * @uiName Include dropdown menu
   */
  @Prop() includeDropdown: boolean;
  /**
   * @uiName Label on the header menu
   */
  @Prop() menuLabel: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { data, ref } = useProgramMenu(getProps(this));
    // const props = isDemo()
    //   ? useProgramMenuDemo(getProps(this))
    //   : useProgramMenu(getProps(this));
    return (
      <Host>
        <sl-select value={data.programId} ref={(r) => (ref.current = r)}>
          <slot />
        </sl-select>
      </Host>
    );
  }
}
