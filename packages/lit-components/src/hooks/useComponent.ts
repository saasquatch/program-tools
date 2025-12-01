import { component } from 'haunted';
import { withHostProvider } from './useHost';
import { TemplateResult } from 'lit';

export function useComponent<TProps extends Record<string, any> = Record<string, any>>(
  renderFn: (host: HTMLElement) => TemplateResult,
  tagName: string,
  observedAttributes?: string[]
) {
  const Wrapper = component(withHostProvider(renderFn), { observedAttributes });
  customElements.define(tagName, Wrapper);
  return Wrapper as unknown as typeof HTMLElement & { new (): HTMLElement & TProps };
}
