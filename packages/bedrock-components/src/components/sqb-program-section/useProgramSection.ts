import { useLoadEvent, useUserIdentity } from '@saasquatch/component-boilerplate';

export function useProgramSection() {
  const userIdent = useUserIdentity();

  if (userIdent?.jwt) useLoadEvent();
}
