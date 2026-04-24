import { isDemo } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Fragment, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import { ShareLinkView, ShareLinkViewProps } from "./sqm-share-link-view";
import { useShareLink } from "./useShareLink";

/**
 * @uiName Share Link
 * @exampleGroup Sharing
 * @validParents ["sqm-portal-container", "sqm-titled-section", "div","sqm-hero","sqm-referral-card","sqm-instant-access-registration","sqb-program-section","sqb-conditional-section"]
 * @example Share Link - <sqm-share-link tooltip-text="Copied to Clipboard" tooltip-lifespan="1000"></sqm-share-link>
 */
@Component({
  tag: "sqm-share-link",
  shadow: true,
})
export class ShareLink {
  /**
   * The ID of the program that should generate the link. Defaults to the program ID in context where this widget is loaded.
   *
   * @uiName Program ID
   * @uiWidget programSelector
   */
  @Prop() programId?: string;

  /**
   * Shown inside a tooltip after someone has successfully copied the link to their clipboard
   *
   * @uiName Tooltip text
   */
  @Prop({
    attribute: "tooltip-text",
  })
  tooltiptext: string = "Copied to Clipboard";

  /**
   * The number of milliseconds that the tooltip appears for
   *
   * @uiName Tooltip lifespan
   */
  @Prop({
    attribute: "tooltip-lifespan",
  })
  tooltiplifespan: number = 1000;

  /**
   * Change the text alignment
   *
   * @uiName Share link alignment
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   * @uiEnumNames ["Left", "Center", "Right"]
   * @uiGroup Style
   */
  @Prop({
    attribute: "text-align",
  })
  textAlign?: "left" | "center" | "right" = "left";

  /**
   * @uiName Copy button label
   */
  @Prop({
    attribute: "copy-button-label",
  })
  copyButtonLabel: string = "Copy Link";

  /**
   * Background color of share link container
   * @uiName Background color
   * @uiWidget color
   * @format color
   * @uiGroup Style
   */
  @Prop() backgroundColor?: string;

  /**
   * Border color of share link container
   * @uiName Border color
   * @uiWidget color
   * @format color
   * @uiGroup Style
   */
  @Prop() borderColor?: string;

  /**
   * Color of the text and copy icon
   * @uiName Text color
   * @uiWidget color
   * @format color
   * @uiGroup Style
   */
  @Prop() textColor?: string;

  /**
   * The border radius on the share link container (in pixels)
   * @uiName Border Radius
   * @uiType number
   * @uiGroup Style
   */
  @Prop() borderRadius?: string;

  /**
   * The type of the button that is used (primary or secondary).
   * @uiName Button Type
   * @uiType string
   * @uiEnum ["primary", "secondary"]
   * @uiEnumNames ["Primary", "Secondary"]
   * @uiGroup Style
   */
  @Prop()
  buttonType?: "primary" | "secondary" = "primary";

  /**
   * Set the copy button style and placement
   *
   * @uiName Button style
   * @uiType string
   * @uiEnum ["icon", "button-outside", "button-below"]
   * @uiEnumNames ["Icon", "Button outside", "Button below"]
   * @uiGroup Style
   */
  @Prop({
    attribute: "copy-button-style",
  })
  buttonStyle?: "icon" | "button-outside" | "button-below" = "icon";

  /**
   * Let advocates customize their share links up to 5 times.
   *
   * @uiName Allow customization
   * @uiType boolean
   * @uiGroup Customizable Vanity Link
   * @requiredFlavor impact
   */
  @Prop()
  allowCustomization?: boolean = false;

  /**
   * Text for the cancel button in editing mode
   *
   * @uiName Cancel button label
   * @uiType string
   * @uiGroup Customizable Vanity Link
   * @requiredFlavor impact
   */
  @Prop()
  cancelLabelText?: string = "Cancel";

  /**
   * Tooltip text shown when link customization is disabled
   *
   * @uiName Customize disabled tooltip
   * @uiType string
   * @uiGroup Customizable Vanity Link
   * @requiredFlavor impact
   */
  @Prop()
  customizeDisabledTooltip?: string = "Link customization is not available.";

  /**
   * Displayed below the share link.
   *
   * @uiName Customize link button label
   * @uiType string
   * @uiGroup Customizable Vanity Link
   * @requiredFlavor impact
   */
  @Prop()
  customizeLinkButtonLabel?: string = "Customize Link";

  /**
   * Message shown when the URL has been edited 5 times. To display a clickable link, use {supportLink} as a placeholder.
   *
   * @uiName Edit limit reached text
   * @uiType string
   * @uiWidget textarea
   * @uiGroup Customizable Vanity Link
   * @requiredFlavor impact
   */
  @Prop()
  editLimitReachedText?: string =
    "5 edit limit reached. To make more changes, please contact {supportLink}.";

  /**
   * Subtext shown while the user is customizing their URL.
   *
   * @uiName Edit limit text
   * @uiType string
   * @uiGroup Customizable Vanity Link
   * @requiredFlavor impact
   */
  @Prop()
  editLimitText?: string =
    "You can edit your link up to {editsRemaining} more times.";

