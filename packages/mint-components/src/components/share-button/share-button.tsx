import { withHooks } from '@saasquatch/stencil-hooks';
import { Component, Prop, h } from '@stencil/core';
import { ShareButtonView } from './share-button-view';
import { useShareButton } from './useShareButton';

/**
 * @uiName Share Button
 */
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
   *
   * @uiName Share Medium
   * @uiType string
   */
  @Prop() medium: 'facebook' | 'twitter' | 'email' | 'TODO';
  /**
   * Optional programId, or uses the programId context where this button is rendered.
   *
   * @uiName Program
   */
  @Prop() programId?: string;

  //
  //  Optional styling attrs
  //

  /**
   * @uiName Display as pill
   */
  @Prop() pill?: boolean;
  /**
   * @uiName Disabled
   */
  @Prop() disabled?: boolean;
  /**
   * @uiType string
   * @uiName Button Style
   */
  @Prop() type?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'default' | 'text';
  /**
   * @uiName Button Size
   * @uiType string
   */
  @Prop() size?: 'small' | 'medium' | 'large';
  /**
   * @uiName Icon Location
   * @uiType string
   */
  @Prop() iconslot?: 'prefix' | 'suffix';
  /**
   * @uiName Hide the icon
   * @uiType string
   */
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
