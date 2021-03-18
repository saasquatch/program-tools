import { withHooks } from '@saasquatch/stencil-hooks';
import { Component, Prop, h } from '@stencil/core';
import { isDemo } from '../../utils/isDemo';
import { ShareLinkView, ShareLinkViewProps } from './share-link-view';
import { useShareLink } from './useShareLink';

/**
 * @uiName Share Link
 */
@Component({
  tag: 'sqm-share-link',
  styleUrl: 'share-link.css',
  shadow: true,
})
export class ShareLink {
  /**
   * The ID of the program that should generate the link.
   * 
   * @uiName Program ID
   */
  @Prop() programId: string
  /**
   * @uiName Icon
   */
  @Prop() icon?: string;
  /**
   * @uiName Icon Label
   */
  @Prop() iconlabel?: string;
  /**
   * This is shown after someone has successfully copied the link to the clipboard.
   *
   * @uiName Tooltip text
   */
  @Prop() tooltiptext?: string;
  /**
   * The number of milliseconds that the tooltip will appear for
   * 
   * @uiName Tooltip lifespan
   */
  @Prop() tooltiplifespan?: number;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo() ? useDemoShareLink(this) : useShareLink(this);
    return <ShareLinkView {...props} />;
  }
}

function useDemoShareLink(props: ShareLink): ShareLinkViewProps {
  return {
    sharelink: 'https://www.example.com/sharelink/abc',
    icon: props.icon,
    iconlabel: props.iconlabel,
    tooltiptext: props.tooltiptext,
    onClick: () => {
      // TODO: PRovide UI feedback via Admin SDK
    },
  };
}
