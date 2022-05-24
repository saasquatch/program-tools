import { ShareLinkViewProps } from "../sqm-share-link/sqm-share-link-view";
interface ShareCodeProps {
  programId?: string;
  tooltiptext: string;
  tooltiplifespan: number;
}
export declare function useShareCode(props: ShareCodeProps): ShareLinkViewProps;
export {};
