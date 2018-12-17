import { Component, Prop } from '@stencil/core';
import { ProgressBar } from 'progressbar.js';

@Component({
  tag: 'sqh-progress-circle',
  styleUrl: 'progress-circle.scss'
})
export class ProgressCircle {
  @Prop() ishidden: boolean = false;
  @Prop() tiername: string;

  render() {
    return !this.ishidden && 
      <div>
        {this.tiername}
      </div>;
  }
}