import {World, Cucumber} from '../index';

export function init(cucumber: Cucumber): void {
  const {Given} = cucumber;

  Given('there are no program rules', function(this: World) {
    this.setState({
      current: {
        rules: undefined,
      },
    });
  });

  Given('there are no reward rules', function(this: World) {
    this.setState({
      current: {
        rules: {
          rewardRules: undefined,
        },
      },
    });
  });

  Given('the current time is {int}', function(this: World, time: number) {
    this.setState({
      current: {
        time,
      },
    });
  });
}
