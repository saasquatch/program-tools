import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { isDemo } from "../../utils/isDemo";
import { LeaderboardView, LeaderboardViewProps } from "./leaderboard-view";
import { LeaderboardProps, useLeaderboard } from "./useLeaderboard";

/**
 * @uiName Leaderboard
 */
@Component({
  tag: "sqm-leaderboard",
  styleUrl: "leaderboard.scss",
  shadow: true,
})
export class Leaderboard {
  /**
   * @uiName User Column Heading
   * */
  @Prop() usersheading: string;
  /**
   * @uiName Stats Column Heading
   * */
  @Prop() statsheading: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = {
      empty: <slot name="empty" />,
      loadingstate: <slot name="loading" />,
      ...this,
    };
    const viewprops = isDemo()
      ? useLeaderboardDemo(props)
      : useLeaderboard(props);
    return <LeaderboardView {...viewprops} />;
  }
}

function useLeaderboardDemo(props: LeaderboardProps): LeaderboardViewProps {
  return {
    usersheading: props.usersheading ? props.usersheading : "TOP REFERRERS",
    statsheading: props.statsheading ? props.statsheading : "NEW TITANS",
    empty: props.empty ? props.empty : <div>Empty</div>,
    loadingstate: props.loadingstate ? props.loadingstate : <div>Loading</div>,
    loading: false,
    hasleaders: true,
    referrers: [
      { name: "Viktor V.", score: "82" },
      { name: "MF D.", score: "73" },
      { name: "Freddie G.", score: "64" },
      { name: "Benny B.", score: "55" },
      { name: "Mos D.", score: "46" },
    ],
  };
}
