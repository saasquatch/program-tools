import { IntlShape } from "@formatjs/intl";
import { h } from "@stencil/core";
import { css } from "emotion";
import { gap, text } from "../../global/mixins";

export type ReferralComponentProps = {
  data: {
    referral: Referral & {
      referredFor: {
        firstName: string;
        lastName: string;
      };
    };
    referraltype: "converted" | "pending" | "referrer";
    rewardTranslations: unknown;
  };
  states: {
    styles: {
      unknownuser: string;
      pickrewardtext: string;
      showStatus: boolean;
    };
  };
  intl: IntlShape<string | number>;
  callbacks: {
    hasAvailableRewards: (referral: Referral) => boolean;
    allRewardsRedeemed: (referral: Referral) => boolean;
    getName: (referral: Referral) => string;
    getRewardStatus: (referral: Referral) => string;
    getReferralStatus: (referral: Referral) => string;
  };
};

const Row = css`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;

  ${gap("left", "var(--sl-spacing-medium)")}
`;

const Wrapper = css`
  padding: var(--sl-spacing-small) 0;
  border-bottom: 1px solid var(--sl-color-gray-300);
  width: 100%;
  justify-content: space-between;

  &:nth-last-child() {
    border: 0;
  }
`;

const Column = css`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${gap("top", "var(--sl-spacing-xx-small)")}
`;

const Text = css`
  ${text()}

  line-height: var(--sl-line-height-dense);
`;

const Subtext = css`
  display: flex;
  align-items: center;
  ${gap("left", "var(--sl-spacing-xx-small)")}

  & > span {
    margin-top: 2px;
    font-size: var(--sl-font-size-x-small);
    line-height: var(--sl-line-height-dense);
    color: var(--sl-color-gray-500);
  }
`;

const Avatar = css`
  &::part(base) {
    width: 1.7rem;
    height: 1.7rem;
  }

  &::part(icon) {
    padding: 5px;
  }
`;

const IconStyles = css`
  font-size: var(--sl-font-size-large);

  min-width: 20px;
`;

const ReferralComponentView = (props: ReferralComponentProps) => {
  const { states, data, callbacks } = props;
  const { styles } = states;

  const { dateReferralStarted } = data?.referral;

  // !: Hook stuff?
  const name = callbacks.getName(data?.referral);
  const status = props.states.styles.showStatus ? callbacks.getReferralStatus(data?.referral) : "";

  // TODO: probably a better way to do this
  const relative = (new Date().getTime() - dateReferralStarted) * -1;
  const date = props.intl.formatRelativeTime(
    Math.ceil(relative / (60 * 60 * 24 * 1000)),
    "day",
    {
      localeMatcher: "lookup",
      numeric: "auto",
      style: "long",
    }
  );

  const rewardStatus = callbacks.getRewardStatus(data?.referral);
  const rewardAvailable = data.referral.rewards.find((reward: Reward) =>
    reward.statuses.includes("AVAILABLE")
  );

  // In an ideal world, these would contain layout components that help standardize measurements throughout the widget/portal
  return (
    <div class={`${Wrapper} ${Row}`}>
      <div class={Row}>
        <sl-avatar class={Avatar}></sl-avatar>
        <div class={`${Column} ${gap("top", "0px")}`}>
          {/* <mint-text as="span" font-size="medium" /> */}
          <span class={Text}>{name || styles.unknownuser}</span>
          {/* <mint-text as="span" font-size="small" /> */}
          <span
            class={text(
              "var(--sl-font-size-x-small)",
              "var(--sl-color-gray-500)"
            )}
          >
            {date}
          </span>
        </div>
      </div>
      <div>
        {/* <mint-text as="span" font-size="medium" /> */}
        <span class={Text}>{status}</span>
      </div>
      <div class={Row} style={{ width: "170px" }}>
        {/* <mint-icon size="large" color="success-700" name="check-circle" /> */}
        {rewardAvailable ? (
          <sl-icon
            class={IconStyles}
            style={{ color: "var(--sl-color-success-500" }}
            name="check-circle"
          ></sl-icon>
        ) : (
          <sl-icon
            class={IconStyles}
            style={{ color: "var(--sl-color-gray-500" }}
            name="dash-circle"
          ></sl-icon>
        )}
        <div class={Column}>
          {/* <mint-text as="span" font-size="medium" /> */}
          <span class={Text}>{rewardStatus}</span>
          {/* <mint-text as="span" font-size="small" /> */}
          {data.referral.referredFor && (
            <div class={Subtext}>
              <sl-icon
                style={{ fontSize: "var(--sl-font-size-small)" }}
                name="link"
              ></sl-icon>
              <span>
                {data.referral.referredFor.firstName}{" "}
                {data.referral.referredFor.lastName}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralComponentView;
