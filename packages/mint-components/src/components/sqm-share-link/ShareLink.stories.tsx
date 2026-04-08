import { h } from "@stencil/core";
import { CopyTextView } from "../views/copy-text-view";
import { ShareLinkView, ShareLinkViewProps } from "./sqm-share-link-view";
import scenario from "./ShareLink.feature";

export default {
  title: "Components/Share Link",
  parameters: {
    scenario,
  },
};

export const Default = () => {
  const props = {
    copyString: "https://noah.example.com",
    open: false,
    tooltiptext: "Copied!",
  };
  return <CopyTextView {...props} />;
};

export const Tooltip = () => {
  const props = {
    copyString: "https://noah.example.com",
    tooltiptext: "Some text for the tooltip",
    open: true,
  };
  return <CopyTextView {...props} />;
};

export const Disabled = () => {
  const props = {
    copyString: "https://noah.example.com",
    disabled: true,
    open: true,
    tooltiptext: "Copied!",
  };
  return <CopyTextView {...props} />;
};
export const Error = () => {
  const props = {
    copyString: "https://noah.example.com",
    disabled: true,
    open: true,
    tooltiptext: "Copied!",
    error: true,
  };
  return <CopyTextView {...props} />;
};
export const TextAlignCenter = () => {
  return <sqm-share-link textAlign="center"></sqm-share-link>;
};
export const TextAlignRight = () => {
  return <sqm-share-link textAlign="right"></sqm-share-link>;
};

export const CopyButton = () => {
  return (
    <CopyTextView
      {...{
        copyString: "https://noah.example.com",
        open: false,
        tooltiptext: "Copied!",
        isCopyIcon: false,
      }}
    ></CopyTextView>
  );
};
export const CopyButtonBelow = () => {
  return (
    <CopyTextView
      {...{
        copyString: "https://noah.example.com",
        open: false,
        tooltiptext: "Copied!",
        buttonStyle: "button-below",
      }}
    ></CopyTextView>
  );
};

export const CustomStyles = () => {
  const props = {
    copyString: "https://noah.example.com",
    open: false,
    tooltiptext: "Copied!",
    backgroundColor: "#1ed760",
    borderRadius: "30px",
    textColor: "#121212",
    buttonType: "primary" as const,
  };
  return <CopyTextView {...props} />;
};

export const CustomStylesWithDemoHooks = () => {
  return (
    <sqm-share-link
      demoData={{
        copyTextViewProps: {
          copyString: "https://noah.example.com",
          open: false,
          tooltiptext: "Copied!",
          backgroundColor: "#1ed760",
          borderRadius: "30px",
          textColor: "red",
          buttonType: "primary" as const,
          borderColor: "#121212",
        },
      }}
      backgroundColor="#1ed760"
    ></sqm-share-link>
  );
};
export const FullStack = () => {
  return <sqm-share-link></sqm-share-link>;
};

// Customize URL stories

const noopFn = () => {};

const defaultCustomizeProps: ShareLinkViewProps = {
  copyTextViewProps: {
    copyString: "https://ssqt.co/abc123",
    open: false,
    tooltiptext: "Copied!",
  },
  customizeUrl: true,
  customizeLinkLabel: "Customize Link",
  saveLabelText: "Save",
  cancelLabelText: "Cancel",
  successMessage: "Link updated successfully",
  isEditing: false,
  editValue: "",
  domainPrefix: "https://ssqt.co/",
  editsRemaining: 3,
  maxEdits: 5,
  limitReached: false,
  validationError: null,
  isValidating: false,
  isSaving: false,
  showSuccess: false,
  onCustomizeClick: noopFn,
  onEditValueChange: noopFn,
  onSave: noopFn,
  onCancel: noopFn,
};

export const CustomizeUrlDefault = () => {
  return <ShareLinkView {...defaultCustomizeProps} />;
};

export const CustomizeUrlEditing = () => {
  return (
    <ShareLinkView
      {...{
        ...defaultCustomizeProps,
        isEditing: true,
        editValue: "abc123",
      }}
    />
  );
};

export const CustomizeUrlCustomized = () => {
  return (
    <ShareLinkView
      {...{
        ...defaultCustomizeProps,
        copyTextViewProps: {
          ...defaultCustomizeProps.copyTextViewProps,
          copyString: "https://ssqt.co/shirleylam",
        },
      }}
    />
  );
};

export const CustomizeUrlLimitReached = () => {
  return (
    <ShareLinkView
      {...{
        ...defaultCustomizeProps,
        copyTextViewProps: {
          ...defaultCustomizeProps.copyTextViewProps,
          copyString: "https://ssqt.co/shirleylam",
        },
        editsRemaining: 0,
        limitReached: true,
      }}
    />
  );
};

export const CustomizeUrlValidationError = () => {
  return (
    <ShareLinkView
      {...{
        ...defaultCustomizeProps,
        isEditing: true,
        editValue: "invalid link!",
        validationError: "This link code is already taken.",
      }}
    />
  );
};

export const CustomizeUrlSaving = () => {
  return (
    <ShareLinkView
      {...{
        ...defaultCustomizeProps,
        isEditing: true,
        editValue: "shirleylam",
        isSaving: true,
      }}
    />
  );
};

export const CustomizeUrlSuccess = () => {
  return (
    <ShareLinkView
      {...{
        ...defaultCustomizeProps,
        copyTextViewProps: {
          ...defaultCustomizeProps.copyTextViewProps,
          copyString: "https://ssqt.co/shirleylam",
        },
        showSuccess: true,
      }}
    />
  );
};
