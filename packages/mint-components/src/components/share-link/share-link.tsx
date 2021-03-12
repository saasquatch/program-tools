import { Component, Prop, h } from '@stencil/core';
import { ShareLinkView } from './share-link-view';
import { useShareLink } from './useShareLink';

@Component({
  tag: 'sqm-share-link',
  styleUrl: 'share-link.css',
  shadow: true,
})
export class MyComponent {
  @Prop() icon?: string;
  @Prop() iconlabel?: string;
  @Prop() tooltiptext?: string;
  @Prop() sharelink?: string;
  @Prop() disabled?: boolean;

  render() {
    return <ShareLinkView {...useShareLink(this)} />;
  }
}
