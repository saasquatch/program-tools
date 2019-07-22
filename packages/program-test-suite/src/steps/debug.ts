import {World, Cucumber} from '../..';
import {HookScenarioResult} from 'cucumber';

export function init(cucumber: Cucumber): void {
  const {Before, After} = cucumber;

  Before({tags: '@debug'}, function(this: World, scenario: HookScenarioResult) {
    console.log(`===== State before "${scenario.pickle.name}" =====`);
    console.log(JSON.stringify(this.state, null, 2));
    console.log('==================================================');
  });

  After({tags: '@debug'}, function(this: World, scenario: HookScenarioResult) {
    console.log(`===== State after "${scenario.pickle.name}" =====`);
    console.log(JSON.stringify(this.state, null, 2));
    console.log('=================================================');
  });
}
