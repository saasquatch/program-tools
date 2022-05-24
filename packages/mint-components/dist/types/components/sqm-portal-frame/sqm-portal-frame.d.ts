import { PortalFrameViewProps } from "./sqm-portal-frame-view";
import { DemoData } from "../../global/demo";
/**
 * @uiName Portal Frame
 */
export declare class PortalFrame {
  ignored: boolean;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<PortalFrameViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
