import { h } from "@stencil/core";
import { GenericTableView } from "../../tables/GenericTableView";
import {
  Converted as ConvertedStatus,
  DateCell,
} from "./ReferralTableCell.stories";
import {
  PayoutApproved,
  PayoutProcessing,
  PayoutFailed,
  PayoutCancelled,
  PendingTaxReview,
  PendingNewTaxForm,
  PendingTaxSubmission,
  PendingPartnerCreation,
  PendingW9,
  CashReward,
} from "./TaxAndCashReferralTableRewardsCell.stories";

export default {
  title: "Components/Tax And Cash Referral Table",
};

const taxAndCashTableProps = {
  states: {
    hasPrev: false,
    hasNext: true,
    show: "rows" as const,
    namespace: "sqm-referral-table",
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: "Prev",
      moreLabel: "View More",
    },
    hiddenColumns: "",
    mdBreakpoint: 799,
    smBreakpoint: 599,
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },

  elements: {
    columns: ["Customer", "Status", "Date converted", "Rewards"],
    rows: [
      [
        <sqm-referral-table-user-cell name="Payout Approved User"></sqm-referral-table-user-cell>,
        <ConvertedStatus />,
        <DateCell />,
        <PayoutApproved />,
      ],

      [
        <sqm-referral-table-user-cell name="Payout Failed User"></sqm-referral-table-user-cell>,
        <ConvertedStatus />,
        <DateCell />,
        <PayoutFailed />,
      ],
      [
        <sqm-referral-table-user-cell name="Payout Cancelled User"></sqm-referral-table-user-cell>,
        <ConvertedStatus />,
        <DateCell />,
        <PayoutCancelled />,
      ],

      [
        <sqm-referral-table-user-cell name="Tax Review User"></sqm-referral-table-user-cell>,
        <ConvertedStatus />,
        <DateCell />,
        <PendingTaxReview />,
      ],
      [
        <sqm-referral-table-user-cell name="Payout Processing User"></sqm-referral-table-user-cell>,
        <ConvertedStatus />,
        <DateCell />,
        <PayoutProcessing />,
      ],
      [
        <sqm-referral-table-user-cell name="New Tax Form User"></sqm-referral-table-user-cell>,
        <ConvertedStatus />,
        <DateCell />,
        <PendingNewTaxForm />,
      ],
      [
        <sqm-referral-table-user-cell name="Tax Submission User"></sqm-referral-table-user-cell>,
        <ConvertedStatus />,
        <DateCell />,
        <PendingTaxSubmission />,
      ],
      [
        <sqm-referral-table-user-cell name="Partner Creation User"></sqm-referral-table-user-cell>,
        <ConvertedStatus />,
        <DateCell />,
        <PendingPartnerCreation />,
      ],
      [
        <sqm-referral-table-user-cell name="Missing W9 User"></sqm-referral-table-user-cell>,
        <ConvertedStatus />,
        <DateCell />,
        <PendingW9 />,
      ],

      [
        <sqm-referral-table-user-cell name="Standard Cash User"></sqm-referral-table-user-cell>,
        <ConvertedStatus />,
        <DateCell />,
        <CashReward />,
      ],
    ],
  },
};

export const TaxAndCashReferralTable = () => {
  return <GenericTableView {...taxAndCashTableProps}></GenericTableView>;
};
