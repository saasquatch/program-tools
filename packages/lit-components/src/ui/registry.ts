/**
 * Global UI registry.
 *
 * One implementation of `UIComponents` is active at any time, configured via
 * `setUI()` at the package entry point. Views consume components through the
 * `UI` proxy so they always pick up the currently-configured implementation
 * while keeping full TypeScript type-safety on every call (e.g. `UI.Input({...})`
 * is checked against `InputProps`).
 *
 * To swap frameworks globally:
 *   import { setUI } from '@saasquatch/lit-components';
 *   import { myUI } from './my-ui-adapter';
 *   setUI(myUI); // call before any component first renders
 */
import type { UIComponents } from './types';

let current: UIComponents | null = null;

/** Set the active UI implementation. Call once at startup, before first render. */
export function setUI(impl: UIComponents): void {
  current = impl;
}

/** Retrieve the active UI implementation; throws if none has been configured. */
export function getUI(): UIComponents {
  if (!current) {
    throw new Error(
      '[lit-components] No UI implementation registered. ' +
        'Call setUI() before rendering any view.'
    );
  }
  return current;
}

/**
 * Type-safe lazy accessor used inside views.
 *
 * Calling `UI.Input(props)` is typed exactly like calling
 * `getUI().Input(props)` but resolves the current implementation on every
 * access, so swapping the adapter at runtime works without re-importing.
 */
export const UI: UIComponents = new Proxy({} as UIComponents, {
  get(_target, key: string | symbol) {
    const impl = getUI() as unknown as Record<string | symbol, unknown>;
    return impl[key];
  },
}) as UIComponents;
