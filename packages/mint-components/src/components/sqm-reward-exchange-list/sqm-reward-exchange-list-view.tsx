import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export type RewardExchangeViewProps = {
  states: {
    content: {
      listType;
    };
  };
  data: {
    exchangeList: any;
  };
  callbacks: {
    exchange: (e: unknown) => unknown;
  };
};

export function RewardExchangeView(props: RewardExchangeViewProps) {
  const { states } = props;
  const { content } = states;
  const style = {
    Container: {
      position: "relative",
    },
  };
  // JSS config
  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      <div>hello</div>
    </div>
  );
}
