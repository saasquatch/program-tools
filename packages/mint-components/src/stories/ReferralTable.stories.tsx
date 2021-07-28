import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { ReferralTableView } from "../components/sqm-referral-table/sqm-referral-table-view";
import { PendingWithUnpend } from "./ReferralTableRewardsCell.stories";

export default {
  title: "Referral Table",
};

const emptyElement = (
  <div style={{ width: "100%" }}>
    <sqm-text>
      <h3 style={{ color: "#777777" }}>No Referrals Yet</h3>
    </sqm-text>
  </div>
);
const loadingElement = (
  <div style={{ width: "100%" }}>
    <sl-skeleton style={{ marginBottom: "28px" }}></sl-skeleton>
    <sl-skeleton style={{ marginBottom: "28px" }}></sl-skeleton>
    <sl-skeleton style={{ marginBottom: "28px" }}></sl-skeleton>
    <sl-skeleton style={{ marginBottom: "28px" }}></sl-skeleton>
    <sl-skeleton></sl-skeleton>
  </div>
);

// const style = {
//   FullWidth: {
//     width: "100%",
//   },

//   TextCenter: {
//     "text-align": "center",
//   },
// };

jss.setup(preset());
// const sheet = jss.createStyleSheet(style);
// const styleString = sheet.toString();

// const rewardProps = [{}];

const emptyTableProps = {
  states: {
    hasPrev: false,
    hasNext: false,
    loading: false,
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },
  data: {
    referralData: [],
  },
  elements: {
    emptyElement,
    columns: [<div>Name</div>, <div>Email</div>, <div>DOB</div>],
    rows: [],
  },
};

const simpleUserTableProps = {
  states: {
    hasPrev: false,
    hasNext: true,
    loading: false,
  },
  data: {
    referralData: [],
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },

  elements: {
    columns: [
      <div>Name</div>,
      <div>Email</div>,
      <div>DOB</div>,
      <div>Rewards</div>,
    ],
    rows: [
      [
        <sqm-referral-table-user-cell name="Joe Smith"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="jsmith@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="07/15/1902"></sqm-referral-table-user-cell>,
        <PendingWithUnpend />,
      ],
      [
        <sqm-referral-table-user-cell name="Bob Williams"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="bwill@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="09/05/1999"></sqm-referral-table-user-cell>,
        <PendingWithUnpend />,
      ],
      [
        <sqm-referral-table-user-cell name="Sarah Joseph"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="sjoseph@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="12/21/1984"></sqm-referral-table-user-cell>,
        <PendingWithUnpend />,
      ],
    ],
  },
};

const longCellTextTableProps = {
  states: {
    hasPrev: false,
    hasNext: true,
    loading: false,
  },
  data: {
    referralData: [],
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },

  elements: {
    columns: [
      <div>Name</div>,
      <div>Email</div>,
      <div>DOB</div>,
      <div>City</div>,
      <div>State/Province</div>,
      <div>Country</div>,
      <div>Referrals</div>,
      <div>Reward Earnings</div>,
      <div>Status</div>,
    ],
    rows: [
      [
        <sqm-referral-table-user-cell name="Bartholomew Christopher-Johnston Wallace"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="jsmith@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-date-cell
          date={-22089600000}
        ></sqm-referral-table-date-cell>,
        <sqm-referral-table-user-cell name="Vancouver"></sqm-referral-table-user-cell>,
        <sqm-referral-table-cell innerTemplate="British Columbia"></sqm-referral-table-cell>,
        <sqm-referral-table-user-cell name="Canada"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="14,000,000"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="$800,000,000,000"></sqm-referral-table-user-cell>,
        <sqm-referral-table-status-cell
          statusText="Complete"
          converted={true}
        ></sqm-referral-table-status-cell>,
      ],
      [
        <sqm-referral-table-user-cell name="Bob Williams"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="bwill@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-date-cell
          date={800000000000}
        ></sqm-referral-table-date-cell>,
        <sqm-referral-table-user-cell name="Los Angeles"></sqm-referral-table-user-cell>,
        <sqm-referral-table-cell innerTemplate="California"></sqm-referral-table-cell>,
        <sqm-referral-table-user-cell name="US"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="1"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="$5"></sqm-referral-table-user-cell>,
        <sqm-referral-table-status-cell
          statusText="In progress"
          converted={false}
        ></sqm-referral-table-status-cell>,
        ,
      ],
      [
        <sqm-referral-table-user-cell name="Sarah Joseph"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="sjoseph@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-date-cell
          date={444703707000}
        ></sqm-referral-table-date-cell>,
        <sqm-referral-table-user-cell name="Toronto"></sqm-referral-table-user-cell>,
        <sqm-referral-table-cell innerTemplate="Ontario"></sqm-referral-table-cell>,
        <sqm-referral-table-user-cell name="Canada"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="10"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="$71"></sqm-referral-table-user-cell>,
        <sqm-referral-table-status-cell
          statusText="Complete"
          converted={true}
        ></sqm-referral-table-status-cell>,
        ,
      ],
    ],
  },
};

