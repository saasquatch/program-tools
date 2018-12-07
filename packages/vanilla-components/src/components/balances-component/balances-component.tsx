import { Component, Prop, Element, State } from '@stencil/core';
import { API } from '../../services/WidgetHost';
import { css } from 'emotion';
import debugFn from 'debug'

const debug = debugFn("sqh-balances-component")

interface stats {
  rewardBalances: Array<balance>
}

interface balance {
  unit: string
  prettyValue: string
  prettyAssignedCredit: string
  prettyRedeemedCredit: string
}

@Component({
  tag: 'sqh-balances-component',
  styleUrl: 'balances-component.scss'
})
export class BalancesComponent {
  @Prop() ishidden: boolean = false;
  @Prop() borderradius: number;
  @Prop() bordercolor: string;
  @Prop() textcolor: string;
  @Prop() cellpadding: number;
  @Prop() headerpadding: number;

  @Prop() currencytext: string;
  @Prop() availabletext: string;
  @Prop() earnedtext: string;
  @Prop() redeemedtext: string;
 
  @State() stats: stats;
  @State() loading: boolean;

  @Element() textEl: HTMLElement;   

  componentWillLoad() {
    if (!this.ishidden) {
      return API.graphql.getBalances().then(res => {
        const balances = res.rewardBalances;
        this.stats = {
          rewardBalances:balances.filter(balance => {
            if(!balance.unit.includes('CASH')) return;
            return balance;
          })
        }
        this.loading = false;
        debug(this.stats);
      }).catch(e => {
        this.onError(e);
      });
    }
  }

  onError(e: Error) {
    console.log("Error loading via GraphQL.", e);
    this.loading = false;
  }

  render() {
    let getBalances;

    getBalances = (
      this.stats.rewardBalances.map((balance: balance) => {
        debug(balance);
        return (
          <tr>
            <td>{balance.unit}</td>
            <td>{balance.prettyValue}</td>
            <td>{balance.prettyAssignedCredit}</td>
            <td>{balance.prettyRedeemedCredit}</td>
          </tr>
        )
      })
    );

    const tableStyle = css`
      border-collapse: collapse;
      text-align:center;
      width:100%;
      border-radius: ${this.borderradius}px;
      border:1px solid ${this.bordercolor};    

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
        <table class={`${tableStyle} balances-table`}>
          <tr>
            <th>{this.currencytext}</th>
            <th>{this.availabletext}</th>
            <th>{this.earnedtext}</th>
            <th>{this.redeemedtext}</th> 
          </tr>
          {this.stats ? getBalances : ''}
        </table>
      </div>;
  }
}