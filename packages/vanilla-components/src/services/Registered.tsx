import { State } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
  widgetType: string,
  registered: boolean,
  completedRegister: boolean,
  registerUser?: () => void,
  loadNext?: () => void

}

export default createProviderConsumer<State>({
    widgetType: "",
    registered: false,
    completedRegister: false
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);