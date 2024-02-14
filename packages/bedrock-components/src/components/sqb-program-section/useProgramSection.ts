import { useLoadEvent, useUserIdentity } from '@saasquatch/component-boilerplate';

export function useProgramSection() {
  const userIdent = useUserIdentity();

  if (userIdent !== undefined) {
    useLoadEvent();
  }
}
