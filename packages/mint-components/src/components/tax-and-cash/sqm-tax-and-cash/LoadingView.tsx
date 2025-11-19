import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";

const style = {
  Container: {
    display: "flex",
    flexDirection: "column",
    gap: "35px",
  },
  HeaderContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  // Skeleton styles removed as they are now inlined props
};
const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const LoadingView = () => {
  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      {/* TitleSkeleton */}
      <sqm-skeleton width="45%" height="40px !important"></sqm-skeleton>

      <div class={sheet.classes.HeaderContainer}>
        {/* StepSkeleton */}
        <sqm-skeleton width="15%"></sqm-skeleton>
        {/* HeaderSkeleton */}
        <sqm-skeleton width="25%" height="30px !important"></sqm-skeleton>
      </div>

      {/* InputSkeletons */}
      <sqm-skeleton width="75%" height="35px"></sqm-skeleton>
      <sqm-skeleton width="75%" height="35px"></sqm-skeleton>
      <sqm-skeleton width="75%" height="35px"></sqm-skeleton>
      <sqm-skeleton width="75%" height="35px"></sqm-skeleton>
      <sqm-skeleton width="75%" height="35px"></sqm-skeleton>
      <sqm-skeleton width="75%" height="35px"></sqm-skeleton>
      <sqm-skeleton width="75%" height="35px"></sqm-skeleton>
      <sqm-skeleton width="75%" height="35px"></sqm-skeleton>
      <sqm-skeleton width="75%" height="35px"></sqm-skeleton>
      <sqm-skeleton width="75%" height="35px"></sqm-skeleton>
      <sqm-skeleton width="75%" height="35px"></sqm-skeleton>

      {/* StepSkeleton */}
      <sqm-skeleton width="15%"></sqm-skeleton>
      {/* ButtonSkeleton */}
      <sqm-skeleton width="80px" height="30px !important"></sqm-skeleton>
    </div>
  );
};

export default LoadingView;
