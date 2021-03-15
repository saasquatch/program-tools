import { h, Component, Host, State } from '@stencil/core';
import { withHooks } from '@saasquatch/stencil-hooks';
import { useRouter } from './useRouter';

/**
 * For internal documentation
 *
 * @undocumented
 */
@Component({
  tag: 'sqm-router',
  styles: './sqm-router.css',
})
export class StencilStorybook {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { callbacks } = useRouter();
    return (
      <Host>
        <div ref={callbacks.setSlot} style={{ display: 'none' }}>
          <slot />
        </div>
        <div style={{ display: 'contents' }} ref={callbacks.setContainer}></div>
      </Host>
    );
  }
}
