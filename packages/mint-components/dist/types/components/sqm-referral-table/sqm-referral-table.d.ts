import { DemoData } from "../../global/demo";
import { GenericTableViewProps } from "../../tables/GenericTableView";
/**
 * @uiName Referral Table
 */
export declare class ReferralTable {
  /**
   * Filters to only show referrals in this program. Will default to filtering by the program context where
   * this table lives. If no program ID is set or provided by context, then shows all referrals from all programs.
   * If program ID is "classic", shows classic-only referrals
   *
   * @uiName Program
   */
  programId: string;
  /** @uiName Number of referrals per page */
  perPage: number;
  /** @uiName Show column labels */
  showLabels?: boolean;
  /** @uiName Previous button text  */
  prevLabel?: string;
  /** @uiName View More button text  */
  moreLabel?: string;
  /** @uiName Show Referred by user in table  */
  showReferrer?: boolean;
  /** @uiName Hide Columns (Mobile View)  */
  hiddenColumns?: string;
  /** @uiName Hide Columns (Mobile View)  */
  smBreakpoint?: number;
  /** @uiName Hide Columns (Mobile View)  */
  mdBreakpoint?: number;
  /** @uiName Empty State Image Link  */
  emptyStateImgUrl: string;
  /** @uiName Empty State Title  */
  emptyStateTitle: string;
  /** @uiName Empty State Text  */
  emptyStateText: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<GenericTableViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
