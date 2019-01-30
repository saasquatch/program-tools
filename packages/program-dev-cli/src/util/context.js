import * as config from './config';

let context;

export const getContext = () => {
  if (!context) {
    context = loadContext();
  }

  return context;
};

const loadContext = () => {
  return {
    config: config.load()
  };
};