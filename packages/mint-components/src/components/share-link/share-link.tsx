import { withHooks } from '@saasquatch/stencil-hooks';
import { Component, Prop, h } from '@stencil/core';
import { ShareLinkView } from './share-link-view';
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
  @Prop() icon?: string;
  @Prop() iconlabel?: string;
  @Prop() tooltiptext?: string;
  @Prop() sharelink?: string;
  @Prop() disabled?: boolean;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = useShareLink(this);
    return <ShareLinkView {...props} />;
  }
}
