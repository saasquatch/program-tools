import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { AccountDetailsView } from "./sqp-account-details-view";
import { DetailsCardView } from "./sqp-details-card-view";
import { ScheduleCardView } from "./sqp-schedule-card-view";
import { usePayPalDetails } from "./usePaypalDetails";

/**
 * @undocumented
 */
@Component({
  tag: "sqp-account-stuff",
  shadow: true,
})
export class PaypalAccountDetails {
  @State()
  ignored = true;

  /**
   * @undocumented
   */
  @Prop() hasAccount: boolean;

  /**
   * @undocumented
   */
  @Prop() setOpen: (open: boolean) => void;

  /**
   * @undocumented
   */
  @Prop() loading: boolean;

  /**
   * @undocumented
   */
  @Prop() overviewContent: any;

  /**
   * @undocumented
   */
  @Prop() integrationDisabled: boolean;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const componentProps = getProps(this);
    const props = usePayPalDetails();

    console.log({ componentProps });

    return (
      <Host>
        <AccountDetailsView
          loading={componentProps.loading}
          hasAccount={componentProps.hasAccount}
          overviewContent={{
            ...componentProps.overviewContent,
            detailsContent: <DetailsCardView {...props.detailsProps} />,
            ScheduleContent: props.ScheduleContent,
          }}
          setOpen={componentProps.setOpen}
          integrationDisabled={componentProps.integrationDisabled}
        ></AccountDetailsView>
      </Host>
    );
  }
}
