import { isDemo } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";
import { useGoogleSignIn } from "./useGoogleSignIn";

/**
 * @uiName Google Sign-In Button
 * @description Requires <script src="https://accounts.google.com/gsi/client" async></script> be added to the <head> section.
 */
@Component({
  tag: "sqm-google-sign-in",
  shadow: true,
})
export class GoogleSignIn {
  /**
   * @uiName Button text
   */
  @Prop() text: string;
  @Event({ composed: true }) initComplete: EventEmitter<any>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  connectedCallback() {
    const src = "https://accounts.google.com/gsi/client";
    if (!document.head.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      document.head.appendChild(script);
    }
  }

  render() {
    const { setGoogleButtonDiv } = isDemo()
      ? useDemoGoogleSignIn(this)
      : useGoogleSignIn(this);

    return (
      <div>
        <div ref={setGoogleButtonDiv}></div>
      </div>
    );
  }
}

function useDemoGoogleSignIn(props: GoogleSignIn) {
  const [googleButtonDiv, setGoogleButtonDiv] = useState<HTMLDivElement>(null);

  return {
    setGoogleButtonDiv: () => void 0,
  };
}
