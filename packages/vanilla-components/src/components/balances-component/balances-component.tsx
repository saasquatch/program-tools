import { Component, Prop, Element, State } from '@stencil/core';
import { API } from '../../services/WidgetHost';
// import { css } from 'emotion';
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
  @Prop() ismarkdown: boolean = false;
  @Prop() text: string;
  @Prop() fontfamily: string;
  @Prop() color: string;
  @Prop() fontsize: string;
  @Prop() paddingtop: string;
  @Prop() paddingbottom: string;
  @Prop() padding: string = '10px 20px 15px';
  @Prop() textalign: string;
  @Prop() background: string;
  @Prop() height: string;

  @State() stats: stats;
  @State() loading: boolean;

  @Element() textEl: HTMLElement;   

  componentWillLoad() {
    // this.stats = {
    //   rewardBalances: {
    //     unit: '',
    //     prettyvalue: '',
    //     prettyAssignedCredit: '',
    //     prettyRedeemedCredit: ''
    //   }
    // };

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


    return !this.ishidden && 
      <div>
        <table class="the-table">
          <tr>
            <th>Currency</th>
            <th>Available</th>
            <th>Earned</th>
            <th>Redeemed</th> 
          </tr>
          {this.stats ? getBalances : ''}
        </table>

      </div>;
  }
}