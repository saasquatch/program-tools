import { VNode } from "@stencil/core";
import { h } from "@stencil/core";
export interface LeaderboardViewProps {
  usersheading: string;
  statsheading: string;
  empty: VNode;
  loadingstate: VNode;
  loading: boolean;
  hasleaders: boolean;
  referrers: { name: string; score: string }[];
}

export function LeaderboardView(props: LeaderboardViewProps) {
  if (props.loading) {
    return props.loadingstate;
  }
  return (
    <div>
      {!props.hasleaders && props.empty}
      {props.hasleaders && (
        <div class="Column">
          <div class="SeperateContent">
            <b>{props.usersheading}</b>
            <b>{props.statsheading}</b>
          </div>
          {props.referrers.map((referrer) => {
            return (
              <div class="SeperateContent">
                <span>{referrer.name}</span>
                <span>{referrer.score}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
