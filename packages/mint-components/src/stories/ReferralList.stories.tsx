//@ts-nocheck
import { createIntl, createIntlCache } from "@formatjs/intl";
import { h } from "@stencil/core";
import ReferralListView from "../components/referral-list/referral-list-view";

export default {
  title: "Components/Referral List",
  component: Lists,
};

function Lists() {
  return (
    <div>
      <ul>
        <li>First item</li>
      </ul>
    </div>
  );
}

const cache = createIntlCache();
const intl = createIntl(
  {
    locale: "en-CA",
  },
  cache
);

export const defaultReferralList = () => (
  <sqh-referral-list
    showreferrer="true"
    usefirstreward="false"
    referralnamecolor="darkslategray"
    referraltextcolor="lightgray"
    rewardcolor="#4BB543"
    pendingcolor="lightgray"
    pendingvalue="Reward Pending"
    referrervalue="Referred"
    referrercontent="Referred you {date}"
    convertedcontent="Signed up, referred {date}"
    pendingcontent="Trial user, referred {date}"
    valuecontent="and {extrarewards} more {extrarewards, plural, one {reward} other {rewards}}"
    expiredcolor="lightgray"
    expiredvalue="Expired Reward"
    expiredcontent="Signed up, referred {date}"
    cancelledcolor="#C81D05"
    cancelledvalue="Cancelled Reward"
    cancelledcontent="Signed up, referred {date}"
    paginatemore="View More"
    paginateless="Previous"
    noreferralsyet="No Referrals Yet..."
    unknownuser="Your Friend"
  ></sqh-referral-list>
);

export const ReferralListEmptyState = () => (
  <ReferralListView
    states={{
      // @ts-ignore
      styles: {
        paginatemore: "VIEW MORE",
        paginateless: "PREVIOUS",
        noreferralsyet: "No Referrals Yet",
        unknownuser: "Your Friend",
        downloadedtext: "Downloaded",
        downloadedunqualifiedtext: "Downloaded - Not Qualified",
        purchasedeligibletext: "Purchased",
        purchasednoteligibletext: "Purchased - Not Qualified",
        newreferraltext: "New Referral",
        showStatus: true,
        rewardpendingtext: "Pending",
        rewardsavailabletext: "{count} Rewards Available",
        rewardredeemedtext: "Reward Redeemed",
        titleText: "referral activity",
      },
    }}
    // @ts-ignore
    data={{}}
    // @ts-ignore
    callbacks={{
      intl,
    }}
    showreferrer={true}
    usefirstreward={false}
  ></ReferralListView>
);

export const ReferralListOneReferral = () => (
  <div>
    <pre>
      {`
      Scenario: One item of referral activity
      Given the current user is enrolled in the referral program
      And the current user have made one referral
      Then display a card titled "REFERRAL ACTIVITY"
      And below the title display a single row with the referrals name in the top left as a title
      And below the name as a subtitle display "New Referral" as a left justified subtitle
      And below that display when the referral was made as a left justified subtitle
      And on the right of the row display the status of the referral with an icon`}
    </pre>
    <ReferralListView
      states={{
        offset: 0,
        // @ts-ignore
        styles: {
          paginatemore: "VIEW MORE",
          paginateless: "PREVIOUS",
          noreferralsyet: "No Referrals Yet",
          unknownuser: "Your Friend",
          downloadedtext: "Downloaded",
          downloadedunqualifiedtext: "Downloaded - Not Qualified",
          purchasedeligibletext: "Purchased",
          purchasednoteligibletext: "Purchased - Not Qualified",
          newreferraltext: "$50 Earned",
          rewardpendingtext: "Following Up",
          rewardsavailabletext: "{count} Rewards Available",
          rewardredeemedtext: "Reward Redeemed",
          showStatus: true,

          titleText: "referral activity",
        },
      }}
      data={{
        referrals: [
          {
            dateReferralStarted: 1600894079946,
            referredUser: {
              firstName: "Ora",
              lastName: "Chapman",
              customFields: { lastSeenDate: 1597689010585 },
            },
            rewards: [],
          },
        ],
        referralsCount: 1,
        rewardTranslations: [],
      }}
      // @ts-ignore
      callbacks={{
        intl,
      }}
      showreferrer={true}
      usefirstreward={false}
    ></ReferralListView>
  </div>
);

