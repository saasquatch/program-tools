import { isDemo } from "@saasquatch/component-boilerplate";
import { useEffect, useState, withHooks } from "@saasquatch/stencil-hooks";
import {
  Component,
  Event,
  EventEmitter,
  h,
  Prop,
  Element,
} from "@stencil/core";
import { useGoogleSignIn } from "./useGoogleSignIn";

/**
 * @uiName Google Sign-In Button
 * @description Requires <script src="https://accounts.google.com/gsi/client" async></script> be added to the <head> section.
 * @undocumented
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
  @Element() el!: HTMLElement; // Reference to the element
  @Prop() googleButtonDiv: HTMLElement | null = null;

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
    const { setGoogleButtonDiv } = isDemo
      ? useDemoGoogleSignIn(this)
      : useGoogleSignIn(this);

    return (
      <div ref={setGoogleButtonDiv} style={{ width: "100%" }}>
        {/* The Google button will be rendered inside this div and listens to parent containers style*/}
      </div>
    );
  }
}

function useDemoGoogleSignIn(props: GoogleSignIn) {
  const [loaded, setLoaded] = useState(false);
  const [googleButtonDiv, setGoogleButtonDiv] = useState<HTMLDivElement>(null);

  useEffect(() => {
    const cb = () => {
      // @ts-expect-error
      window.onGoogleLibraryLoad = null;
      setLoaded(true);
    };

    // @ts-expect-error
    if (window.google) cb();
    // @ts-expect-error
    window.onGoogleLibraryLoad = cb;
  }, []);

  useEffect(() => {
    if (!googleButtonDiv || !loaded) return;

    const cb = () => {
      props.initComplete.emit({ credential: null });
    };

    // @ts-expect-error
    google.accounts.id.initialize({
      client_id: "PLACEHOLDER",
      cb: () => {},
    });

    //@ts-expect-error
    google.accounts.id.renderButton(googleButtonDiv, {
      theme: "outline",
      size: "large",
      text: props.text,
      click_listener: cb,
    });
  }, [googleButtonDiv, loaded]);

  return {
    setGoogleButtonDiv,
  };
}
