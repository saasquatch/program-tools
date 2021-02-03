import { StepDefinitions } from "jest-cucumber";
import assert from "assert";
import delve from "dlv";
import { inferType } from "@saasquatch/program-boilerplate";

import { World, getWorld } from "../world";
import { MutationStepRow, AnalyticsStepRow, ValidationStepRow } from "../types";

const assertionSteps: StepDefinitions = ({ then }) => {
  then(
    /^the output template will include a (\S+) requirement$/,
    (key: string) => {
      const reqs = getWorld().state.programTriggerResult.requirements;
      const reqFound = reqs.find((r: any) => r.key === key);
      getWorld().setState({ assertionResults: { foundRequirement: reqFound } });
      assert(reqFound);
    }
  );

  then("the requirement will include a graphql query", () => {
    const query = getWorld().state.assertionResults.foundRequirement.query;
    assert(query !== null, "expected query to be not null");
    assert(query !== undefined, "expected query to be not undefined");
    assert(query.length !== 0, "expected query length > 0");
  });

  then("the following validation results will exist:", (data: any) => {
    const results = getWorld().state.programTriggerResult.validationResults;
    data.forEach((row: ValidationStepRow) => {
      const relevantResult = results.find((r: any) => r.key === row.key);
      assert(relevantResult);

      assert(
        relevantResult.results.some((r: any) => {
          return r.message === row.message && r.status === row.status;
        }),
        `failed to find validation result: ${row.message} ${row.status}`
      );
    });
  });

  then("the following rewards will exist:", (data: any) => {
    const rewards = getWorld().state.programTriggerResult.mutations.filter(
      (m: any) => {
        return m.type === "CREATE_REWARD";
      }
    );

    data.forEach((row: MutationStepRow, idx: number) => {
      const reward = rewards[idx];
      assert(reward, `A reward at index ${idx} does not exist`);
      assert.strictEqual(
        reward.data.user.id,
        `${row.user.toUpperCase()}ID`,
        "The user ID does not match"
      );
      assert.strictEqual(
        reward.data.user.accountId,
        `${row.user.toUpperCase()}ACCOUNTID`,
        "The account ID does not match"
      );
      assert.strictEqual(
        reward.data.key,
        row.key,
        "The row key does not match"
      );
      if (row.assignedCredit)
        assert.strictEqual(
          reward.data.dynamicProperties.assignedCredit,
          Number(row.assignedCredit),
          "The amount does not match"
        );
    });
  });

  then("the following mutations will exist:", (data: any) => {
    data.forEach((row: MutationStepRow) => {
      switch (row.type) {
        case "reward":
          const relevantRewards = getWorld().state.programTriggerResult.mutations.filter(
            (m: any) => {
              return (
                m.type === "CREATE_REWARD" &&
                m.data.user.id === `${row.user.toUpperCase()}ID` &&
                m.data.user.accountId ===
                  `${row.user.toUpperCase()}ACCOUNTID` &&
                m.data.key === row.key
              );
            }
          );

          assert.strictEqual(relevantRewards.length, Number(row.count));
          break;
        case "email":
          const relevantEmails = getWorld().state.programTriggerResult.mutations.filter(
            (m: any) => {
              return (
                m.type === "SEND_EMAIL" &&
                m.data.user.id === `${row.user.toUpperCase()}ID` &&
                m.data.user.accountId ===
                  `${row.user.toUpperCase()}ACCOUNTID` &&
                m.data.key === row.key
              );
            }
          );

          assert.strictEqual(relevantEmails.length, Number(row.count));
          break;
        default:
      }
    });
  });

  then(
    /^there will not be a (\S+) analytic for the (\S+) user$/,
    (type: string, user: string) => {
      const relevantAnalytics = getWorld().state.programTriggerResult.analytics.filter(
        (a: any) => {
          return (
            a.eventType === type &&
            a.data.user.id === `${user.toUpperCase()}ID` &&
            a.data.user.accountId === `${user.toUpperCase()}ACCOUNTID`
          );
        }
      );

      assert.strictEqual(relevantAnalytics.length, 0);
    }
  );

  then("the following analytics will exist:", (data: any) => {
    data.forEach((row: AnalyticsStepRow) => {
      const relevantAnalytics = getWorld().state.programTriggerResult.analytics.filter(
        (a: any) => {
          return (
            a.eventType === row.type &&
            a.data.user.id === `${row.user.toUpperCase()}ID` &&
            a.data.user.accountId === `${row.user.toUpperCase()}ACCOUNTID`
          );
        }
      );

      assert.strictEqual(relevantAnalytics.length, Number(row.count));
    });
  });

  then("there will be no mutations", () => {
    assert.strictEqual(
      getWorld().state.programTriggerResult.mutations.length,
      0
    );
  });

  then("there will be no analytics", () => {
    assert.strictEqual(
      getWorld().state.programTriggerResult.analytics.length,
      0
    );
  });

  then(
    /^there will be (\d+) (\S+) reward(s) for the (\S+) user$/,
    (count: number, key: string, user: string) => {
      const relevantRewards = getWorld().state.programTriggerResult.mutations.filter(
        (m: any) => {
          return (
            m.type === "CREATE_REWARD" &&
            m.data.user.id === `${user.toUpperCase()}ID` &&
            m.data.user.accountId === `${user.toUpperCase()}ACCOUNTID` &&
            m.data.key === key
          );
        }
      );

      assert.strictEqual(relevantRewards.length, count);
    }
  );

  then(
    /^there will be (\d+) (\S+) email(s) for the (\S+) user$/,
    (count: number, key: string, user: string) => {
      const relevantRewards = getWorld().state.programTriggerResult.mutations.filter(
        (m: any) => {
          return (
            m.type === "SEND_EMAIL" &&
            m.data.user.id === `${user.toUpperCase()}ID` &&
            m.data.user.accountId === `${user.toUpperCase()}ACCOUNTID` &&
            m.data.key === key
          );
        }
      );

      assert.strictEqual(relevantRewards.length, count);
    }
  );

  then(/^the programId will be (\S+)$/, (k: string) => {
    assert.strictEqual(getWorld().state.programTriggerResult.programId, k);
  });

  then(/^the output will include a (\S+) event key trigger$/, (key: string) => {
    const trigger = getWorld().state.programTriggerResult.trigger;
    assert(trigger.eventKeys.includes(key));
  });

  then(/^the output will not include a (\S+) email$/, (key: string) => {
    const emails = getWorld().state.programTriggerResult.emails;
    assert(!emails.some((e: any) => e.key === key));
  });

  then(/^the output will include a (\S+) email$/, (key: string) => {
    const emails = getWorld().state.programTriggerResult.emails;
    assert(emails.some((e: any) => e.key === key));
  });

  then(/^the output will include a (\S+) reward key$/, (key: string) => {
    const rewards = getWorld().state.programTriggerResult.rewards;
    assert(rewards.some((e: any) => e.key === key));
  });

  then(
    "the following MODERATE_GRAPH_NODES mutation will exist:",
    (data: any) => {
      const relevantMutations = getWorld().state.programTriggerResult.mutations.filter(
        (m: any) => {
          const correctType = m.type === "MODERATE_GRAPH_NODES";

          const passesFilters = !data.rows().some((row: any) => {
            return delve(m.data, row[0]) !== inferType(row[1]);
          });

          return correctType && passesFilters;
        }
      );

      assert.strictEqual(relevantMutations.length, 1);
    }
  );

  then("^the output template will be unchanged$", () => {
    assert.deepStrictEqual(
      getWorld().state.programTriggerResult,
      World.defaultTemplate
    );
  });
};

export default assertionSteps;
