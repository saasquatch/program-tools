import { getEnvironmentSDK } from "@saasquatch/component-boilerplate";
import { useState, useEffect, useRef } from "@saasquatch/stencil-hooks";
import { GoogleSignIn } from "./sqm-google-sign-in";

interface CredentialResponse {
  credential: string;
}

export function useGoogleSignIn(props: GoogleSignIn) {
  const [loaded, setLoaded] = useState(false);
  const [googleButtonDiv, setGoogleButtonDiv] = useState<HTMLDivElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number>(getButtonWidth());
  const resizeTimeoutRef = useRef<NodeJS.Timeout>(null);
  function getButtonWidth() {
    return Math.max(200, Math.min(400, window.innerWidth * 0.7 - 20));
  }

  useEffect(() => {
    function handleResize() {
      clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        setButtonWidth(getButtonWidth());
      }, 40);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const cb = () => {
      // @ts-expect-error
      window.onGoogleLibraryLoad = null;

      const sdk = getEnvironmentSDK();
      if (sdk.type !== "SquatchPortal") return;

      const cb = (res: CredentialResponse) => {
        props.initComplete.emit(res);
      };

      //@ts-expect-error
      google.accounts.id.initialize({
        //@ts-expect-error: link component-env/boilerplate for new types
        client_id: sdk.env.googleOAuthId,
        callback: cb,
      });
      setLoaded(true);
    };

    // @ts-expect-error
    if (window.google) cb();
    // @ts-expect-error
    window.onGoogleLibraryLoad = cb;
  }, []);

  useEffect(() => {
    if (!googleButtonDiv || !loaded) return;

    //@ts-expect-error
    google.accounts.id.renderButton(googleButtonDiv, {
      theme: "outline",
      size: "large",
      text: props.text,
      height: 40,
      width: buttonWidth,
    });
  }, [googleButtonDiv, loaded, buttonWidth]);

  return {
    setGoogleButtonDiv,
  };
}
