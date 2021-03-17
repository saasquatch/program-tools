import { Component, h, Prop } from '@stencil/core';
import { withHooks } from '@saasquatch/stencil-hooks';
import { BigStatView } from './big-stat-view';
import { useBigStat } from './useBigStat';

/**
 *
 * @uiName Big Stat
 * @slot the description of the component
 */
@Component({
  tag: 'sqm-big-stat',
  styleUrl: 'big-stat.css',
  shadow: true,
})
export class BigStat {
  /**
   * @uiName Stat Type
   */
  @Prop() type: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { props, label } = useBigStat(this);
    return (
      <BigStatView {...props}>
        <slot>{label}</slot>
      </BigStatView>
    );
  }
}
