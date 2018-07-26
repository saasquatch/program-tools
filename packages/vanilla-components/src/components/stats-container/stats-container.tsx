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
  @State() children: HTMLElement[];
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
      this.children = Array.from(this.container.querySelectorAll('sqh-stat-component'));
      this.loading = false;
    }).then(() => {
      this.children.map(child => {
        this.setStatValue(child)
      })
    }).catch(e => {
      this.onError(e);
    });
  }

  componentWillUpdate() {
    console.log('container updated')
  }

  @Listen('statTypeUpdated')
  statTypeUpdatedHandler(event: CustomEvent) {
    this.setStatValue(event.detail)
  }

  setStatValue(child: HTMLElement) {
    const type = child.getAttribute("stattype");
    if (type === "rewardBalance") {
      const path = child.getAttribute("rewardbalancepath");
      const balance = this.getBalanceFromPath(path);
      child.setAttribute('statvalue', balance);
      return child;
    }
    child.setAttribute('statvalue', this.stats[type].toString());
    return child;
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
    const balanceObj = this.stats['rewardBalances'].find(bal => bal.type === type && bal.unit === unit);
    return balanceObj ? balanceObj[value] : "0";
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