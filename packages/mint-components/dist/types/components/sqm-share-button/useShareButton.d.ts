import { ShareButtonViewProps } from "./sqm-share-button-view";
interface ShareButtonProps extends ShareButtonViewProps {
  programId?: string;
  sharetitle?: string;
  sharetext?: string;
}
export declare function useShareButton(props: ShareButtonProps): ShareButtonViewProps;
export {};
