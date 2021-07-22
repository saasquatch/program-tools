import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, State, h } from "@stencil/core";
import { useGraphQLClientProvider } from "./useGraphQLProvider";

/**
 * @uiName Portal Protected Route
 */
@Component({
  tag: "sqm-graphql-client-provider",
  shadow: false,
})
export class GraphQLClientProvider {
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
      ? useGraphQLClientProviderDemo(this)
      : useGraphQLClientProvider(this);
    return (
      <Host style={{ display: "contents" }}>
        <slot></slot>
      </Host>
    );
  }
}
function useGraphQLClientProviderDemo({ domain }) {
  return domain;
}
