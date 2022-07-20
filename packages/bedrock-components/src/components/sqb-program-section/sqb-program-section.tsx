import { withHooks } from '@saasquatch/stencil-hooks';
import { Component, Host, h, Prop, State } from '@stencil/core';
import { useProgramProvider } from './PROGRAM_CONTEXT';

/**
 * Use this with other components like share buttons, referral lists
 *
 * @uiName Program Section
 * @exampleGroup Advanced
 * @slots [{"name":"","title":"Section Content"}]
 * @example Program Section - <sqb-program-section>Add your program specific content here!</sqb-program-section>
 */
@Component({
  tag: 'sqb-program-section',
  shadow: true,
})
export class SqbProgramSection {
  @State()
  ignored = true;
  /**
   * Overwrite the program context used by child components with the selected program.
   *
   * @uiName Program
   * @uiWidget programSelector
   */
  @Prop()
  programId: string;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { programId } = this;
    useProgramProvider(programId);

    return (
      <Host style={{ display: 'contents' }}>
        <slot></slot>
      </Host>
    );
  }
}
