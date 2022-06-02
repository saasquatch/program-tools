import { navigation } from '@saasquatch/component-boilerplate';
import { useEffect } from '@saasquatch/universal-hooks';
import { sanitizeUrlPath } from '../../utils/utils';

interface RedirectRouteProps {
  redirectTo: string;
}

export function useRedirect({ redirectTo }: RedirectRouteProps) {
  useEffect(() => {
    const pathname = sanitizeUrlPath(redirectTo)?.href;
    return navigation.push({
      pathname,
    });
  }, []);
}
