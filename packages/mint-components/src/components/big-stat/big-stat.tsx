import { Component, Prop, h } from '@stencil/core';
import { BigStatView } from './big-stat-view';
import { useBigStat } from './useBigStat';

@Component({
  tag: 'sqm-big-stat',
  styleUrl: 'big-stat.css',
  shadow: true,
})
export class MyComponent {

  render() {
    return <BigStatView {...useBigStat(this)} />;
  }
}
