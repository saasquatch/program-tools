import { inferType } from "@saasquatch/program-boilerplate";
import assert from "assert";
import delve from "dlv";
import { StepDefinitions } from "jest-cucumber";
import {
  AnalyticsStepRow,
  FieldValueRow,
  IntrospectionRow,
  MutationStepRow,
  ValidationStepRow,
} from "../types";
import { getWorld } from "../world";

const assertionSteps: StepDefinitions = ({ then }) => {
  then(
    /^the output template will include a "?([^"]+)"? requirement$/,
    (key: string) => {
      const output =
        "template" in getWorld().state.programTriggerResult
          ? getWorld().state.programTriggerResult.template
          : getWorld().state.programTriggerResult;

      const reqs = output.requirements;
      const reqFound = reqs.find((r: any) => r.key === key);
      getWorld().setState({ assertionResults: { foundRequirement: reqFound } });
      assert(
        reqFound,
        `"${key}" requirement was not found in the requirements`
      );
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
      assert(
        relevantResult,
        `Failed to locate validation result with key "${row.key}"`
      );

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
          const relevantRewards =
            getWorld().state.programTriggerResult.mutations.filter((m: any) => {
              return (
                m.type === "CREATE_REWARD" &&
                m.data.user.id === `${row.user.toUpperCase()}ID` &&
                m.data.user.accountId ===
                  `${row.user.toUpperCase()}ACCOUNTID` &&
                m.data.key === row.key
              );
            });

          assert.strictEqual(
            relevantRewards.length,
            Number(row.count),
            `Expected to find ${row.count} rewards but only found ${relevantRewards.length}`
          );
          break;
        case "email":
          const relevantEmails =
            getWorld().state.programTriggerResult.mutations.filter((m: any) => {
              return (
                m.type === "SEND_EMAIL" &&
                m.data.user.id === `${row.user.toUpperCase()}ID` &&
                m.data.user.accountId ===
                  `${row.user.toUpperCase()}ACCOUNTID` &&
                m.data.key === row.key
              );
            });

          assert.strictEqual(
            relevantEmails.length,
            Number(row.count),
            `Expected to find ${row.count} emails but only found ${relevantEmails.length}`
          );
          break;
        default:
      }
    });
  });

  then(
    /^there will not be a "?([^"]+)"? analytic for the "?([^"]+)"? user$/,
    (type: string, user: string) => {
      const relevantAnalytics =
        getWorld().state.programTriggerResult.analytics.filter((a: any) => {
          return (
            a.eventType === type &&
            a.data.user.id === `${user.toUpperCase()}ID` &&
            a.data.user.accountId === `${user.toUpperCase()}ACCOUNTID`
          );
        });

      assert.strictEqual(
        relevantAnalytics.length,
        0,
        `Expected to find 0 "${type}" analytics for "${user}" but found ${relevantAnalytics.length}`
      );
    }
  );

  then("the following analytics will exist:", (data: any) => {
    data.forEach((row: AnalyticsStepRow) => {
      const relevantAnalytics =
        getWorld().state.programTriggerResult.analytics.filter((a: any) => {
          return (
            a.eventType === row.type &&
            a.data.user.id === `${row.user.toUpperCase()}ID` &&
            a.data.user.accountId === `${row.user.toUpperCase()}ACCOUNTID` &&
            (!row.analyticsKey || a.data.analyticsKey === row.analyticsKey) &&
            (!row.isConversion ||
              a.data.isConversion === inferType(row.isConversion))
          );
        });

      assert.strictEqual(
        relevantAnalytics.length,
        Number(row.count),
        `Expected to find ${row.count} analytics but only found ${relevantAnalytics.length}`
      );
    });
  });

  then("there will be no mutations", () => {
    const numMutations = getWorld().state.programTriggerResult.mutations.length;
    assert.strictEqual(
      numMutations,
      0,
      `Expected 0 mutations but found ${numMutations}`
    );
  });

  then("there will be no analytics", () => {
    const numAnalytics = getWorld().state.programTriggerResult.analytics.length;
    assert.strictEqual(
      numAnalytics,
      0,
      `Expected 0 analytics but found ${numAnalytics}`
    );
  });

  then(
    /^there will be (\d+) "?([^"]+)"? reward(s) for the "?([^"]+)"? user$/,
    (count: number, key: string, user: string) => {
      const relevantRewards =
        getWorld().state.programTriggerResult.mutations.filter((m: any) => {
          return (
            m.type === "CREATE_REWARD" &&
            m.data.user.id === `${user.toUpperCase()}ID` &&
            m.data.user.accountId === `${user.toUpperCase()}ACCOUNTID` &&
            m.data.key === key
          );
        });

      assert.strictEqual(
        relevantRewards.length,
        count,
        `Expected to find ${count} "${key}" analytics for "${user}" but found ${relevantRewards.length}`
      );
    }
  );

  then(/^there will be no reward "?([^"]+)"?$/, (rewardKey: string) => {
    const relevantRewards =
      getWorld().state.programTriggerResult.mutations.filter((m: any) => {
        return m.type === "CREATE_REWARD" && m.data.key === rewardKey;
      });

    assert.strictEqual(
      relevantRewards.length,
      0,
      `Expected to find 0 "${rewardKey}" rewards but found ${relevantRewards.length}`
    );
  });

  then(
    /^there will be (\d+) "?([^"]+)"? email(s) for the "?([^"]+)"? user$/,
    (count: number, key: string, user: string) => {
      const relevantEmails =
        getWorld().state.programTriggerResult.mutations.filter((m: any) => {
          return (
            m.type === "SEND_EMAIL" &&
            m.data.user.id === `${user.toUpperCase()}ID` &&
            m.data.user.accountId === `${user.toUpperCase()}ACCOUNTID` &&
            m.data.key === key
          );
        });

      assert.strictEqual(
        relevantEmails.length,
        count,
        `Expected to find ${count} "${key}" emails for "${user}" but found ${relevantEmails.length}`
      );
    }
  );

  then(/^the programId will be "?([^"]+)"?$/, (k: string) => {
    assert.strictEqual(
      getWorld().state.programTriggerResult.programId,
      k,
      "Incorrect program ID"
    );
  });

  then(
    /^the output will include a "?([^"]+)"? event key trigger$/,
    (key: string) => {
      const output =
        "template" in getWorld().state.programTriggerResult
          ? getWorld().state.programTriggerResult.template
          : getWorld().state.programTriggerResult;

      const trigger = output.trigger;
      assert(
        trigger.eventKeys.includes(key),
        `Output didn't include a "${key}" event key trigger`
      );
    }
  );

  then(/^the output will not include a "?([^"]+)"? email$/, (key: string) => {
    const output =
      "template" in getWorld().state.programTriggerResult
        ? getWorld().state.programTriggerResult.template
        : getWorld().state.programTriggerResult;

    const relevantEmails = output.emails.filter((e: any) => e.key === key);

    assert.deepStrictEqual(
      relevantEmails.length,
      0,
      `Expected no "${key}" emails but found ${relevantEmails.length}`
    );
  });

  then(/^the output will include a "?([^"]+)"? email$/, (key: string) => {
    const output =
      "template" in getWorld().state.programTriggerResult
        ? getWorld().state.programTriggerResult.template
        : getWorld().state.programTriggerResult;

    const relevantEmails = output.emails.filter((e: any) => e.key === key);
    assert(
      relevantEmails.length > 0,
      `Expected to find "${key}" email but found none`
    );
  });

  then(/^the output will include a "?([^"]+)"? reward key$/, (key: string) => {
    const output =
      "template" in getWorld().state.programTriggerResult
        ? getWorld().state.programTriggerResult.template
        : getWorld().state.programTriggerResult;

    const relevantRewards = output.rewards.filter((e: any) => e.key === key);
    assert(
      relevantRewards.length > 0,
      `Expected to find "${key}" reward but found none`
    );
  });

  then(
    /^the output will not include a "?([^"]+)"? reward key$/,
    (key: string) => {
      const output =
        "template" in getWorld().state.programTriggerResult
          ? getWorld().state.programTriggerResult.template
          : getWorld().state.programTriggerResult;

      const relevantRewards = output.rewards.filter((e: any) => e.key === key);

      assert.deepStrictEqual(
        relevantRewards.length,
        0,
        `Expected 0 "${key}" rewards but found ${relevantRewards.length}`
      );
    }
  );

  then(
    "the output will include the following rewards and emails:",
    (data: IntrospectionRow[]) => {
      const output =
        "template" in getWorld().state.programTriggerResult
          ? getWorld().state.programTriggerResult.template
          : getWorld().state.programTriggerResult;

      const emails = output.emails;
      const rewards = output.rewards;
      data.forEach((row) => {
        if (row.type === "reward")
          assert(rewards.some((e: any) => e.key === row.key));

        if (row.type === "email")
          assert(emails.some((e: any) => e.key === row.key));
      });
    }
  );

  then(
    /^the following (CREATE_REWARD|MODERATE_GRAPH_NODES|EXCHANGE_REWARD) mutation will exist:$/,
    (type: string, filters: any) => {
      const matchingMutations =
        getWorld().state.programTriggerResult.mutations.filter((m: any) => {
          const correctType = m.type === type;
          const passesFilters = filters.every((row: FieldValueRow) => {
            const expected = inferType(row.value);
            const actual = delve(m.data, row.field);

            if (expected instanceof Object) {
              try {
                assert.deepStrictEqual(actual, expected);
                return true;
              } catch (e) {
                return false;
              }
            }

            return actual === expected;
          });
          return correctType && passesFilters;
        });
      assert.strictEqual(matchingMutations.length, 1);
    }
  );

  then("the output template will be unchanged", () => {
    const output =
      "template" in getWorld().state.programTriggerResult
        ? getWorld().state.programTriggerResult.template
        : getWorld().state.programTriggerResult;

    assert.deepStrictEqual(output, getWorld().getDefaultTemplate());
  });

  then(
    /^there will be no "?([^"]+)"? analytic for "?([^"]+)"?$/,
    (type: string, key: string) => {
      const matching = getWorld().state.programTriggerResult.analytics.filter(
        (a: any) => {
          return a.eventType === type && a.data.analyticsKey === key;
        }
      );

      assert.strictEqual(
        matching.length,
        0,
        `Expected no "${type}" analytics for "${key}" but found ${matching.length}`
      );
    }
  );
};

export default assertionSteps;
