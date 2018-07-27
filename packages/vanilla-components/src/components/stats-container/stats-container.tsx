import { Component, Prop, State, Element, Listen } from '@stencil/core';
import { API } from '../../services/WidgetHost';

@Component({
  tag: 'sqh-stats-container',
  styleUrl: 'stats-container.scss'
})
export class StatsContainer {
  @Element() container: HTMLElement;
  @Prop() ishidden: boolean = false;
  @State() loading: boolean;
  @State() stats: any[];
  @State() referralsCount: number;
  @State() referralsMonth: number;
  @State() referralsWeek: number;
  @State() rewardsCount: number;
  @State() rewardsMonth: number;
  @State() rewardsWeek: number;
  @State() rewardBalances: [RewardBalance];

  constructor() {
    this.loading = true;
  }

  componentWillLoad() {
    return API.graphql.getStats().then(res => {
      this.referralsCount = res.data.user.referralsCount.totalCount;
      this.referralsMonth = res.data.user.referralsMonth.totalCount;
      this.referralsWeek = res.data.user.referralsWeek.totalCount;
      this.rewardsCount = res.data.user.rewardsCount.totalCount;
      this.rewardsMonth = res.data.user.rewardsMonth.totalCount;
      this.rewardsWeek = res.data.user.rewardsWeek.totalCount;
      this.rewardBalances = res.data.user.rewardBalances;
      console.log(this.rewardBalances)
      this.stats = Array.from(this.container.querySelectorAll('sqh-stat-component'));
      this.loading = false;
    }).then(() => {
      this.stats.map(stat => {
        this.setStatValue(stat)
      })
    }).catch(e => {
      this.onError(e);
    });
  }

  componentWillUpdate() {
    console.log('container updated')
  }

  @Listen('statTypeUpdated')
  statTypeUpdatedHandler(stat: CustomEvent) {
    this.setStatValue(stat.detail)
  }

  setStatValue(stat: HTMLElement) {
    const type = stat.getAttribute("stattype");
    if (type === "rewardBalance") {
      const path = stat.getAttribute("rewardbalancepath");
      const balance = this.getBalanceFromPath(path);
      stat.setAttribute('statvalue', balance);
      return stat;
    }
    stat.setAttribute('statvalue', this[type].toString());
    return stat;
  }

  isValidRewardBalancePath(path: string) {
    if (!path) return false;
    const pathRegExp = /^\/t\/[^\/]+\/u\/[^\/]+\/v\/value|prettyValue$/i;
    const match = path.match(pathRegExp);
    return match && match[0] === path;
  }

  getBalanceFromPath(path) {
    if (!this.isValidRewardBalancePath(path)) return "0";
    const type = path.match(/\/t\/[^\/]+/i)[0].replace("/t/", "");
    const unit = path.match(/\/u\/[^\/]+/i)[0].replace("/u/", "");
    const value = path.match(/\/v\/value|prettyValue/i)[0].replace("/v/", "");
    const balanceObj = this.rewardBalances.find(bal => bal.type === type && bal.unit === unit);
    return balanceObj ? balanceObj[value] : "0";
  }

  onError(e: Error) {
    console.log("Error loading via GraphQL.", e);
    this.loading = false;
  }

  render() {
    return (
      this.ishidden 
      ? ''
      : (
        <slot />
      )
    );
  }
}