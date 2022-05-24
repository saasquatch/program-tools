import { P } from './index.module-b74a7f69.js';
import { m as useState, i as useEffect } from './stencil-hooks.module-f4b05383.js';

function useChildElements() {
  const host = P();
  const initialState = host.children.length ? Array.from(host.children) : [];
  const [childElements, setChildElements] = useState(initialState);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const children = Array.from(host.children);
      setChildElements([...children]);
    });
    observer.observe(host, { childList: true });
    return () => observer.disconnect();
  }, [host]);
  return childElements;
}

export { useChildElements as u };
