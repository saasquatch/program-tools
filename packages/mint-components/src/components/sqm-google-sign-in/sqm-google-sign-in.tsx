import { getEnvironmentSDK } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import { Event, Component, EventEmitter, h, Prop } from "@stencil/core";

interface CredentialResponse {
  credential: string;
}

/**
 * @uiName Google Sign-In Button
 * @description Requires <script src="https://accounts.google.com/gsi/client" async></script> be added to the <head> section.
 */
@Component({
  tag: "sqm-google-sign-in",
  shadow: true,
})
export class GoogleSignIn {
  @Prop() text: string;
  @Event({ composed: true }) initComplete: EventEmitter<any>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const sdk = getEnvironmentSDK();
    const [googleButtonDiv, setGoogleButtonDiv] =
      useState<HTMLDivElement>(null);

    useEffect(() => {
      if (sdk.type !== "SquatchPortal") return;
      if (!googleButtonDiv) return;

      const cb = (res: CredentialResponse) => {
        this.initComplete.emit(res);
      };

      //@ts-expect-error
      google.accounts.id.initialize({
        //@ts-expect-error: link component-env/boilerplate for new types
        client_id: sdk.env.googleClientId,
        callback: cb,
      });

      //@ts-expect-error
      google.accounts.id.renderButton(googleButtonDiv, {
        theme: "outline",
        size: "large",
        text: this.text,
      });
    }, [googleButtonDiv]);

    // TODO: Maybe a loading placeholder while initialising
    return <div ref={setGoogleButtonDiv}></div>;
  }
}
