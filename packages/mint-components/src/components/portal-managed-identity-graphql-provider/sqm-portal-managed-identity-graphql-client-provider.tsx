import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, State, h } from "@stencil/core";
import { usePortalManagedIdentityGraphQLClientProvider } from "./usePortalManagedIdentityGraphQLProvider";

/**
 * @uiName Portal Protected Route
 */
@Component({
  tag: "sqm-portal-managed-identity-graphql-client-provider",
  shadow: false,
})
export class PortalManagedIdentityGraphQLClientProvider {
  @State()
  ignored = true;

  @Prop()
  domain: string;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    false && isDemo()
      ? usePortalManagedIdentityGraphQLClientProviderDemo(this)
      : usePortalManagedIdentityGraphQLClientProvider(this);
    return (
      <Host style={{ display: "contents" }}>
        <slot></slot>
      </Host>
    );
  }
}
function usePortalManagedIdentityGraphQLClientProviderDemo({ domain }) {
  return domain;
}
