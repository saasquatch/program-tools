import {World, Cucumber} from '../..';

import assert from 'assert';
import delve from 'dlv';
import {inferType} from '../utils';

import {MutationStepRow, AnalyticsStepRow} from '../types';

export function init(cucumber: Cucumber): void {
  const {Then} = cucumber;

  Then('the following mutations will exist:', function(this: World, data: any) {
    data.hashes().forEach((row: MutationStepRow) => {
      switch (row.type) {
        case 'reward':
          const relevantRewards = this.state.programTriggerResult.mutations.filter(
            (m: any) => {
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
            (m: any) => {
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
      (m: any) => {
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
      (m: any) => {
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
    assert(!emails.some((e: any) => e.key === key));
  });

  Then('the output will include a {string} email', function(
    this: World,
    key: string,
  ) {
    const emails = this.state.programTriggerResult.emails;
    assert(emails.some((e: any) => e.key === key));
  });

  Then('the following MODERATE_GRAPH_NODES mutation will exist:', function(
    this: World,
    data: any,
  ) {
    const relevantMutations = this.state.programTriggerResult.mutations.filter(
      (m: any) => {
        const correctType = m.type === 'MODERATE_GRAPH_NODES';

        const passesFilters = !data.rows().some((row: any) => {
          return delve(m.data, row[0]) !== inferType(row[1]);
        });

        return correctType && passesFilters;
      },
    );

    assert.strictEqual(relevantMutations.length, 1);
  });

  Then('the output template will be unchanged', function(this: World) {
    assert.deepStrictEqual(
      this.state.programTriggerResult,
      this.state.config.defaultTemplate,
    );
  });
}
