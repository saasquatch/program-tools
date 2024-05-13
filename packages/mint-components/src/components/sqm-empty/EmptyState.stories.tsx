import { h } from "@stencil/core";
import { LeaderboardView } from "../sqm-leaderboard/sqm-leaderboard-view";
import scenario from "./sqm-empty.feature";

export default {
  title: "Components/Empty State",
  parameters: {
    scenario,
  },
};

const defaultStyles = {
  usersheading: "TOP REFERRERS",
  statsheading: "NEW CUSTOMERS",
};

export const Empty = () => {
  return (
    <sqm-empty
      empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png"
      empty-state-header="View your rank in the leaderboard"
      empty-state-text="Be the first to refer a friend and reach the top of the leaderboard"
    ></sqm-empty>
  );
};

const defaultElements = {
  empty: (
    <sqm-empty
      empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png"
      empty-state-header="View your rank in the leaderboard"
      empty-state-text="Be the first to refer a friend and reach the top of the leaderboard"
    ></sqm-empty>
  ),
  essentials: (
    <sqm-empty
      empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1715360191/squatch-assets/Leaderboard_Not_Available.svg"
      empty-state-header="Leaderboards aren’t available on your plan"
      empty-state-text="Contact {supportText} to upgrade your plan and start leveraging gamification in your program."
      support-text="Support"
    ></sqm-empty>
  ),
  loadingstate: (
    <slot name="loading">
      <table>
        {[...Array(10)].map(() => {
          return (
            <tr>
              <td>
                <sl-skeleton></sl-skeleton>
              </td>
            </tr>
          );
        })}
      </table>
    </slot>
  ),
};

export const SlottedIntoComponent = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: false,
      isEssentials: false,
      styles: {
        ...defaultStyles,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: [],
      showUser: true,
      rowNumber: 10,
      userRank: {
        firstName: "Kutay",
        lastInitial: "C",
        value: 8,
        rowNumber: 11,
        rank: 23,
      },
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};
