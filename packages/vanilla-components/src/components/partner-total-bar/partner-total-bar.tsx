import { Component, Prop } from '@stencil/core';
// import * as vega from "vega-lib"
import vegaEmbed from "vega-embed";

const spec = "https://raw.githubusercontent.com/vega/vega/master/docs/examples/bar-chart.vg.json";

// const spec = "bar.vg.json";

vegaEmbed('#vis', spec, {
  defaultStyle: true
});

@Component({
  tag: 'sqh-partner-total-bar',
  styleUrl: 'partner-total-bar.scss'
})
export class PartnerTotal {
  @Prop() ishidden: boolean = false;
  @Prop() text: string;
  
  render() {
    return !this.ishidden && 
      <div id="vis"></div>
      // <div id="view"></div>
  }
}