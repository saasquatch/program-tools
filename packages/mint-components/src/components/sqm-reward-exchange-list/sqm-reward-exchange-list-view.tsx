import { getAssetPath, h, VNode } from "@stencil/core";
import { intl } from "../../global/global";
import { HostBlock } from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";
import { CopyTextView } from "../views/copy-text-view";
import { ProgressBar } from "./progressBar";
import { CheckmarkFilled, Gift } from "./SVGs";
import { ExchangeItem, ExchangeStep, Stages } from "./useRewardExchangeList";

type TextContent = {
  notAvailableError: string;
  chooseRewardTitle: string;
  chooseAmountTitle: string;
  confirmationTitle: string;
  rewardTitle: string;
  cancelText: string;
  backText: string;
  continueText: string;
  continueToConfirmationText: string;
  redeemText: string;
  redeemTitle: string;
  redemptionSuccessText: string;
  sourceAmountMessage: string;
  tooltipText: string;
  doneText: string;
  selectText: string;
  redemptionError: string;
  notEnoughError: string;
  queryError: string;
  promoCode: string;
  skeletonCardNum: number;
  rewardNameTitle: string;
  rewardAmountTitle: string;
  rewardRedeemedText: string;
  costTitle: string;
  empty: VNode;
};

export type RewardExchangeViewProps = {
  states: {
    selectedItem: ExchangeItem;
    selectedStep: ExchangeStep;
    redeemStage: string;
    amount: number;
    exchangeError: boolean;
    queryError: boolean;
    loading: boolean;
    open: boolean;
    noExchangeOptions: boolean;
    content: {
      text: TextContent;
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
    copyFuelTankCode: () => void;
  };
  refs?: { canvasRef: any };
};

const style = {
  HostBlock: HostBlock,
  Container: {
    minWidth: "300px", // Set to 300px to match the task card grid min
    position: "relative",
  },
  FullImage: {
    objectFit: "contain",
    maxWidth: "100%",
    height: "250px",
    display: "flex",
    margin: "0 auto",
  },
  Select: {
    "&::part(base)": {
      borderRadius: "var(--sqm-input-border-radius)",
    },
    "&::part(label)": {
      color: "var(--sqm-input-label-color)",
    },
    "&::part(menu)": {
      maxHeight: "450px",
    },

    "& sl-menu-item::part(checked-icon)": {
      top: "8px",
      color: "var(--sqm-text)",
    },

    "& sl-menu-item::part(base)": {
      flexDirection: "column",
      color: "var(--sqm-input-color)",
    },
    "& sl-menu-item::part(base):hover": {
      backgroundColor: "var(--sqm-input-border-color-hover)",
    },
    "& sl-menu-item::part(base):focus": {
      background: "var(--sqm-accent-color-background)",
    },
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
        color: "var(--sqm-text-subdued)",
      },
    },
  },
  CardLayout: {
    display: "flex",
    width: "100%",
    borderRadius: "3px",
    background: "rgba(0, 0, 0, 0)",
  },
  Card: {
    display: "flex",
    userSelect: "none",
    height: "120px",
    "&::part(base)": {
      background: "var(--sqm-portal-background)",
      border: "var(--sqm-border-thickness) solid var(--sqm-border-color)",
      borderRadius: "var(--sqm-border-radius-normal)",
      boxShadow: "none",
      width: "100%",
    },
    "&::part(body)": {
      display: "flex",
      padding: 0,
    },
    "& .selected": {
      borderRadius: "var(--sqm-border-radius-normal)",
      position: "relative",
      top: "-2%",
      left: "100%",
      color: "var(--sqm-primary-color)",
      margin: "-9px",
    },
  },

  Title: {
    fontSize: "var(--sl-font-size-large)",
    fontWeight: "var(--sl-font-weight-semibold)",
    margin: "var(--sl-spacing-large) 0",
  },

  Image: {
    padding: "var(--sl-spacing-small)",
    minWidth: "96px",
    maxWidth: "96px",
    "& .image": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      borderRadius: "4px",
    },
    "& .image.subdued": {
      filter: "brightness(0.95)",
      opacity: "0.5",
    },
  },

  TextArea: {
    textAlign: "left",
    padding: "var(--sl-spacing-small)",
    paddingLeft: "0",
    "& .title": {
      fontSize: "var(--sl-font-size-medium)",
      lineHeight: "var(--sl-line-height-dense)",
      fontWeight: "600",
      color: "var(--sqm-text)",
      display: "-webkit-box",
      "-webkit-line-clamp": "1",
      "-webkit-box-orient": "vertical",
      overflow: "hidden",
    },
    "& .amount": {
      fontSize: "var(--sl-font-size-small)",
      lineHeight: "var(--sl-line-height-dense)",
      marginTop: "var(--sl-spacing-x-small)",
      color: "var(--sqm-text-subdued)",
      display: "-webkit-box",
      "-webkit-line-clamp": "1",
      "-webkit-box-orient": "vertical",
      overflow: "hidden",
    },
    "& .error": {
      fontSize: "var(--sl-font-size-small)",
      lineHeight: "var(--sl-line-height-dense)",
      marginTop: "var(--sl-spacing-x-small)",
      fontWeight: "600",
      color: "var(--sqm-warning-color-icon)",
      display: "-webkit-box",
      "-webkit-line-clamp": "1",
      "-webkit-box-orient": "vertical",
      overflow: "hidden",
      "& .icon": {
        position: "relative",
        top: "0.1em",
        marginRight: "var(--sl-spacing-xx-small)",
      },
    },
  },

  ChooseAmount: {
    maxWidth: "800px",
    margin: "auto",
    "& .wrapper": {
      display: "flex",
      gap: "var(--sl-spacing-xx-large)",
      "@media (max-width: 799px)": {
        flexDirection: "column",
      },
    },
    "& .image": {
      width: "50%",
      objectFit: "contain",
      maxWidth: "100%",
      height: "250px",
      display: "flex",
      "@media (max-width: 799px)": {
        width: "auto",
      },
    },
    "& .text": {
      width: "50%",
      maxWidth: "400px",
      "@media (max-width: 799px)": {
        width: "auto",
        margin: "auto",
      },
    },
    "& .title": {
      fontSize: "var(--sl-font-size-large)",
      fontWeight: "var(--sl-font-weight-semibold)",
      color: "var(--sqm-text)",
    },
    "& .points": {
      fontSize: "var(--sl-font-size-large)",
      fontWeight: "var(--sl-font-weight-semibold)",
      color: "var(--sqm-accent-color-text)",
    },
    "& .description": {
      fontSize: "var(--sl-font-size-medium)",
      fontWeight: "var(--sl-font-weight-normal)",
      color: "var(--sqm-text-subdued)",
      margin: "var(--sl-spacing-medium) 0",
      lineHeight: "var(--sl-line-height-dense)",
      marginTop: "var(--sl-spacing-xx-small)",
    },
    "& .space": {
      marginBottom: "var(--sl-spacing-xxx-large)",
    },

    "& sl-menu-item[disabled]::part(label)": {
      color: "var(--sqm-text-subdued)",
    },

    "& sl-menu-item[disabled]": {
      "& .step-cost": {
        color: "var(--sqm-text-subdued)",
      },
      "& .step-value": {
        color: "var(--sqm-text-subdued)",
      },
    },
  },

  SelectItem: {
    display: "flex",
    flexDirection: "column",
    "&::part(label)": {
      color: "var(--sqm-text)",
      margin: "0",
    },
    "& .step-cost": {
      color: "var(--sqm-text-subdued)",
      marginBottom: "var(--sl-spacing-x-small)",
    },
    "& .step-unavailable": {
      fontSize: "var(--sl-font-size-small)",
      color: "var(--sqm-warning-color-text)",
      margin: "0",
    },
  },

  Success: {
    textAlign: "center",
    "& .title": {
      fontSize: "var(--sl-font-size-large)",
      fontWeight: "var(--sl-font-weight-semibold)",
      color: "var(--sqm-text)",
    },
    "& .description": {
      color: "var(--sqm-text-subued)",
      maxWidth: "350px",
      margin: "0 auto",
      lineHeight: "var(--sl-line-height-dense)",
      marginBottom: "var(--sl-spacing-xx-large)",
      marginTop: "var(--sl-spacing-xx-small)",
    },
    "& .promo": {
      maxWidth: "350px",
      margin: "-30px auto var(--sl-spacing-xxx-large) auto",
      textAlign: "left",
      color: "var(--sqm-text-subdued)",
    },
  },

  Grid: {
    display: "grid",
    justifyContent: "center",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  },

  Confirmation: {
    maxWidth: "800px",
    margin: "auto",

    "& .wrapper": {
      display: "flex",
      "@media (max-width: 499px)": {
        flexDirection: "column",
      },
    },

    "& .reward-item-container": {
      "@media (max-width: 499px)": {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center",
      },
    },

    "& .reward-item-container .reward-title": {
      paddingBottom: "var(--sl-spacing-medium)",
      lineHeight: "20px",
      "@media (max-width: 499px)": {
        paddingBottom: "none",
        paddingLeft: "var(--sl-spacing-small)",
      },
    },

    "& .padding": {
      padding: "var(--sl-spacing-medium) 0",
      "@media (max-width: 499px)": {
        padding: "var(--sl-spacing-small) 0",
      },
    },
    "& .field": {
      width: "30%",
      fontSize: "var(--sl-font-size-medium)",
      fontWeight: "var(--sl-font-weight-normal)",
      color: "var(--sqm-text-subdued)",
      textAlign: "left",
      paddingRight: "var(--sl-spacing-xxx-large)",
      "@media (max-width: 499px)": {
        width: "100%",
        paddingRight: "0",
        paddingBottom: "0",
      },
    },
    "& .value": {
      fontSize: "var(--sl-font-size-large)",
      fontWeight: "var(--sl-font-weight-semibold)",
    },
    "& .top-border": {
      borderTop: "var(--sqm-border-thickness) solid var(--sqm-border-color)",
    },
    "& .image": {
      width: "200px",
      "@media (max-width: 499px)": {
        width: "100px",
      },
    },
  },

  Button: {
    display: "flex",
    flexWrap: "wrap-reverse",
    margin: "var(--sl-spacing-medium) 0",
    "& .cancel": {
      marginLeft: "auto",
      marginRight: "var(--sl-spacing-medium)",

      "@media (max-width: 499px)": {
        width: "100%",
        marginRight: "0",
        marginTop: "var(--sl-spacing-small)",
      },
    },
    "& .continue": {
      "@media (max-width: 499px)": {
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

  Confetti: {
    pointerEvents: "none",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0%",
    left: "0%",
    zIndex: "1",
  },
};

// JSS config
const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const stageList = ["chooseReward", "chooseAmount", "confirmation", "success"];

export function RewardExchangeView(props: RewardExchangeViewProps) {
  const { states, data, callbacks, refs } = props;
  const { selectedItem, selectedStep } = states;
  const stageProgressList = {
    chooseReward: states.content.text.chooseRewardTitle,
    chooseAmount: states.content.text.chooseAmountTitle,
    confirmation: states.content.text.confirmationTitle,
  };

  function getInput() {
    const item = states.selectedItem;
    if (!item || item?.ruleType === "FIXED_GLOBAL_REWARD")
      return <span class="points">{item?.prettySourceValue}</span>;

    if (!item.steps?.length) {
      return (
        <p>
          {intl.formatMessage(
            {
              id: "notEnoughError",
              defaultMessage: states.content.text.notEnoughError,
            },
            {
              sourceUnit: item.sourceUnit,
            }
          )}
        </p>
      );
    }
    return (
      <sl-select
        style={{ width: "auto" }}
        label={states?.content?.text.selectText}
        class={sheet.classes.Select}
        value={states.selectedStep}
        onSl-select={(e) =>
          callbacks.setExchangeState({
            amount: e.detail?.item?.value?.sourceValue,
            selectedStep: e.detail?.item?.value,
          })
        }
      >
        {item.steps?.map((step) => {
          return (
            <sl-menu-item
              value={step}
              disabled={!step.available}
              class={sheet.classes.SelectItem}
            >
              {step.prettyDestinationValue}
              <br />
              <div class="step-cost" slot="suffix">
                {step.prettySourceValue}
                {step.unavailableReasonCode && (
                  <p class="step-unavailable">
                    {intl.formatMessage(
                      {
                        id: "unavailableCode",
                        defaultMessage: states.content?.text?.notAvailableError,
                      },
                      {
                        unavailableReasonCode: step.unavailableReasonCode,
                        sourceUnit: item.sourceUnit,
                        sourceValue:
                          step.prettySourceValue || item.prettySourceMinValue,
                      }
                    )}
                  </p>
                )}
              </div>
            </sl-menu-item>
          );
        })}
      </sl-select>
    );
  }

  function chooseReward() {
    return [
      <div part="choose-reward-container">
        <div class={sheet.classes.Title}>{states.content.text.rewardTitle}</div>
        {states.loading || states.queryError ? (
          loading()
        ) : (
          <div class={sheet.classes.Grid}>
            {data.exchangeList?.map((item: ExchangeItem) => {
              const style = {
                boxShadow:
                  item.key === selectedItem?.key
                    ? "0 0 0 2px var(--sqm-primary-color)"
                    : "none",
                borderRadius: "var(--sqm-border-radius-normal)",
                borderColor: "none",
              };

              return (
                <div key={item.key} style={style}>
                  <sl-card
                    exportparts="base: exchange-card-container"
                    class={sheet.classes.Card}
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
                      <div class="selected">
                        <CheckmarkFilled />
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        height: "120px",
                        borderRadius: "3px",
                        background: item.unavailableReasonCode
                          ? "rgba(0, 0, 0, 0.05)"
                          : "rgba(0, 0, 0, 0)",
                      }}
                    >
                      <div
                        class={sheet.classes.Image}
                        style={{
                          opacity: item.unavailableReasonCode ? "0.5" : "1",
                        }}
                      >
                        <img
                          class={
                            item.unavailableReasonCode
                              ? "image subdued"
                              : "image"
                          }
                          src={
                            item?.imageUrl ||
                            getAssetPath("./assets/Reward-image.png")
                          }
                        />
                      </div>
                      <div
                        class={sheet.classes.TextArea}
                        style={{
                          opacity: item.unavailableReasonCode ? "0.5" : "1",
                        }}
                      >
                        <div
                          class="title"
                          style={{
                            "-webkit-line-clamp": item.unavailableReasonCode
                              ? "1"
                              : "2",
                          }}
                        >
                          {item.name ?? ""}
                        </div>
                        <div
                          class="amount"
                          style={{
                            "-webkit-line-clamp": item.unavailableReasonCode
                              ? "1"
                              : "2",
                          }}
                        >
                          {intl.formatMessage(
                            {
                              id: "sourceAmountMessage",
                              defaultMessage:
                                states.content?.text?.sourceAmountMessage,
                            },
                            {
                              ruleType: item.ruleType,
                              sourceValue: item.prettySourceValue,
                              sourceMinValue: item.prettySourceMinValue,
                              sourceMaxValue: item.prettySourceMaxValue,
                            }
                          )}
                        </div>
                        {item.unavailableReasonCode && (
                          <div class="error">
                            <sl-icon
                              class="icon"
                              name="exclamation-triangle-fill"
                            ></sl-icon>
                            {intl.formatMessage(
                              {
                                id: "unavailableCode",
                                defaultMessage:
                                  states.content?.text?.notAvailableError,
                              },
                              {
                                unavailableReasonCode:
                                  item.unavailableReasonCode,
                                sourceUnit: item.sourceUnit,
                                sourceValue:
                                  item.prettySourceValue ||
                                  item.prettySourceMinValue,
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
          </div>
        )}
        <div class={sheet.classes.Button}>
          <sl-button
            exportparts="base: primarybutton-base"
            type="primary"
            class="continue right"
            size="large"
            onClick={() => callbacks.setStage("chooseAmount")}
            loading={states.loading}
            disabled={!states.selectedItem}
          >
            {states.content.text.continueText}
          </sl-button>
        </div>
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
        <div class={sheet.classes.ChooseAmount} part="choose-amount-container">
          <div class="wrapper">
            <img
              class="image"
              src={
                selectedItem?.imageUrl ||
                getAssetPath("./assets/Reward-image.png")
              }
            />
            <div class="text">
              <div class="title">{selectedItem?.name ?? ""}</div>
              {states.selectedItem?.ruleType === "FIXED_GLOBAL_REWARD" ? (
                <div class="points">{input}</div>
              ) : (
                <div class="description">{selectedItem?.description}</div>
              )}
              {states.selectedItem?.ruleType === "FIXED_GLOBAL_REWARD" ? (
                <div class="description">{selectedItem?.description}</div>
              ) : (
                <div>{input}</div>
              )}
              <div class="space" />
            </div>
          </div>
          <div class={sheet.classes.Button}>
            <sl-button
              exportparts="base: secondarybutton-base"
              class="cancel"
              size="large"
              type="secondary"
              onClick={() => callbacks.resetState()}
            >
              {states.content.text.cancelText}
            </sl-button>
            <sl-button
              exportparts="base: primarybutton-base"
              class="continue"
              size="large"
              type="primary"
              onClick={() => callbacks.setStage("confirmation")}
              disabled={isDisabled}
            >
              {states.content.text.continueToConfirmationText}
            </sl-button>
          </div>
        </div>
      </div>
    );
  }

  function confirmation() {
    const cost =
      selectedStep?.prettySourceValue || selectedItem?.prettySourceValue;

    const amount = selectedStep?.prettyDestinationValue;
    return (
      <div>
        <div class={sheet.classes.Confirmation} part="confirmation-container">
          <div class={sheet.classes.Title}>
            {states.content.text.redeemTitle}
          </div>
          <div class="wrapper">
            <div class="field">{states.content.text.rewardNameTitle}</div>
            <div class="reward-item-container">
              <div class="reward-title">{selectedItem?.name}</div>
              <img
                class="image"
                src={
                  selectedItem?.imageUrl ||
                  getAssetPath("./assets/Reward-image.png")
                }
              />
            </div>
          </div>
          <div class="wrapper padding">
            <div class="field"></div>
          </div>
          {amount && (
            <div class="wrapper top-border padding">
              <div class="field">{states.content.text.rewardAmountTitle}</div>
              <div>{amount}</div>
            </div>
          )}
          <div class="wrapper top-border padding">
            <div class="field">{states.content.text.costTitle}</div>
            <div class="value">{cost}</div>
          </div>

          <div class={sheet.classes.Button}>
            <sl-button
              class="cancel"
              type="secondary"
              size="large"
              onClick={() => callbacks.setStage("chooseAmount")}
            >
              {states.content.text.backText}
            </sl-button>
            <sl-button
              class="continue"
              size="large"
              type="primary"
              loading={states.loading}
              onClick={callbacks.exchangeReward}
            >
              {states.content.text.redeemText}
            </sl-button>
          </div>
        </div>
      </div>
    );
  }

  function success() {
    return (
      <div class={sheet.classes.Success} part="success-container">
        <Gift />
        <Confetti />
        <div class="title">{states.content.text?.rewardRedeemedText}</div>
        <div class="description">
          {intl.formatMessage(
            {
              id: "successMessage",
              defaultMessage: states.content.text.redemptionSuccessText,
            },
            {
              sourceValue:
                states.selectedItem?.prettySourceValue ??
                states.selectedStep?.prettySourceValue,
              destinationValue:
                states.selectedStep?.prettyDestinationValue ||
                states.selectedItem?.name ||
                states.selectedItem?.globalRewardKey,
            }
          )}
        </div>
        {data?.fuelTankCode && (
          <div class="promo">
            {states.content.text.promoCode}
            <CopyTextView
              copyString={data.fuelTankCode}
              tooltiptext={states?.content?.text.tooltipText}
              open={states.open}
              onClick={callbacks.copyFuelTankCode}
            ></CopyTextView>
          </div>
        )}
        <div class={sheet.classes.Button}>
          <sl-button
            class="continue center"
            type="primary"
            size="large"
            onClick={() => callbacks.resetState(true)}
          >
            {states.content.text.doneText}
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
      <div class={sheet.classes.Grid} part="loading-container">
        {[...Array(states.content.text.skeletonCardNum)].map(() => {
          return (
            <div>
              <sl-card class={sheet.classes.Card}>
                <div class={sheet.classes.CardLayout}>
                  <div>
                    <sl-skeleton
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "9px",
                        "--border-radius": "var(--sqm-border-radius-normal)",
                      }}
                    ></sl-skeleton>
                  </div>

                  <div
                    style={{
                      margin:
                        "var(--sl-spacing-small) var(--sl-spacing-small) 0 0",
                      width: "100%",
                    }}
                  >
                    <sl-skeleton
                      style={{ marginBottom: "var(--sl-spacing-small)" }}
                    ></sl-skeleton>
                    <sl-skeleton
                      style={{ marginBottom: "var(--sl-spacing-small)" }}
                    ></sl-skeleton>
                    <sl-skeleton style={{ width: "45%" }}></sl-skeleton>
                  </div>
                </div>
              </sl-card>
            </div>
          );
        })}
      </div>
    );
  }

  function errorMessage() {
    return (
      <sl-alert type="danger" open>
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
        {states.content.text.redemptionError}
      </sl-alert>
    );
  }

  function queryErrorMessage() {
    return (
      <sl-alert type="danger" open>
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
        {states.content.text.queryError}
      </sl-alert>
    );
  }

  function Confetti() {
    return (
      <canvas
        ref={(canvas: HTMLCanvasElement & { confetti }) => {
          if (!refs?.canvasRef) return;
          refs.canvasRef.current = canvas;
        }}
        id="my-canvas"
        class={sheet.classes.Confetti}
      ></canvas>
    );
  }

  if (states.noExchangeOptions) return states.content.text.empty;

  return (
    <div class={sheet.classes.Container} part="sqm-base">
      <style type="text/css">{styleString}</style>
      <div>
        {stageMap()}
        {states.exchangeError && errorMessage()}
        {states.queryError && !states.exchangeError && queryErrorMessage()}
        {currentStage && currentStage()}
        {states.redeemStage === "success"}
      </div>
    </div>
  );
}
