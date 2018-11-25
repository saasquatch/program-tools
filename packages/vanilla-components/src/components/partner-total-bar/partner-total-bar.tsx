import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'sqh-partner-total-bar',
  styleUrl: 'partner-total-bar.scss'
})
export class PartnerTotal {
  @Prop() ishidden: boolean = false;
  @Prop() text: string;
  
  render() {
    return !this.ishidden && 
      <div>hi</div>
  }
}
