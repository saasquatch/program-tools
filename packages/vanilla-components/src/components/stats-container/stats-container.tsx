import { Component, Prop, State, Element, Listen } from '@stencil/core';
import { API } from '../../services/WidgetHost';
import pathToRegexp from "path-to-regexp";

@Component({
  tag: 'sqh-stats-container',
  styleUrl: 'stats-container.scss'
})
export class StatsContainer {
  @Element() container: HTMLElement;
  @Prop() ishidden: boolean = false;
  @State() loading: boolean;
  @State() stats: object;

  constructor() {
    this.loading = true;
  }

  componentWillLoad() {
    return API.graphql.getStats().then(res => {
      this.stats = {
        referralsCount: res.data.user.referralsCount.totalCount,
        referralsMonth: res.data.user.referralsMonth.totalCount,
        referralsWeek: res.data.user.referralsWeek.totalCount,
        rewardsCount: res.data.user.rewardsCount.totalCount,
        rewardsMonth: res.data.user.rewardsMonth.totalCount,
        rewardsWeek: res.data.user.rewardsWeek.totalCount,
        rewardBalances: res.data.user.rewardBalances
      }
      this.loading = false;
    }).then(() => {
      const children = Array.from(this.container.querySelectorAll('sqh-stat-component'));
      children.map(child => {
        this.setStatValue(child)
      })
    }).catch(e => {
      this.onError(e);
    });
  }

  @Listen('statTypeUpdated')
  statTypeUpdatedHandler(event: CustomEvent) {
    this.setStatValue(event.detail);
  }

  @Listen('statAdded')
  statAddedHandler(event: CustomEvent) {
    if (this.stats) this.setStatValue(event.detail);
  }

  statPaths = [
    "/rewardBalance/:type/:unit/:valuetype?",
    "/:statName"
  ]

  statPathRegexp = this.statPaths.map(path => {
    const keys = []
    const regexp = pathToRegexp(path, keys)
    return { regexp, keys }
  })

  setStatValue(child: HTMLElement) {
    const path = child.getAttribute("stattype");
    const stat = this.getStatFromPath(path);
    child.setAttribute('statvalue', `${stat}`);
    return child;
  }

  getStatFromPath(path) {
    const statPath = this.statPathRegexp.find(stat => stat.regexp.test(path));
    if (!statPath) return 0;
    const { keys, regexp } = statPath;
    const res = regexp.exec(path);
    const statVariables = {};
    keys.forEach((k, i) => statVariables[k.name] = res[i + 1]);
    return this.getStatValue(statVariables);
  }

  getStatValue(statVariables) {
    if (statVariables.statName) return this.stats[statVariables.statName] || 0;
    return this.getRewardBalance(statVariables);
  }

  getRewardBalance(statVariables) {
    const { type, unit, valuetype } = statVariables;
    const rewardBalance = this.stats['rewardBalances'].find(rb => rb.type === type && rb.unit === unit);
    if (!rewardBalance) return 0;
    if (valuetype === "pretty") return rewardBalance.prettyValue || rewardBalance.value;
    return rewardBalance.value;
  }

  onError(e: Error) {
    console.log("Error loading via GraphQL.", e);
    this.loading = false;
  }

  render() {
    return (
      <div style={{display: this.ishidden ? 'none' : 'inherit'}}>
        <slot />
      </div>
    );
  }
}