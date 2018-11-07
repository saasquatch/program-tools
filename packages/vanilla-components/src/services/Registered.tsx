import { State } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
  registered: boolean,
  completedRegister: boolean,
  registerUser?: () => void,
  loadNext?: () => void

}

export default createProviderConsumer<State>({
    registered: false,
    completedRegister: false
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);