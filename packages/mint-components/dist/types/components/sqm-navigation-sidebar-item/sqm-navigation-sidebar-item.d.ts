import { DemoData } from "../../global/demo";
import { NavigationSidebarItemViewProps } from "./sqm-navigation-sidebar-item-view";
/**
 * @uiName Navigation Link
 */
export declare class NavigationSidebarItem {
  /**
   * @uiName Navigation path
   */
  path: string;
  /**
   * @uiName Icon
   */
  icon: string;
  /**
   * @uiName Label
   */
  label: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<NavigationSidebarItemViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
