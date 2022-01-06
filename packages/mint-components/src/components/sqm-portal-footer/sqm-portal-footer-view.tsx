import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { intl } from "../../global/global";
import { PoweredByImg } from "./PoweredByImg";

const vanillaStyle = `
  :host{
    margin: 0 auto;
    width: 100%;
  }
  a{
    cursor:pointer;
    color: inherit;
    text-decoration: none;
  }
`;
type PortalFooterViewProps = {
  faqLink?: string;
  faqText?: String;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  termsLink?: string;
  termsText?: string;
  supportText?: string;
  supportEmail?: string;
  showPoweredBy?: boolean;
  poweredByLink?: string;
};
export function PortalFooterView(props: PortalFooterViewProps) {
  const style = {
    RowContainer: {
      display: "flex",
      "& > :not(:last-child)": {
        "margin-right": "var(--sl-spacing-large)",
      },
    },
    Container: {
      display: "flex",
      "flex-direction": "column",
      "align-items": "center",
      "font-size": "var(--sl-font-size-small)",
      color: "var(--sl-color-gray-600)",
      "padding-top": `var(--sl-spacing-${props.paddingTop})`,
      "padding-right": `var(--sl-spacing-${props.paddingRight})`,
      "padding-bottom": `var(--sl-spacing-${props.paddingBottom})`,
      "padding-left": `var(--sl-spacing-${props.paddingLeft})`,
      "& a:hover": {
        color: "var(--sl-color-gray-900)",
      },
    },

    SupportText: {
      textAlign: "center",
    },

    PoweredByLink: {
      color: "var(--sl-color-gray-400)",
      "font-size": "var(--sl-font-size-xx-small)",
      "&:hover": {
        color: "var(--sl-color-gray-900)",
      },
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <div class={sheet.classes.RowContainer}>
        {props.faqLink && (
          <a target="_blank" href={props.faqLink}>
            {props.faqText}
          </a>
        )}
        {props.termsLink && (
          <a target="_blank" href={props.termsLink}>
            {props.termsText}
          </a>
        )}
      </div>
      <p class={sheet.classes.SupportText}>
        {intl.formatMessage(
          {
            id: "supportFooter",
            defaultMessage: props.supportText,
          },
          {
            email: (
              <a target="_blank" href={`mailto:${props.supportEmail}`}>
                {props.supportEmail}
              </a>
            ),
          }
        )}
      </p>
      {props.showPoweredBy && (
        <a
          class={sheet.classes.PoweredByLink}
          target="_blank"
          href={props.poweredByLink}
        >
          <PoweredByImg />
        </a>
      )}
    </div>
  );
}
