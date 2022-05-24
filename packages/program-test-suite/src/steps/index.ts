import {Cucumber, World} from '../index';
import {types} from '@saasquatch/program-boilerplate';
import {getRandomUser} from '../faker';

import {readFileSync} from 'fs';

import deepmerge from 'deepmerge';

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

export function setup(
  paths: {template: string; schema: string; rules: string},
  Before: Function,
) {
  Before({tags: '@unit'}, function(this: World) {
    const defaultIntrospection = JSON.parse(
      readFileSync(paths.template).toString(),
    );

    const schema = JSON.parse(readFileSync(paths.schema).toString());
    const defaultRules = JSON.parse(readFileSync(paths.rules).toString());
    const defaultTemplate = deepmerge(defaultIntrospection, schema);

    this.setState({
      current: {
        rules: defaultRules,
        template: defaultTemplate,
        user: getRandomUser('REFERRED'),
      },
      config: {
        defaultIntrospection,
        defaultRules,
        defaultTemplate,
      },
    });
  });
}
