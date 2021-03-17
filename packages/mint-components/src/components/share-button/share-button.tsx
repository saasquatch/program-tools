import { withHooks } from '@saasquatch/stencil-hooks';
import { Component, Prop, h } from '@stencil/core';
import { isDemo } from '../../utils/isDemo';
import { ShareButtonView, ShareButtonViewProps } from './share-button-view';
import { useShareButton } from './useShareButton';

/**
 * @uiName Share Button
 * @uiOrder ["medium", "program-id", "*", "pill", "disabled", "hideicon"]
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
   * The social medium to share on. Share messages and links
   * will be pulled from your program config and tagged for analytics.
   *
   * @uiName Share Medium
   * @uiType string
   * @uiEnum ["facebook", "twitter", "email" ]
   * @uiEnumNames ["FaceBox", "Tweeeter", "CompuMail"]
   */
  @Prop() medium: 'facebook' | 'twitter' | 'email' | 'TODO';
  /**
   * Optional programId, or uses the programId context where this button is rendered.
   *
   * @uiName Program ID
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
   * @uiEnum ["primary" , "success", "info", "warning", "danger", "default", "text" ]
   */
  @Prop() type?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'default' | 'text' = 'primary';
  /**
   * @uiName Button Size
   * @uiType string
   * @uiEnum ["small", "medium", "large" ]
   * @uiEnumNames ["Small", "Medium", "Large"]
   */
  @Prop() size?: 'small' | 'medium' | 'large';
  /**
   * @uiName Icon Location
   * @uiType string
   * @uiEnum ["prefix", "suffix" ]
   * @uiEnumNames ["Prefix", "Suffix"]
   */
  @Prop() iconslot?: 'prefix' | 'suffix' = 'prefix';
  /**
   * @uiName Hide the icon
   */
  @Prop() hideicon?: boolean = false;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo() ? useDemoShareButton(this) : useShareButton(this);
    return (
      <ShareButtonView {...props}>
        <slot />
      </ShareButtonView>
    );
  }
}

function useDemoShareButton(props: ShareButon): ShareButtonViewProps {
  return {
    medium: props.medium,
    loading: false,
    disabled: props.disabled,
    pill: props.pill,
    type: props.type,
    size: props.size,
    hideicon: props.hideicon,
    iconslot: props.iconslot,
    onClick: () => {
      // TODO: PRovide visual feedback
    },
  };
}
