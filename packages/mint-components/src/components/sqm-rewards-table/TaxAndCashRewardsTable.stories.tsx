import { h } from "@stencil/core";
import { GenericTableView } from "../../tables/GenericTableView";
import { SourceCellReferral, DateCell } from "./RewardsTableCell.stories";
import {
  StatusCellPayoutSent,
  StatusCellPayoutFailed,
  StatusCellPendingNewTaxForm,
  StatusCellPendingPartnerCreation,
  StatusCellPendingTaxReview,
  StatusCellPendingTaxSubmission,
  StatusCellPayoutProcessing,
  CashReward,
  StatusCellPendingW9,
  StatusCellPayoutCancelled,
} from "./TaxAndCashRewardsTableCell.stories";

export default {
  title: "Components/Tax And Cash Rewards Table",
};

const rewardsTableProps = (
  rows,
  empty = false,
  loading = false,
  prev = "Prev",
  next = "Next",
  hidden = ""
) => ({
  states: {
    hasPrev: false,
    hasNext: true,
    show: empty
      ? ("empty" as const)
      : loading
      ? ("loading" as const)
      : ("rows" as const),
    namespace: "sqm-rewards-table",
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: prev,
      moreLabel: next,
    },
    hiddenColumns: hidden,
    mdBreakpoint: 799,
    smBreakpoint: 599,
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },

  elements: {
    columns: ["Rewards", "Status", "Source", "Date received"],
    rows: rows,
  },
});

/* -------------------------------------------------------------------------- */
/* PENDING ROWS                                */
/* -------------------------------------------------------------------------- */

const r_pending_new_tax_form = [
  <CashReward />,
  <StatusCellPendingNewTaxForm />,
  <SourceCellReferral />,
  <DateCell />,
];

const r_pending_tax_submission = [
  <CashReward />,
  <StatusCellPendingTaxSubmission />,
  <SourceCellReferral />,
  <DateCell />,
];

const r_pending_tax_review = [
  <CashReward />,
  <StatusCellPendingTaxReview />,
  <SourceCellReferral />,
  <DateCell />,
];

const r_pending_partner_creation = [
  <CashReward />,
  <StatusCellPendingPartnerCreation />,
  <SourceCellReferral />,
  <DateCell />,
];

const r_pending_w9 = [
  <CashReward />,
  <StatusCellPendingW9 />,
  <SourceCellReferral />,
  <DateCell />,
];

/* -------------------------------------------------------------------------- */
/* SUCCESS / PROCESSING ROWS                                                  */
/* -------------------------------------------------------------------------- */

const r_payout_sent = [
  <CashReward />,
  <StatusCellPayoutSent />,
  <SourceCellReferral />,
  <DateCell />,
];

const r_payout_processing = [
  <CashReward />,
  <StatusCellPayoutProcessing />,
  <SourceCellReferral />,
  <DateCell />,
];

/* -------------------------------------------------------------------------- */
/* ERROR / CANCELLED ROWS                                                     */
/* -------------------------------------------------------------------------- */

const r_payout_failed = [
  <CashReward />,
  <StatusCellPayoutFailed />,
  <SourceCellReferral />,
  <DateCell />,
];

const r_payout_cancelled = [
  <CashReward />,
  <StatusCellPayoutCancelled />,
  <SourceCellReferral />,
  <DateCell />,
];

export const RewardsTable = () => {
  return (
    <GenericTableView
      {...rewardsTableProps([
        r_pending_new_tax_form,
        r_pending_tax_submission,
        r_pending_tax_review,
        r_pending_partner_creation,
        r_pending_w9,
        r_payout_sent,
        r_payout_processing,
        r_payout_failed,
        r_payout_cancelled,
      ])}
    ></GenericTableView>
  );
};
