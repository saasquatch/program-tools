import { useLoadEvent, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useRef } from '@saasquatch/universal-hooks';

export function useProgramSection() {
  const userIdent = useUserIdentity();

  const analyticsEventSent = useRef(false);

  if (!analyticsEventSent.current && userIdent !== undefined) {
    analyticsEventSent.current = true;
    useLoadEvent();
  }
}
