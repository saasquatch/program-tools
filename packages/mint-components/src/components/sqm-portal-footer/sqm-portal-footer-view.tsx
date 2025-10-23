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
    color: var(--sqm-text-subdued);
    text-decoration: none ;
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
  hideSupportText?: boolean;
  supportText?: string;
  supportEmail?: string;
  hidePoweredBy?: boolean;
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
      color: "var(--sqm-text-subdued)",
      "padding-top": `var(--sl-spacing-${props.paddingTop})`,
      "padding-right": `var(--sl-spacing-${props.paddingRight})`,
      "padding-bottom": `var(--sl-spacing-${props.paddingBottom})`,
      "padding-left": `var(--sl-spacing-${props.paddingLeft})`,
      "row-gap": `var(--sl-spacing-small)`,
      "& a:hover": {
        color: "var(--sqm-text)",
      },
    },

    SupportText: {
      textAlign: "center",
      margin: 0,
    },

    PoweredByLink: {
      color: "var(--sqm-text-subdued)",
      "font-size": "var(--sl-font-size-small)",
      display: "flex",
      alignItems: "center",
      svg: {
        marginTop: "2px",
        shapeRendering: "geometricprecision",
      },
      "&:hover, &:hover *": {
        color: "var(--sqm-text)",
      },
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.Container} part="sqm-base">
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
      {!props.hideSupportText && (
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
      )}
      {!props.hidePoweredBy && (
        <a
          class={sheet.classes.PoweredByLink}
          target="_blank"
          href={props.poweredByLink}
        >
          Powered by <PoweredByImg color={"currentColor"} />
        </a>
      )}
    </div>
  );
}
