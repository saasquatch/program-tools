import { useState } from '@saasquatch/universal-hooks';
import type { RouteProps } from './Route';

export function useRoute(props: RouteProps) {
  const [visible, setVisible] = useState(false);

  function checkPath() {
    if (typeof window === 'undefined') {
      setVisible(false);
      return;
    }

    const currentPath = window.location.hash.slice(1) || '/';

    if (props.exact) {
      setVisible(currentPath === props.path);
    } else {
      setVisible(currentPath.startsWith(props.path));
    }
  }

  checkPath();

  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', checkPath);
  }

  return { visible };
}
