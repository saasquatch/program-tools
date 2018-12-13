import { Component, Prop, Element, State } from '@stencil/core';
import { API } from '../../services/WidgetHost';
import { css } from 'emotion';
import debugFn from 'debug';
import { findFlagUrlByIso2Code } from 'country-flags-svg'

const debug = debugFn("sqh-balances-component")

interface stats {
  rewardBalances: Array<balance>
}

interface balance {
  unit: string
  rewardUnit: rewardUnit
  currency: string
  prettyValue: string
  prettyAssignedCredit: string
  prettyRedeemedCredit: string
}

interface rewardUnit {
  currency: currency
}

interface currency {
  localizedSymbol: string;
}

@Component({
  tag: 'sqh-balances-component',
  // styleUrl: '../../../node_modules\currency-flags\dist\currency-flags.min.css'
})
export class BalancesComponent {
  @Prop() ishidden: boolean = false;
  @Prop() tablewidth: string;
  @Prop() borderradius: number;
  @Prop() bordercolor: string;
  @Prop() headertextsize: string;
  @Prop() textsize: string;
  @Prop() textcolor: string;
  @Prop() cellpadding: number;
  @Prop() headerpadding: number;

  @Prop() showflag: boolean = true;
  @Prop() showavailable: boolean = true;
  @Prop() showearned: boolean = true;
  @Prop() showclaimed: boolean = true;

  @Prop() currencytext: string;
  @Prop() availabletext: string;
  @Prop() earnedtext: string;
  @Prop() redeemedtext: string;


  @State() stats: stats;
  @State() loading: boolean;

  @Element() textEl: HTMLElement;

  async componentWillLoad() {
    if (!this.ishidden) {
      const { rewardBalances } = await API.graphql.getBalances();

      this.stats = {
        rewardBalances: rewardBalances.filter(balance => {
          if(!balance.unit.includes('CASH')) return;
          return balance;
        })
      }

      debug(this.stats);
    }
  }

  render() {

    /* with symbols */
    // const getBalances = (
    //   this.stats.rewardBalances.map((balance: balance) => {
    //     debug(balance);
    //     return (
    //       <tr>
    //         <td>{balance.currency}</td>
    //         <td>{balance.rewardUnit.currency.localizedSymbol}{balance.prettyValue}</td>
    //         <td>{balance.rewardUnit.currency.localizedSymbol}{balance.prettyAssignedCredit}</td>
    //         <td>{balance.rewardUnit.currency.localizedSymbol}{balance.prettyRedeemedCredit}</td>
    //       </tr>
    //     )
    //   })
    // );

    const getBalances = (
      this.stats.rewardBalances.map((balance: balance) => {
        debug(balance);

        return (
          <tr>
            {/* <td><span class="cell">{balance.unit}</span><span class={`currency-flag currency-flag-lg currency-flag-${balance.currency.toLowerCase()}`}> </span></td> */}
            <td><span class="cell">{balance.unit}</span><img class="flag" src={findFlagUrlByIso2Code(balance.currency.substr(0,2))} /></td>
            { this.showavailable && <td><span class="cell">{balance.prettyValue}</span></td> }
            { this.showearned && <td><span class="cell">{balance.prettyAssignedCredit}</span></td> }
            { this.showclaimed && <td><span class="cell">{balance.prettyRedeemedCredit}</span></td> }
          </tr>
        )
      })
    );

    const tableStyle = css`
      border-collapse: collapse;
      text-align:center;
      margin:0 auto;
      width:${this.tablewidth};
      border-radius: ${this.borderradius}px;
      border:1px solid ${this.bordercolor};
      .flag {
        display: ${this.showflag ? 'inline' : 'none'};
        margin-left:10px;
        width:40px;
        vertical-align:middle;
        border:1px solid lightgrey;
        object-fit: cover;
      }
      .cell {
        vertical-align:middle;
      }
      tr td {
        padding:${this.cellpadding}px;
        border:1px solid ${this.bordercolor};
      }
      tr th {
        padding:${this.headerpadding}px;
        border:1px solid ${this.bordercolor};
      }
    `

    return !this.ishidden &&
      <div>
        <table class={`${tableStyle}`}>
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