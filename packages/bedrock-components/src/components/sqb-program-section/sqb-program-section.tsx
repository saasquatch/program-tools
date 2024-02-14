import { withHooks } from '@saasquatch/stencil-hooks';
import { Component, Host, h, Prop, State, Element } from '@stencil/core';
import { ContextProvider } from 'dom-context';
import { useEffect } from '@saasquatch/universal-hooks';
import { isDemo } from '@saasquatch/component-boilerplate';
import { useProgramSection } from './useProgramSection';

/**
 * Matches @saasquatch/component-environment
 */
const PROGRAM_CONTEXT = 'sq:program-id';

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

  @Element() el: HTMLElement;
  provider: ContextProvider<string | undefined>;

  constructor() {
    this.provider = new ContextProvider({
      contextName: PROGRAM_CONTEXT,
      element: this.el,
      initialState: this.programId,
    });
    this.provider.start();
    this.el.addEventListener('sq:update-program-id', (e: CustomEvent) => (this.provider.context = e.detail));
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    if (!isDemo()) useProgramSection();
    const { programId, provider } = this;

    useEffect(() => {
      if (provider.context !== programId) {
        provider.context = programId;
      }
    }, [programId]);

    return (
      <Host style={{ display: 'contents' }}>
        <slot></slot>
      </Host>
    );
  }
}
