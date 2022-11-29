import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DateTime } from "luxon";
import { DemoData } from "../../global/demo";
import { intl } from "../../global/global";
import { getProps } from "../../utils/utils";
import {
  AccountDetailsView,
  AccountDetailsViewProps,
} from "./sqp-account-details-view";
import { DetailsCardView, DetailsCardViewProps } from "./sqp-details-card-view";
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
  @Prop() integrationPaused: boolean;
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
  @Prop() integrationDisabledHeader: string;
  /**
   * @undocumented
   */
  @Prop() integrationDisabledText: string;
  /**
   * @undocumented
   */
  @Prop() integrationPausedHeader: string;
  /**
   * @undocumented
   */
  @Prop() integrationPausedText: string;
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
  @Prop() pendingLabel: string;
  /**
   * @undocumented
   */
  @Prop() pendingDetailedStatusText: string;
  /**
   * @undocumented
   */
  @Prop() otherCurrenciesLabel: string;
  /**
   * @undocumented
   */
  @Prop() w9TaxLabel: string;
  /**
   * @undocumented
   */
  @Prop() additionalW9Text: string;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<AccountDetailsViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const componentProps = getProps(this);

    const props = isDemo()
      ? usePayPalDetailsDemo(componentProps)
      : usePayPalDetails(componentProps);

    return (
      <Host>
        <AccountDetailsView
          loading={componentProps.loading}
          hasAccount={componentProps.hasAccount}
          detailsSlot={<DetailsCardView {...props.detailsProps} />}
          scheduleSlot={props.ScheduleContent}
          setOpen={componentProps.setOpen}
          integrationDisabled={props.integrationDisabled}
          integrationPaused={props.integrationPaused!}
          detailsHeaderText={componentProps.detailsHeaderText}
          scheduleHeaderText={componentProps.scheduleHeaderText}
          editText={componentProps.editText}
          integrationDisabledHeader={componentProps.integrationDisabledHeader}
          integrationDisabledText={componentProps.integrationDisabledText}
          integrationPausedHeader={componentProps.integrationPausedHeader}
          integrationPausedText={componentProps.integrationPausedText}
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

function usePayPalDetailsDemo(props: PaypalAccountDetails) {
  const mainCurrency = {
    currencyText: "USD",
    amountText: "$25.00",
    value: 2500,
  };
  const otherCurrencies = [
    {
      currencyText: "CAD",
      amountText: "CA$20.00",
      value: 2000,
    },
    {
      currencyText: "EUR",
      amountText: "€15.00",
      value: 1500,
    },
  ];
  const detailsProps: DetailsCardViewProps = {
    loading: false,
    mainCurrency,
    status: "next payout",
    pendingStatusBadgeText: props.pendingLabel,
    upcomingStatusBadgeText: props.upcomingPaymentLabel,
    nextPayoutStatusBadgeText: props.nextPayoutLabel,
    pendingDetailedStatusText: props.pendingDetailedStatusText,
    nextPayoutDetailedStatusText: DateTime.now().toFormat("LLL dd, yyyy"),
    upcomingDetailedStatusText: DateTime.now()
      .plus({ day: 1 })
      .toFormat("LLL dd, yyyy"),
    otherCurrenciesText: intl.formatMessage(
      {
        id: "otherCurrencies",
        defaultMessage: props.otherCurrenciesLabel,
      },
      {
        amount: otherCurrencies?.length,
      }
    ),
    otherCurrencies: otherCurrencies?.length ? otherCurrencies : false,
    w9PendingText: props.w9TaxLabel,
    w9Pending: undefined,
    empty: false,
  };

  const buckets = [0, 1, 2];

  const upcomingContent =
    buckets?.map((bucket, i) => {
      const otherCurrencies = [
        {
          currencyText: "CAD",
          amountText: "CA$20.00",
          value: 2000,
        },
        {
          currencyText: "EUR",
          amountText: "€15.00",
          value: 1500,
        },
      ];

      const viewProps = {
        active: i === 0,
        otherCurrencies: true,
        loading: false,
        status: "upcoming" as "upcoming",
        statusText: DateTime.now()
          .plus({ day: bucket })
          .toFormat("LLL dd, yyyy"),
        otherCurrenciesText: intl.formatMessage(
          {
            id: "otherCurrencies",
            defaultMessage: props.otherCurrenciesLabel,
          },
          {
            amount: bucket === 2 ? 1 : otherCurrencies?.length,
          }
        ),
        mainCurrency,
        setActivePayout: () => {},
        w9Pending: undefined,
        hasDatePending: false,
        hasW9Pending: false,
        empty: false,
        additionalW9Text: props.additionalW9Text,
      };
      return <ScheduleCardView {...viewProps} />;
    }) || [];

  const pendingProps = {
    active: false,
    loading: false,
    status: "pending" as "pending",
    statusText: props.pendingLabel,
    pendingStatusBadgeText: props.pendingLabel,
    upcomingStatusBadgeText: props.upcomingPaymentLabel,
    nextPayoutStatusBadgeText: props.nextPayoutLabel,
    pendingDetailedStatusText: props.pendingDetailedStatusText,
    upcomingDetailedStatusText: "",
    nextPayoutDetailedStatusText: "",
    otherCurrencies: false,
    otherCurrenciesText: "",
    mainCurrency,
    setActivePayout: () => {},
    w9PendingText: props.w9TaxLabel,
    w9Pending: undefined,
    hasDatePending: true,
    hasW9Pending: false,
    empty: false,
    additionalW9Text: props.additionalW9Text,
  };
  const pendingContent = <ScheduleCardView {...pendingProps} />;

  return deepmerge(
    {
      detailsProps,
      detailsHeaderText: props.detailsHeaderText,
      scheduleHeaderText: props.scheduleHeaderText,
      otherCurrenciesLabel: props.otherCurrenciesLabel,
      w9TaxLabel: props.w9TaxLabel,
      pendingDetailedStatusText: props.pendingDetailedStatusText,
      upcomingPaymentLabel: props.upcomingPaymentLabel,
      nextPayoutLabel: props.nextPayoutLabel,
      pendingLabel: props.pendingLabel,
      ScheduleContent: [upcomingContent, pendingContent],
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
