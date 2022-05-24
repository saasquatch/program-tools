import { VNode } from "../../stencil-public-runtime";
import { ReferralTable } from "./sqm-referral-table";
import { GenericTableViewProps } from "../../tables/GenericTableView";
export declare const CSS_NAMESPACE = "sqm-referral-table";
export declare type ReferralDates = "dateConverted" | "dateReferralStarted" | "dateFraudChecksCompleted" | "dateModerated" | "dateModified" | "dateReferralEnded" | "dateReferralPaid" | "dateUserModified";
export declare function useReferralTable(props: ReferralTable, emptyElement: VNode, loadingElement: VNode): GenericTableViewProps;
