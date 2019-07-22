import {HookScenarioResult} from 'cucumber';
import {getIntrospectionJson} from './faker';

import {World, State, Cucumber} from '..';

import assert from 'assert';
import delve from 'dlv';
import {readFileSync} from 'fs';

// @ts-ignore
import {recursive as mergeRecursive} from 'merge';

import {MutationStepRow, AnalyticsStepRow} from './types';
import {inferType} from './utils';

import {
  Program,
  triggerProgram,
  getTriggerBody,
} from '@saasquatch/program-boilerplate';

export function init(program: Program, cucumber: Cucumber): void {
  const {Before, After, Given, When, Then} = cucumber;

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

  When('{string} runs', function(this: World, trigger: string) {
    const currentState = this.state.current || {};
    const {template, rules, programRewards} = currentState;

    const body =
      trigger === 'PROGRAM_INTROSPECTION'
        ? getIntrospectionJson(template, rules, programRewards)
        : getTriggerBody({
            ...this.state.eventTrigger,
            activeTrigger: {
              ...this.state.eventTrigger.activeTrigger,
              type: trigger,
            },
          });

    this.setState({
      programTriggerResult: triggerProgram(body, program).json,
    });
  });

  Then('the following mutations will exist:', function(this: World, data: any) {
    data.hashes().forEach((row: MutationStepRow) => {
      switch (row.type) {
        case 'reward':
          const relevantRewards = this.state.programTriggerResult.mutations.filter(
            m => {
              return (
                m.type === 'CREATE_REWARD' &&
                m.data.user.id === `${row.user.toUpperCase()}ID` &&
                m.data.user.accountId ===
                  `${row.user.toUpperCase()}ACCOUNTID` &&
                m.data.key === row.key
              );
            },
          );

          assert.strictEqual(relevantRewards.length, Number(row.count));
          break;
        case 'email':
          const relevantEmails = this.state.programTriggerResult.mutations.filter(
            m => {
              return (
                m.type === 'SEND_EMAIL' &&
                m.data.user.id === `${row.user.toUpperCase()}ID` &&
                m.data.user.accountId ===
                  `${row.user.toUpperCase()}ACCOUNTID` &&
                m.data.key === row.key
              );
            },
          );

          assert.strictEqual(relevantEmails.length, Number(row.count));
          break;
        default:
      }
    });
  });

  Then('the following analytics will exist:', function(this: World, data: any) {
    data.hashes().forEach((row: AnalyticsStepRow) => {
      const relevantAnalytics = this.state.programTriggerResult.analytics.filter(
        (a: any) => {
          return (
            a.eventType === row.type &&
            a.data.user.id === `${row.user.toUpperCase()}ID` &&
            a.data.user.accountId === `${row.user.toUpperCase()}ACCOUNTID`
          );
        },
      );

      assert.strictEqual(relevantAnalytics.length, Number(row.count));
    });
  });

  Then('there will be no mutations', function(this: World) {
    assert.strictEqual(this.state.programTriggerResult.mutations.length, 0);
  });

  Then('there will be no analytics', function(this: World) {
    assert.strictEqual(this.state.programTriggerResult.analytics.length, 0);
  });

  Then('there will be {int} {string} reward(s) for the {word} user', function(
    this: World,
    count: number,
    key: string,
    user: string,
  ) {
    const relevantRewards = this.state.programTriggerResult.mutations.filter(
      m => {
        return (
          m.type === 'CREATE_REWARD' &&
          m.data.user.id === `${user.toUpperCase()}ID` &&
          m.data.user.accountId === `${user.toUpperCase()}ACCOUNTID` &&
          m.data.key === key
        );
      },
    );

    assert.strictEqual(relevantRewards.length, count);
  });

  Then('there will be {int} {string} email(s) for the {word} user', function(
    this: World,
    count: number,
    key: string,
    user: string,
  ) {
    const relevantRewards = this.state.programTriggerResult.mutations.filter(
      m => {
        return (
          m.type === 'SEND_EMAIL' &&
          m.data.user.id === `${user.toUpperCase()}ID` &&
          m.data.user.accountId === `${user.toUpperCase()}ACCOUNTID` &&
          m.data.key === key
        );
      },
    );

    assert.strictEqual(relevantRewards.length, count);
  });

  Then('the programId will be {string}', function(this: World, k: string) {
    assert.strictEqual(this.state.programTriggerResult.programId, k);
  });

  Then('the output will include a {string} event key trigger', function(
    this: World,
    key: string,
  ) {
    const trigger = this.state.programTriggerResult.trigger;
    assert(trigger.eventKeys.includes(key));
  });

  Then('the output will not include a {string} email', function(
    this: World,
    key: string,
  ) {
    const emails = this.state.programTriggerResult.emails;
    assert(!emails.some(e => e.key === key));
  });

  Then('the output will include a {string} email', function(
    this: World,
    key: string,
  ) {
    const emails = this.state.programTriggerResult.emails;
    assert(emails.some(e => e.key === key));
  });

  Given('there are no events', function(this: World) {
    this.setState({
      eventTrigger: {
        activeTrigger: {
          events: [],
        },
      },
    });
  });

  Given('the following event exists:', function(this: World, data: any) {
    let events = this.state.eventTrigger.activeTrigger.events;

    if (!events) {
      events = [JSON.parse(data)];
    } else {
      events.push(JSON.parse(data));
    }

    this.setState({
      eventTrigger: {
        activeTrigger: {
          events,
        },
      },
    });
  });

  Then('the following MODERATE_GRAPH_NODES mutation will exist:', function(
    this: World,
    data: any,
  ) {
    const relevantMutations = this.state.programTriggerResult.mutations.filter(
      m => {
        const correctType = m.type === 'MODERATE_GRAPH_NODES';

        const passesFilters = !data.rows().some(row => {
          return delve(m.data, row[0]) !== inferType(row[1]);
        });

        return correctType && passesFilters;
      },
    );

    assert.strictEqual(relevantMutations.length, 1);
  });

  Given('the user has custom field {string} equal to {string}', function(
    this: World,
    field: string,
    val: string,
  ) {
    this.setState({
      eventTrigger: {
        activeTrigger: {
          user: {
            customFields: {
              [field]: inferType(val),
            },
          },
        },
      },
    });
  });

  Then('the output template will be unchanged', function(this: World) {
    assert.deepStrictEqual(
      this.state.programTriggerResult,
      this.state.config.defaultTemplate,
    );
  });

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

  Given('the program schema is located at {string}', function(
    this: World,
    path: string,
  ) {
    this.setState({
      config: {
        schemaPath: path,
      },
    });
  });

  Given('the default configuration is loaded', function(this: World) {
    const defaultIntrospection = JSON.parse(
      readFileSync('__tests__/defaults/introspection.json').toString(),
    );

    const schema = JSON.parse(
      readFileSync(this.state.config.schemaPath || '').toString(),
    );

    const defaultRules = JSON.parse(
      readFileSync('__tests__/defaults/rules.json').toString(),
    );

    const defaultTemplate = mergeRecursive(defaultIntrospection, schema);

    this.setState({
      current: {
        rules: defaultRules,
        template: defaultTemplate,
      },
      config: {
        defaultIntrospection,
        defaultRules,
        defaultTemplate,
      },
    });
  });
}
