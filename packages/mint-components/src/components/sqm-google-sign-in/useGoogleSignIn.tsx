import { getEnvironmentSDK } from "@saasquatch/component-boilerplate";
import { useState, useEffect } from "@saasquatch/stencil-hooks";
import { GoogleSignIn } from "./sqm-google-sign-in";

interface CredentialResponse {
  credential: string;
}

export function useGoogleSignIn(props: GoogleSignIn) {
  const [loaded, setLoaded] = useState(false);
  const [googleButtonDiv, setGoogleButtonDiv] = useState<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-expect-error
    window.onGoogleLibraryLoad = () => {
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
  }, []);

  useEffect(() => {
    if (!googleButtonDiv || !loaded) return;

    //@ts-expect-error
    google.accounts.id.renderButton(googleButtonDiv, {
      theme: "outline",
      size: "large",
      text: props.text,
    });
  }, [googleButtonDiv, loaded]);

  return {
    setGoogleButtonDiv,
  };
}
