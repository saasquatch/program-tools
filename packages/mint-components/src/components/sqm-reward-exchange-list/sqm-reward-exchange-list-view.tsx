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
    loading: boolean;
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
    // drawerRef: any;
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
    },
    CardContainer: {
      "&:hover": {
        boxShadow: "0 3px 10px #87ceeb6e!important",
      },
    },
    Base: {
      display: "flex",
      cursor: "pointer",
      textAlign: "center",
      height: "120px",
      "&::part(base)": {
        width: "100%",
        maxWidth: "350px",
        display: "flex",
        margin: "0 auto",
      },
      "&::part(body)": {
        padding: 0,
        display: "flex",
        width: "100%",
      },
    },
    Drawer: {
      "&::part(base)": {
        minWidth: "400px",
        maxWidth: "700px",
        width: "50%",
        margin: "0 auto",
        right: "0",
      },
      "&::part(panel)": {
        height: "85vh",
        width: "100%",
      },
    },
    FullImage: {
      objectFit: "contain",
      maxWidth: "100%",
      height: "100px",
    },
    PreviewImage: {
      objectFit: "contain",
      width: "120px",
      height: "120px",
      flex: 0.33,
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
      marginLeft: "auto",
      width: "100%",
      maxWidth: "300px",
    },
    Button: {
      margin: "10px 0",
      display: "block",
      textAlign: "center",
      cursor: "pointer",
    },
    ProgressBar: {
      fontSize: "80%",
      marginBottom: "20px",
      "& .text-area": {
        marginTop: "5px",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        whiteSpace: "nowrap",
        marginBottom: "6px",

        "& .text": {
          flex: "1 1 0",
        },
        "& .text.subdued": {
          color: "#BDBDBD",
        },
      },
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
            <div slot="suffix" style={{ fontSize: "75%", float: "right" }}>
              {step.prettySourceValue}
              {step.unavailableReasonCode && (
                <p style={{ fontSize: "70%", color: "#F2994A" }}>
                  {step.unavailableReasonCode}
                </p>
              )}
            </div>
          </sl-menu-item>
        ))}
      </sl-select>
    );
  }

  function chooseReward() {
    const nextStage = "chooseAmount";

    // console.log({ nextStage, ruleType: selectedItem?.ruleType });
    return [
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {data.exchangeList?.map((item: ExchangeItem) => {
          const style = {
            boxShadow:
              item.key === selectedItem?.key ? "0 1px 8px #87ceeb" : "none",
            marginBottom: "10px 0",
            flex: "1",
            minWidth: "100%",
            color: !item.available && "#eee",
          };

          const amount =
            item.ruleType === "FIXED_GLOBAL_REWARD"
              ? item.prettySourceValue
              : `${item.sourceMinValue} to ${item.prettySourceMaxValue}`;

          return (
            <div
              key={item.key}
              class={item.available ? sheet.classes.CardContainer : ""}
              style={style}
            >
              <sl-card
                class={sheet.classes.Base}
                onClick={() =>
                  item.available &&
                  callbacks.setExchangeState({ selectedItem: item })
                }
              >
                {
                  // item?.imageUrl &&
                  <img
                    class={sheet.classes.PreviewImage}
                    src={
                      item?.imageUrl || getAssetPath("./assets/Reward-icon.png")
                    }
                  />
                }
                <p
                  style={{
                    textAlign: "left",
                    margin: "0",
                    flex: "1",
                    fontSize: "90%",
					padding: "8px"
                  }}
                >
                  <b>{item.description}</b>
                  <p style={{ margin: "0" }}>{amount}</p>
                  {item.unavailableReasonCode && (
                    <p
                      style={{
                        fontSize: "70%",
                        color: "#F2994A",
                        marginTop: "0",
                      }}
                    >
                      {item.unavailableReasonCode ===
                      "INSUFFICIENT_REDEEMABLE_CREDIT"
                        ? "Not enough points"
                        : item.unavailableReasonCode}
                    </p>
                  )}
                </p>
              </sl-card>
            </div>
          );
        })}
      </div>,
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
          //   onClick={() => refs.drawerRef.current?.hide()}
          style={{ display: "block" }}
          class={sheet.classes.Button}
        >
          Cancel
        </a>
      </div>,
    ];
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

  //   console.log({ selectedItem, selectedStep });
  function confirmation() {
    const previousStage = "chooseAmount";

    return (
      <div>
        <h2>Confirm and redeem</h2>
        <div style={{ textAlign: "center" }}>
          <p>
            <b>{selectedStep?.prettySourceValue}</b>
          </p>
          <p>
            <ExchangeArrows />
          </p>
          <div
            class={sheet.classes.CardContainer}
            style={{
              boxShadow: "none",
              marginBottom: "10px",
              flex: "1",
              minWidth: "100%",
            }}
          >
            <sl-card class={sheet.classes.Base}>
              <img
                class={sheet.classes.PreviewImage}
                src={
                  selectedItem?.imageUrl ||
                  getAssetPath("./assets/Reward-icon.png")
                }
              />
              <p style={{ marginBottom: "0", flex: "1" }}>
                {selectedStep?.prettyDestinationValue}
              </p>
            </sl-card>
          </div>
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
        {/* <sl-button onClick={() => refs.drawerRef?.current?.hide()}>
          Done
        </sl-button> */}
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
      <div class={sheet.classes.ProgressBar}>
        <div class="text-area">
          {Object.keys(stageProgressList).map((stage) => {
            if (stage === states.redeemStage) {
              return <span class="text">{stageProgressList[stage]}</span>;
            } else {
              return (
                <span class="text subdued">{stageProgressList[stage]}</span>
              );
            }
          })}
        </div>
        <ProgressBar stageCount={3} currentStage={stageNumber} />
      </div>
    );
  }

  const BackButton = () => {
    if (states.redeemStage === "success") return "";
    let previousStage: Stages = "";

    if (states.redeemStage === "confirmation") {
      previousStage = "chooseAmount";
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

  console.log(props);
  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      <div>
        {/* <sl-drawer
          ref={(ref) => (refs.drawerRef.current = ref)}
          placement="right"
          class={sheet.classes.Drawer}
          open={stageList.indexOf(states.redeemStage) >= 0}
        > */}
        <BackButton />
        {stageMap()}
        {currentStage && currentStage()}
        {states.exchangeError &&
          "Something went wrong. Please contact support or try again."}
        {/* </sl-drawer> */}
        {/* <sl-button
          loading={states.loading}
          onClick={() => callbacks.openDrawer()}
        >
          Redeem Rewards
        </sl-button> */}
      </div>
    </div>
  );
}
