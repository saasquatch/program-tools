// TODO: Add exports from boilerplate
// import { getEnvironment } from '@saasquatch/component-boilerplate';
const getEnvironment = () => 'None' as const;

/**
 * Determines when to fake out the GraphQL calls
 */
export function isDemo(): boolean {
  const envType = getEnvironment();
  return envType === 'None' || envType === 'SquatchAdmin';
}
