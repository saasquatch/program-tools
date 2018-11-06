import { State } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
  registered: boolean,
  readyToLoadStats: boolean,
  registerUser?: () => void,
  loadStats?: () => void

}

export default createProviderConsumer<State>({
    registered: false,
    readyToLoadStats: false
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);