const longColumnTextTableProps = {
  states: {
    hasPrev: false,
    hasNext: true,
    loading: false,
  },
  data: {
    referralData: [],
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },

  elements: {
    columns: [
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>,
      <div>Email</div>,
      <div>DOB</div>,
      <div>City</div>,
      <div>State/Province</div>,
      <div>Country</div>,
      <div>Referrals</div>,
      <div>Rewarddddddddddd Earningsssssssssssss</div>,
      <div>Status</div>,
    ],
    rows: [
      [
        <sqm-referral-table-user-cell name="Joe Smith"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="jsmith@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-date-cell
          date={-2128547493000}
        ></sqm-referral-table-date-cell>,
        <sqm-referral-table-user-cell name="Vancouver"></sqm-referral-table-user-cell>,
        <sqm-referral-table-cell innerTemplate="British Columbia"></sqm-referral-table-cell>,
        <sqm-referral-table-user-cell name="Canada"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="14"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="$88"></sqm-referral-table-user-cell>,
        <sqm-referral-table-status-cell
          statusText="Complete"
          converted={true}
        ></sqm-referral-table-status-cell>,
      ],
      [
        <sqm-referral-table-user-cell name="Bob Williams"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="bwill@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-date-cell
          date={800000000000}
        ></sqm-referral-table-date-cell>,
        <sqm-referral-table-user-cell name="Los Angeles"></sqm-referral-table-user-cell>,
        <sqm-referral-table-cell innerTemplate="California"></sqm-referral-table-cell>,
        <sqm-referral-table-user-cell name="US"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="1"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="$5"></sqm-referral-table-user-cell>,
        <sqm-referral-table-status-cell
          statusText="In progress"
          converted={false}
        ></sqm-referral-table-status-cell>,
        ,
      ],
      [
        <sqm-referral-table-user-cell name="Sarah Joseph"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="sjoseph@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-date-cell
          date={444703707000}
        ></sqm-referral-table-date-cell>,
        <sqm-referral-table-user-cell name="Toronto"></sqm-referral-table-user-cell>,
        <sqm-referral-table-cell innerTemplate="Ontario"></sqm-referral-table-cell>,
        <sqm-referral-table-user-cell name="Canada"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="10"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="$71"></sqm-referral-table-user-cell>,
        <sqm-referral-table-status-cell
          statusText="Complete"
          converted={true}
        ></sqm-referral-table-status-cell>,
        ,
      ],
    ],
  },
};

const fullUserTableProps = {
  states: {
    hasPrev: false,
    hasNext: true,
    loading: false,
  },
  data: {
    referralData: [],
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },

  elements: {
    columns: [
      <div>Name</div>,
      <div>Email</div>,
      <div>DOB</div>,
      <div>City</div>,
      <div>State/Province</div>,
      <div>Country</div>,
      <div>Referrals</div>,
      <div>Reward Earnings</div>,
      <div>Status</div>,
    ],
    rows: [
      [
        <sqm-referral-table-user-cell name="Joe Smith"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="jsmith@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-date-cell
          date={-2128547493000}
        ></sqm-referral-table-date-cell>,
        <sqm-referral-table-user-cell name="Vancouver"></sqm-referral-table-user-cell>,
        <sqm-referral-table-cell innerTemplate="British Columbia"></sqm-referral-table-cell>,
        <sqm-referral-table-user-cell name="Canada"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="14"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="$88"></sqm-referral-table-user-cell>,
        <sqm-referral-table-status-cell
          statusText="Complete"
          converted={true}
        ></sqm-referral-table-status-cell>,
      ],
      [
        <sqm-referral-table-user-cell name="Bob Williams"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="bwill@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-date-cell
          date={800000000000}
        ></sqm-referral-table-date-cell>,
        <sqm-referral-table-user-cell name="Los Angeles"></sqm-referral-table-user-cell>,
        <sqm-referral-table-cell innerTemplate="California"></sqm-referral-table-cell>,
        <sqm-referral-table-user-cell name="US"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="1"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="$5"></sqm-referral-table-user-cell>,
        <sqm-referral-table-status-cell
          statusText="In progress"
          converted={false}
        ></sqm-referral-table-status-cell>,
        ,
      ],
      [
        <sqm-referral-table-user-cell name="Sarah Joseph"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="sjoseph@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-date-cell
          date={444703707000}
        ></sqm-referral-table-date-cell>,
        <sqm-referral-table-user-cell name="Toronto"></sqm-referral-table-user-cell>,
        <sqm-referral-table-cell innerTemplate="Ontario"></sqm-referral-table-cell>,
        <sqm-referral-table-user-cell name="Canada"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="10"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="$71"></sqm-referral-table-user-cell>,
        <sqm-referral-table-status-cell
          statusText="Complete"
          converted={true}
        ></sqm-referral-table-status-cell>,
        ,
      ],
    ],
  },
};

