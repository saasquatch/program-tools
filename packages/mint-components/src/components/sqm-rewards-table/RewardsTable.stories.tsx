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
              "https://res.cloudinary.com/saasquatch/image/upload/v1642618031/squatch-assets/image_3_1.png"
            }
            max-width="100px"
          ></sqm-image>
          <sqm-titled-section label-margin="xxx-small" text-align="center">
            <sqm-text slot="label">
              <h3>View your referral details</h3>
            </sqm-text>
            <sqm-text slot="content">
              Track the status of your referrals and rewards earned by referring
              friends
            </sqm-text>
          </sqm-titled-section>
        </sqm-portal-container>
      </sqm-table-cell>
    </sqm-table-row>
  </div>
);

const rewardsTablePropsEmpty = {
  states: {
    hasPrev: false,
    hasNext: true,
    show: "empty" as const,
    namespace: "sqm-referral-table",
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: "Prev",
      moreLabel: "Next",
    },
    hiddenColumns: "",
    mdBreakpoint: 899,
    smBreakpoint: 599,
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },

  elements: {
    columns: ["Rewards", "Status", "Source", "Date received"],
    rows: [],
    emptyElement: emptyElement,
  },
};

const rewardsTablePropsLoading = {
  states: {
    hasPrev: false,
    hasNext: true,
    show: "loading" as const,
    namespace: "sqm-referral-table",
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: "Prev",
      moreLabel: "Next",
    },
    hiddenColumns: "",
    mdBreakpoint: 899,
    smBreakpoint: 599,
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },

  elements: {
    columns: ["Rewards", "Status", "Source", "Date received"],
    rows: [],
    loadingElement: loadingElement,
  },
};

const rewardsTableProps = {
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
      moreLabel: "Next",
    },
    hiddenColumns: "",
    mdBreakpoint: 899,
    smBreakpoint: 599,
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },

  elements: {
    columns: ["Rewards", "Status", "Source", "Date received"],
    rows: [
      [
        <RewardsCellCreditFull />,
        <StatusCellAvailable />,
        <SourceCellReferral />,
        <DateCell />,
      ],
      [
        <RewardsCellCreditCancelled />,
        <StatusCellCancelled />,
        <SourceCellDeletedUser />,
        <DateCell />,
      ],
      [
        <RewardsCellCreditRedeemed />,
        <StatusCellRedeemed />,
        <SourceCellManual />,
        <DateCell />,
      ],
      [
        <RewardsCellCreditPartial />,
        <StatusCellAvailableExpiry />,
        <SourceCellReferred />,
        <DateCell />,
      ],
      [
        <RewardsCellCreditLong />,
        <StatusCellAvailableExpiry />,
        <SourceCellReferred />,
        <DateCell />,
      ],
    ],
  },
};
export const RewardsTableFull = () => {
  return <GenericTableView {...rewardsTableProps}></GenericTableView>;
};

export const RewardsTableEmpty = () => {
  return <GenericTableView {...rewardsTablePropsEmpty}></GenericTableView>;
};

export const RewardsTableLoading = () => {
  return <GenericTableView {...rewardsTablePropsLoading}></GenericTableView>;
};
