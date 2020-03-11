import {World, Cucumber} from '../index';

import assert from 'assert';
import delve from 'dlv';
import {inferType} from '@saasquatch/program-boilerplate';

import {MutationStepRow, AnalyticsStepRow, ValidationStepRow} from '../types';

export function init(cucumber: Cucumber): void {
  const {Then} = cucumber;

  Then('the output template will include a {string} requirement', function(
    this: World,
    key: string,
  ) {
    const reqs = this.state.programTriggerResult.requirements;
    const reqFound = reqs.find(r => r.key === key);

    this.setState({assertionResults: {foundRequirement: reqFound}});
    assert(reqFound);
  });

  Then('the requirement will include a graphql query', function(this: World) {
    const query = this.state.assertionResults.foundRequirement.query;
    assert(query !== null, 'expected query to be not null');
    assert(query !== undefined, 'expected query to be not undefined');
    assert(query.length !== 0, 'expected query length > 0');
  });

  Then('the following validation results will exist:', function(
    this: World,
    data: any,
  ) {
    const results = this.state.programTriggerResult.validationResults;
    data.hashes().forEach((row: ValidationStepRow) => {
      const relevantResult = results.find(r => r.key === row.key);
      assert(relevantResult);

      assert(
        relevantResult.results.some(r => {
          return r.message === row.message && r.status === row.status;
        }),
        `failed to find validation result: ${row.message} ${row.status}`,
      );
    });
  });

  Then('the following rewards will exist:', function(this: World, data:any) {
    const rewards = this.state.programTriggerResult.mutations.filter(
      (m: any) => {
        return (
          m.type === 'CREATE_REWARD'
        );
      },
    );

    data.hashes().forEach((row: MutationStepRow, idx: number) => {
      const reward = rewards[idx];
      assert(reward);
      assert.strictEqual(reward.data.user.id, `${row.user.toUpperCase()}ID`);
      assert.strictEqual(reward.data.user.accountId, `${row.user.toUpperCase()}ACCOUNTID`);
      assert.strictEqual(reward.data.key, row.key);
      if (row.assignedCredit)
        assert.strictEqual(reward.data.dynamicProperties.assignedCredit, Number(row.assignedCredit));
    });
  });

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

  Then('there will not be a {word} analytic for the {word} user', function(
    this: World,
    type: string,
    user: string,
  ) {
    const relevantAnalytics = this.state.programTriggerResult.analytics.filter(
      (a: any) => {
        return (
          a.eventType === type &&
          a.data.user.id === `${user.toUpperCase()}ID` &&
          a.data.user.accountId === `${user.toUpperCase()}ACCOUNTID`
        );
      },
    );

    assert.strictEqual(relevantAnalytics.length, 0);
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
