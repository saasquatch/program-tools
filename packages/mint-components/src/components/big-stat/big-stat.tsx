import { Component, h, Prop } from '@stencil/core';
import { BigStatView } from './big-stat-view';
import { useBigStat } from './useBigStat';

/**
 *
 *
 * @slot the description of the component
 */
@Component({
  tag: 'sqm-big-stat',
  styleUrl: 'big-stat.css',
  shadow: true,
})
export class BigStat {
  // type is a URL path with parameters
  @Prop() type: string

  render() {
    const {props, label} = useBigStat(this)
    return (
      <BigStatView {...props}>
        <slot>
          {label}
        </slot>
      </BigStatView>
    );
  }
}