export const ReferralListFourReferralsFirstPage = ({
  linkedReferral = false,
  showStatus = true,
}) => (
  <ReferralListView
    states={{
      offset: 0,
      // @ts-ignore
      styles: {
        paginatemore: "VIEW MORE",
        paginateless: "PREVIOUS",
        noreferralsyet: "No Referrals Yet",
        unknownuser: "Your Friend",
        downloadedtext: "Downloaded",
        downloadedunqualifiedtext: "Downloaded - Not Qualified",
        purchasedeligibletext: "Purchased",
        purchasednoteligibletext: "Purchased - Not Qualified",
        newreferraltext: "$50 Earned",
        rewardpendingtext: "Following Up",
        rewardsavailabletext: "{count} Rewards Available",
        rewardredeemedtext: "Reward Redeemed",
        showStatus: showStatus,
        titleText: "referral activity",
      },
    }}
    data={{
      referrals: [
        {
          dateReferralStarted: 1600894079946,
          referredUser: {
            firstName: "Ora",
            lastName: "Chapman",
            customFields: { lastSeenDate: 1597689010585 },
          },
          rewards: [{ statuses: ["AVAILABLE"] }],
          ...(linkedReferral
            ? {
                referredFor: {
                  firstName: "John",
                  lastName: "Smith",
                },
              }
            : {}),
        },
        {
          dateReferralStarted: 1600894072418,
          referredUser: {
            firstName: "Ben",
            lastName: "Cool Guy",
            customFields: {},
          },
          rewards: [],
        },
        {
          dateReferralStarted: 1600894065913,
          referredUser: {
            firstName: "Corey",
            lastName: "More Cool",
            customFields: {},
          },
          rewards: [],
        },
      ],
      referralsCount: 4,
      rewardTranslations: [],
    }}
    // @ts-ignore
    callbacks={{
      intl,
    }}
    showreferrer={true}
    usefirstreward={false}
  ></ReferralListView>
);

export const ReferralListFourReferralsFirstPageHiddenStatus = ({
  linkedReferral = false,
}) => (
  <ReferralListView
    states={{
      offset: 0,
      // @ts-ignore
      styles: {
        paginatemore: "VIEW MORE",
        paginateless: "PREVIOUS",
        noreferralsyet: "No Referrals Yet",
        unknownuser: "Your Friend",
        downloadedtext: "Downloaded",
        downloadedunqualifiedtext: "Downloaded - Not Qualified",
        purchasedeligibletext: "Purchased",
        purchasednoteligibletext: "Purchased - Not Qualified",
        newreferraltext: "$50 Earned",
        rewardpendingtext: "Following Up",
        rewardsavailabletext: "{count} Rewards Available",
        rewardredeemedtext: "Reward Redeemed",
        showStatus: false,
        titleText: "referral activity",
      },
    }}
    data={{
      referrals: [
        {
          dateReferralStarted: 1600894079946,
          referredUser: {
            firstName: "Ora",
            lastName: "Chapman",
            customFields: { lastSeenDate: 1597689010585 },
          },
          rewards: [{ statuses: ["AVAILABLE"] }],
          ...(linkedReferral
            ? {
                referredFor: {
                  firstName: "John",
                  lastName: "Smith",
                },
              }
            : {}),
        },
        {
          dateReferralStarted: 1600894072418,
          referredUser: {
            firstName: "Ben",
            lastName: "Cool Guy",
            customFields: {},
          },
          rewards: [],
        },
        {
          dateReferralStarted: 1600894065913,
          referredUser: {
            firstName: "Corey",
            lastName: "More Cool",
            customFields: {},
          },
          rewards: [],
        },
      ],
      referralsCount: 4,
      rewardTranslations: [],
    }}
    // @ts-ignore
    callbacks={{
      intl,
    }}
    showreferrer={true}
    usefirstreward={false}
  ></ReferralListView>
);

ReferralListFourReferralsFirstPage.scenario = `Scenario: Four referrals - First page of referrals
Given the current user has made four referrals
And the current user is on the first page of the "REFERRAL ACTIVITY" card
Then display three referral rows
And disable the "PREVIOUS" pagination navigation button
And enable the "VIEW MORE" pagination button`;

