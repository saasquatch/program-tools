import {World, Cucumber} from '../..';

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
    let events = this.state.current.events;

    if (!events) {
      events = [JSON.parse(data)];
    } else {
      events.push(JSON.parse(data));
    }

    this.setState({
      current: {
        events,
      },
    });
  });
}
