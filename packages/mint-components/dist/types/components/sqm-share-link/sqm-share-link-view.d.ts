export interface ShareLinkViewProps {
  shareString: string;
  open: boolean;
  disabled?: boolean;
  tooltiptext: string;
  onClick?: () => void;
}
export declare function ShareLinkView(props: ShareLinkViewProps): any;
