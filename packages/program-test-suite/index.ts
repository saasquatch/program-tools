import {World as CucumberWorld} from 'cucumber';

import {init} from './src/steps';
import {inferType} from './src/utils';

// @ts-ignore
import {recursive as mergeRecursive} from 'merge';

declare interface World extends CucumberWorld {
  state: Readonly<State>;

  /**
   * Like React's setState method
   *
   * @param newState
   */
  setState: (newState: Partial<State>) => World;
}

declare interface State {
  programTriggerResult: any;
  config: Partial<{
    schemaPath: string;
    defaultIntrospection: any;
    defaultRules: any;
    defaultTemplate: any;
  }>;
  current: Partial<{
    events: any[];
    time?: number;
    user: any;
    programRewards: any[];
    rules: any;
    template: any;
  }>;
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

export class CustomWorld implements World {
  state: Readonly<State> = {
    programTriggerResult: {},
    config: {
      schemaPath: '',
      defaultIntrospection: {},
      defaultRules: {},
      defaultTemplate: {},
    },
    current: {
      events: [],
      user: {},
      programRewards: [],
      rules: {},
      template: {},
    },
  };

  setState = function(this: World, newState: Partial<State>) {
    this.state = mergeRecursive(this.state, newState);
    return this;
  };
}