const loadingTableProps = {
  states: {
    hasPrev: false,
    hasNext: true,
    loading: true,
  },
  data: {
    referralData: [],
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },

  elements: {
    loadingElement,
    columns: [
      <div>Name</div>,
      <div>Email</div>,
      <div>DOB</div>,
      <div>City</div>,
      <div>State/Province</div>,
      <div>Country</div>,
      <div>Referrals</div>,
      <div>Reward Earnings</div>,
      <div>Status</div>,
    ],
    rows: [
      [
        <sqm-referral-table-user-cell name="Joe Smith"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="jsmith@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-date-cell
          date={-2128547493000}
        ></sqm-referral-table-date-cell>,
        <sqm-referral-table-user-cell name="Vancouver"></sqm-referral-table-user-cell>,
        <sqm-referral-table-cell innerTemplate="British Columbia"></sqm-referral-table-cell>,
        <sqm-referral-table-user-cell name="Canada"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell>
          <slot name="loading"></slot>
        </sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="$88"></sqm-referral-table-user-cell>,
        <sqm-referral-table-status-cell
          statusText="Complete"
          converted={true}
        ></sqm-referral-table-status-cell>,
      ],
      [
        <sqm-referral-table-user-cell name="Bob Williams"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="bwill@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-date-cell
          date={800000000000}
        ></sqm-referral-table-date-cell>,
        <sqm-referral-table-user-cell name="Los Angeles"></sqm-referral-table-user-cell>,
        <sqm-referral-table-cell innerTemplate="California"></sqm-referral-table-cell>,
        <sqm-referral-table-user-cell name="US"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="1"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="$5"></sqm-referral-table-user-cell>,
        <sqm-referral-table-status-cell
          statusText="In progress"
          converted={false}
        ></sqm-referral-table-status-cell>,
        ,
      ],
      [
        <sqm-referral-table-user-cell name="Sarah Joseph"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="sjoseph@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-date-cell
          date={444703707000}
        ></sqm-referral-table-date-cell>,
        <sqm-referral-table-user-cell name="Toronto"></sqm-referral-table-user-cell>,
        <sqm-referral-table-cell innerTemplate="Ontario"></sqm-referral-table-cell>,
        <sqm-referral-table-user-cell name="Canada"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="10"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="$71"></sqm-referral-table-user-cell>,
        <sqm-referral-table-status-cell
          statusText="Complete"
          converted={true}
        ></sqm-referral-table-status-cell>,
        ,
      ],
    ],
  },
};

export const EmptyTable = () => {
  console.log("story");
  return <ReferralTableView {...emptyTableProps}></ReferralTableView>;
};

export const LoadingTable = () => {
  return <ReferralTableView {...loadingTableProps}></ReferralTableView>;
};

export const SimpleUserTable = () => {
  return <ReferralTableView {...simpleUserTableProps}></ReferralTableView>;
};

export const FullUserTable = () => {
  return <ReferralTableView {...fullUserTableProps}></ReferralTableView>;
};

export const TableWithLoading = () => {
  return <ReferralTableView {...loadingTableProps}></ReferralTableView>;
};

export const LongCellTextTable = () => {
  return <ReferralTableView {...longCellTextTableProps}></ReferralTableView>;
};

export const LongColumnTextTable = () => {
  return <ReferralTableView {...longColumnTextTableProps}></ReferralTableView>;
};

