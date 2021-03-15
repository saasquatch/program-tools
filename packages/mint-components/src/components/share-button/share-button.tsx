import { withHooks } from '@saasquatch/stencil-hooks';
import { Component, Prop, h } from '@stencil/core';
import { ShareButtonView } from './share-button-view';
import { useShareButton } from './useShareButton';

@Component({
  tag: 'sqm-share-button',
  styleUrl: 'share-button.css',
  shadow: true,
})
export class ShareButon {
  //
  //  Required attrs to make it work
  //
  /// TOOD: Add all the share mediums
  // Should be a REQUIRED prop

  /**
   * Which medium sharing should occur on
   */
  @Prop() medium: 'facebook' | 'twitter' | 'email' | 'TODO';
  /**
   * Optional programId, or uses the programId context where this button is rendered.
   */
  @Prop() programId?: string;

  //
  //  Optional styling attrs
  //
  @Prop() pill?: boolean;
  @Prop() disabled?: boolean;
  @Prop() type?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'default' | 'text';
  @Prop() size?: 'small' | 'medium' | 'large';
  @Prop() iconslot?: 'prefix' | 'suffix';
  @Prop() hideicon?: boolean;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = useShareButton(this);
    return (
      <ShareButtonView {...props}>
        <slot />
      </ShareButtonView>
    );
  }
}
