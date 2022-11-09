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
  tag: "sqp-paypal-details",
  shadow: true,
})
export class PaypalAccountDetails {
  @State()
  ignored = true;

  /**
   * @undocumented
   */
  @Prop() loading: boolean;
  /**
   * @undocumented
   */
  @Prop() setOpen: (open: boolean) => void;
  /**
   * @undocumented
   */
  @Prop() hasAccount: boolean;
  /**
   * @undocumented
   */
  @Prop() integrationDisabled: boolean;
  /**
   * @undocumented
   */
  @Prop() detailsHeaderText: string;
  /**
   * @undocumented
   */
  @Prop() scheduleHeaderText: string;
  /**
   * @undocumented
   */
  @Prop() editText: string;
  /**
   * @undocumented
   */
  @Prop() integrationAlertHeader: string;
  /**
   * @undocumented
   */
  @Prop() integrationAlertText: string;
  /**
   * @undocumented
   */
  @Prop() payPalAccountHeaderText: string;
  /**
   * @undocumented
   */
  @Prop() connectPayPalDescriptionText: string;
  /**
   * @undocumented
   */
  @Prop() connectPayPalAccountButtonText: string;
  /**
   * @undocumented
   */
  @Prop() nextPayoutLabel: string;
  /**
   * @undocumented
   */
  @Prop() upcomingPaymentLabel: string;
  /**
   * @undocumented
   */
  @Prop() otherCurrenciesLabel: string;
  /**
   * @undocumented
   */
  @Prop() w9TaxLabel: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const componentProps = getProps(this);
    const props = usePayPalDetails(componentProps);

    console.log({ componentProps });

    return (
      <Host>
        <AccountDetailsView
          loading={componentProps.loading}
          hasAccount={componentProps.hasAccount}
          detailsSlot={<DetailsCardView {...props.detailsProps} />}
          scheduleSlot={props.ScheduleContent}
          setOpen={componentProps.setOpen}
          integrationDisabled={props.integrationDisabled}
          detailsHeaderText={componentProps.detailsHeaderText}
          scheduleHeaderText={componentProps.scheduleHeaderText}
          editText={componentProps.editText}
          integrationAlertHeader={componentProps.integrationAlertHeader}
          integrationAlertText={componentProps.integrationAlertText}
          payPalAccountHeaderText={componentProps.payPalAccountHeaderText}
          connectPayPalDescriptionText={
            componentProps.connectPayPalDescriptionText
          }
          connectPayPalAccountButtonText={
            componentProps.connectPayPalAccountButtonText
          }
        ></AccountDetailsView>
      </Host>
    );
  }
}
