import { Component, h } from "@stencil/core";
import { useCodeCheck } from "./useCodeCheck";
import { withHooks } from "@saasquatch/stencil-hooks";

@Component({
  tag: "sqm-code-check",
  shadow: true,
})
export class CodeCheck {
  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const props = useCodeCheck();

    return (
      <div ref={props.setCodeRef}>
        <input width={"24px"} name="code" />
        <input width={"24px"} name="code" />
        <input width={"24px"} name="code" />
        <input width={"24px"} name="code" />
        <input width={"24px"} name="code" />
        <hr />
        <button onClick={props.onCheckCode}>Check code</button>
        {props.validationError && (
          <span color="red">INVALID CODE AHHHHHHHHh</span>
        )}
        <hr />
        <div>
          <span>Didn't get an email?</span>
          <button onClick={props.resendEmail}>
            {props.resendLoading ? "Loading" : "Resend email"}
          </button>
        </div>
      </div>
    );
  }
}
