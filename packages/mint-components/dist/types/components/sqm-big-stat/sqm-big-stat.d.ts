import { BigStatViewProps } from "./sqm-big-stat-view";
import { DemoData } from "../../global/demo";
/**
 *
 * @uiName Big Stat
 * @slot the description of the component
 */
export declare class BigStat {
  /**
   * Select what type of stat to display. Manual paths are also supported.
   *
   * @uiWidget StatTypeSelectWidget
   * @uiName Stat Type
   * @uiOptions {"version": 1.1}
   */
  statType: string;
  /**
   * @uiName Flex Reverse - controls the order of the stat value & description column
   */
  flexReverse?: boolean;
  /**
   * @uiName Alignment - controls the alignment of the flexbox
   * @uiType string
   * @uiEnum ["left", "right", "center"]
   */
  alignment?: "left" | "right" | "center";
  /**
   * The ID of the program that is used to scope stats. Defaults to the program context when no ID is specified.
   *
   * @uiName Program ID
   */
  programId?: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<BigStatViewProps>;
  ignored: boolean;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
