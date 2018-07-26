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
    stat.setAttribute('statvalue', this[type]);
    return stat;
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