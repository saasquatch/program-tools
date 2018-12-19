import { Component, Prop, State } from '@stencil/core';
import ProgressBar from 'progressbar.js';
import { API } from '../../services/WidgetHost';
import { css } from 'emotion';
import { getStats } from '../../services/StatPaths';

interface Stats {
  total: any,
  progress: any
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

  @Prop() progresswidth: string;
  @Prop() percentagecolor: string;
  @Prop() percentagesize: string;

  @Prop() imagewidth: string;
  @Prop() progressstartcolor: string;
  @Prop() progressendcolor: string;

  @Prop({attr:"progress-variable"}) progressvariable: string;
  @Prop({attr:"total-variable"}) totalvariable: string;

  @State() rewardStats: { dateExpires: string; balance: number; };


  async componentDidLoad() {
    const { rewardBalanceDetails } = await API.graphql.getBalanceDetails();
    let closestExpiry = { dateExpires: 0, balance: 0 };
    let closestExpiryDate = Math.floor(Date.now() / 1000);

    rewardBalanceDetails.map(reward => {
      if (closestExpiryDate < reward.dateExpires) closestExpiry = { dateExpires: reward.dateExpires, balance: reward.prettyAvailableValue }
    })

    if (closestExpiry.dateExpires) {
      this.rewardStats = {
        dateExpires: new Date(+(closestExpiry.dateExpires * 1000)).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "numeric" }),
        balance: closestExpiry.balance
      }
    }

    const statTypes = {
      total: this.totalvariable,
      progress: this.progressvariable
    }
    console.log(statTypes)
    // const stat = await getStats(['/rewardsCount', '/rewardBalance/CREDIT/CENTS/totalAssignedValue',"/customField/lastSeenDate","/referralsCount"]);

    const statResponse = await getStats([statTypes.total, statTypes.progress]);

    this.getProgress({
      total: statResponse[statTypes.total],
      progress: statResponse[statTypes.progress]
    });
  }

  getProgress(stats:Stats) {

    if (this.progresstype === "Circle") {
      var bar = new ProgressBar[this.progresstype]('#container', {
        color: this.percentagecolor,
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false
        },
        from: { color: this.progressstartcolor, width: 1 },
        to: { color: this.progressendcolor, width: 4 },
        // Set default step function for all animate calls
        step: function (state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * 100);
          // if (value === 0) {
          //   circle.setText('');
          // } else {
            circle.setText(`<img src="https://static.thenounproject.com/png/130115-200.png"><br>` + value + "%");
          // }

        }
      });
      bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
      bar.text.style.fontSize = this.percentagesize;
    }

    if (this.progresstype === "SemiCircle") {
      var bar = new ProgressBar.SemiCircle('#container', {
        strokeWidth: 6,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        svgStyle: null,
        text: {
          value: '',
          alignToBottom: false
        },
        from: { color: '#FFEA82' },
        to: { color: '#ED6A5A' },
        // Set default step function for all animate calls
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
      bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
      bar.text.style.fontSize = '2rem';
    }

    if (this.progresstype === "Line") {
      var bar = new ProgressBar.Line('#container', {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: { width: '100%', height: '100%' },
        text: {
          style: {
            // Text color.
            // Default: same as stroke color (options.color)
            color: '#999',
            padding: 0,
            margin: 0,
            transform: null
          },
          autoStyleContainer: false
        },
        from: { color: '#FFEA82' },
        to: { color: '#ED6A5A' },
        // @ts-ignore
        step: (state, bar) => {
          bar.setText(Math.round(bar.value() * 100) + ' %');
        }
      });
    }
    let progress = 0;
    try{
      progress = Math.round(stats.progress/stats.total*100);
    }catch(e){
      // Math error or null error -- just render 0
    }
    bar.animate(progress);  // TODO: graphql call to get progress and goal to find out percentage and input
    // TODO: Add in for Custom as well https://jsfiddle.net/kimmobrunfeldt/dnLLgm5o/
  }

  render() {
    const wrapperStyle = css`
      color: ${ this.textcolor};
      text-align: center;
    `

    const unitStyle = css`
      margin-top: 35px
    `

    const progressStyle = css`
      width: ${ this.progresswidth};
      margin: 0 auto;
      img {
        width: ${ this.imagewidth};
      }
    `

    return !this.ishidden &&
      <div class={wrapperStyle}>
        {this.tiername}

        <div class={progressStyle}>
          <div id="container"></div>
        </div>

        {/* customer editable / automatically set */}
        <div class={unitStyle}>{this.unit}</div>

        {/* automatically set */}
        <div>Balance: {this.rewardStats && this.rewardStats.balance}</div>

        {/* automatically set */}
        {this.rewardStats && this.rewardStats.dateExpires && <div>Expires: {this.rewardStats && this.rewardStats.dateExpires}</div>}
      </div>
  }
}