import { Component, Prop} from '@stencil/core';
import { css } from 'emotion';

@Component({
  tag: 'sqh-progress-circle',
  styleUrl: 'progress-circle.scss'
})
export class ProgressCircle {
  @Prop() ishidden: boolean = false;
  @Prop() tiername: string;
  @Prop() unit: string;
  @Prop() textcolor: string;
  @Prop() align: string;


  constructor() {
    // this.loading = true;
  }

  componentWillLoad() {
    if (!this.ishidden) {

    }
  }


  render() {
  const wrapper = css`
    color: ${ this.textcolor };
    text-align: ${ this.align };
  `

    return !this.ishidden && 
      <div class={wrapper}>
        {this.tiername}
        <div id="container">Progress Bar Here</div>

        {/* customer editable / automatically set */}
        <div>{this.unit}</div>

        {/* automatically set */}
        <div>Balance</div>

        {/* automatically set */}
        <div>Expiry</div>
      </div>;
  }
}