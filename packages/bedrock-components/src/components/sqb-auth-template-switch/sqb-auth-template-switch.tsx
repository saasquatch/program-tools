import { withHooks } from '@saasquatch/stencil-hooks';
import { Component, h, Host } from '@stencil/core';
import { useAuthTemplateSwitch } from './useAuthTemplateSwitch';

@Component({
  tag: 'sqb-auth-template-switch',
})
export class SqbAuthTemplateSwitch {
  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { setContainer, setSlot } = useAuthTemplateSwitch();

    return (
      <Host>
        <div ref={setSlot}>
          <slot name="logged-out" />
          <slot name="logged-in" />
        </div>
        <div ref={setContainer}></div>
      </Host>
    );
  }
}
