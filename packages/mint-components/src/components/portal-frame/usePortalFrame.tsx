import { PortalFrameViewProps } from "./portal-frame-view";

export interface PortalFrameProps {
  includeDropdown: boolean;
  headertext: string;
  description: string;
}

export function usePortalFrame(props: PortalFrameProps): PortalFrameViewProps {
  return {
    states: {
      includeDropdown: props.includeDropdown,
      styles: {
        headertext: props.headertext,
        description: props.description,
      },
    },
    data: {
      email: "example@example.com",
    },
  };
}
