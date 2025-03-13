import { Component, h, Prop, getElement } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  navigation,
  useAuthenticateWithGoogleMutation,
} from "@saasquatch/component-boilerplate";
import { sanitizeUrlPath } from "../../utils/utils";

interface CredentialResponse {
  credential: string;
}

@Component({
  tag: "sqm-google-signin",
  shadow: true,
})
export class GoogleSignIn {
  @Prop()
  nextPage: string = "/";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const [googleButtonDiv, setGoogleButtonDiv] =
      useState<HTMLDivElement>(undefined);

    const [request, { loading, errors, data }] =
      useAuthenticateWithGoogleMutation();

    // TODO: Error handling and nextPage url parameter

    useEffect(() => {
      // DOM not ready
      if (!googleButtonDiv) return;

      const handleCredentialResponse = async (response: CredentialResponse) => {
        const result = await request({ idToken: response.credential });

        if (result instanceof Error) {
          // TODO: Handle errors
          return;
        }

        if (result.authenticateManagedIdentityWithGoogle?.token) {
          const url = sanitizeUrlPath(this.nextPage);
          navigation.push(url.href);
        }
      };

      // See https://developers.google.com/identity/gsi/web/guides/personalized-button
      // for documentation on this Google button

      // @ts-ignore
      google.accounts.id.initialize({
        // TODO: Get the client ID from SquatchPortal window config or similar
        client_id:
          "190322867385-elcm8vorp3vk2etknmv6irns3v8bo4mh.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      // Button configuration options are here:
      // https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration

      // @ts-ignore
      google.accounts.id.renderButton(
        googleButtonDiv,
        { theme: "outline", size: "large" } // customization attributes
      );

      // @ts-ignore
      // google.accounts.id.prompt(); // also display the One Tap dialog

      // @ts-ignore
      //getElement(this).appendChild(div);
    }, [googleButtonDiv]);

    return <div ref={setGoogleButtonDiv}></div>;
  }
}
