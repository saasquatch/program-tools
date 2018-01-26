import { Component, Prop, State } from '@stencil/core';

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

const demoData:Referral[] = [
  {
    id: "foo"
  },
  {
    id: "bar"
  },
  {
    id: "baz"
  }
]

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {

  @Prop() emptyText: string;
  @State() referrals: Referral[];
  @State() loading: boolean;

  componentWillLoad() {
    if(API) {
      this.loading = true;
      API.graphql.getCurrentUser().then((res) => {
        this.referrals = res.data.feed[0].repository.full_name;
        this.loading = false;
      });
    }else{
      this.referrals = demoData;
    }
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
    return (
      <div>
        <h1>Referral List</h1>
        {this.referrals.map( r =>{
          return <div>
              Referral: {r.id}
          </div>
        })}
      </div>
    );
  }
}
