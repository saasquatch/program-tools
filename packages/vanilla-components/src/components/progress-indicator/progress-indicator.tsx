import { Component, Prop, State } from '@stencil/core';
import { API } from '../../services/WidgetHost';
import { css } from 'emotion';
import FormatJS from '../../services/FormatJs';
import RewardProgressBar, {present} from './progress-bars';

interface stats {
  rewardBalanceDetails: Array<balance>
}

interface balance {
  unit: string
  rewardUnit: rewardUnit
  prettyAvailableValue: string
  prettyAssignedCredit: string
  prettyRedeemedCredit: string
}

interface rewardUnit {
  currency: currency
}

interface currency {
  symbol: string
  displayName: string
  currencyCode: string
}

@Component({
  tag: 'sqh-progress-indicator',
  styleUrl: 'progress-indicator.scss'
})

export class ProgressIndicator {
  @Prop() ishidden: boolean = false;
  @Prop() textcolor: string;
  @Prop() align: string;
  @Prop() progresstype: string;
  @Prop() earned: string;
  @Prop() progress: string;

  @Prop() progresswidth: string;
  @Prop() percentagecolor: string;
  @Prop() percentagesize: string;
  @Prop() programid:string;
  @Prop() progresscolor: string;
  @State() stats: stats;
  @State() rewardStats: any;
  @State() progressMessage: string;
  @State() rewardComplete: boolean;

  @State() loading: boolean = true;
 
  async componentWillLoad() {
    this.rewardStats = {
      amountEarned:0,
      purchaseTotal:0,
      programGoal:0,
      progress: 0,
      progressToGoal:0
    }

    const userProgress = await API.graphql.getUserProgress();
    const programRules = await API.graphql.getProgramRules(this.programid);
    this.loading = false;

    const purchaseTotal = userProgress.customFields[programRules.id + '_totalValue'] || 0;
    const programGoal = programRules.rules.rewardRules.rewardGoal;
    console.log(userProgress)
    console.log(programRules)

    this.rewardStats = {
      amountEarned: userProgress.rewardBalanceDetails[0] ? userProgress.rewardBalanceDetails[0].prettyAvailableValue : null,
      purchaseTotal,
      programGoal,
      progress: Math.floor(((purchaseTotal % programGoal) / programGoal) * 100) / 100,
      progressToGoal:(programGoal - (purchaseTotal % programGoal))
    }
  }
  async componentDidLoad(){

    if(this.rewardStats.purchaseTotal > 0 && this.rewardStats.purchaseTotal % this.rewardStats.programGoal == 0){
      this.rewardComplete = true;
      this.rewardStats.progress = 1
      this.getProgress();
      return;
    }

    const formatVariables = {
      amountNeeded:this.rewardStats.progressToGoal
    }

    this.progressMessage = FormatJS.format(this.progress, formatVariables);

    console.log(this.rewardStats);

    this.getProgress();
    
  }

  getProgress(){
    const {progresstype, percentagesize, percentagecolor, progresscolor } = this;
    const bar = RewardProgressBar({progresstype, percentagesize, percentagecolor, progresscolor})
    bar.animate(this.rewardStats.progress); 
  }
  
