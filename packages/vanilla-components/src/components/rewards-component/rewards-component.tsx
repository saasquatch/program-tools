import { Component, Prop, Element, State } from '@stencil/core';
import { css } from 'emotion';
// import marked from 'marked';
import { API } from '../../services/WidgetHost';

@Component({
  tag: 'sqh-rewards-component',
  styleUrl: 'rewards-component.scss'
})
export class RewardsComponent {
  @Prop() ishidden: boolean;
  @Prop() ismarkdown: boolean;
  @Prop() text: string;
  @Prop() textalign: string;
  @Prop() iconplacement:string;
  @Prop() icon:string;
  @Prop() ctaurl:string;
  @Prop() ctatext:string;
  @Prop() reward:string;
  @Prop() programid:string;
  @Element() textEl: HTMLElement;   
  @State() rewardData: any;
  @State() rewards: Array<any>;
  @State() rewardBalances: Array<any>

  async componentWillLoad() {
    const rewardData = await API.graphql.getRewards();
    console.log("rewardData!", rewardData)
    this.rewards = rewardData.rewards.data;
 
    this.rewardBalances = rewardData.rewardBalanceDetails;
    this.rewardData = rewardData;
  }

  render() {

    // const textStyle = css`
    //   padding-top: inherit;
    //   padding-bottom: inherit;
    //   overflow-wrap: break-word;
    //   grid-column:3 / span 2;
    //   grid-row:2;
    //   text-align:left;
    // `;

    const divStyle = css`
      background: #FFF;
      border-top:1px solid #555;
      border-bottom:1px solid #555;
      padding:8px;
      text-align:center;
      // height:125px;
      // display:grid;
      // grid-template-columns: 20% 5% 35% 35% 5%;
      // grid-template-rows: 12.5% 25% 25% 25% 12.5%;
      // margin-top:1em;
    `;

    // const content = this.ismarkdown
    //   ? <div innerHTML={marked(this.text)} />
    //   : this.text

    return !this.ishidden && 
      <div class={divStyle}>
        Rewards!
        {this.rewards && this.rewards.map(data => {
          return <div style={{textAlign:"left", paddingTop:"20px"}}>
            <span style={{marginLeft:"50px"}}>• Available {data.rewardUnit.name}: {data.prettyAvailableValue || '0'}</span>
            <span style={{marginRight:"40px", float:"right"}}>• Redeemed {data.rewardUnit.name}: {data.prettyRedeemedValue || '0'}</span>    
            <hr />
          </div>
        })}
        <ul>
          {this.rewardBalances && this.rewardBalances.map(detail => {
            return <li style={{listStyle:"none"}}>Total {detail.rewardUnit.name}: {detail.prettyAvailableValue || '0'}</li>
          })}
        </ul>

      </div>;
  }
}