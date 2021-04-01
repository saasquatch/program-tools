import { h } from "@stencil/core";
import { PortalFrameView } from "../components/portal-frame/portal-frame-view";

export default {
  title: "Portal Frame",
};

const defaultProps = {
  data: {
    email: "example@example.com",
  },
};

export const FrameWithMenu = () => {
  const props = {
    ...defaultProps,
    states: {
      includeDropdown: true,
      styles: {
        headertext: "Service Titan",
        description: "Portal description",
      },
    },
  };
  return <PortalFrameView {...props} />;
};

export const FrameWithoutMenu = () => {
  const props = {
    ...defaultProps,
    states: {
      includeDropdown: false,
      styles: {
        headertext: "Service Titan",
        description: "Portal description",
      },
    },
  };
  return <PortalFrameView {...props} />;
};

export const FullStackFrameWithMenu = () => {
  return (
    <sqm-portal-frame
      includeDropdown={true}
      headertext="Service Titan"
      description="Portal Description"
    ></sqm-portal-frame>
  );
};
export const FullStackFrameWithoutMenu = () => {
  return (
    <sqm-portal-frame
      includeDropdown={false}
      headertext="Service Titan"
      description="Portal Description"
    ></sqm-portal-frame>
  );
};
