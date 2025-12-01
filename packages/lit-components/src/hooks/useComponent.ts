import { component } from 'haunted';
import { withHostProvider } from './useHost';

export function useComponent(
  renderFn: (host: HTMLElement) => unknown,
  tagName: string,
  observedAttributes?: string[]
) {
  const Wrapper = component(withHostProvider(renderFn), { observedAttributes });
  customElements.define(tagName, Wrapper);
  return Wrapper;
}
