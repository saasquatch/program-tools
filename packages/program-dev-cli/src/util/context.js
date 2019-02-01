import { load as loadConfig } from './config';

let context;

/**
 * @return {Object} The cli operating context
 */
export const getContext = () => {
  if (!context) {
    context = loadContext();
  }

  return context;
};

/**
 * Loads the context if it isn't already there
 *
 * @return {Object} The cli operating context
 */
const loadContext = () => {
  return {
    config: loadConfig()
  };
};