export const ReferralListFourReferralsSecondPage = () => (
  <div>
    <pre>
      {`
    Scenario: Four referrals - Second page of referrals
    Given the current user has made four referrals
    And the current user is on the second page of the "REFERRAL ACTIVITY" card
    Then display the one referral not displayed on the first page
    And enable the "PREVIOUS" pagination navigation button
    And disable the "VIEW MORE" pagination navigation button`}
    </pre>
    <ReferralListView
      states={{
        offset: 1,
        // @ts-ignore
        styles: {
          paginatemore: "VIEW MORE",
          paginateless: "PREVIOUS",
          noreferralsyet: "No Referrals Yet",
          unknownuser: "Your Friend",
          downloadedtext: "Downloaded",
          downloadedunqualifiedtext: "Downloaded - Not Qualified",
          purchasedeligibletext: "Purchased",
          purchasednoteligibletext: "Purchased - Not Qualified",
          newreferraltext: "$50 Earned",
          rewardpendingtext: "Following Up",
          rewardsavailabletext: "{count} Rewards Available",
          rewardredeemedtext: "Reward Redeemed",
          showStatus: true,
          titleText: "referral activity",
        },
      }}
      data={{
        referrals: [
          {
            dateReferralStarted: 1600894079946,
            referredUser: {
              firstName: "Ora",
              lastName: "Chapman",
              customFields: {
                lastSeenDate: 1597689010585,
                Saasquatch_Referral_Status__c: "Downloaded - qualified",
              },
            },
            rewards: [],
          },
        ],
        referralsCount: 4,
        rewardTranslations: [],
      }}
      // @ts-ignore
      callbacks={{
        intl,
      }}
      showreferrer={true}
      usefirstreward={false}
    ></ReferralListView>
    Share your link with a friend!
  </div>
);

export const ReferralListMiddlePageSevenReferrals = () => (
  <div>
    <pre>
      {`
    Scenario: Middle Page - Seven referrals
    Given the current user has made seven referrals
    And the current user is on the second page of the "REFERRAL ACTIVITY" card
    Then display referrals 4 thru 6
    And have the previous and view more buttons active`}
    </pre>
    <ReferralListView
      states={{
        offset: 1,
        loading: false,
        // @ts-ignore
        styles: {
          paginatemore: "VIEW MORE",
          paginateless: "PREVIOUS",
          noreferralsyet: "No Referrals Yet",
          unknownuser: "Your Friend",
          downloadedtext: "Downloaded",
          downloadedunqualifiedtext: "Downloaded - Not Qualified",
          purchasedeligibletext: "Purchased",
          purchasednoteligibletext: "Purchased - Not Qualified",
          newreferraltext: "$50 Earned",
          rewardpendingtext: "Following Up",
          rewardsavailabletext: "{count} Rewards Available",
          rewardredeemedtext: "Reward Redeemed",
          showStatus: true,
          titleText: "referral activity",
        },
      }}
      data={{
        referrals: [
          {
            dateReferralStarted: 1600894079946,
            referredUser: {
              firstName: "Ora",
              lastName: "Chapman",
              customFields: {
                lastSeenDate: 1597689010585,
                Saasquatch_Referral_Status__c: "Downloaded - qualified",
              },
            },
            rewards: [],
          },
          {
            dateReferralStarted: 1600894079946,
            referredUser: {
              firstName: "Ora",
              lastName: "Chapman",
              customFields: {
                lastSeenDate: 1597689010585,
                Saasquatch_Referral_Status__c: "Downloaded - qualified",
              },
            },
            rewards: [],
          },
          {
            dateReferralStarted: 1600894079946,
            referredUser: {
              firstName: "Ora",
              lastName: "Chapman",
              customFields: {
                lastSeenDate: 1597689010585,
                Saasquatch_Referral_Status__c: "Downloaded - qualified",
              },
            },
            rewards: [],
          },
        ],
        referralsCount: 7,
        rewardTranslations: [],
      }}
      // @ts-ignore
      callbacks={{
        intl,
      }}
      showreferrer={true}
      usefirstreward={false}
    ></ReferralListView>
  </div>
);
