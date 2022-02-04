import { h } from "@stencil/core";
import { GenericTableView } from "../../tables/GenericTableView";
import {
  DateCell,
  RewardsCellCreditCancelled,
  RewardsCellCreditFull,
  RewardsCellCreditLong,
  RewardsCellCreditPartial,
  RewardsCellCreditRedeemed,
  RewardsCellFueltank,
  RewardsCellFueltankLong,
  SourceCellDeletedUser,
  SourceCellManual,
  SourceCellReferral,
  SourceCellReferred,
  StatusCellAvailable,
  StatusCellAvailableExpiry,
  StatusCellCancelled,
  StatusCellPending,
  StatusCellPendingUnhandled,
  StatusCellRedeemed,
} from "./RewardsTableCell.stories";
import scenario from "./rewards-table.feature";

export default {
  title: "Components/Rewards Table",
  parameters: {
    scenario,
  },
};

const loadingElement = (
  <div slot="loading" style={{ display: "contents" }}>
    <sqm-table-row>
      <sqm-table-cell colspan={5}>
        <sl-skeleton></sl-skeleton>
      </sqm-table-cell>
    </sqm-table-row>
    <sqm-table-row>
      <sqm-table-cell colspan={5}>
        <sl-skeleton></sl-skeleton>
      </sqm-table-cell>
    </sqm-table-row>
    <sqm-table-row>
      <sqm-table-cell colspan={5}>
        <sl-skeleton></sl-skeleton>
      </sqm-table-cell>
    </sqm-table-row>
    <sqm-table-row>
      <sqm-table-cell colspan={5}>
        <sl-skeleton></sl-skeleton>
      </sqm-table-cell>
    </sqm-table-row>
    <sqm-table-row>
      <sqm-table-cell colspan={5}>
        <sl-skeleton></sl-skeleton>
      </sqm-table-cell>
    </sqm-table-row>
  </div>
);

const emptyElement = (
  <sqm-empty
    slot="empty"
    empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000224/squatch-assets/empty_rewards.png"
    empty-state-header="View your rewards"
    empty-state-text="See all the rewards you have earned from referring friends and completing tasks"
  ></sqm-empty>
);

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
    mdBreakpoint: 899,
    smBreakpoint: 599,
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },

  elements: {
    columns: ["Rewards", "Status", "Source", "Date received"],
    rows: rows,
    emptyElement: emptyElement,
    loadingElement: loadingElement,
  },
});

const r_available = [
  <RewardsCellCreditFull />,
  <StatusCellAvailable />,
  <SourceCellReferral />,
  <DateCell />,
];

const r_expired = [
  <RewardsCellCreditPartial />,
  <StatusCellAvailableExpiry />,
  <SourceCellReferred />,
  <DateCell />,
];

const r_cancelled = [
  <RewardsCellCreditCancelled />,
  <StatusCellCancelled />,
  <SourceCellDeletedUser />,
  <DateCell />,
];

const r_redeemed = [
  <RewardsCellCreditRedeemed />,
  <StatusCellRedeemed />,
  <SourceCellManual />,
  <DateCell />,
];

const r_long = [
  <RewardsCellCreditLong />,
  <StatusCellAvailableExpiry />,
  <SourceCellReferred />,
  <DateCell />,
];

const r_fueltank = [
  <RewardsCellFueltank />,
  <StatusCellPending />,
  <SourceCellManual />,
  <DateCell />,
];

const r_fueltank_long = [
  <RewardsCellFueltankLong />,
  <StatusCellPendingUnhandled />,
  <SourceCellManual />,
  <DateCell />,
];

export const RewardsTable = () => {
  return (
    <GenericTableView
      {...rewardsTableProps([r_available, r_redeemed, r_cancelled, r_expired])}
    ></GenericTableView>
  );
};

export const RewardsTableSingle = () => {
  return (
    <GenericTableView {...rewardsTableProps([r_fueltank])}></GenericTableView>
  );
};

export const RewardsTableLong = () => {
  return (
    <GenericTableView
      {...rewardsTableProps([r_fueltank_long, r_long])}
    ></GenericTableView>
  );
};

export const RewardsTableEmpty = () => {
  return <GenericTableView {...rewardsTableProps([], true)}></GenericTableView>;
};

export const RewardsTableLoading = () => {
  return (
    <GenericTableView
      {...rewardsTableProps([], false, true)}
    ></GenericTableView>
  );
};

export const CustomButtonTextTable = () => {
  return (
    <GenericTableView
      {...rewardsTableProps(
        [r_available, r_redeemed, r_cancelled, r_expired],
        false,
        false,
        "CUSTOM PREVIOUS TEXT",
        "CUSTOM NEXT TEXT"
      )}
    ></GenericTableView>
  );
};

export const ColumnsMobileHidden = () => {
  return (
    <GenericTableView
      {...rewardsTableProps(
        [r_available, r_redeemed, r_cancelled, r_expired],
        false,
        false,
        undefined,
        undefined,
        "0,1,2,3"
      )}
    ></GenericTableView>
  );
};
