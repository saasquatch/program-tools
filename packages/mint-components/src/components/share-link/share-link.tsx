import { Component, Prop, h } from '@stencil/core';
import { ShareLinkView } from './ShareLinkView';
import { useShareLink } from './useShareLink';

@Component({
  tag: 'share-link',
  styleUrl: 'share-link.css',
  shadow: true,
})
export class MyComponent {
  @Prop() buttondisabled?: boolean;
  @Prop() icon?: string;
  @Prop() iconlabel?: string;
  @Prop() tooltiptext?: string;
  @Prop() disabletooltip?: boolean;
  @Prop() customstyle?: string;

  render() {
    return <ShareLinkView {...useShareLink(this)} />;
  }
}
