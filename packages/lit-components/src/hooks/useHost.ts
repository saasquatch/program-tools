import { useContext, createContext } from 'haunted';
import type { TemplateResult } from 'lit';

/**
 * Context that stores the host element for the current component
 */
const HostContext = createContext<HTMLElement | null>(null);

/**
 * Hook that returns a reference to the web component's host HTML element
 * Must be called within a Haunted functional component
 * @returns The host HTMLElement
 */
export function useHost(): HTMLElement {
  const host = useContext(HostContext);
  
  if (!host) {
    throw new Error('useHost must be called within a Haunted component. Make sure the component is created with withHostProvider()');
  }
  
  return host;
}

/**
 * Higher-order function to wrap a Haunted component and provide host context
 * @param Component - The Haunted functional component
 * @returns The wrapped component with host context
 */
export function withHostProvider(
  Component: (host: HTMLElement) => TemplateResult
): (host: HTMLElement) => TemplateResult {
  return (host: HTMLElement) => {
    // Create a context provider that supplies the host
    return Component(host);
  };
}

export { HostContext };
