import { h, Host, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { HostBlock } from "../../global/mixins";

export type TaskCardViewProps = {
  buttonText: string;
  onClick: () => void;
} & ProgressBarProps;

const style = {
  HostBlock: HostBlock,
  ProgressBar: {
    display: "flex",
    width: "20%",
    position: "relative",
    "text-align": "center",
    "li:before": {
      content: "test",
      width: "30px",
      height: "30px",
    },
  },
  Completed: {
    color: "green",
  },
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

// @ts-expect-error -- unused
export function TaskCardView(props: TaskCardViewProps, children: VNode): VNode {
  return (
    <div>
      <TaskCardStyle />

      <div>
        <span>40</span>
        <span>SAASQUATCH POINTS</span>
      </div>
      <div>
        Description of action and reward. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Ut eget quisque commodo leo.
      </div>
      <ProgressBar {...props} />
      <sl-button onClick={props.onClick}>{props.buttonText}</sl-button>
    </div>
  );
}

export function TaskCardStyle(): VNode {
  return <style type="text/css">{styleString}</style>;
}

export type ProgressBarProps = {
  goal: number;
  progress: number;
  repeatable: boolean;
};
export function ProgressBar(props: ProgressBarProps): VNode {
  const items = [];
  for (let i = 0; i < props.goal; i++) {
    if (i < props.progress) {
      items.push(<li class={sheet.classes.Completed}>{i}</li>);
    } else {
      items.push(<li>{i}</li>);
    }
  }
  return <ul class={sheet.classes.ProgressBar}>{items}</ul>;
}
