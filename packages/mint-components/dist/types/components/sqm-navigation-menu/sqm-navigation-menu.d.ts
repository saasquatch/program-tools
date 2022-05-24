import { NavigationMenuViewProps } from "./sqm-navigation-menu-view";
import { DemoData } from "../../global/demo";
/**
 * @uiName Navigation Menu
 */
export declare class NavigationMenu {
  ignored: boolean;
  /**
   * @uiName Include dropdown menu
   */
  includeDropdown: boolean;
  /**
   * @uiName Label on the header menu
   */
  menuLabel: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<NavigationMenuViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
