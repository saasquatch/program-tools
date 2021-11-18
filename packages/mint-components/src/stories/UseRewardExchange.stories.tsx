import {
  setUserIdentity,
  useLazyQuery,
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { gql } from "graphql-request";
import { createHookStory } from "../components/sqm-stencilbook/HookStoryAddon";

const EXCHANGE = gql`
  mutation exchange($exchangeRewardInput: ExchangeRewardInput!) {
    exchangeReward(exchangeRewardInput: $exchangeRewardInput) {
      reward {
        id
      }
    }
  }
`;

export default {
  title: "Hooks / useRewardExchange",
};

function setupGraphQL() {
  const id = "testestest";
  const accountId = id;
  const programId = "sam-partner-test-2";

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a8b41jotf8a1v",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };
  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InRlc3Rlc3Rlc3QiLCJpZCI6InRlc3Rlc3Rlc3QifX0.qYnU5hNeIj9C_G3NogfG7btgCPGZC7JRXY0MG6a63zs",
    });
    return () => {
      window.widgetIdent = undefined;
      setUserIdentity(undefined);
    };
  }, []);

  return { id, accountId };
}

function useExchangeButton() {
  const { id, accountId } = setupGraphQL();

  const [points, setPoints] = useState(10);
  const [rate, setRate] = useState(100);

  const [exchange, { data, errors }] = useLazyQuery(EXCHANGE);

  return {
    states: {
      points,
      rate,
    },
    data: {
      id,
      accountId,
      data,
      errors,
    },
    callbacks: {
      exchange,
      setPoints,
      setRate,
    },
  };
}

const DefaultView = (props) => {
  const { states, data, callbacks } = props;
  return (
    <div>
      <div>
        <label>Rate:</label>
        <input
          value={states.rate}
          onInput={(e) =>
            // @ts-ignore
            callbacks.setRate(e.target.value)
          }
        />
      </div>
      <input
        value={states.points}
        onInput={(e) =>
          // @ts-ignore
          callbacks.setPoints(e.target.value)
        }
      />
      <button onClick={() => callbacks.exchange(props.input)}>Exchange</button>
      <details>
        <summary>response</summary>
        <h4>data</h4>
        <div style={{ maxWidth: "500px" }}>
          <pre style={{ width: "500px", whiteSpace: "pre-wrap" }}>
            {JSON.stringify(data.data)}
          </pre>
        </div>
        <h4>errors</h4>
        <div style={{ maxWidth: "500px" }}>
          <pre style={{ maxWidth: "500px", whiteSpace: "pre-wrap" }}>
            {JSON.stringify(data.errors)}
          </pre>
        </div>
      </details>
    </div>
  );
};

export const FixedGlobalReward = createHookStory(() => {
  const { states, data, callbacks } = useExchangeButton();
  return (
    <DefaultView
      states={states}
      data={data}
      callbacks={callbacks}
      input={{
        exchangeRewardInput: {
          userId: data.id,
          accountId: data.accountId,
          redeemCreditInput: {
            amount: states.points,
            unit: "POINT",
          },
          globalRewardKey: "gc1",
          // rewardInput: {
          //   valueInCents: states.points * 100,
          // },
        },
      }}
    />
  );
});

export const VariableGlobalReward = createHookStory(() => {
  const { states, data, callbacks } = useExchangeButton();
  return (
    <DefaultView
      states={states}
      data={data}
      callbacks={callbacks}
      input={{
        exchangeRewardInput: {
          userId: data.id,
          accountId: data.accountId,
          redeemCreditInput: {
            amount: states.points,
            unit: "POINT",
          },
          globalRewardKey: "gc1",
          rewardInput: {
            valueInCents: Math.ceil(states.points * states.rate),
          },
        },
      }}
    />
  );
});

export const VariableCreditReward = createHookStory(() => {
  const { states, data, callbacks } = useExchangeButton();
  return (
    <DefaultView
      states={states}
      data={data}
      callbacks={callbacks}
      input={{
        exchangeRewardInput: {
          userId: data.id,
          accountId: data.accountId,
          redeemCreditInput: {
            amount: states.points,
            unit: "POINT",
          },
          rewardInput: {
            type: "CREDIT",
            unit: "foo",
            assignedCredit: Math.ceil(states.points * states.rate),
          },
        },
      }}
    />
  );
});
