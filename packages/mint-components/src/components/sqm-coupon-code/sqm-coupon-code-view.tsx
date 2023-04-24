import { Host, h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { HostBlock, P } from "../../global/mixins";
import { CopyTextView, CopyTextViewProps } from "../views/copy-text-view";

export interface CouponCodeViewProps extends CopyTextViewProps {
  errorType?: "error" | "warning" | "info" | "success";
}

const style = {
  HostBlock: HostBlock,
};

const vanillaStyle = `
  :host{
    display: block;   
    width: 100%;
  }
`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function CouponCodeView(props: CouponCodeViewProps) {
  const error = !props.loading && props.error;
  return (
    <div>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>

      <p style={{ textAlign: props.textAlign }}>Your coupon code:</p>
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
