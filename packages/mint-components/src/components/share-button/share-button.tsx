import { Component, Prop, h } from '@stencil/core';
import { ShareButtonView } from './share-button-view';
import { useShareButton } from './useShareButton';

@Component({
  tag: 'sqm-share-button',
  styleUrl: 'share-button.css',
  shadow: true,
})
export class MyComponent {
    @Prop() label?: string;
    @Prop() loading?: boolean;
    @Prop() disabled?: boolean;
    @Prop() pill?: boolean;
    @Prop() type?: "primary" | "success" | "info" | "warning" | "danger" | "default" | "text";
    @Prop() size?: "small" | "medium" | "large";
    @Prop() icon?: string;
    @Prop() iconslot?: "prefix" | "suffix";
    @Prop() iconlabel?: string;
    @Prop() href?: string;
    @Prop() name?: string;
    @Prop() value?: string;
    @Prop() target?: "_blank" | "_parent" | "_self" | "_top";
    @Prop() customstyle?: string;

  render() {
    return <ShareButtonView {...useShareButton(this)} />;
  }
}
