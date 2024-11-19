import { isDemo } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import { CopyTextView, CopyTextViewProps } from "../views/copy-text-view";
import { useReferralCodes } from "./useReferralCodes";

/**
 * @uiName Referral Codes
 * @exampleGroup Sharing
 * @example Referral Code - <sqm-referral-codes></sqm-referral-code>
 */
@Component({
  tag: "sqm-referral-codes",
  shadow: true,
})
export class ReferralCodes {
  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<CopyTextViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const thisProps = getProps(this);
    const props = isDemo()
      ? useDemoReferralCodes(thisProps)
      : useReferralCodes(thisProps);
    return (
      <div>
        referral codes here
        <div>
          <sl-button>prev</sl-button>
          <sl-button>next</sl-button>
        </div>
      </div>
    );
  }
}

function useDemoReferralCodes(props: ReferralCodes): CopyTextViewProps {
  const [currentPage, setCurrentPage] = useState(0);

  return deepmerge(
    {
      data: {
        referralData: [],
      },
      states: {
        loading: false,
        currentPage,
      },
      callbacks: {
        onPrev: () => setCurrentPage(currentPage - 1),
        onNext: () => setCurrentPage(currentPage + 1),
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
