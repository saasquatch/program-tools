import { isDemo } from '@saasquatch/component-boilerplate';
import { withHooks } from '@saasquatch/stencil-hooks';
import { h, Component, Prop, State, Host } from '@stencil/core';
import { useRedirect } from './useRedirect';

/**
 * @uiName Redirect Component
 */
@Component({
  tag: 'sqb-redirect',
  shadow: true,
})
export class RedirectRoute {
  @State()
  ignored = true;

  /**
   * @uiName Redirect Path
   */
  @Prop()
  redirectTo: string = '/';

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    isDemo() ? useRedirectDemo() : useRedirect(this);

    return <Host style={{ display: 'contents' }} />;
  }
}

function useRedirectDemo() {
  return true;
}
