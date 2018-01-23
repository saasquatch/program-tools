import { Component, Prop, State } from '@stencil/core';
import API from '@saasquatch/widget-host';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {

  @Prop() user: string;
  @State() id: string;

  componentWillLoad() {
    API.graphql.getCurrentUser().then((res) => {
      this.id = res.user;
    })
  }

  componentDidLoad() {
    // API.analytics.loadEvent();
  }

  handleClick(event: UIEvent) {
    API.ui.open();
  }

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>
          Hello {this.user} with id {this.id}

          <button onClick={this.handleClick.bind(this)}>Click here!</button>
        </main>
      </div>
    );
  }
}
