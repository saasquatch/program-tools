import { h } from "@stencil/core";
import { GenericTableView } from "../../tables/GenericTableView";
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
  dateRedeemed: 0,
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
    mdBreakpoint: 899,
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
    hiddenColumns: "",
    mdBreakpoint: 899,
    smBreakpoint: 599,
  },
};

const customButtonProps = {
  states: {
    hasPrev: true,
    hasNext: true,
    show: "rows" as const,
    namespace: "sqm-referral-table",
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: "CUSTOM PREVIOUS TEXT",
      moreLabel: "CUSTOM NEXT TEXT",
    },
    hiddenColumns: "",
    mdBreakpoint: 899,
    smBreakpoint: 599,
  },
};

const longCellTextTableProps = {
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
    mdBreakpoint: 899,
    smBreakpoint: 599,
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },

  elements: {
    columns: [
      "Name",
      "Email",
      "DOB",
      "City",
      "State/Province",
      "Country",
      "Referrals",
      "Reward Earnings",
      "Status",
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
    mdBreakpoint: 899,
    smBreakpoint: 599,
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },

  elements: {
    columns: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      "Email",
      "DOB",
      "City",
      "State/Province",
      "Country",
      "Referrals",
      "Rewarddddddddddd Earningsssssssssssss",
      "Status",
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

const fullUserTableProps = (hidden = false) => ({
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
    hiddenColumns: hidden ? "0,1,2,3,4,5,6,7,8" : "-1",
    mdBreakpoint: 899,
    smBreakpoint: 599,
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },

  elements: {
    columns: [
      "Name",
      "Email",
      "DOB",
      "City",
      "State/Province",
      "Country",
      "Referrals",
      "Reward Earnings",
      "Status",
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
});

export const SimpleUserTable = () => {
  return <GenericTableView {...simpleUserTableProps}></GenericTableView>;
};

export const HiddenLabelsTable = () => {
  return (
    <GenericTableView
      {...{ ...simpleUserTableProps, ...hideLabelProps }}
    ></GenericTableView>
  );
};

export const CustomButtonTextTable = () => {
  return (
    <GenericTableView
      {...{ ...simpleUserTableProps, ...customButtonProps }}
    ></GenericTableView>
  );
};

export const FullUserTable = () => {
  return <GenericTableView {...fullUserTableProps()}></GenericTableView>;
};

export const LongCellTextTable = () => {
  return <GenericTableView {...longCellTextTableProps}></GenericTableView>;
};

export const LongColumnTextTable = () => {
  return <GenericTableView {...longColumnTextTableProps}></GenericTableView>;
};

export const EmptyTable = () => {
  return (
    <sqm-referral-table
      demoData={{
        states: {
          hasPrev: false,
          hasNext: false,
          show: "empty" as const,
          namespace: "sqm-referral-table",
        },
        data: {
          textOverrides: {
            showLabels: true,
            prevLabel: "Prev",
            moreLabel: "View More",
          },
          hiddenColumns: "",
          mdBreakpoint: 899,
          smBreakpoint: 599,
        },
        elements: {
          emptyElement: emptyElement,
          loadingElement: loadingElement,
          columns: ["Name", "Email", "DOB"],
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
          show: "loading",
          namespace: "sqm-referral-table",
        },
        data: {
          textOverrides: {
            showLabels: true,
            prevLabel: "Prev",
            moreLabel: "View More",
          },
          hiddenColumns: "",
          mdBreakpoint: 899,
          smBreakpoint: 599,
        },
        elements: {
          emptyElement: emptyElement,
          loadingElement: loadingElement,
          columns: ["Name", "Email", "DOB"],
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
          mdBreakpoint: 899,
          smBreakpoint: 599,
        },
        elements: {
          emptyElement: emptyElement,
          loadingElement: loadingElement,
          columns: [
            "User",
            "Rewards",
            "Status",
            "Date Started",
            "Date Converted",
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
                statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
                statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
                fuelTankText="Your code is"
                rewardReceivedText="Reward received on"
                expiringText="Expiring in"
                pendingForText="{status} for {date}"
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
                statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
                statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
                fuelTankText="Your code is"
                rewardReceivedText="Reward received on"
                expiringText="Expiring in"
                pendingForText="{status} for {date}"
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
                statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
                statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
                fuelTankText="Your code is"
                rewardReceivedText="Reward received on"
                expiringText="Expiring in"
                pendingForText="{status} for {date}"
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

export const ColumnsMobileVisible = () => {
  return <GenericTableView {...fullUserTableProps()}></GenericTableView>;
};

export const ColumnsMobileHidden = () => {
  return <GenericTableView {...fullUserTableProps(true)}></GenericTableView>;
};
