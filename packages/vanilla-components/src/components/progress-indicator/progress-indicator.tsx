import { Component, Prop, State, Watch, Element } from '@stencil/core';
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
  @Prop() progresstype: string;

  @Prop() progresswidth: number;
  @Prop() percentagecolor: string;
  @Prop() percentagesize: string;

  @Prop() progressstartcolor: string;
  @Prop() progressendcolor: string;
  @State() stats: stats;
  @State() rewardStats: any;

  @Element() el: HTMLElement;


  svgContainer!: HTMLInputElement;


  @Watch('progresstype')
  watchHandler() {
    const element = this.svgContainer
    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild)
    }
    this.getProgress()
  }

  @Watch('progresswidth')
  watchHandler2() {
    const element = this.svgContainer
    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild)
    }
    this.getProgress()
  }

  async componentDidLoad(){
    const { rewardBalanceDetails } = await API.graphql.getBalanceDetails();
    let closestExpiry = {dateExpires: 0, balance: 0};
    let closestExpiryDate = Math.floor(Date.now()/1000);

    rewardBalanceDetails.map(reward => {
      if(closestExpiryDate < reward.dateExpires) closestExpiry = { dateExpires: reward.dateExpires, balance: reward.prettyAvailableValue }           
    })

    this.rewardStats = {
      dateExpires: new Date(+(closestExpiry.dateExpires * 1000)).toLocaleString("en-US", { year:"numeric", month: "long", day: "numeric", hour:"numeric" } ),
      balance: closestExpiry.balance
    }
    this.getProgress();
  }

  getProgress() {
    // TODO: dynamically change progress
    let progress = 0.75

    

    let progressBar = new ProgressBar[this.progresstype] (this.svgContainer, {
      color: this.percentagecolor,
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        style: {
          color: `${ this.textcolor }`,
          position: 'absolute',
          left: '50%',
          top: '50%',
          fontFamily: '"Raleway", Helvetica, sans-serif',
          fontSize: `${this.progresswidth / 100}em`,
          
          padding: 0,
          textAlign: 'center',
          margin: 0,
          transform: {
              prefix: true,
              value: 'translate(-50%, -50%)'
          }
      },
      autoStyleContainer: true,
      },
      from: { color: this.progressstartcolor, width: 1 },
      to: { color: this.progressendcolor, width: 4 },
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
    
        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(`<img src="https://static.thenounproject.com/png/130115-200.png"><br>` + value + "%");
        }
    
      }
    });



    if (this.progresstype === 'Circle') {
      progressBar.animate(progress, {

        // @ts-ignore
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);
      
          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(`<img src="https://static.thenounproject.com/png/130115-200.png"><br>` + value + "%");
          }
      
        }
      });
    }

    if (this.progresstype === 'SemiCircle') {
      progressBar.text.style.bottom = '0px'


      progressBar.animate(progress, {
        // @ts-ignore
        step: (state, bar) => {
          bar.path.setAttribute('stroke', state.color);
          var value = Math.round(bar.value() * 100);
          if (value === 0) {
            bar.setText('');
          } else {
            bar.setText(`${value}%`);
          }
      
          bar.text.style.color = state.color;
        }
      });
    }

    if (this.progresstype === 'Line') {
      progressBar.text.style.top = '20px'

      progressBar.animate(progress, {
        // @ts-ignore
        step: (state, bar) => {
          bar.setText(Math.round(bar.value() * 100) + ' %');
        }
      });
    }
  }
  
  render() {
  const wrapperStyle = css`
    color: ${ this.textcolor };
    text-align: center;
  `

  const progressStyle = css`
    width: ${ this.progresswidth }px;
    margin: 30px auto;
    img {
      width: ${ this.progresswidth / 2}px ;
    }
  `

  return !this.ishidden && 
  <div class={wrapperStyle}>
    {this.tiername}

    <div class={progressStyle}> 
      <div ref={(el) => this.svgContainer = el as HTMLInputElement}></div>
    </div>

    {/* customer editable / automatically set */}
    <div>{this.unit}</div>

    {/* automatically set */}
    <div>Balance: {this.rewardStats && this.rewardStats.balance}</div>

    {/* automatically set */}
    <div>Expires: {this.rewardStats && this.rewardStats.dateExpires}</div>
  </div>
  }
}