import {World, Cucumber} from '../index';

export function init(cucumber: Cucumber): void {
  const {Given} = cucumber;

  Given('there are no events', function(this: World) {
    this.setState({
      current: {
        events: [],
      },
    });
  });

  Given('the following event exists:', function(this: World, data: any) {
    this.setState({
      current: {
        events: [...this.state.current.events, JSON.parse(data)],
      },
    });
  });
}
