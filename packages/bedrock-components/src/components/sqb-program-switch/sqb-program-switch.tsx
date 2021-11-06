import { h, Component, Host, State } from '@stencil/core';
import { withHooks } from '@saasquatch/stencil-hooks';
import { useProgramSwitch } from './useProgramSwitch';

/**
 * @uiName Program Switch
 */
@Component({
  tag: 'sqb-program-switch',
})
export class SqbProgramSwitch {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { callbacks } = useProgramSwitch();
    return (
      <Host style={{ display: 'contents' }}>
        <div ref={callbacks.setSlot} style={{ display: 'none' }}>
          <slot />
        </div>
        <div style={{ display: 'contents' }} ref={callbacks.setContainer}></div>
      </Host>
    );
  }
}
