import { Component, Prop, Element, State } from '@stencil/core';
import { API } from '../../services/WidgetHost';
import { css } from 'emotion';
import debugFn from 'debug';
import { findFlagUrlByIso2Code } from 'country-flags-svg'

const debug = debugFn("sqh-balances-component")

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
  tag: 'sqh-balances-component'
})
export class BalancesComponent {
  @Prop() ishidden: boolean = false;
  @Prop() tablewidth: string;
  @Prop() tablebackgroundcolor: string;
  @Prop() borderradius: number;
  @Prop() bordercolor: string;
  @Prop() borderwidth: number;
  @Prop() headertextsize: string;
  @Prop() headertextcolor: string;
  @Prop() textsize: string;
  @Prop() textcolor: string;
  @Prop() fontfamily: string;
  @Prop() cellpadding: number;
  @Prop() headerpadding: number;
  @Prop() flagwidth: number;

  @Prop() showflag: boolean = true;
  @Prop() showavailable: boolean = true;
  @Prop() showearned: boolean = true;
  @Prop() showclaimed: boolean = true;

  @Prop() currencytext: string;
  @Prop() currencytextcolor: string;
  @Prop() availabletext: string;
  @Prop() availabletextcolor: string;
  @Prop() earnedtext: string;
  @Prop() earnedtextcolor: string;
  @Prop() redeemedtext: string;
  @Prop() redeemedtextcolor: string;


  @State() stats: stats;
  @State() loading: boolean;

  @Element() textEl: HTMLElement;

  async componentWillLoad() {
    if (!this.ishidden) {
      const { rewardBalanceDetails } = await API.graphql.getBalanceDetails();

      this.stats = {
        rewardBalanceDetails: rewardBalanceDetails.filter(balance => {
          if(!balance.unit.includes('CASH')) return;
          return balance;
        })
      }

      debug(this.stats);
    }
  }

  render() {
    const getBalances = (
      this.stats.rewardBalanceDetails.map((balance: balance) => {
        debug(balance);
        return (
          <tr>
            <td><span class="cell currency">{balance.rewardUnit.currency.displayName}</span> <img class="flag" src={findFlagUrlByIso2Code(balance.rewardUnit.currency.currencyCode.substr(0,2))} /></td>
            { this.showavailable && <td><span class="cell available">{balance.prettyAvailableValue}</span></td> }
            { this.showearned && <td><span class="cell earned">{balance.prettyAssignedCredit}</span></td> }
            { this.showclaimed && <td><span class="cell redeemed">{balance.prettyRedeemedCredit}</span></td> }
          </tr>
        )
      })
    );

    const tableStyle = css`
      background-color: ${this.tablebackgroundcolor};
      border-collapse: collapse;
      text-align:center;
      margin:0 auto;
      width:${this.tablewidth};
      border:${this.borderwidth}px solid ${this.bordercolor};
      color: ${this.textcolor};
      font-size: ${this.textsize}px;
      font-family: ${this.fontfamily};
      .flag {
        display: ${this.showflag ? 'inline' : 'none'};
        width:${this.flagwidth || 40}px;
        vertical-align:middle;
        border:1px solid lightgrey;
        object-fit: cover;
        float:right;
      }
      .cell {
        vertical-align:middle;
      }
      tr td {
        padding:${this.cellpadding}px;
        border:${this.borderwidth}px solid ${this.bordercolor};
        max-width:148px;
      }
      tr th {
        padding:${this.headerpadding}px;
        border:${this.borderwidth}px solid ${this.bordercolor};
        color:${this.headertextcolor};
        font-size:${this.headertextsize}px;
      }
      .currency {
        float:left;
      }
      .available {
        color: ${this.availabletextcolor};
      }
      .earned {
        color: ${this.earnedtextcolor};
      }
      .redeemed {
        color: ${this.redeemedtextcolor};
      } 
    `

    return !this.ishidden &&
      <div>
        <table class={tableStyle}>
          <tr>
            <th>{this.currencytext}</th>
            { this.showavailable && <th>{this.availabletext}</th> }
            { this.showearned && <th>{this.earnedtext}</th> }
            { this.showclaimed && <th>{this.redeemedtext}</th> }
          </tr>
          {this.stats ? getBalances : ''}
        </table>
      </div>;
  }
}