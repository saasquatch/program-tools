import {Cucumber} from '../..';
import {types} from '@saasquatch/program-boilerplate';

import * as assertions from './assertions';
import * as debug from './debug';
import * as user from './user';
import * as events from './events';
import * as rules from './rules';
import * as trigger from './trigger';

export function init(program: types.rpc.Program, cucumber: Cucumber): void {
  assertions.init(cucumber);
  debug.init(cucumber);
  user.init(cucumber);
  events.init(cucumber);
  rules.init(cucumber);
  trigger.init(program, cucumber);
}
