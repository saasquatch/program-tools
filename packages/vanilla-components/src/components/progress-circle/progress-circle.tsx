import { Component, Prop} from '@stencil/core';

@Component({
  tag: 'sqh-progress-circle',
  styleUrl: 'progress-circle.scss'
})
export class ProgressCircle {

  @Prop() ishidden: boolean = false;
  @Prop() tiername: string;


  constructor() {
    // this.loading = true;
  }

  componentWillLoad() {
    if (!this.ishidden) {

    }
  }


  render() {

    return !this.ishidden && 
      <div>
        {this.tiername}
        <div id="container">{this.bar}</div>
      </div>;
  }
}