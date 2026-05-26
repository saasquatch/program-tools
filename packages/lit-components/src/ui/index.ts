/**
 * Public entry-point for the UI adapter layer.
 *
 * Re-exports the registry (`UI`, `setUI`, `getUI`), the contract
 * (`UIComponents`), and all framework-neutral prop interfaces so views can
 * import everything they need from a single path:
 *
 *   import { UI, type InputProps } from '../../ui';
 */
export * from './types';
export * from './registry';
