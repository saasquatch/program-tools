import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { PortalContainerView } from "./sqm-portal-container-view";
import { getProps } from "../../utils/utils";
import { Spacing } from "../../global/mixins";

/**
 * @uiName Container
 * @slots [{"name":"", "title":"Widget Content"}]
 * @exampleGroup Layout
 * @example Row Layout Container - <sqm-portal-container direction="row" padding="none" gap="xxx-large" display="flex" max-width="100%"><p>Add your row content!</p></sqm-portal-container>
 * @example Column Layout Container - <sqm-portal-container direction="column" padding="none" gap="xxx-large" display="grid" max-width="100%"><p>Add your column content!</p></sqm-portal-container>
 */
@Component({
  tag: "sqm-portal-container",
  shadow: true,
})
export class PortalContainer {
  @State()
  ignored = true;
  /**
   * @uiName Direction
   * @uiType string
   * @uiEnum ["row", "column"]
   * @uiEnumNames ["Row", "Column"]
   */
  @Prop() direction: "row" | "column" = "column";
  /**
   * @uiName Padding
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() padding: Spacing;
  /**
   * @uiName Gap
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() gap: Spacing = "xxx-large";

  /** @uiName Minimum Width */
  @Prop() minWidth?: string;

  /**
   * @uiName Display
   * @uiType string
   * @uiEnum ["grid", "flex"]
   * @uiEnumNames ["Grid", "Flex"]
   */
  @Prop() display: "grid" | "flex" = "grid";

  /**
   * Define how this container distributes its contents along the main-axis.
   *
   * @uiName Justify Content
   * @uiType string
   * @uiEnum ["start", "center", "end", "space-between", "space-around", "space-evenly"]
   * @uiEnumNames ["Start", "Center", "End", "Space Between", "Space Around", "Space Evenly"]
   */
  @Prop() justifyContent?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly";

  /**
   * @uiName Maximum width
   */
  @Prop() maxWidth?: string = "100%";

  /**
   * @uiName Center Content
   */
  @Prop() center?: boolean;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <PortalContainerView {...getProps(this)}>
        <slot />
      </PortalContainerView>
    );
  }
}
