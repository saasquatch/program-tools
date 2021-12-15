import { h } from "@stencil/core";
import { ReferralTableView } from "./sqm-referral-table-view";
import {
  AvailableNoExpiry,
  Cancelled,
  PendingNoUnpend,
  PendingWithUnpend,
  Redeemed,
} from "./ReferralTableRewardsCell.stories";

export default {
  title: "Components/Referral Table",
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
        No Referrals Yet
      </sqm-table-cell>
    </sqm-table-row>
  </div>
);

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
  dateRedeemed:0,
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
const availableReward = {
  statuses: ["AVAILABLE"],
};
const nullExpiresIn = {
  dateExpires: null,
};

const simpleUserTableProps = {
  states: {
    hasPrev: false,
    hasNext: true,
    loading: false,
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: "Prev",
      moreLabel: "View More",
    },
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
        <PendingNoUnpend />,
      ],
      [
        <sqm-referral-table-user-cell name="Bob Williams"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="bwill@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="09/05/1999"></sqm-referral-table-user-cell>,
        <AvailableNoExpiry />,
      ],
      [
        <sqm-referral-table-user-cell name="Sarah Joseph"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="sjoseph@gmail.com"></sqm-referral-table-user-cell>,
        <sqm-referral-table-user-cell name="12/21/1984"></sqm-referral-table-user-cell>,
        <Cancelled />,
      ],
    ],
  },
};

const hideLabelProps = {
  data: {
    textOverrides: {
      showLabels: false,
      prevLabel: "Prev",
      moreLabel: "View More",
    },
  },
};

const customButtonProps = {
  states: {
    hasPrev: true,
    hasNext: true,
    loading: false,
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: "CUSTOM PREVIOUS TEXT",
      moreLabel: "CUSTOM NEXT TEXT",
    },
  },
};

const longCellTextTableProps = {
  states: {
    hasPrev: false,
    hasNext: true,
    loading: false,
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: "Prev",
      moreLabel: "View More",
    },
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
    textOverrides: {
      showLabels: true,
      prevLabel: "Prev",
      moreLabel: "View More",
    },
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
    textOverrides: {
      showLabels: true,
      prevLabel: "Prev",
      moreLabel: "View More",
    },
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

export const SimpleUserTable = () => {
  return <ReferralTableView {...simpleUserTableProps}></ReferralTableView>;
};

export const HiddenLabelsTable = () => {
  return (
    <ReferralTableView
      {...{ ...simpleUserTableProps, ...hideLabelProps }}
    ></ReferralTableView>
  );
};

export const CustomButtonTextTable = () => {
  return (
    <ReferralTableView
      {...{ ...simpleUserTableProps, ...customButtonProps }}
    ></ReferralTableView>
  );
};

export const FullUserTable = () => {
  return <ReferralTableView {...fullUserTableProps}></ReferralTableView>;
};

export const LongCellTextTable = () => {
  return <ReferralTableView {...longCellTextTableProps}></ReferralTableView>;
};

export const LongColumnTextTable = () => {
  return <ReferralTableView {...longColumnTextTableProps}></ReferralTableView>;
};

export const EmptyTable = () => {
  return (
    <sqm-referral-table
      demoData={{
        states: {
          hasPrev: false,
          hasNext: false,
          loading: false,
        },
        data: {
          textOverrides: {
            showLabels: true,
            prevLabel: "Prev",
            moreLabel: "View More",
          },
          referralData: [],
        },
        elements: {
          emptyElement: emptyElement,
          loadingElement: loadingElement,
          columns: [<div>Name</div>, <div>Email</div>, <div>DOB</div>],
          rows: [],
        },
      }}
    ></sqm-referral-table>
  );
};

export const LoadingTable = () => {
  return (
    <sqm-referral-table
      demoData={{
        states: {
          hasPrev: false,
          hasNext: false,
          loading: true,
        },
        data: {
          textOverrides: {
            showLabels: true,
            prevLabel: "Prev",
            moreLabel: "View More",
          },
          referralData: [],
        },
        elements: {
          emptyElement: emptyElement,
          loadingElement: loadingElement,
          columns: [<div>Name</div>, <div>Email</div>, <div>DOB</div>],
          rows: [],
        },
      }}
    ></sqm-referral-table>
  );
};

export const FullRewardsTable = () => {
  return (
    <sqm-referral-table
      demoData={{
        states: {
          hasPrev: false,
          hasNext: false,
          loading: false,
        },
        data: {
          textOverrides: {
            showLabels: true,
            prevLabel: "Prev",
            moreLabel: "View More",
          },
          referralData: [],
        },
        elements: {
          emptyElement: emptyElement,
          loadingElement: loadingElement,
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
