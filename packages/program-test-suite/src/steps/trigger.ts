import {
  getIntrospectionJson,
  getAUCOUTJson,
  getAUEPTJson,
  getReferralJson,
  getProgramTriggerJson,
  getValidationJson,
} from '../faker';

import {World, Cucumber} from '../index';
import {triggerProgram, types} from '@saasquatch/program-boilerplate';

import deepmerge from 'deepmerge';

export function init(program: types.rpc.Program, cucumber: Cucumber): void {
  const {When} = cucumber;

  When('(the ){string}( trigger) runs', function(
    this: World,
    type: types.rpc.TriggerType,
  ) {
    const currentState = this.state.current || {};
    const {template, rules, programRewards} = currentState;

    let body: any;

    switch (type) {
      case 'PROGRAM_INTROSPECTION':
        body = getIntrospectionJson(template, rules, programRewards);
        break;

      case 'PROGRAM_VALIDATION':
        body = getValidationJson(this.state.validationReqs, template.id, rules);
        break;
      default:
        body = getProgramTriggerJson({
          type,
          user: this.state.current.user,
          rules: this.state.current.rules,
          time: this.state.current.time,
        });
    }

    switch (type) {
      case 'AFTER_USER_CREATED_OR_UPDATED':
        body = deepmerge(
          body,
          getAUCOUTJson(undefined, this.state.current.events),
        );
        break;
      case 'AFTER_USER_EVENT_PROCESSED':
        body = deepmerge(body, getAUEPTJson(this.state.current.events));
        break;
      case 'REFERRAL':
        body = deepmerge(
          body,
          getReferralJson(undefined, this.state.current.referral),
        );
        break;
      default:
        break;
    }

    this.setState({
      programTriggerResult: triggerProgram(body, program).json,
    });
  });
}
