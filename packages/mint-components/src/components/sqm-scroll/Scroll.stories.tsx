import { h } from "@stencil/core";

export default {
  title: "Components/Scroll",
};

export const ScrollTag = () => {
  return (
    <div style={{ position: "relative", height: "2000px" }}>
      <sqm-scroll scroll-tag-name="sqm-text"></sqm-scroll>
      <div style={{ position: "absolute", bottom: "0" }}>
        <sqm-text slot="label">
          <h3>Earn more rewards</h3>
          <p>
            Get points while using Klip. Use those points to redeem rewards like
            one free month of Klip Enterprise or two plane tickets to anywhere
            in North America
          </p>
        </sqm-text>
      </div>
    </div>
  );
};

export const ScrollId = () => {
  return (
    <div style={{ position: "relative", height: "2000px" }}>
      <sqm-scroll scroll-id="my-id"></sqm-scroll>
      <div style={{ position: "absolute", bottom: "0" }}>
        <sqm-text slot="label" id="my-id">
          <h3>Earn more rewards</h3>
          <p>
            Get points while using Klip. Use those points to redeem rewards like
            one free month of Klip Enterprise or two plane tickets to anywhere
            in North America
          </p>
        </sqm-text>
      </div>
    </div>
  );
};

export const ScrollTabGroup = () => {
  return (
    <div style={{ position: "relative", height: "2000px" }}>
      <sqm-scroll scroll-tag-name="sl-tab-group"></sqm-scroll>
      <div style={{ position: "absolute", bottom: "0" }}>
        <sqm-text slot="label" id="my-id">
          <sl-tab-group>
            <sl-tab slot="nav" panel="referralLeaderboard">
              Leaderboard{" "}
            </sl-tab>
            <sl-tab slot="nav" panel="referralHistory">
              Referral history{" "}
            </sl-tab>
            <sl-tab slot="nav" panel="rewardHistory">
              Reward history{" "}
            </sl-tab>
            <sl-tab slot="nav" panel="rewardExchange">
              Redeem{" "}
            </sl-tab>
            <sl-tab-panel name="referralHistory">
              <sqm-referral-table per-page="4">
                <sqm-referral-table-user-column column-title="User"></sqm-referral-table-user-column>
                <sqm-referral-table-status-column column-title="Referral status"></sqm-referral-table-status-column>
                <sqm-referral-table-rewards-column></sqm-referral-table-rewards-column>
                <sqm-referral-table-date-column
                  column-title="Date referred"
                  date-shown="dateReferralStarted"
                ></sqm-referral-table-date-column>
              </sqm-referral-table>
            </sl-tab-panel>
            <sl-tab-panel name="referralLeaderboard">
              <sqm-titled-section padding="medium" label-margin="small">
                <sqm-text slot="content">
                  <p>
                    Be one of the top 3 referrers at the end of the year and
                    receive Klip free for 1 year!
                  </p>
                </sqm-text>
              </sqm-titled-section>
              <sqm-leaderboard
                usersheading="Referrer"
                statsheading="Referrals"
                rank-type="rank"
                leaderboard-type="topStartedReferrers"
                rankheading="Rank"
                show-rank="true"
              ></sqm-leaderboard>
            </sl-tab-panel>
            <sl-tab-panel name="rewardHistory">
              <sqb-program-section program-id="">
                <sqm-rewards-table per-page="4">
                  <sqm-rewards-table-reward-column></sqm-rewards-table-reward-column>
                  <sqm-rewards-table-source-column></sqm-rewards-table-source-column>
                  <sqm-rewards-table-status-column></sqm-rewards-table-status-column>
                  <sqm-rewards-table-date-column></sqm-rewards-table-date-column>
                </sqm-rewards-table>
              </sqb-program-section>
            </sl-tab-panel>
            <sl-tab-panel name="rewardExchange">
              <sqm-reward-exchange-list id="hello"></sqm-reward-exchange-list>
            </sl-tab-panel>
          </sl-tab-group>
        </sqm-text>
      </div>
    </div>
  );
};
