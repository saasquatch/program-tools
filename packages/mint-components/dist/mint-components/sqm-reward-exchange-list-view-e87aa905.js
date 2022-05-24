import { h, i as getAssetPath } from './index-832bd454.js';
import { i as intl } from './global-b1f18590.js';
import { H as HostBlock } from './mixins-d2de6ff8.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { S as ShareLinkView } from './sqm-share-link-view-9a6d536e.js';

const LeftArrow = () => (h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: { marginBottom: "-2px", marginRight: "5px" } },
  h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M7.34655 1.90573C7.75405 2.31323 7.75405 2.97392 7.34655 3.38143L3.56266 7.16531H14.9565C15.5328 7.16531 16 7.6325 16 8.20879C16 8.78509 15.5328 9.25227 14.9565 9.25227H3.56266L7.69437 13.384C8.10188 13.7915 8.10188 14.4522 7.69437 14.8597C7.28687 15.2672 6.62617 15.2672 6.21867 14.8597L0.305628 8.94664C-0.101876 8.53914 -0.101876 7.87845 0.305628 7.47094L5.87084 1.90573C6.27835 1.49822 6.93904 1.49822 7.34655 1.90573Z", fill: "#858585" })));
const ExchangeArrows = () => (h("svg", { width: 19, height: 15, fill: "none", xmlns: "http://www.w3.org/2000/svg" },
  h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.125 14.783a.6.6 0 0 1-.851 0l-3.9-3.923a.6.6 0 1 1 .85-.846L4.1 12.905V1.52a.6.6 0 0 1 1.2 0v11.385l2.875-2.891a.6.6 0 1 1 .85.846l-3.9 3.923Zm9.6-13.686a.6.6 0 0 0-.851 0l-3.9 3.923a.6.6 0 0 0 .85.846L13.7 2.975V14.36a.6.6 0 1 0 1.2 0V2.975l2.875 2.891a.6.6 0 1 0 .85-.846l-3.9-3.923Z", fill: "#333" })));
const CheckMark = () => (h("svg", { width: 12, height: 10, fill: "none", xmlns: "http://www.w3.org/2000/svg" },
  h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11.58.23c.475.371.56 1.057.19 1.532L5.69 9.554a1.091 1.091 0 0 1-1.631.1L.32 5.915a1.09 1.09 0 1 1 1.542-1.542L4.73 7.239 10.049.42A1.09 1.09 0 0 1 11.58.23Z", fill: "#fff" })));
const CheckmarkFilled = () => (h("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
  h("path", { d: "M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z", fill: "currentColor" }),
  h("path", { d: "M5.68394 8.77046C5.28103 8.39273 4.64819 8.41315 4.27046 8.81606C3.89273 9.21897 3.91315 9.85181 4.31606 10.2295L5.68394 8.77046ZM7.66667 12L6.98273 12.7295C7.36738 13.0902 7.96595 13.0902 8.35061 12.7295L7.66667 12ZM13.6839 7.72954C14.0869 7.35181 14.1073 6.71897 13.7295 6.31606C13.3518 5.91315 12.719 5.89273 12.3161 6.27046L13.6839 7.72954ZM4.31606 10.2295L6.98273 12.7295L8.35061 11.2705L5.68394 8.77046L4.31606 10.2295ZM8.35061 12.7295L13.6839 7.72954L12.3161 6.27046L6.98273 11.2705L8.35061 12.7295Z", fill: "white" })));
const Gift = () => (h("svg", { width: 156, height: 157, fill: "none", xmlns: "http://www.w3.org/2000/svg" },
  h("path", { d: "M40.18 126h83.663a3 3 0 0 0 3-3V73.966a3 3 0 0 0-3-3H40.18a3 3 0 0 0-3 3V123a3 3 0 0 0 3 3Z", fill: "#FFD34F" }),
  h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M37.18 73.862v7.966h89.663v-7.966H37.18Z", fill: "#E9BB30" }),
  h("path", { d: "M133.039 74.224a2.18 2.18 0 0 0 2.187-2.172v-19.19c0-1.2-.98-2.172-2.187-2.172H31.347a2.18 2.18 0 0 0-2.187 2.172v19.19c0 1.2.98 2.172 2.187 2.172H133.04Z", fill: "#FFC000" }),
  h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M123.287 35.172c0 6.056-9.155 15.226-13.76 15.654H88.888V126H75.141V50.826H58.534c-9.462-2.038-17.803-9.258-17.803-16.944 0-7.49 3.274-13.422 9.23-15.983 5.693-2.446 12.265-1.105 17.46 2.479 6.378 4.398 9.956 12.654 13.202 20.144.284.657.567 1.308.848 1.95.274-.608.55-1.228.83-1.856 3.216-7.22 6.887-15.464 13.057-19.89 5.454-3.913 12.387-5.39 18.38-2.711 6.197 2.77 9.549 9.127 9.549 17.157Zm-23.306-8.266c3.305-2.37 7.262-2.8 10.645 0 2.946 2.44 3.103 3.588 3.482 6.351l.067.483c0 4.09-3.549 10.252-7.097 10.252-2.515 0-4.489-.022-6.34-.041-3.375-.036-6.337-.068-11.403.04.966-1.86 1.737-3.644 2.473-5.346 1.967-4.553 3.678-8.515 8.173-11.739Zm-39.034 0c-1.6-1.103-5.268-.61-6.79.043-1.257.54-3.134 2.19-3.134 6.933 0 4.61 7.511 8.59 7.511 8.59s5.962 1.52 16.607 1.52c-3.624-8.922-8.757-13.336-14.194-17.086Z", fill: "#EB5757" }),
  h("path", { d: "M75.086 74.224h13.85v7.604h-13.85v-7.604Z", fill: "#DD4747" }),
  h("g", { filter: "url(#a)" },
    h("ellipse", { cx: 82.008, cy: 141.207, rx: 36.813, ry: 5.793, fill: "#E0DDDD", "fill-opacity": 0.8 })),
  h("path", { d: "M150.446 79.134a.5.5 0 0 1 .9 0l1.133 2.336c.05.102.132.184.234.233l2.344 1.122a.5.5 0 0 1 0 .902l-2.344 1.122a.503.503 0 0 0-.234.233l-1.133 2.336a.5.5 0 0 1-.9 0l-1.134-2.336a.499.499 0 0 0-.234-.233l-2.343-1.122a.5.5 0 0 1 0-.902l2.343-1.122a.499.499 0 0 0 .234-.233l1.134-2.336Z", fill: "#FAB6B6" }),
  h("path", { d: "M14.86 29.168a.5.5 0 0 1 .9 0l1.133 2.336a.5.5 0 0 0 .234.233l2.344 1.122a.5.5 0 0 1 0 .902l-2.344 1.122a.5.5 0 0 0-.234.233l-1.133 2.336a.5.5 0 0 1-.9 0l-1.134-2.336a.5.5 0 0 0-.234-.233l-2.343-1.122a.5.5 0 0 1 0-.902l2.344-1.122a.5.5 0 0 0 .233-.233l1.134-2.336Z", fill: "#F4EFBC" }),
  h("path", { d: "m125.382 0 .712 1.466 1.475.706-1.475.707-.712 1.466-.711-1.466-1.476-.707 1.476-.706.711-1.466Z", fill: "#FDA802" }),
  h("path", { d: "m2.187 103.552.711 1.466 1.476.706-1.476.707-.711 1.466-.711-1.466L0 105.724l1.476-.706.71-1.466Z", fill: "#E4599C" }),
  h("defs", null,
    h("filter", { id: "a", x: 35.195, y: 125.414, width: 93.625, height: 31.586, filterUnits: "userSpaceOnUse", "color-interpolation-filters": "s-rGB" },
      h("feFlood", { "flood-opacity": 0, result: "BackgroundImageFix" }),
      h("feBlend", { in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }),
      h("feGaussianBlur", { stdDeviation: 5, result: "effect1_foregroundBlur_653_17907" })))));

function Dot({ active, completed, incomplete, stage, }) {
  return (h("div", { style: {
      display: "flex",
    } },
    h("div", { style: {
        backgroundColor: completed
          ? "var(--sl-color-success-500)"
          : incomplete
            ? "var(--sl-color-neutral-200)"
            : "var(--sl-color-neutral-0)",
        border: active
          ? "1px solid var(--sl-color-success-500)"
          : incomplete
            ? "1px solid var(--sl-color-neutral-200)"
            : "1px solid var(--sl-color-success-500)",
        borderRadius: "50%",
        width: "23px",
        height: "23px",
        margin: "-11px",
        zIndex: "1",
        boxSizing: "content-box",
      } }, completed ? (h("div", { style: { top: "-10.5%", left: "23.5%", position: "relative" } },
      h(CheckMark, null))) : (h("div", { style: {
        color: active
          ? "var(--sl-color-success-500)"
          : "var(--sl-color-neutral-50)",
        width: "23px",
        lineHeight: "24px",
        textAlign: "center",
        position: "relative",
      } }, stage + 1)))));
}
function ProgressLine({ incomplete = false, active = false, invisible = false, }) {
  return (h("div", { style: {
      content: "''",
      flex: "0.5 0.5 0",
      height: "4px",
      borderRadius: "4px",
      background: incomplete || active
        ? "var(--sl-color-neutral-200)"
        : "var(--sl-color-success-500)",
      position: "relative",
      bottom: "0",
      left: "0",
      display: "flex",
      justifyContent: "center",
      columnGap: "50px",
      marginRight: "-2px",
      boxSizing: "content-box",
      opacity: invisible ? "0" : "1",
    } }));
}
function Progress({ active, completed, incomplete, stage }) {
  return [
    h(ProgressLine, { incomplete: incomplete, invisible: stage === 0 }),
    h(Dot, { active: active, completed: completed, incomplete: incomplete, stage: stage }),
    h(ProgressLine, { incomplete: incomplete, active: active, invisible: stage === 2 }),
  ];
}
function ProgressBar({ stageCount, currentStage, }) {
  return (h("div", { style: { display: "flex", columnGap: "-2px" } }, Array.from(Array(stageCount).keys()).map((stage) => (h(Progress, { active: currentStage === stage, completed: currentStage > stage, incomplete: currentStage < stage, stage: stage })))));
}

const stageList = ["chooseReward", "chooseAmount", "confirmation", "success"];
function RewardExchangeView(props) {
  const { states, data, callbacks, refs } = props;
  const { selectedItem, selectedStep } = states;
  const stageProgressList = {
    chooseReward: states.content.text.chooseRewardTitle,
    chooseAmount: states.content.text.chooseAmountTitle,
    confirmation: states.content.text.confirmationTitle,
  };
  const style = {
    HostBlock: HostBlock,
    Container: {
      minWidth: "300px",
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
      "&::part(label)": {
        color: "var(--sl-color-primary-500)",
      },
      "&::part(menu)": {
        maxHeight: "50vh",
      },
      "& sl-menu-item::part(checked-icon)": {
        top: "calc(25% - 0.5em)",
      },
      "& sl-menu-item::part(base):focus": {
        background: "transparent",
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
          color: "var(--sl-color-neutral-200)",
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
        boxShadow: "none",
        width: "100%",
      },
      "&::part(body)": {
        display: "flex",
        padding: 0,
      },
      "& .selected": {
        position: "relative",
        top: "-2%",
        left: "100%",
        color: "var(--sl-color-primary-500)",
        margin: "-9px",
      },
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
    },
    TextArea: {
      textAlign: "left",
      padding: "var(--sl-spacing-small)",
      paddingLeft: "0",
      "& .title": {
        fontSize: "var(--sl-font-size-medium)",
        lineHeight: "var(--sl-line-height-dense)",
        fontWeight: "600",
        color: "var(--sl-color-neutral-1000)",
        display: "-webkit-box",
        "-webkit-line-clamp": "1",
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
      },
      "& .amount": {
        fontSize: "var(--sl-font-size-small)",
        lineHeight: "var(--sl-line-height-dense)",
        marginTop: "var(--sl-spacing-x-small)",
        color: "var(--sl-color-neutral-500)",
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
        color: "var(--sl-color-warning-600)",
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
      margin: "var(--sl-spacing-medium) 0",
      "& .wrapper": {
        display: "flex",
        gap: "var(--sl-spacing-xx-large)",
        "@media (max-width: 799px)": {
          flexDirection: "column",
        },
      },
      "& .image": {
        width: "47%",
        objectFit: "contain",
        maxWidth: "100%",
        height: "250px",
        display: "flex",
        "@media (max-width: 799px)": {
          width: "auto",
        },
      },
      "& .text": {
        width: "53%",
        maxWidth: "400px",
        "@media (max-width: 799px)": {
          width: "auto",
          margin: "auto",
        },
      },
      "& .title": {
        fontSize: "var(--sl-font-size-large)",
        fontWeight: "var(--sl-font-weight-semibold)",
        color: "var(--sl-color-neutral-1000)",
      },
      "& .points": {
        fontSize: "var(--sl-font-size-large)",
        fontWeight: "var(--sl-font-weight-semibold)",
        color: "var(--sl-color-primary-500)",
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
    SelectItem: {
      display: "flex",
      flexDirection: "column",
      "& .step-cost": {
        color: "var(--sl-color-neutral-400)",
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
        marginBottom: "var(--sl-spacing-xx-large)",
        marginTop: "var(--sl-spacing-xx-small)",
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
        textTransform: "uppercase",
        fontSize: "var(--sl-font-size-medium)",
        fontWeight: "var(--sl-font-weight-normal)",
        color: "var(--sl-color-neutral-400)",
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
        borderTop: "1px solid var(--sl-color-neutral-200)",
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
        "&::part(base)": {
          fontWeight: "var(--sl-font-weight-normal)",
          color: "var(--sl-color-neutral-1000)",
        },
        "@media (max-width: 499px)": {
          width: "100%",
          marginRight: "0",
          marginTop: "var(--sl-spacing-small)",
        },
      },
      "& .continue": {
        "&::part(base)": {
          background: "var(--sl-color-primary-500)",
          borderColor: "var(--sl-color-primary-500)",
          fontWeight: "var(--sl-font-weight-normal)",
          color: "var(--sl-color-neutral-0)",
        },
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
  };
  // JSS config
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  function getInput() {
    var _a, _b, _c;
    const item = states.selectedItem;
    if (!item || (item === null || item === void 0 ? void 0 : item.ruleType) === "FIXED_GLOBAL_REWARD")
      return h("span", null, item === null || item === void 0 ? void 0 : item.prettySourceValue);
    if (!((_a = item.steps) === null || _a === void 0 ? void 0 : _a.length)) {
      return (h("p", null, intl.formatMessage({
        id: "notEnoughError",
        defaultMessage: states.content.text.notEnoughError,
      }, {
        sourceUnit: item.sourceUnit,
      })));
    }
    return (h("sl-select", { style: { width: "auto" }, label: (_b = states === null || states === void 0 ? void 0 : states.content) === null || _b === void 0 ? void 0 : _b.text.selectText, class: sheet.classes.Select, value: states.selectedStep, "onSl-select": (e) => {
        var _a, _b, _c, _d, _e;
        return callbacks.setExchangeState({
          amount: (_c = (_b = (_a = e.detail) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.sourceValue,
          selectedStep: (_e = (_d = e.detail) === null || _d === void 0 ? void 0 : _d.item) === null || _e === void 0 ? void 0 : _e.value,
        });
      } }, (_c = item.steps) === null || _c === void 0 ? void 0 : _c.map((step) => {
      var _a, _b;
      return (h("sl-menu-item", { value: step, disabled: !step.available },
        h("div", { class: sheet.classes.SelectItem },
          h("p", { style: { margin: "0" } }, step.prettyDestinationValue),
          h("div", { class: "step-cost", slot: "suffix" }, step.prettySourceValue)),
        step.unavailableReasonCode && (h("p", { style: {
            fontSize: "var(--sl-font-size-small)",
            color: "var(--sl-color-warning-500)",
            margin: "0",
          } }, intl.formatMessage({
          id: "unavailableCode",
          defaultMessage: (_b = (_a = states.content) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.notAvailableError,
        }, {
          unavailableReasonCode: step.unavailableReasonCode,
          sourceUnit: item.sourceUnit,
          sourceValue: step.prettySourceValue || item.prettySourceMinValue,
        })))));
    })));
  }
  function chooseReward() {
    var _a;
    return [
      h("div", null,
        h("h2", { style: { margin: "var(--sl-spacing-large) 0" } }, states.content.text.rewardTitle),
        states.loading ? (loading()) : (h("div", { class: sheet.classes.Grid }, (_a = data.exchangeList) === null || _a === void 0 ? void 0 : _a.map((item) => {
          var _a, _b, _c, _d, _e;
          const style = {
            boxShadow: item.key === (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.key)
              ? "0 0 0 2px var(--sl-color-primary-500)"
              : "none",
            borderRadius: "4px",
          };
          return (h("div", { key: item.key, style: style },
            h("sl-card", { class: sheet.classes.Card, style: {
                cursor: item.unavailableReasonCode
                  ? "not-allowed"
                  : "pointer",
              }, onClick: () => item.available &&
                callbacks.setExchangeState({ selectedItem: item }) },
              item.key === (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.key) && (h("div", { class: "selected" },
                h(CheckmarkFilled, null))),
              h("div", { style: {
                  display: "flex",
                  width: "100%",
                  height: "120px",
                  borderRadius: "3px",
                  background: item.unavailableReasonCode
                    ? "rgba(0, 0, 0, 0.05)"
                    : "rgba(0, 0, 0, 0)",
                } },
                h("div", { class: sheet.classes.Image, style: {
                    opacity: item.unavailableReasonCode ? "0.5" : "1",
                  } },
                  h("img", { class: item.unavailableReasonCode
                      ? "image subdued"
                      : "image", src: (item === null || item === void 0 ? void 0 : item.imageUrl) ||
                      getAssetPath("./assets/placeholder.png") })),
                h("div", { class: sheet.classes.TextArea, style: {
                    opacity: item.unavailableReasonCode ? "0.5" : "1",
                  } },
                  h("div", { class: "title", style: {
                      "-webkit-line-clamp": item.unavailableReasonCode
                        ? "1"
                        : "2",
                    } }, (_a = item.name) !== null && _a !== void 0 ? _a : ""),
                  h("div", { class: "amount", style: {
                      "-webkit-line-clamp": item.unavailableReasonCode
                        ? "1"
                        : "2",
                    } }, intl.formatMessage({
                    id: "sourceAmountMessage",
                    defaultMessage: (_c = (_b = states.content) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.sourceAmountMessage,
                  }, {
                    ruleType: item.ruleType,
                    sourceValue: item.prettySourceValue,
                    sourceMinValue: item.prettySourceMinValue,
                    sourceMaxValue: item.prettySourceMaxValue,
                  })),
                  item.unavailableReasonCode && (h("div", { class: "error" },
                    h("sl-icon", { class: "icon", name: "exclamation-triangle-fill" }),
                    intl.formatMessage({
                      id: "unavailableCode",
                      defaultMessage: (_e = (_d = states.content) === null || _d === void 0 ? void 0 : _d.text) === null || _e === void 0 ? void 0 : _e.notAvailableError,
                    }, {
                      unavailableReasonCode: item.unavailableReasonCode,
                      sourceUnit: item.sourceUnit,
                      sourceValue: item.prettySourceValue ||
                        item.prettySourceMinValue,
                    }))))))));
        }))),
        h("div", { class: sheet.classes.Button },
          h("sl-button", { class: "continue right", size: "large", onClick: () => callbacks.setStage("chooseAmount"), loading: states.loading, disabled: !states.selectedItem }, states.content.text.continueText))),
    ];
  }
  function chooseAmount() {
    var _a, _b, _c, _d;
    const input = getInput();
    const isDisabled = ((_a = states.selectedItem) === null || _a === void 0 ? void 0 : _a.ruleType) === "FIXED_GLOBAL_REWARD"
      ? false
      : input && !states.amount;
    return (h("div", null,
      h("div", { class: sheet.classes.ChooseAmount },
        h("div", { class: "wrapper" },
          h("img", { class: "image", src: (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.imageUrl) ||
              getAssetPath("./assets/placeholder.png") }),
          h("div", { class: "text" },
            h("div", { class: "title" }, (_b = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.name) !== null && _b !== void 0 ? _b : ""),
            ((_c = states.selectedItem) === null || _c === void 0 ? void 0 : _c.ruleType) === "FIXED_GLOBAL_REWARD" ? (h("div", { class: "points" }, input)) : (h("div", { class: "description" }, selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.description)),
            ((_d = states.selectedItem) === null || _d === void 0 ? void 0 : _d.ruleType) === "FIXED_GLOBAL_REWARD" ? (h("div", { class: "description" }, selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.description)) : (h("div", { class: "points" }, input)),
            h("div", { class: "space" }),
            h("div", { class: sheet.classes.Button },
              h("sl-button", { class: "cancel", size: "large", type: "text", onClick: () => callbacks.resetState() }, states.content.text.cancelText),
              h("sl-button", { class: "continue", size: "large", onClick: () => callbacks.setStage("confirmation"), disabled: isDisabled }, states.content.text.continueToConfirmationText)))))));
  }
  function confirmation() {
    console.log(selectedItem);
    console.log(selectedStep);
    const cost = (selectedStep === null || selectedStep === void 0 ? void 0 : selectedStep.prettySourceValue) || selectedItem.prettySourceValue;
    const amount = selectedStep === null || selectedStep === void 0 ? void 0 : selectedStep.prettyDestinationValue;
    return (h("div", null,
      h("h2", { style: { margin: "var(--sl-spacing-large) 0", textAlign: "center" } }, states.content.text.redeemTitle),
      h("div", { class: sheet.classes.Confirmation },
        h("div", { class: "wrapper" },
          h("div", { class: "field" }, states.content.text.rewardNameTitle),
          h("div", { class: "reward-item-container" },
            h("div", { class: "reward-title" }, selectedItem.name),
            h("img", { class: "image", src: (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.imageUrl) ||
                getAssetPath("./assets/placeholder.png") }))),
        h("div", { class: "wrapper padding" },
          h("div", { class: "field" })),
        amount && (h("div", { class: "wrapper top-border padding" },
          h("div", { class: "field" }, states.content.text.rewardAmountTitle),
          h("div", null, amount))),
        h("div", { class: "wrapper top-border padding" },
          h("div", { class: "field" }, states.content.text.costTitle),
          h("div", { class: "value" }, cost)),
        h("div", { class: sheet.classes.Button },
          h("sl-button", { class: "cancel", type: "text", size: "large", onClick: () => callbacks.setStage("chooseAmount") }, states.content.text.backText),
          h("sl-button", { class: "continue", size: "large", loading: states.loading, onClick: callbacks.exchangeReward }, states.content.text.redeemText)))));
  }
  function success() {
    var _a, _b, _c, _d, _e;
    console.log("success");
    return (h("div", { class: sheet.classes.Success },
      h(Gift, null),
      h(Confetti, null),
      h("div", { class: "title" }, states.content.text.rewardRedeemedText),
      h("div", { class: "description" }, intl.formatMessage({
        id: "successMessage",
        defaultMessage: states.content.text.redemptionSuccessText,
      }, {
        sourceValue: (_a = states.selectedItem.prettySourceValue) !== null && _a !== void 0 ? _a : (_b = states.selectedStep) === null || _b === void 0 ? void 0 : _b.prettySourceValue,
        destinationValue: ((_c = states.selectedStep) === null || _c === void 0 ? void 0 : _c.prettyDestinationValue) ||
          ((_d = states.selectedItem) === null || _d === void 0 ? void 0 : _d.name) ||
          states.selectedItem.globalRewardKey,
      })),
      (data === null || data === void 0 ? void 0 : data.fuelTankCode) && (h("div", { style: {
          width: "40%",
          margin: "-30px auto var(--sl-spacing-xxx-large) auto",
          textAlign: "left",
          color: "var(--sl-color-neutral-700)",
        } },
        states.content.text.promoCode,
        h(ShareLinkView, { shareString: data.fuelTankCode, tooltiptext: (_e = states === null || states === void 0 ? void 0 : states.content) === null || _e === void 0 ? void 0 : _e.text.toopTipText, open: states.open, onClick: callbacks.copyFuelTankCode }))),
      h("div", { class: sheet.classes.Button },
        h("sl-button", { class: "continue center", type: "primary", size: "large", onClick: () => callbacks.resetState(true) }, states.content.text.doneText))));
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
    return (h("div", { class: sheet.classes.ProgressBar },
      h("div", { class: "text-area" }, Object.keys(stageProgressList).map((stage) => {
        if (stageList.indexOf(stage) <= stageNumber) {
          return h("span", { class: "text" }, stageProgressList[stage]);
        }
        else {
          return (h("span", { class: "text subdued" }, stageProgressList[stage]));
        }
      })),
      h(ProgressBar, { stageCount: 3, currentStage: stageNumber })));
  }
  function loading() {
    return (h("div", { class: sheet.classes.Grid }, [...Array(states.content.text.skeletonCardNum)].map(() => {
      return (h("div", null,
        h("sl-card", { class: sheet.classes.Card },
          h("div", { class: sheet.classes.CardLayout },
            h("div", null,
              h("sl-skeleton", { style: {
                  width: "100px",
                  height: "100px",
                  margin: "9px",
                  "--border-radius": "4px",
                } })),
            h("div", { style: {
                margin: "var(--sl-spacing-small) var(--sl-spacing-small) 0 0",
                width: "100%",
              } },
              h("sl-skeleton", { style: { marginBottom: "var(--sl-spacing-small)" } }),
              h("sl-skeleton", { style: { marginBottom: "var(--sl-spacing-small)" } }),
              h("sl-skeleton", { style: { width: "45%" } }))))));
    })));
  }
  function errorMessage() {
    return (h("sl-alert", { type: "danger", open: true },
      h("sl-icon", { slot: "icon", name: "exclamation-octagon" }),
      states.content.text.redemptionError));
  }
  function queryErrorMessage() {
    return (h("sl-alert", { type: "danger", open: true },
      h("sl-icon", { slot: "icon", name: "exclamation-octagon" }),
      states.content.text.queryError));
  }
  function Confetti() {
    return (h("canvas", { ref: (canvas) => {
        if (!(refs === null || refs === void 0 ? void 0 : refs.canvasRef))
          return;
        refs.canvasRef.current = canvas;
      }, id: "my-canvas", style: {
        pointerEvents: "none",
        position: "absolute",
        width: "500px",
        height: "500px",
        top: "5%",
        zIndex: "1",
        left: "25%",
      } }));
  }
  return (h("div", { class: sheet.classes.Container },
    h("style", { type: "text/css" }, styleString),
    h("div", null,
      console.log(props),
      stageMap(),
      states.exchangeError && errorMessage(),
      states.queryError && queryErrorMessage(),
      currentStage && currentStage(),
      states.redeemStage === "success")));
}

export { RewardExchangeView as R };
