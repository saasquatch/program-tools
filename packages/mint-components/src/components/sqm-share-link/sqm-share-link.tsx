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
   * Enable users to customize their referral link
   *
   * @uiName Customize URL
   * @uiType boolean
   */
  @Prop()
  customizeUrl?: boolean = false;

  /**
   * Text shown below the share link input to trigger customization
   *
   * @uiName Customize link label
   * @uiType string
   */
  @Prop()
  customizeLinkLabel?: string = "Customize Link";

  /**
   * Text for the save button in editing mode
   *
   * @uiName Save button label
   * @uiType string
   */
  @Prop()
  saveLabelText?: string = "Save";

  /**
   * Text for the cancel button in editing mode
   *
   * @uiName Cancel button label
   * @uiType string
   */
  @Prop()
  cancelLabelText?: string = "Cancel";

  /**
   * Message shown briefly after successfully saving a custom link
   *
   * @uiName Success message
   * @uiType string
   */
  @Prop()
  successMessage?: string = "Link updated successfully";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<ShareLinkViewProps>;

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
  const [showSuccess, setShowSuccess] = useState(false);
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
    customizeUrl: props.customizeUrl ?? false,
    customizeLinkLabel: props.customizeLinkLabel ?? "Customize Link",
    saveLabelText: props.saveLabelText ?? "Save",
    cancelLabelText: props.cancelLabelText ?? "Cancel",
    successMessage: props.successMessage ?? "Link updated successfully",
    isEditing,
    editValue,
    domainPrefix,
    editsRemaining: 3,
    maxEdits: 5,
    limitReached: false,
    validationError: null,
    isValidating: false,
    isSaving: false,
    showSuccess,
    onCustomizeClick: () => {
      setIsEditing(true);
      setEditValue("sharelink/abc");
    },
    onEditValueChange: (value: string) => {
      setEditValue(value);
    },
    onSave: () => {
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
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
