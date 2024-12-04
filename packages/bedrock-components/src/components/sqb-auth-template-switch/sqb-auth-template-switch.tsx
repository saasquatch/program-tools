import { withHooks } from '@saasquatch/stencil-hooks';
import { Component, h, Host, Prop } from '@stencil/core';
import { useAuthTemplateSwitch } from './useAuthTemplateSwitch';

/**
 * Displays "logged-out" content if no valid user is set, otherwise displays "logged-in" content
 *
 * @uiName Auth Template Switcher
 * @slots [{"name":"logged-out","title":"Logged out template"}, {"name": "logged-in", "title": "Logged in template"}]
 * @canvasRenderer always-replace
 */
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
        <div ref={setSlot} style={{ display: 'contents' }}>
          <slot name="logged-out" />
          <slot name="logged-in" />
        </div>
        <div ref={setContainer}>
          <slot name="shown"></slot>
        </div>
      </Host>
    );
  }
}
