import { Component, Prop, h } from '@stencil/core';
import { ShareLinkView } from './share-link-view';
import { useShareLink } from './useShareLink';

@Component({
  tag: 'sqm-share-link',
  styleUrl: 'share-link.css',
  shadow: true,
})
export class MyComponent {
  @Prop() buttondisabled?: boolean;
  @Prop() icon?: string;
  @Prop() iconlabel?: string;
  @Prop() tooltiptext?: string;

  // Should probably jus tbe `disabled`
  @Prop() disabletooltip?: boolean;
  @Prop() customstyle?: string;

  render() {
    return <ShareLinkView {...useShareLink(this)} />;
  }
}
