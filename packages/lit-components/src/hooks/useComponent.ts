import { component } from 'haunted';
import { withHostProvider } from './useHost';

export function useComponent(renderFn: (host: HTMLElement) => unknown, tagName: string) {
  const Wrapper = component(withHostProvider(renderFn));
  customElements.define(tagName, Wrapper);
  return Wrapper;
}
