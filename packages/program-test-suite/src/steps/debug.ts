import {World, Cucumber} from '../index';
import {HookScenarioResult} from 'cucumber';

export function init(cucumber: Cucumber): void {
  const {Before, After} = cucumber;

  Before({tags: '@debug'}, function(this: World, scenario: HookScenarioResult) {
    process.env.PROGRAM_LOG_LEVEL = 'debug';
    console.log(`===== State before "${scenario.pickle.name}" =====`);
    console.log(JSON.stringify(this.state, null, 2));
    console.log('==================================================');
  });

  After({tags: '@debug'}, function(this: World, scenario: HookScenarioResult) {
    process.env.PROGRAM_LOG_LEVEL = 'none';
    console.log(`===== State after "${scenario.pickle.name}" =====`);
    console.log(JSON.stringify(this.state.current.events, null, 2));
    console.log('=================================================');
  });
}
