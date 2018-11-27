import { Component, Prop } from '@stencil/core';
// import * as vega from "vega-lib"
import vegaEmbed from "vega-embed";
// import { spec } from './bar';

const spec = "https://raw.githubusercontent.com/saasquatch/program-tools/craig/packages/vanilla-components/src/components/partner-total-bar/bar.vg.json";

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
    console.log("SPEC", spec)
    return !this.ishidden && 
      <div id="vis"></div>
      // <div id="view"></div>
  }
}