import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";

const style = {
  Container: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  HeaderContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  TitleSkeleton: {
    width: "45%",
    height: "40px !important",
  },
  StepSkeleton: {
    width: "15%",
  },
  HeaderSkeleton: {
    width: "25%",
    height: "30px !important",
  },
  InputSkeleton: {
    width: "75%",
  },
  ButtonSkeleton: {
    width: "80px",
    height: "30px !important",
  },
};
const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const LoadingView = () => {
  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      <sl-skeleton class={sheet.classes.TitleSkeleton}></sl-skeleton>
      <div class={sheet.classes.HeaderContainer}>
        <sl-skeleton class={sheet.classes.StepSkeleton}></sl-skeleton>
        <sl-skeleton class={sheet.classes.HeaderSkeleton}></sl-skeleton>
      </div>
      <sl-skeleton class={sheet.classes.InputSkeleton}></sl-skeleton>
      <sl-skeleton class={sheet.classes.InputSkeleton}></sl-skeleton>
      <sl-skeleton class={sheet.classes.InputSkeleton}></sl-skeleton>
      <sl-skeleton class={sheet.classes.InputSkeleton}></sl-skeleton>
      <sl-skeleton class={sheet.classes.InputSkeleton}></sl-skeleton>
      <sl-skeleton class={sheet.classes.StepSkeleton}></sl-skeleton>
      <sl-skeleton class={sheet.classes.ButtonSkeleton}></sl-skeleton>
    </div>
  );
};

export default LoadingView;
