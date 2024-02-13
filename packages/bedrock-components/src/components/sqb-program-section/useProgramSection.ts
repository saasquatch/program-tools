import { useLoadEvent, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useRef } from '@saasquatch/universal-hooks';

export function useProgramSection() {
  const userIdent = useUserIdentity();
  const eventSent = useRef(false);
  const sendLoadEvent = useLoadEvent();

  if (eventSent.current !== undefined && !eventSent.current && userIdent !== undefined) {
    eventSent.current = true;
    sendLoadEvent();
  }
}
