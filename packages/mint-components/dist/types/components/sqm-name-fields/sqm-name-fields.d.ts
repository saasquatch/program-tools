import { DemoData } from "../../global/demo";
import { NameFieldsViewProps } from "./sqm-name-fields-view";
/**
 * @uiName Name Fields
 */
export declare class NameFields {
  ignored: boolean;
  /**
   * @uiName First name field label
   */
  firstNameLabel: string;
  /**
   * @uiName Last name field label
   */
  lastNameLabel: string;
  /** @undocumented */
  demoData?: DemoData<NameFieldsViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
