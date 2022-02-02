import { h } from "@stencil/core";
import { GenericTableView } from "../../tables/GenericTableView";
import {
  DateCell,
  RewardsCellCreditCancelled,
  RewardsCellCreditFull,
  RewardsCellCreditLong,
  RewardsCellCreditPartial,
  RewardsCellCreditRedeemed,
  SourceCellDeletedUser,
  SourceCellManual,
  SourceCellReferral,
  SourceCellReferred,
  StatusCellAvailable,
  StatusCellAvailableExpiry,
  StatusCellCancelled,
  StatusCellRedeemed,
} from "./RewardsTableCell.stories";

export default {
  title: "Components/Rewards Table",
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
  <div slot="empty" style={{ display: "contents" }}>
    <sqm-table-row>
      <sqm-table-cell colspan={5} style={{ textAlign: "center" }}>
        <sqm-portal-container padding="xxxx-large" gap="medium">
          <sqm-image
            image-url={
              "https://res.cloudinary.com/saasquatch/image/upload/v1642618031/squatch-assets/image_4_1.png"
            }
            max-width="100px"
          ></sqm-image>
          <sqm-titled-section label-margin="xxx-small" text-align="center">
            <sqm-text slot="label">
              <h3>View your rewards</h3>
            </sqm-text>
            <sqm-text slot="content">
              See all the rewards you have earned from referring friends and
              completing tasks
            </sqm-text>
          </sqm-titled-section>
        </sqm-portal-container>
      </sqm-table-cell>
    </sqm-table-row>
  </div>
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

export const RewardsTable = () => {
  return (
    <GenericTableView
      {...rewardsTableProps([r_available, r_redeemed, r_cancelled, r_expired])}
    ></GenericTableView>
  );
};

export const RewardsTableSingle = () => {
  return (
    <GenericTableView {...rewardsTableProps([r_available])}></GenericTableView>
  );
};

export const RewardsTableLong = () => {
  return (
    <GenericTableView
      {...rewardsTableProps([r_redeemed, r_long])}
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
