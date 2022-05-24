import { ShareLinkViewProps } from "./sqm-share-link-view";
interface ShareLinkProps {
  programId?: string;
  tooltiptext: string;
  tooltiplifespan: number;
}
export declare function useShareLink(props: ShareLinkProps): ShareLinkViewProps;
export {};
