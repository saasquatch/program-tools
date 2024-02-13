import { useLoadEvent, useUserIdentity } from '@saasquatch/component-boilerplate';

export function useProgramSection() {
  const userIdent = useUserIdentity();
  const sendLoadEvent = useLoadEvent();

  if (userIdent !== undefined) {
    sendLoadEvent();
  }
}
