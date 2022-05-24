import { ReferralDates } from "../useReferralTable";
import { ReferralTableColumn } from "./ReferralTableColumn";
/**
 * @uiName Referral Table Date Column
 */
export declare class ReferralTableDateColumn implements ReferralTableColumn {
  /**
   * @uiName Date Column Title
   */
  columnTitle: string;
  /**
   * @uiName Date Displayed
   * @uiType string
   * @uiEnum ["dateConverted",
   * "dateReferralStarted",
   * "dateFraudChecksCompleted",
   * "dateModerated",
   * "dateModified",
   * "dateReferralEnded",
   * "dateReferralPaid",
   * "dateUserModified"]
   */
  dateShown: ReferralDates;
  constructor();
  disconnectedCallback(): void;
  renderCell(data: Referral, locale: string): Promise<any>;
  renderLabel(): Promise<string>;
  render(): any;
}
