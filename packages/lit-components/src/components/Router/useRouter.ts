import { useState } from '@saasquatch/universal-hooks';

export function useRouter() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.hash.slice(1) || '/' : '/'
  );

  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    });

    document.addEventListener(
      'sq:navigate',
      ((event: CustomEvent) => {
        window.location.hash = event.detail.path;
        setCurrentPath(event.detail.path);
      }) as EventListener
    );
  }

  return { currentPath };
}
