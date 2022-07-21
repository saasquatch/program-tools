import { isDemo } from '@saasquatch/component-boilerplate';
import { withHooks } from '@saasquatch/stencil-hooks';
import { Component, Host, h, Prop } from '@stencil/core';
import { useConditionalSection, UseConditionalSection } from './useConditonalSection';

/**
 * Only displayed for certain users. Hides content if not available.
 *
 * @uiName Conditional Section
 * @exampleGroup Advanced
 * @slots [{"name":"","title":"Section Content"}]
 * @example Conditional Section On Segment - <sqb-conditional-section condition="'vip' in user.segments"><p>Add your conditional content here!</p></sqb-conditional-section>
 * @example Conditional Section On Custom Field - <sqb-conditional-section condition="user.customFields.foo = true"><p>Add your conditional content here!</p></sqb-conditional-section>
 */
@Component({
  tag: 'sqb-conditional-section',
  shadow: true,
})
export class SqbConditionalSection {
  /**
   * Show child content when a user meets specified criteria. <a href="http://docs.jsonata.org/overview.html" target="_blank">JSONata expression</a> is used to define this logic. A participant’s segments, country code, custom fields and email can be used.
   * @uiName Condition
   * @uiWidget textArea
   * @required
   * @minLength 1
   */
  @Prop()
  condition: string;

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
