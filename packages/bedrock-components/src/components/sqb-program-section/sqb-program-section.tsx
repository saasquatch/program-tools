import { withHooks } from '@saasquatch/stencil-hooks';
import { Component, Host, h, Prop, State } from '@stencil/core';
import { useProgramProvider } from './PROGRAM_CONTEXT';

/**
 * Use this with other components like share buttons, referral lists
 *
 * @uiName Program Section
 */
@Component({
  tag: 'sqb-program-section',
  shadow: true,
})
export class SqbProgramSection {
  @State()
  ignored = true;
  /**
   * The program that everything in this section should use
   *
   * @uiName Program
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
