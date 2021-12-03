import { getAssetPath, h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { intl } from "../../global/global";
import { HostBlock } from "../../global/mixins";
import { ProgressBar } from "./progressBar";
import { LeftArrow, ExchangeArrows, CheckMark } from "./SVGs";
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
    fuelTankCode?: string;
  };
  callbacks: {
    exchangeReward: (e: unknown) => unknown;
    setStage: (stage?: Stages) => void;
    resetState: (refresh?: boolean) => void;
    setExchangeState: Function;
  };
};

const stageList = ["chooseReward", "chooseAmount", "confirmation", "success"];

const stageProgressList = {
  chooseReward: "Choose reward",
  chooseAmount: "Amount",
  confirmation: "Confirm",
};

export function RewardExchangeView(props: RewardExchangeViewProps) {
  console.log(props);

  const style = {
    HostBlock: HostBlock,
    Container: {
      padding: "var(--sl-spacing-medium)",
      position: "relative",
    },
    CardContainer: {
      "&:active": {
        //boxShadow: "0 3px 10px #87ceeb6e!important",
      },
    },
    Base: {
      display: "flex",
      cursor: "pointer",
      textAlign: "center",
      height: "120px",
      "&::part(base)": {
        boxShadow: "none",
        width: "100%",
        // maxWidth: "350px",
        display: "flex",
        margin: "0 auto",
      },
      "&::part(body)": {
        padding: 0,
        display: "flex",
        width: "100%",
      },
      "& .title": {
        textAlign: "left",
        fontSize: "var(--sl-font-size-x-small)",
        fontWeight: "var(--sl-font-weight-semibold)",
        lineHeight: "var(--sl-font-size-medium)",
      },
      "& .description": {},
      "& .error": {},
      "& .selected-outline": {
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        background: "var(--sl-color-primary-500)",
        position: "relative",
        margin: "-9px",
        left: "100%",
      },
      "& .selected-checkmark": {
        position: "relative",
        top: "-6px",
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
    KutayCard: {
      "&::part(base)": {
        boxShadow: "none",
      },
    },
    KutayButton: {
      display: "flex",
      flexWrap: "wrap-reverse",
      margin: "var(--sl-spacing-medium) 0",
      "& .cancel": {
        width: "20%",
        marginLeft: "auto",
        marginRight: "var(--sl-spacing-medium)",
        "&::part(base)": {
          fontWeight: "var(--sl-font-weight-normal)",
          color: "var(--sl-color-neutral-1000)",
        },
        "@media (max-width: 1024px)": {
          width: "100%",
          marginRight: "0",
        },
      },
      "& .continue": {
        width: "20%",
        "&::part(base)": {
          background: "var(--sl-color-neutral-500)",
          fontWeight: "var(--sl-font-weight-normal)",
          color: "var(--sl-color-neutral-0)",
        },
        "@media (max-width: 1024px)": {
          width: "100%",
        },
      },
    },
  };
  // JSS config
  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  const { states, data, callbacks } = props;

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
                  {intl.formatMessage(
                    {
                      id: "unavailableCode",
                      defaultMessage: states.content?.text?.notAvailableError,
                    },
                    {
                      unavailableReason:
                        step.unavailableReason || step.unavailableReasonCode,
                    }
                  )}
                </p>
              )}
            </div>
          </sl-menu-item>
        ))}
      </sl-select>
    );
  }

  function chooseReward() {
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
              item.key === selectedItem?.key
                ? "0 0 0 2px var(--sl-color-primary-500)"
                : "none",
            marginBottom: "10px 0",
            borderRadius: "var(--sl-border-radius-medium)",
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
                {item.key === selectedItem?.key && (
                  <div class="selected-outline">
                    <div class="selected-checkmark">
                      <CheckMark />
                    </div>
                  </div>
                )}
                {
                  // item?.imageUrl &&
                  <img
                    class={sheet.classes.PreviewImage}
                    src={
                      item?.imageUrl || getAssetPath("./assets/Reward-icon.png")
                    }
                  />
                }
                <div>
                  <div>{item.description}</div>
                  <div>{amount}</div>
                  {item.unavailableReasonCode && (
                    <div>
                      {intl.formatMessage(
                        {
                          id: "unavailableCode",
                          defaultMessage:
                            states.content?.text?.notAvailableError,
                        },
                        {
                          unavailableReason:
                            item.unavailableReason ||
                            item.unavailableReasonCode,
                        }
                      )}
                    </div>
                  )}
                </div>
                {/* 
                <p
                  style={{
                    textAlign: "left",
                    margin: "0",
                    flex: "1",
                    fontSize: "90%",
                    padding: "8px",
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
                      {intl.formatMessage(
                        {
                          id: "unavailableCode",
                          defaultMessage:
                            states.content?.text?.notAvailableError,
                        },
                        {
                          unavailableReason:
                            item.unavailableReason ||
                            item.unavailableReasonCode,
                        }
                      )}
                    </p>
                  )}
                </p> */}
              </sl-card>
            </div>
          );
        })}
      </div>,
      <div class={sheet.classes.KutayButton}>
        <sl-button class="cancel" size="large" type="text">
          Cancel
        </sl-button>
        <sl-button
          class="continue"
          size="large"
          onClick={() => callbacks.setStage("chooseAmount")}
          disabled={!states.selectedItem}
        >
          Continue
        </sl-button>
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
        <div class={sheet.classes.KutayButton}>
          <sl-button
            class="cancel"
            size="large"
            type="text"
            onClick={() => callbacks.resetState()}
          >
            Cancel
          </sl-button>
          <sl-button
            class="continue"
            size="large"
            onClick={() => callbacks.setStage("confirmation")}
            disabled={input && !states.amount}
          >
            Continue to confirmation
          </sl-button>
        </div>
      </div>
    );
  }

  function confirmation() {
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
            onClick={() => callbacks.setStage("chooseAmount")}
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
        {data?.fuelTankCode && <pre>{data?.fuelTankCode}</pre>}
        <sl-button onClick={() => callbacks.resetState(true)}>Done</sl-button>
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

  // const BackButton = () => {
  //   if (states.redeemStage === "success") return "";
  //   let previousStage: Stages = "";

  //   if (states.redeemStage === "confirmation") {
  //     previousStage = "chooseAmount";
  //   } else if (states.redeemStage === "chooseAmount") {
  //     previousStage = "chooseReward";
  //   }

  //   return (
  //     <div slot="label">
  //       <a
  //         style={{ cursor: "pointer", fontSize: "80%", color: "#858585" }}
  //         onClick={() => callbacks.setStage(previousStage)}
  //       >
  //         <LeftArrow /> Back
  //       </a>
  //     </div>
  //   );
  // };

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      <div>
        {stageMap()}
        {currentStage && currentStage()}
        {states.exchangeError &&
          "Something went wrong. Please contact support or try again."}
      </div>
    </div>
  );
}
