import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export type RewardExchangeViewProps = {
  states: {
    content: {
      listType;
    };
    selectedItem: any;
  };
  data: {
    exchangeList: any;
  };
  callbacks: {
    exchangeReward: (e: unknown) => unknown;
    setDrawer: (item: any) => void;
  };
  refs: {
    drawerRef: any;
  };
};

export function RewardExchangeView(props: RewardExchangeViewProps) {
  const { states, data, callbacks, refs } = props;
  const { content } = states;
  const style = {
    Container: {
      position: "relative",
    },
    Base: {
      "&::part(base)": {
        width: "200px",
        height: "82px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
    },
    Drawer: {
      "&::part(base)": {
        minWidth: "500px",
        width: "50%",
        margin: "0 auto",
        right: "0",
      },
    },
    Image: {
      width: "300px",
    },
  };
  // JSS config
  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      <div>
        {data.exchangeList?.map((item) => (
          <div>
            <sl-drawer
              ref={(ref) => (refs.drawerRef.current = ref)}
              placement="bottom"
              class={sheet.classes.Drawer}
            >
              <div>
                {states.selectedItem?.imageUrl && (
                  <img
                    class={sheet.classes.Image}
                    src={states.selectedItem?.imageUrl}
                  />
                )}
              </div>
              {states.selectedItem?.minValue && (
                <sl-input label="hey"></sl-input>
              )}
              <p>{states.selectedItem?.description}</p>
              <sl-button
                onClick={callbacks.exchangeReward}
                disabled={!states.selectedItem?.available}
              >
                {states.selectedItem?.name}
              </sl-button>
            </sl-drawer>
            <sl-card class={sheet.classes.Base}>
              <sl-button onClick={() => callbacks.setDrawer(item)}>
                {item.name}
              </sl-button>
            </sl-card>
          </div>
        ))}
      </div>
    </div>
  );
}
