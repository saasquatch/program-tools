import { h } from './index-832bd454.js';

function LeaderboardRankView(props) {
  const { data } = props;
  return h("span", { class: "P" }, data.rank);
}

export { LeaderboardRankView as L };
