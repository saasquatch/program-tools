import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { ProgressBar } from "./progressBar";
import { ExchangeItem, ExchangeStep, Stages } from "./useRewardExchangeList";

export type RewardExchangeViewProps = {
  states: {
    selectedItem: ExchangeItem;
    selectedStep: ExchangeStep;
    redeemStage: string;
    amount: number;
    success: boolean;
  };
  data: {
    exchangeList: any;
  };
  callbacks: {
    exchangeReward: (e: unknown) => unknown;
    openDrawer: () => void;
    setStage: (stage?: Stages) => void;
    setExchangeState: Function;
  };
  refs: {
    drawerRef: any;
  };
};

const stageList = {
  chooseReward: "Choose reward",
  chooseAmount: "Amount",
  confirmation: "Confirm",
};

export function RewardExchangeView(props: RewardExchangeViewProps) {
  const style = {
    Container: {
      position: "relative",
    },
    Base: {
      display: "block",
      "&::part(base)": {
        width: "100%",
        height: "82px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
    },
    Drawer: {
      "&::part(base)": {
        minWidth: "400px",
        width: "50%",
        margin: "0 auto",
        right: "0",
      },
      "&::part(panel)": {
        height: "50rem",
      },
    },
    Image: {
      width: "300px",
    },
    InputBox: {
      width: "100%",
      marginBottom: "20px",
    },
    Select: {
      "&::part(base)": {
        flex: "0.75",
      },
    },
    Buttons: {
      bottom: "0",
    },
    Button: {
      margin: "10px 0",
      display: "block",
      textAlign: "center",
      cursor: "pointer",
    },
  };
  // JSS config
  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  const { states, data, callbacks, refs } = props;

  const { selectedItem, selectedStep } = states;

  function getInput() {
    const item = states.selectedItem;
    if (!item || item?.ruleType === "FIXED_GLOBAL_REWARD") return <span></span>;

    if (!item?.steps?.length) {
      return (
        <sl-input
          style={{ width: "auto" }}
          label="Input amount to exchange"
          type="number"
          inputmode="numeric"
          min={item?.sourceMinValue || 0}
          max={item?.sourceMaxValue || ""}
          class={sheet.classes.Select}
          onInput={(e) =>
            callbacks.setExchangeState({ amount: e.target?.value })
          }
        ></sl-input>
      );
    }
    return (
      <sl-select
        style={{ width: "auto" }}
        label="Select amount to receive"
        class={sheet.classes.Select}
        value={states.selectedStep}
        onSl-select={(e) =>
          callbacks.setExchangeState({
            amount: e.detail?.item?.value?.sourceValue,
            selectedStep: e.detail?.item?.value,
          })
        }
      >
        {item?.steps?.map((step) => (
          <sl-menu-item value={step}>
            {step.prettyDestinationValue}
            <span slot="suffix" style={{ fontSize: "75%" }}>
              {step.prettySourceValue}
            </span>
          </sl-menu-item>
        ))}
      </sl-select>
    );
  }

  function chooseReward() {
    const nextStage =
      selectedItem?.ruleType === "FIXED_VARIABLE_REWARD"
        ? "confirmation"
        : "chooseAmount";
    return (
      <div>
        {data.exchangeList?.map((item: ExchangeItem) => (
          <div
            style={{
              border:
                item.key === selectedItem?.key ? "2px solid skyblue" : "none",
              marginBottom: "10px 0",
            }}
          >
            <sl-card class={sheet.classes.Base}>
              <sl-button
                onClick={() =>
                  callbacks.setExchangeState({ selectedItem: item })
                }
                disabled={!item.available}
              >
                {item.description}
              </sl-button>
            </sl-card>
          </div>
        ))}
        <div class={sheet.classes.Buttons}>
          <sl-button
            onClick={() => callbacks.setStage(nextStage)}
            style={{ display: "block" }}
            class={sheet.classes.Button}
            disabled={!states.selectedItem}
          >
            Continue
          </sl-button>
          <a
            onClick={() => refs.drawerRef.current?.hide()}
            style={{ display: "block" }}
            class={sheet.classes.Button}
          >
            Cancel
          </a>
        </div>
      </div>
    );
  }

  function chooseAmount() {
    const input = getInput();
    return (
      <div>
        <div>
          {selectedItem?.imageUrl && (
            <img class={sheet.classes.Image} src={selectedItem?.imageUrl} />
          )}
        </div>
        {/* <p>{selectedItem?.description}</p> */}
        <div class={sheet.classes.InputBox}>{input}</div>
        <div class={sheet.classes.Buttons}>
          <sl-button
            onClick={() => callbacks.setStage("confirmation")}
            disabled={input && !states.amount}
            style={{ display: "block" }}
            class={sheet.classes.Button}
          >
            Continue
          </sl-button>
          <a
            onClick={() => callbacks.setStage("chooseReward")}
            style={{ display: "block" }}
            class={sheet.classes.Button}
          >
            Back
          </a>
        </div>
      </div>
    );
  }

  function confirmation() {
    console.log("confirmation:", { selectedItem });
    const redemptionAmount = () => {
      if (selectedItem?.ruleType === "FIXED_GLOBAL_REWARD") {
        return `Redeem ${selectedItem?.sourceValue} ${selectedItem?.sourceUnit} for ${selectedItem?.globalRewardKey}`;
      } else {
        const amount = states.amount;
        const reward =
          selectedStep?.prettyDestinationValue ??
          `${amount} ${selectedItem?.destinationUnit}`;
        return `Redeem ${amount} ${selectedItem?.sourceUnit} for ${reward}`;
      }
    };
    const previousStage =
      selectedItem?.ruleType === "FIXED_VARIABLE_REWARD"
        ? "chooseReward"
        : "chooseAmount";
    return (
      <div>
        <h2>Confirm your redemption:</h2>
        {redemptionAmount()}
        {states.success && (
          <div>
            <p style={{ color: "forestgreen" }}>Reward exchanged!</p>
          </div>
        )}
        <div class={sheet.classes.Buttons}>
          <sl-button
            onClick={callbacks.exchangeReward}
            style={{ display: "block" }}
            class={sheet.classes.Button}
            disabled={states.success}
          >
            Redeem
          </sl-button>
          <a
            onClick={() => callbacks.setStage(previousStage)}
            style={{ display: "block" }}
            class={sheet.classes.Button}
          >
            Back
          </a>
        </div>
      </div>
    );
  }

  const stages = {
    chooseReward: () => chooseReward(),
    chooseAmount: () => chooseAmount(),
    confirmation: () => confirmation(),
  };

  const currentStage = stages[states.redeemStage];

  function stageMap() {
    return (
      <div style={{ fontSize: "80%" }}>
        <ProgressBar stage={states.redeemStage} />
        <div
          style={{
            marginTop: "5px",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            columnGap: "50px",
            whiteSpace: "nowrap",
          }}
        >
          {Object.keys(stageList).map((stage) => {
            if (stage === states.redeemStage)
              return <b style={{ flex: "1 1 0" }}> {stageList[stage]}</b>;
            return <i style={{ flex: "1 1 0" }}>{stageList[stage]}</i>;
          })}
        </div>
      </div>
    );
  }

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      <div>
        <sl-drawer
          ref={(ref) => (refs.drawerRef.current = ref)}
          placement="right"
          class={sheet.classes.Drawer}
        >
          <div slot="label" style={{ fontSize: "80%" }}>
            {`<-`} Back
          </div>
          {stageMap()}
          {currentStage && currentStage()}
        </sl-drawer>
        <sl-button onClick={() => callbacks.openDrawer()}>
          Redeem Rewards
        </sl-button>
      </div>
    </div>
  );
}
{
  /* stageMap[states.redeemStage] */
}
