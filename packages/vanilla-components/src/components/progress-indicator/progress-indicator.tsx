import { Component, Prop, State } from '@stencil/core';
import ProgressBar  from 'progressbar.js';
import { API } from '../../services/WidgetHost';
import { css } from 'emotion';
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
  @Prop() tiername: string;
  @Prop() unit: string;
  @Prop() textcolor: string;
  @Prop() align: string;
  @Prop() progresstype: string = "Circle";
  @State() stats: stats;
 
 async  componentDidLoad(){
    const { rewardBalanceDetails } = await API.graphql.getBalanceDetails();
    let closestExpiry = {dateExpires: '', balance: ''};
    let closestExpiryDate = Math.floor(Date.now()/1000);

    rewardBalanceDetails.map(reward => {
      console.log("reward.dateExpires", reward.dateExpires)
      if(closestExpiryDate < reward.dateExpires) closestExpiry = { dateExpires: reward.dateExpires, balance: reward.prettyAvailableValue }           
    })

    console.log("winner:", closestExpiry);
    this.getProgress();
  }

  getProgress(){

    var bar = new ProgressBar[this.progresstype]('#container', {
      color: '#aaa',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false
      },
      from: { color: '#aaa', width: 1 },
      to: { color: '#00cfff', width: 4 },
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
    
        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText('<img style="width:100%" src="https://static.thenounproject.com/png/130115-200.png">' + value + "%");
        }
    
      }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
    
    bar.animate(0.75);  // Number from 0.0 to 1.0
  }
  
  render() {
  const wrapper = css`
    color: ${ this.textcolor };
    text-align: ${ this.align };
  `

    console.log(ProgressBar);
    return !this.ishidden && 
      <div class={wrapper}>
        {this.tiername}
        <div id="container"></div>;

        {/* customer editable / automatically set */}
        <div>{this.unit}</div>

        {/* automatically set */}
        <div>Balance</div>

        {/* automatically set */}
        <div>Expiry</div>
      </div>;
  }
}