import { State } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
  registered: boolean,
  readyToLoad: boolean,
  registerUser?: () => void,
  loadStats?: () => void

}

export default createProviderConsumer<State>({
    registered: false,
    readyToLoad: false
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);