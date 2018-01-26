import { Component, Prop, State } from '@stencil/core';
import faker from 'faker';

interface MyAPI{
  ui: {
    open(): any
    close():any
  }
  analytics: {
    loadEvent():String
  }
  graphql: {
    getCurrentUser():Promise<any>
  }
}
const API:MyAPI = window['WidgetHost'];

interface Referral{
  id: string
}
const b = faker;
const demoData = [{
  id: "baz"
},{
  id: "bar"
}]

@Component({
  tag: 'referral-list',
  styleUrl: 'referral-list.scss'
})
export class ReferralList {

  @Prop() emptyText: string;
  @State() referrals: Referral[] = demoData;
  @State() loading: boolean;

  constructor(){
    if(API) {
      this.loading = true;
      API.graphql.getCurrentUser().then((res) => {
        // this.referrals = res.data.feed[0].repository.full_name;
        this.referrals = [
          {
            id: "fromServer"
          },
          {
            id: "fromServer2"
          },
          {
            id: "fromServer3"
          }          
        ]
        this.loading = false;
      }).catch(e=>{
        console.log("Error loading via GraphQL.", e);
        this.loading = false;
      });
    }else{
      this.referrals = demoData;
    }
  }
  componentWillLoad() {

  }

  componentDidLoad() {
    if (API) {
      API.analytics.loadEvent();
    }
  }

  handleClick(event: UIEvent) {
    API.ui.close();
  }

  render() {
    let content;
    if(this.loading){
      content = "Loading..."
    }else{
      content = <div>
      {this.referrals.map( r =>{
        return <div class="referral-row">
            <img src={faker.internet.avatar()} style={{float:"left"}}/>
            <div>
            {faker.name.findName()} <br/>
            <span style={{color: "grey"}}>{faker.internet.email()} </span>
              </div>
            ID: <code>{r.id}</code>
        </div>
      })}
      </div>
    }
    return (
      <div>
        <h1>Referral Data</h1>
        <pre>
        Referrals: {JSON.stringify(this.referrals,null,2)}
        </pre>
        <h1>Referral List</h1>
        {content}
      </div>
    );
  }
}
