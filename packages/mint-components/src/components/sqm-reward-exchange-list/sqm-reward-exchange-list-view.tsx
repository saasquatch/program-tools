import { getAssetPath, h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { intl } from "../../global/global";
import { HostBlock } from "../../global/mixins";
import { ProgressBar } from "./progressBar";
import { LeftArrow, ExchangeArrows, CheckMark, Gift } from "./SVGs";
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
      height: "250px",
      display: "flex",
      margin: "0 auto",
    },
    PreviewImage: {
      objectFit: "contain",
      width: "120px",
      height: "118px",
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
      maxWidth: "350px",
      width: "100%",
      margin: "auto",
      marginBottom: "var(--sl-spacing-xxx-large)",
      "& .text-area": {
        marginTop: "5px",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        whiteSpace: "nowrap",
        marginBottom: "6px",

        "& .text": {
          marginBottom: "var(--sl-spacing-x-small)",
          flex: "1 1 0",
        },
        "& .text.subdued": {
          color: "var(--sl-color-neutral-200)",
        },
      },
    },
    KutayCard: {
      display: "flex",
      userSelect: "none",
      height: "120px",
      "&::part(base)": {
        boxShadow: "none",
        width: "100%",
      },
      "&::part(body)": {
        display: "flex",
        padding: 0,
      },
      "& .selected-outline": {
        width: "18px",
        height: "18px",
        minWidth: "18px",
        borderRadius: "50%",
        background: "var(--sl-color-primary-500)",
        position: "relative",
        margin: "-9px",
        left: "100%",
      },
      "& .selected-checkmark": {
        position: "relative",
        left: "12%",
        top: "-29%",
        transform: "scale(0.8)",
      },
    },

    Square: {
      width: "120px",
      height: "118px",
      borderRadius: "3px 0 0 3px",
      "& .image": {
        width: "100%",
        height: "100%",
        objectFit: "contain",
        borderRadius: "inherit",
      },
      "& .image.subdued": {
        filter: "brightness(0.95)",
        opacity: "0.5",
      },
    },

    Image: {
      "& .image": {
        objectFit: "contain",
        width: "120px",
        height: "118px",
        flex: 0.33,
      },
      "& .image.black": {
        filter: "brightness(20%)",
      },
    },

    TextArea: {
      textAlign: "left",
      padding: "12px",
      "& .title": {
        fontSize: "16px",
        lineHeight: "20px",
        fontWeight: "600",
        color: "var(--sl-color-neutral-1000)",
      },
      "& .amount": {
        fontSize: "14px",
        lineHeight: "18px",
        marginTop: "8px",
        color: "var(--sl-color-neutral-500)",
      },
      "& .error": {
        fontSize: "14px",
        lineHeight: "18px",
        marginTop: "8px",
        fontWeight: "600",
        color: "var(--sl-color-warning-500)",
      },
    },

    ChooseAmount: {
      margin: "var(--sl-spacing-medium) 0",
      "& .title": {
        //fontSize: "var(--sl-font-size-large)",
        fontSize: "113%",
        fontWeight: "var(--sl-font-weight-semibold)",
        color: "var(--sl-color-neutral-1000)",
      },
      "& .points": {
        //fontSize: "var(--sl-font-size-large)",
        fontSize: "113%",
        fontWeight: "var(--sl-font-weight-semibold)",
        color: "var(--sl-color-sky-500)",
      },
      "& .description": {
        fontSize: "var(--sl-font-size-medium)",
        fontWeight: "var(--sl-font-weight-normal)",
        color: "var(--sl-color-neutral-500)",
        margin: "var(--sl-spacing-medium) 0",
        lineHeight: "var(--sl-line-height-dense)",
        marginTop: "var(--sl-spacing-xx-small)",
      },
      "& .space": {
        marginBottom: "var(--sl-spacing-xxx-large)",
      },
    },

    Success: {
      textAlign: "center",
      "& .title": {
        fontSize: "var(--sl-font-size-large)",
        fontWeight: "var(--sl-font-weight-semibold)",
        color: "var(--sl-color-neutral-1000)",
      },
      "& .description": {
        color: "var(--sl-color-neutral-400)",
        width: "100%",
        maxWidth: "350px",
        margin: "0 auto",
        lineHeight: "var(--sl-line-height-dense)",
        marginBottom: "var(--sl-spacing-xxx-large)",
        marginTop: "var(--sl-spacing-xx-small)",
      },
    },

    KutayButton: {
      display: "flex",
      flexWrap: "wrap-reverse",
      margin: "var(--sl-spacing-medium) 0",
      "& .cancel": {
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
        "&::part(base)": {
          background: "var(--sl-color-primary-500)",
          borderColor: "var(--sl-color-primary-500)",
          fontWeight: "var(--sl-font-weight-normal)",
          color: "var(--sl-color-neutral-0)",
        },
        "@media (max-width: 1024px)": {
          width: "100%",
        },
      },
      "& .continue.right": {
        marginLeft: "auto",
      },
      "& .continue.center": {
        margin: "0 auto",
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
    if (!item || item?.ruleType === "FIXED_GLOBAL_REWARD")
      return <span>{item?.prettySourceValue}</span>;

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
                      unavailableReason: step.unavailableReasonCode,
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
                class={sheet.classes.KutayCard}
                style={{
                  cursor: item.unavailableReasonCode
                    ? "not-allowed"
                    : "pointer",
                }}
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
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    borderRadius: "3px",
                    background: item.unavailableReasonCode
                      ? "rgba(0, 0, 0, 0.05)"
                      : "rgba(0, 0, 0, 0)",
                  }}
                >
                  <div class={sheet.classes.Square}>
                    <img
                      class={
                        item.unavailableReasonCode ? "image subdued" : "image"
                      }
                      src={
                        item?.imageUrl ||
                        getAssetPath("./assets/placeholder.png")
                      }
                    />
                  </div>

                  <div
                    class={sheet.classes.TextArea}
                    style={{
                      opacity: item.unavailableReasonCode ? "0.5" : "1",
                    }}
                  >
                    <div class="title">{item.name}</div>
                    <div class="amount">{amount}</div>
                    {item.unavailableReasonCode && (
                      <div class="error">
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
                </div>
              </sl-card>
            </div>
          );
        })}
      </div>,
      <div class={sheet.classes.KutayButton}>
        <sl-button
          class="continue right"
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
    const isDisabled =
      states.selectedItem?.ruleType === "FIXED_GLOBAL_REWARD"
        ? false
        : input && !states.amount;
    return (
      <div>
        <div>
          {
            <img
              class={sheet.classes.FullImage}
              src={
                selectedItem?.imageUrl ||
                getAssetPath("./assets/placeholder.png")
              }
            />
          }
        </div>
        <div class={sheet.classes.ChooseAmount}>
          <div class="title">{selectedItem?.name}</div>
          {states.selectedItem?.ruleType === "FIXED_GLOBAL_REWARD" ? (
            <div class="points">{input}</div>
          ) : (
            <div class="description">{selectedItem?.description}</div>
          )}
          {states.selectedItem?.ruleType === "FIXED_GLOBAL_REWARD" ? (
            <div class="description">{selectedItem?.description}</div>
          ) : (
            <div class="points">{input}</div>
          )}
          <div class="space" />
        </div>

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
            disabled={isDisabled}
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
        <h2 style={{ margin: "20px 0" }}>Confirm and redeem</h2>
        <div
          style={{
            textAlign: "center",
            marginBottom: "var(--sl-spacing-xxx-large)",
          }}
        >
          <p>
            <span style={{ fontSize: "18px" }}>
              {selectedStep?.prettySourceValue ||
                selectedItem?.prettySourceValue}
            </span>
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
            <sl-card
              style={{ width: "auto", maxWidth: "350px", margin: "auto" }}
              class={sheet.classes.KutayCard}
            >
              <div class={sheet.classes.Square}>
                <img
                  class="image"
                  src={
                    selectedItem?.imageUrl ||
                    getAssetPath("./assets/placeholder.png")
                  }
                />
              </div>

              <div
                class={sheet.classes.TextArea}
                style={{
                  lineHeight: "18px",
                  alignSelf: "center",
                }}
              >
                {selectedStep?.prettyDestinationValue
                  ? selectedStep?.prettyDestinationValue +
                    " " +
                    selectedItem?.name
                  : selectedItem?.name}
              </div>
            </sl-card>

            {/* 			  
            <sl-card class={sheet.classes.Base}>
              <img
                class={sheet.classes.PreviewImage}
                src={
                  selectedItem?.imageUrl ||
                  getAssetPath("./assets/placeholder.png")
                }
              />
              <p style={{ marginBottom: "0", flex: "1" }}>
                {selectedStep?.prettyDestinationValue}
              </p>
            </sl-card> */}
          </div>
        </div>

        <div class={sheet.classes.KutayButton}>
          <sl-button
            class="cancel"
            type="text"
            size="large"
            onClick={() => callbacks.setStage("chooseAmount")}
          >
            Back
          </sl-button>
          <sl-button
            class="continue"
            size="large"
            onClick={callbacks.exchangeReward}
          >
            Redeem
          </sl-button>
        </div>

        {/* <div class={sheet.classes.Buttons}>
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
        </div> */}
      </div>
    );
  }

  function success() {
    return (
      <div class={sheet.classes.Success}>
        <Gift />
        <div class="title">Reward Redeemed</div>
        <div class="description">{selectedItem?.description}</div>
        {/* {data?.fuelTankCode && <pre>{data?.fuelTankCode}</pre>} */}
        <div class={sheet.classes.KutayButton}>
          <sl-button
            class="continue center"
            type="primary"
            size="large"
            onClick={() => callbacks.resetState(true)}
          >
            Done
          </sl-button>
        </div>
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
            if (stageList.indexOf(stage) <= stageNumber) {
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

  function loading() {
    return (
      <div
        style={{
          display: "flex",
          height: "400px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ transform: "scale(5)" }}>
          <sl-spinner></sl-spinner>
        </div>

        {/* <sl-skeleton
          style={{ width: "30%", margin: "var(--sl-spacing-large) auto" }}
        />
        <sl-skeleton
          style={{ width: "100%", margin: "var(--sl-spacing-large) 0" }}
        />
        <sl-skeleton
          style={{ width: "100%", margin: "var(--sl-spacing-large) 0" }}
        />
        <sl-skeleton
          style={{ width: "100%", margin: "var(--sl-spacing-large) 0" }}
        />
        <sl-skeleton
          style={{ width: "100%", margin: "var(--sl-spacing-large) 0" }}
        />
        <sl-skeleton
          style={{ width: "100%", margin: "var(--sl-spacing-large) 0" }}
        />
        <sl-skeleton
          style={{
            width: "20%",
            margin: "var(--sl-spacing-large) 0",
            marginLeft: "auto",
          }}
        /> */}
      </div>
    );
  }

  function errorMessage() {
    return (
      <sl-alert type="danger" open>
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
        An error occured trying to redeem this reward. Please try again.
      </sl-alert>
    );
  }

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      <div>
        {stageMap()}
        {states.loading && loading()}
        {states.exchangeError && errorMessage()}
        {currentStage && currentStage()}
      </div>
    </div>
  );
}
