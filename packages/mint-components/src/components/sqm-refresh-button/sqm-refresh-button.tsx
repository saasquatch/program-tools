import {
  isDemo,
  useRefreshDispatcher,
} from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { RefreshButtonView, RefreshButtonViewProps } from "./RefreshButtonView";

/**
 * @uiName Refresh Button
 */
@Component({
  tag: "sqm-refresh-button",
  shadow: true,
})
export class RefreshButton {
  /**
   * @uiName Icon to show in the slot
   */
  @Prop() icon?: string = "arrow-clockwise";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const thisProps = getProps(this);
    const props = isDemo()
      ? useDemoRefereshButton(thisProps)
      : useRefreshButton(thisProps);
    return (
      <RefreshButtonView {...props}>
        <slot />
      </RefreshButtonView>
    );
  }
}

function useDemoRefereshButton({
  icon,
}: RefreshButton): RefreshButtonViewProps {
  return {
    onClick: () => {},
    icon,
  };
}

function useRefreshButton({ icon }: RefreshButton): RefreshButtonViewProps {
  const { refresh } = useRefreshDispatcher();

  return {
    disabled: false,
    hide: false,
    onClick: refresh,
    icon,
  };
}
