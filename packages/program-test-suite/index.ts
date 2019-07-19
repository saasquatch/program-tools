import {World as CucumberWorld} from 'cucumber';

import {init} from './steps';
import {inferType} from './utils';

// @ts-ignore
import {recursive as mergeRecursive} from 'merge';

declare interface World extends CucumberWorld {
  state: Readonly<Partial<State>>;

  /**
   * Like React's setState method
   *
   * @param newState
   */
  setState: (newState: Partial<State>) => World;
}

declare interface State {
  introspectionTrigger: any;
  programTriggerResult: any;
  eventTrigger: any;
  config: {
    schemaPath?: string;
    defaultIntrospection?: any;
    defaultRules?: any;
    defaultTemplate?: any;
  };
}

declare interface Cucumber {
  Before: Function;
  After: Function;
  Given: Function;
  When: Function;
  Then: Function;
}

if (!process.env.PROGRAM_LOG_LEVEL) {
  process.env.PROGRAM_LOG_LEVEL = 'none';
}

export {World, State, Cucumber, init, inferType};

export function CustomWorld() {
  this.state = {};

  this.setState = (newState: Partial<State>) => {
    this.state = mergeRecursive(this.state, newState);
    return this;
  };
}
