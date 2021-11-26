import { getAssetPath, h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { ProgressBar } from "./progressBar";
import { LeftArrow, ExchangeArrows } from "./SVGs";
import { ExchangeItem, ExchangeStep, Stages } from "./useRewardExchangeList";

export type RewardExchangeViewProps = {
  states: {
    selectedItem: ExchangeItem;
    selectedStep: ExchangeStep;
    redeemStage: string;
    amount: number;
    exchangeError?: boolean;
    content: {
      text: any;
    };
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

const stageList = ["chooseReward", "chooseAmount", "confirmation", "success"];

const stageProgressList = {
  chooseReward: "Choose reward",
  chooseAmount: "Amount",
  confirmation: "Confirm",
};

export function RewardExchangeView(props: RewardExchangeViewProps) {
  const style = {
    Container: {
      position: "relative",
      display: "flex",
    },
    CardContainer: {
      "&:hover": {
        boxShadow: "0 3px 10px #87ceeb6e!important",
      },
    },
    Base: {
      display: "block",
      cursor: "pointer",
      textAlign: "center",
      "&::part(base)": {
        width: "100%",
        height: "170px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      "&::part(body)": {
        padding: "10px 0",
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
        height: "85vh",
      },
    },
    FullImage: {
      objectFit: "contain",
      maxWidth: "100%",
      height: "100px",
    },
    PreviewImage: {
      objectFit: "contain",
      maxWidth: "100%",
      height: "75px",
    },
    InputBox: {
      width: "100%",
      marginBottom: "20px",
    },
    Select: {
      "&::part(base)": {
        flex: "0.75",
      },
      "&::part(menu)": {
        maxHeight: "40vh",
      },
    },
    Buttons: {
      bottom: "0",
      width: "100%",
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

    if (!item.steps?.length) {
      return <p>Not enough {item.sourceUnit} to redeem for this reward.</p>;
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
        {item.steps?.map((step) => (
          <sl-menu-item value={step} disabled={!step.available}>
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
      selectedItem?.ruleType === "FIXED_GLOBAL_REWARD"
        ? "confirmation"
        : "chooseAmount";

    console.log({ nextStage, ruleType: selectedItem?.ruleType });
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
          columnGap: "12px",
          rowGap: "12px",
        }}
      >
        {data.exchangeList?.map((item: ExchangeItem) => {
          const style = {
            boxShadow:
              item.key === selectedItem?.key ? "0 1px 8px #87ceeb" : "none",
            marginBottom: "10px 0",
            flex: "1",
            minWidth: "45%",
          };
          return (
            <div
              key={item.key}
              class={sheet.classes.CardContainer}
              style={style}
            >
              <sl-card
                class={sheet.classes.Base}
                onClick={() =>
                  callbacks.setExchangeState({ selectedItem: item })
                }
                disabled={!item.available}
              >
                <img
                  class={sheet.classes.PreviewImage}
                  src={
                    item?.imageUrl || getAssetPath("./assets/Reward-icon.png")
                  }
                />
                <p>{item.description}</p>
              </sl-card>
            </div>
          );
        })}
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
        <div style={{ width: "50%", margin: "0 auto" }}>
          {selectedItem?.imageUrl && (
            <img class={sheet.classes.FullImage} src={selectedItem?.imageUrl} />
          )}
        </div>
        <p>{selectedItem?.description}</p>
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

  console.log({ selectedItem, selectedStep });
  function confirmation() {
    const previousStage =
      selectedItem?.ruleType === "FIXED_GLOBAL_REWARD"
        ? "chooseReward"
        : "chooseAmount";

    return (
      <div>
        <h2>Confirm and redeem</h2>
        <div style={{ textAlign: "center" }}>
          <p>
            <b>{selectedStep?.sourceValue}</b>
          </p>
          <p>
            <b>{selectedStep?.prettySourceValue}</b>
          </p>
          <p>
            <ExchangeArrows />
          </p>
          <p>{selectedStep?.destinationValue}</p>
          <p>{selectedStep?.prettyDestinationValue}</p>
        </div>
        <div class={sheet.classes.Buttons}>
          <sl-button
            onClick={callbacks.exchangeReward}
            style={{ display: "block" }}
            class={sheet.classes.Button}
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

  function success() {
    return (
      <div style={{ textAlign: "center" }}>
        <img
          class={sheet.classes.FullImage}
          src={getAssetPath("./assets/Reward-icon.png")}
        />

        <p style={{ color: "forestgreen" }}>Reward Redeemed</p>
        {/* @ts-ignore */}
        {data?.fuelTankCode && <pre>{data?.fuelTankCode}</pre>}
        <sl-button onClick={() => refs.drawerRef?.current?.hide()}>
          Done
        </sl-button>
      </div>
    );
  }

  const stages = {
    chooseReward: () => chooseReward(),
    chooseAmount: () => chooseAmount(),
    confirmation: () => confirmation(),
    success: () => success(),
  };

  const currentStage = stages[states.redeemStage];

  function stageMap() {
    const stageNumber = stageList.indexOf(states.redeemStage);
    return (
      <div style={{ fontSize: "80%" }}>
        <ProgressBar stageCount={3} currentStage={stageNumber} />
        <div
          style={{
            marginTop: "5px",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            whiteSpace: "nowrap",
            marginBottom: "10px",
          }}
        >
          {Object.keys(stageProgressList).map((stage) => {
            if (stage === states.redeemStage)
              return (
                <b style={{ flex: "1 1 0" }}> {stageProgressList[stage]}</b>
              );
            return <i style={{ flex: "1 1 0" }}>{stageProgressList[stage]}</i>;
          })}
        </div>
      </div>
    );
  }

  const BackButton = () => {
    if (states.redeemStage === "success") return "";
    let previousStage: Stages = "";

    if (states.redeemStage === "confirmation") {
      previousStage =
        selectedItem?.ruleType === "FIXED_GLOBAL_REWARD"
          ? "chooseReward"
          : "chooseAmount";
    } else if (states.redeemStage === "chooseAmount") {
      previousStage = "chooseReward";
    }

    return (
      <div slot="label">
        <a
          style={{ cursor: "pointer", fontSize: "80%", color: "#858585" }}
          onClick={() => callbacks.setStage(previousStage)}
        >
          <LeftArrow /> Back
        </a>
      </div>
    );
  };

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      <div>
        <sl-drawer
          ref={(ref) => (refs.drawerRef.current = ref)}
          placement="right"
          class={sheet.classes.Drawer}
          open={stageList.indexOf(states.redeemStage) >= 0}
        >
          <BackButton />
          {stageMap()}
          {currentStage && currentStage()}
          {states.exchangeError &&
            "Something went wrong. Please contact support or try again."}
        </sl-drawer>
        <sl-button onClick={() => callbacks.openDrawer()}>
          Redeem Rewards
        </sl-button>
      </div>
    </div>
  );
}
