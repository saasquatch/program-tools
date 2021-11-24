import { h } from "@stencil/core";
import { PoweredByImg } from "../components/sqm-portal-footer/PoweredByImg";
export default {
  title: "Powered By",
};

export const Default = () => {
  return <PoweredByImg />;
};

export const CustomColor = () => {
  return <PoweredByImg color="salmon" />;
};

export const CustomWidthAndHeight = () => {
  return <PoweredByImg width={300} height={50} />;
};
