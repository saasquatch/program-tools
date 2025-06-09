import { isDemo } from '@saasquatch/component-boilerplate';
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
  /**
   * @state { "title": "Verified", "slot": "logged-in", "props": "testToken" }
   * @state { "title": "Unverified", "slot": "logged-out", "props": "" }
   */
  @Prop() stateController?: string = undefined;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { setContainer, setSlot } = isDemo() ? useDemoAuthSwitch(this) : useAuthTemplateSwitch();

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

function useDemoAuthSwitch(props: SqbAuthTemplateSwitch) {
  const { setContainer, setSlot } = useAuthTemplateSwitch(props.stateController);

  return {
    setContainer,
    setSlot,
  };
}