  render() {
  const wrapperStyle = css`
    color: ${ this.textcolor };
    text-align: center;
    display:inline-block;
  `

  // progressbar-text has to override strange positioning of image inside ProgressBar
  const progressStyle = css`
    position:relative;
    width: ${ this.progresswidth };
    // margin: 30px auto;
    margin-top:0;
    .progressbar-text {
      top: ${ this.rewardComplete ? "37%" : "48%" }!important;  
    }
  `

  const completeStyle = css`
    margin-top:0em;
    font-size:16px;
    background-color:#FFF;
  `;

  const circleStyle = css`
    transform: scaleX(-1);
  `

  const textStyle = css`
    position: absolute; 
    left: ${this.rewardComplete ? '53.5%' : '55%'}; 
    top:82%; 
    padding: 0px; 
    margin: 0px; 
    transform: translate(-50%, -50%); 
    color: ${this.percentagecolor || 'rgb(0, 157, 245)'}; 
    font-family: Roboto, Helvetica, sans-serif; 
    font-size: ${this.rewardComplete ? '30px' : '34px'};
    font-weight:bold;
  `
  const presentStyle = css`
    position: absolute; 
    left: 51%; 
    top: 52%; 
    transform: translate(-50%, -50%);
  `;

  const percentStyle = css`
    font-size:65%;
    vertical-align: top;
    display: inline-block;
    margin-top: 3px;
    margin-left: ${this.rewardComplete ? '0px' : '-1px'};
  `

  return !this.ishidden && 
  this.rewardComplete ? 
    <div class={wrapperStyle}>
      { this.rewardStats.amountEarned && <div>{this.rewardStats && this.earned} {this.rewardStats && this.rewardStats.amountEarned}</div>}
      <div class={progressStyle}>
        <div id="container">
        { this.progresstype=="Path" && [
        <svg class={circleStyle} width="210px" height="210px" viewBox="0 0 133 133" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="blue-semi-circle" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
            <path d="M94.2309355,112 C106.803489,103.004938 115,88.2630912 115,71.6028679 C115,44.2079604 92.8380951,22 65.5,22 C38.1619049,22 16,44.2079604 16,71.6028679 C16,88.1040219 24.0407405,102.723258 36.4101421,111.740781" id="Grey-Semi" stroke="#E9E9E9" stroke-width="6.5"></path>
            <path id="custom-circle" d="M94.2309355,112 C106.803489,103.004938 115,88.2630912 115,71.6028679 C115,44.2079604 92.8380951,22 65.5,22 C38.1619049,22 16,44.2079604 16,71.6028679 C16,88.1040219 24.0407405,102.723258 36.4101421,111.740781" stroke="#2D97D3" stroke-width="6.5"></path>
          </g>
        </svg>, 
        <span class={presentStyle}>{present}</span>,
        <div class={textStyle}>          
            <br/>{this.rewardStats && Math.round(this.rewardStats.progress * 100)}<span class={percentStyle}>%</span><br/><p class={completeStyle}>COMPLETE</p>
        </div>      
        ]}
        </div>
      </div>
  </div>
  :
  <div class={wrapperStyle}>
    {/* { this.rewardStats.amountEarned && <div>{this.rewardStats && this.earned} {this.rewardStats && this.rewardStats.amountEarned} credit</div>} */}
    <div class={progressStyle}>
      <div id="container">
        { this.progresstype=="Path" && [
        <svg class={circleStyle} width="210px" height="210px" viewBox="0 0 133 133" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="blue-semi-circle" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
            <path d="M94.2309355,112 C106.803489,103.004938 115,88.2630912 115,71.6028679 C115,44.2079604 92.8380951,22 65.5,22 C38.1619049,22 16,44.2079604 16,71.6028679 C16,88.1040219 24.0407405,102.723258 36.4101421,111.740781" id="Grey-Semi" stroke="#E9E9E9" stroke-width="6.5"></path>
            <path id="custom-circle" d="M94.2309355,112 C106.803489,103.004938 115,88.2630912 115,71.6028679 C115,44.2079604 92.8380951,22 65.5,22 C38.1619049,22 16,44.2079604 16,71.6028679 C16,88.1040219 24.0407405,102.723258 36.4101421,111.740781" stroke={this.progresscolor} stroke-width="6.5"></path>
          </g>
        </svg>, 
        <span class={presentStyle}>{present}</span>,
        <div class={textStyle}>          
            {/* <br/>{this.rewardStats && Math.round(this.rewardStats.progress * 100)}<span class={percentStyle}>%</span><br/><p class={completeStyle}>COMPLETE</p> */}
            <br/>{this.rewardStats && <div>
              <span style={{fontSize:"26px"}}>{this.rewardStats.purchaseTotal}</span>
              <hr style={{borderColor:"#285F62", marginTop:"0", marginBottom:"0"}} />
              <p style={{fontSize:"26px"}} class={completeStyle}>{this.rewardStats.programGoal}</p>
            </div>}
        </div>      
        ]}
      </div>
    </div> 
  </div>
  }
}