  /**
   * Description text shown when the link contains invalid special characters.
   *
   * @uiName Invalid characters error description
   * @uiType string
   * @uiWidget textarea
   * @uiGroup Customizable Vanity Link
   * @requiredFlavor impact
   */
  @Prop()
  invalidCharactersErrorDescription?: string =
    "Special characters can break the link when sharing.";

  /**
   * Title of the error message shown when the link contains invalid special characters.
   *
   * @uiName Invalid characters error title
   * @uiType string
   * @uiGroup Customizable Vanity Link
   * @requiredFlavor impact
   */
  @Prop()
  invalidCharactersErrorTitle?: string =
    "Please use only letters, numbers, dashes and underscores";

  /**
   * Description text shown when the link has already been taken
   *
   * @uiName Link taken error message
   * @uiType string
   * @uiWidget textarea
   * @uiGroup Customizable Vanity Link
   * @requiredFlavor impact
   */
  @Prop()
  linkTakenErrorDescription?: string =
    "Try adding numbers, a dash or underscore to create a unique link.";

  /**
   * Title of the error message shown when the link has already been taken
   *
   * @uiName Link taken error title
   * @uiType string
   * @uiGroup Customizable Vanity Link
   * @requiredFlavor impact
   */
  @Prop()
  linkTakenErrorTitle?: string = "This link is already taken";

  /**
   * Description text shown when the link contains profanity or brand names.
   *
   * @uiName Restricted words error description
   * @uiType string
   * @uiWidget textarea
   * @uiGroup Customizable Vanity Link
   * @requiredFlavor impact
   */
  @Prop()
  restrictedWordsErrorDescription?: string =
    "This link contains a restricted word.";

  /**
   * Title of the error message shown when the link contains profanity or brand names.
   *
   * @uiName Restricted words error title
   * @uiType string
   * @uiGroup Customizable Vanity Link
   * @requiredFlavor impact
   */
  @Prop()
  restrictedWordsErrorTitle?: string = "Please try a different link";

  /**
   * Text for the save button in editing mode
   *
   * @uiName Save button label
   * @uiType string
   * @uiGroup Customizable Vanity Link
   * @requiredFlavor impact
   */
  @Prop()
  saveLabelText?: string = "Save";

  /**
   * Display text for the support link in the edit limit reached message
   *
   * @uiName Support link text
   * @uiType string
   * @uiGroup Customizable Vanity Link
   * @requiredFlavor impact
   */
  @Prop()
  supportLinkText?: string = "Support";

  /**
   * @undocumented
   * @uiType object
   */

  @Prop() demoData?: DemoData<ShareLinkViewProps>;

  @Prop()
  editsRemaining?: number;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const thisProps = getProps(this);
    const props = isDemo()
      ? useDemoShareLink(thisProps)
      : useShareLink(thisProps);
    return <ShareLinkView {...props} />;
  }
}

function useDemoShareLink(props: ShareLink): ShareLinkViewProps {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const copyString = "https://www.example.com/sharelink/abc";
  const domainPrefix = "https://www.example.com/";

  const baseProps: ShareLinkViewProps = {
    copyTextViewProps: {
      copyString,
      tooltiptext: props.tooltiptext,
      textAlign: props.textAlign,
      buttonStyle: props.buttonStyle,
      backgroundColor: props.backgroundColor,
      textColor: props.textColor,
      borderRadius: props.borderRadius,
      buttonType: props.buttonType,
      copyButtonLabel: props.copyButtonLabel,
      borderColor: props.borderColor,
      open,
      onClick: () => {
        navigator.clipboard.writeText(copyString);
        setOpen(true);
        setTimeout(() => setOpen(false), props.tooltiplifespan);
      },
    },
    allowCustomization: props.allowCustomization,
    customizeLinkLabel: props.customizeLinkButtonLabel,
    saveLabelText: props.saveLabelText,
    cancelLabelText: props.cancelLabelText,
    isEditing,
    editValue,
    domainPrefix,
    editsRemaining: 5,
    maxEdits: 5,
    limitReached: false,
    validationError: null,
    isValidating: false,
    isSaving: false,
    characterLimit: 15,
    minCharacters: 3,
    charactersRemaining: 15 - editValue.length,
    editLimitText: props.editLimitText,
    editLimitReachedText: props.editLimitReachedText,
    supportLinkText: props.supportLinkText,
    customizeDisabled: false,
    customizeDisabledTooltip:
      props.customizeDisabledTooltip ?? "Link customization is not available.",
    onCustomizeClick: () => {
      setIsEditing(true);
      setEditValue("");
    },
    onEditValueChange: (value: string) => {
      setEditValue(value);
    },
    onSave: () => {
      setIsEditing(false);
    },
    onCancel: () => {
      setIsEditing(false);
      setEditValue("");
    },
  };

  return deepmerge(baseProps, props.demoData || {}, {
    arrayMerge: (_, a) => a,
  });
}
