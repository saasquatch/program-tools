import { isDemo } from '@saasquatch/component-boilerplate';
import { withHooks } from '@saasquatch/stencil-hooks';
import { Component, Host, h, Prop, State } from '@stencil/core';
import { useConditionalSection, UseConditionalSection } from './useConditonalSection';

/**
 * Only displayed for certain users. Hides content if not available.
 *
 * @uiName Conditional Section
 */
@Component({
  tag: 'sqb-conditional-section',
  shadow: true,
})
export class SqbConditionalSection {
  /**
   * Only show this section when a user meets the following conditions.
   *
   * Can use `user.segments` and `user.customFields`.
   *
   *  - `"VIP" in user.segments`
   *  - `user.customFields.age > 19`
   *
   * @uiName Condition
   */
  @Prop()
  condition: string;

  @State()
  ignored = true;
  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo() ? useDemoHook() : useConditionalSection({ expression: this.condition });
    const display = props.shouldDisplay ? 'contents' : 'none';
    return (
      <Host style={{ display }}>
        <slot />
      </Host>
    );
  }
}

function useDemoHook(): UseConditionalSection {
  return {
    shouldDisplay: true,
  };
}
