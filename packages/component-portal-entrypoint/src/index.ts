import { createContext } from "dom-context";

type UserIdentifier = {
  id: string;
  accountId: string;
};

/**
 * Note: This API interface is shared with `component-boilerplate`
 *
 * The context names and returns values matter, do not change them without intention
 */
const SquatchPortalInstance = {
  userContext: createContext<UserIdentifier>("sq-context:user"),
  localeContext: createContext<string>("sq-context:locale"),
} as const;

export class PortalEntryPoint extends HTMLElement {
  _userProvider = new SquatchPortalInstance.userContext.Provider({
    element: this,
    initialState: undefined,
  });
  _localeProvider = new SquatchPortalInstance.userContext.Provider({
    element: this,
    initialState: undefined,
  });

  connectedCallback() {
    this._userProvider.start();
    this._localeProvider.start();
  }
  disconnectedCallback() {
    this._userProvider.stop();
    this._localeProvider.stop();
  }

  static register() {
    customElements.define("sq-portal-entrypoint", PortalEntryPoint);
  }
}