const demoLoadingElement = (
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

const demoEmptyElement = (
  <div slot="empty" style={{ display: "contents" }}>
    <sqm-table-row>
      <sqm-table-cell colspan={5} style={{ textAlign: "center" }}>
        No Referrals Yet
      </sqm-table-cell>
    </sqm-table-row>
  </div>
);

export const DemoTableEmpty = () => {
  return (
    <sqm-referral-table
      demoData={{
        states: {
          hasPrev: false,
          hasNext: false,
          loading: false,
        },
        data: {
          referralData: [],
        },
        elements: {
          emptyElement: demoEmptyElement,
          loadingElement: demoLoadingElement,
          columns: [<div>Name</div>, <div>Email</div>, <div>DOB</div>],
          rows: [],
        },
      }}
    ></sqm-referral-table>
  );
};

export const DemoTableLoading = () => {
  return (
    <sqm-referral-table
      demoData={{
        states: {
          hasPrev: false,
          hasNext: false,
          loading: true,
        },
        data: {
          referralData: [],
        },
        elements: {
          emptyElement: demoEmptyElement,
          loadingElement: demoLoadingElement,
          columns: [<div>Name</div>, <div>Email</div>, <div>DOB</div>],
          rows: [],
        },
      }}
    ></sqm-referral-table>
  );
};

/*******************************************************
                    FSR Stencilbook Tables
********************************************************/
// demo columns: user, rewards, status, date started, date converted (should be after started always)

const baseReward: Reward = {
  id: "123",
  type: "CREDIT",
  value: 19,
  unit: "POINT",
  name: "test",
  dateGiven: 1627427794891,
  dateScheduledFor: 1628146800000,
  dateExpires: 1629010800000,
  dateCancelled: 134400,
  fuelTankCode: "ABC",
  fuelTankType: "Code",
  currency: "null",
  prettyValue: "19 Points",
  statuses: ["AVAILABLE"],
  globalRewardKey: "Key",
  rewardRedemptionTransactions: {
    data: [
      {
        exchangedRewards: {
          data: [
            {
              prettyValue: "19 Points",
              type: "CREDIT",
              fuelTankCode: "ABC",
              globalRewardKey: "Key",
            },
          ],
        },
      },
    ],
  },
};

const nullExpiresIn = {
  dateExpires: null,
};

const nullScheduledFor = {
  dateScheduledFor: null,
};

const nullFuelTank = {
  fuelTankCode: null,
};

// Reward Type Cases
const discountReward = {
  type: "PCT_DISCOUNT",
};

const creditReward = {
  type: "CREDIT",
};

const fuelTankReward = {
  type: "FUELTANK",
};

const integrationReward = {
  type: "INTEGRATION",
};

// Reward Status Cases
const pendingReward = {
  statuses: ["AVAILABLE", "PENDING"],
};
const cancelledReward = {
  statuses: ["PENDING", "CANCELLED"],
  dateCancelled: 1626850800000,
};
const expiredReward = {
  statuses: ["EXPIRED", "AVAILABLE"],
  dateExpires: 1626850800000,
};
const redeemedReward = {
  statuses: ["AVAILABLE", "EXPIRED", "REDEEMED"],
};
const availableReward = {
  statuses: ["AVAILABLE"],
};

export const DemoTableFull = () => {
  return (
    <sqm-referral-table
      demoData={{
        states: {
          hasPrev: false,
          hasNext: false,
          loading: false,
        },
        data: {
          referralData: [],
        },
        elements: {
          emptyElement: demoEmptyElement,
          loadingElement: demoLoadingElement,
          columns: [
            <div>User</div>,
            <div>Rewards</div>,
            <div>Status</div>,
            <div>Date Started</div>,
            <div>Date Converted</div>,
          ],
          rows: [
            [
              <sqm-referral-table-user-cell name="Joe Smith"></sqm-referral-table-user-cell>,
              <sqm-referral-table-rewards-cell
                rewards={[
                  { ...baseReward, ...availableReward },
                  { ...baseReward, ...pendingReward },
                  { ...baseReward, ...cancelledReward },
                ]}
              ></sqm-referral-table-rewards-cell>,

              <sqm-referral-table-status-cell
                statusText="Complete"
                converted={true}
              ></sqm-referral-table-status-cell>,
              <sqm-referral-table-date-cell
                date={1626764400000}
              ></sqm-referral-table-date-cell>,
              <sqm-referral-table-date-cell
                date={1627427794891}
              ></sqm-referral-table-date-cell>,
            ],
            [
              <sqm-referral-table-user-cell name="Sarah Williams"></sqm-referral-table-user-cell>,
              <sqm-referral-table-rewards-cell
                rewards={[{ ...baseReward, ...expiredReward }]}
              ></sqm-referral-table-rewards-cell>,
              <sqm-referral-table-status-cell
                statusText="Incomplete"
                converted={false}
              ></sqm-referral-table-status-cell>,
              <sqm-referral-table-date-cell
                date={1626764400000}
              ></sqm-referral-table-date-cell>,
              <sqm-referral-table-date-cell
                date={null}
              ></sqm-referral-table-date-cell>,
            ],
            [
              <sqm-referral-table-user-cell name="Marvin Smith"></sqm-referral-table-user-cell>,
              <sqm-referral-table-rewards-cell
                rewards={[
                  { ...baseReward, ...nullExpiresIn },
                  { ...baseReward, ...pendingReward },
                ]}
              ></sqm-referral-table-rewards-cell>,
              <sqm-referral-table-status-cell
                statusText="Complete"
                converted={true}
              ></sqm-referral-table-status-cell>,
              <sqm-referral-table-date-cell
                date={1626764400000}
              ></sqm-referral-table-date-cell>,
              <sqm-referral-table-date-cell
                date={1627427794891}
              ></sqm-referral-table-date-cell>,
            ],
          ],
        },
      }}
    ></sqm-referral-table>
  );
};
