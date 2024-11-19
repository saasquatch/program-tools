import { useParent } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useState } from "@saasquatch/universal-hooks";
import { Component, h } from "@stencil/core";
import { SHOW_CODE_NAMESPACE } from "../keys";

/**
 * @uiName Widget Verification Gate
 */
@Component({
  tag: "sqm-email-check",
  shadow: true,
})
export class WidgetEmailVerification {
  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const [_, setShowCode] = useParent<boolean>(SHOW_CODE_NAMESPACE);
    const [email, setEmail] = useState("");

    return (
      <div>
        <input
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <button onClick={() => setShowCode(true)}>Verify</button>
      </div>
    );

    // const Code = () => {
    //   return (
    //     <div ref={props.setCodeRef}>
    //       <input name="code" />
    //       <input name="code" />
    //       <input name="code" />
    //       <input name="code" />
    //       <input name="code" />
    //       <hr />
    //       <button onClick={props.onCheckCode}>Check code</button>
    //     </div>
    //   );
    // };

    // const verificationStep = () => {
    //   switch (props.step) {
    //     case "email":
    //       return <Email />;
    //     case "code":
    //       return <Code />;
    //   }
    // };

    // return (
    //   <div>
    //     <h3>Cash Payouts</h3>
    //     {verificationStep()}
    //   </div>
    // );
  }
}
