import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { ExchangeItem } from "./useRewardExchangeList";

export type RewardExchangeViewProps = {
  states: {
    content: {
      listType;
    };
    selectedItem: ExchangeItem;
    redeemStage: string;
  };
  data: {
    exchangeList: any;
  };
  callbacks: {
    exchangeReward: (e: unknown) => unknown;
    openDrawer: () => void;
    nextStage: () => void;
    setRedeemStage: Function;
    setSelectedItem: Function;
  };
  refs: {
    drawerRef: any;
    inputRef: any;
  };
};

const style = {
  Container: {
    position: "relative",
  },
  Base: {
    "&::part(base)": {
      width: "300px",
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
    display: "flex",
    width: "100%",
    alignItems: "end",
  },
  Select: {
    "&::part(base)": {
      flex: "0.75",
    },
  },
  Button: {
    display: "block",
    textAlign: "center",
  },
};
// JSS config
jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function RewardExchangeView(props: RewardExchangeViewProps) {
  const { states, data, callbacks, refs } = props;

  const { selectedItem } = states;

  const getInput = (item: ExchangeItem) => {
    if (!item || item?.ruleType === "FIXED_GLOBAL_REWARD") return <span></span>;

    if (!item?.steps?.length) {
      return (
        <sl-input
          style={{ width: "auto" }}
          label="Input amount"
          type="number"
          inputmode="numeric"
          min={item?.sourceMinValue || 0}
          max={item?.sourceMaxValue || ""}
          class={sheet.classes.Select}
          ref={(ref) => (refs.inputRef.current = ref)}
        ></sl-input>
      );
    }
    return (
      <sl-select
        style={{ width: "auto" }}
        label="Input amount"
        class={sheet.classes.Select}
        ref={(ref) => (refs.inputRef.current = ref)}
      >
        {item?.steps?.map((step) => (
          <sl-menu-item value={step.sourceValue}>
            {step.prettyDestinationValue}
          </sl-menu-item>
        ))}
      </sl-select>
    );
  };

  function chooseReward() {
    return (
      <div>
        {data.exchangeList?.map((item) => (
          <div>
            <sl-card class={sheet.classes.Base}>
              <sl-button
                onClick={() => callbacks.setSelectedItem(item)}
                disabled={!item.available}
              >
                {item.description}
              </sl-button>
            </sl-card>
          </div>
        ))}
        <div>
          <sl-button
            onClick={callbacks.nextStage}
            style={{ display: "block" }}
            class={sheet.classes.Button}
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
    const input = getInput(selectedItem);

    console.log("THINGS", input, refs?.inputRef?.current?.value);
    return (
      <div>
        <div>
          {selectedItem?.imageUrl && (
            <img class={sheet.classes.Image} src={selectedItem?.imageUrl} />
          )}
        </div>
        <p>{selectedItem?.description}</p>
        <div class={sheet.classes.InputBox}>{input}</div>
        <div>
          <sl-button
            onClick={callbacks.nextStage}
            // disabled={input && !refs.inputRef?.current?.value}
            style={{ display: "block" }}
            class={sheet.classes.Button}
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

  function confirmation() {
    console.log("confirmation:", { selectedItem });
    const redemptionAmount = () => {
      if (selectedItem?.ruleType === "FIXED_GLOBAL_REWARD") {
        return "blah";
      } else {
        return "the other thing";
      }
    };
    return (
      <div>
        <h2>Confirm your redemption:</h2>
        {redemptionAmount()}
        <div>
          <sl-button
            onClick={callbacks.exchangeReward}
            style={{ display: "block" }}
            class={sheet.classes.Button}
          >
            Redeem
          </sl-button>
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

  console.log(currentStage, stages);

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      <div>
        <sl-drawer
          ref={(ref) => (refs.drawerRef.current = ref)}
          placement="right"
          class={sheet.classes.Drawer}
        >
          {currentStage && currentStage()}
        </sl-drawer>
        <sl-button onClick={() => callbacks.openDrawer()}>
          Redeem Rewards
        </sl-button>
      </div>
    </div>
  );
}
