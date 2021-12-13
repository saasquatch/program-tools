import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import {
  ProgramExplainerStepView,
  ProgramExplainerStepViewProps,
} from "./sqm-program-explainer-step-view";

/**
 * @uiName Navigation Link
 */
@Component({
  tag: "sqm-program-explainer-step",
  shadow: true,
})
export class ProgramExplainerStep {
  /**
   * @uiName Navigation path
   */
  @Prop() path: string;
  /**
   * @uiName Icon
   */
  @Prop() icon: string;
  /**
   * @uiName Label
   */
  @Prop() label: string;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<ProgramExplainerStepViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = useSidebarDemo(getProps(this));
    return <ProgramExplainerStepView {...props} />;
  }
}

function useSidebarDemo(
  props: ProgramExplainerStep
): ProgramExplainerStepViewProps {
  return deepmerge(
    {
      states: {
        active: false,
      },
      data: {
        label: props.label || "Dashboard",
        icon: props.icon || "house",
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
