import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'sqp-reward-cell',
  shadow: true,
})
export class ReferralTableRewardsCell {
  @Prop() meta: any;

  render() {
    console.log(this.meta);
    return <div>{this.meta?.integration?.name}</div>;
  }
}
