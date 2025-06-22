import { Host, h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { HostBlock, P } from "../../global/mixins";
import { CopyTextView, CopyTextViewProps } from "../views/copy-text-view";

export interface CouponCodeViewProps extends CopyTextViewProps {
  errorType?: "error" | "warning" | "info" | "success";
  couponCodeLabel?: string;
  textColor?: string;
  buttonType: "primary" | "secondary" | "tertiary";
}

export function CouponCodeView(props: CouponCodeViewProps) {
  const error = !props.loading && props.error;

  const style = {
    HostBlock: HostBlock,
    couponCodeLabel: {
      margin: "var(--sl-spacing-x-small) 0",
      color: props.textColor || "var(--sqm-text-subdued)",
      fontSize: "var(--sl-font-size-small)",
    },
  };

  const vanillaStyle = `
  :host{
    display: block;   
    width: 100%;
  }
`;

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  return (
    <div>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>

      <p
        class={sheet.classes.couponCodeLabel}
        style={{ textAlign: props.textAlign }}
      >
        {props.couponCodeLabel}
      </p>
      {error ? (
        <sqm-form-message type={props.errorType} exportparts="erroralert-icon">
          <div part="erroralert-text">{props.errorText}</div>
        </sqm-form-message>
      ) : (
        <CopyTextView {...props} />
      )}
    </div>
  );
}
