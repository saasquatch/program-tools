import { useToken } from '@saasquatch/component-boilerplate';
import { useEffect, useState } from '@saasquatch/universal-hooks';
import debugFn from 'debug';
const debug = debugFn('sq:useAuthTemplateSwitch');

export function useAuthTemplateSwitch() {
  const authToken = useToken();

  const [container, setContainer] = useState<HTMLDivElement>(undefined);
  const [slot, setSlot] = useState<HTMLDivElement>(undefined);

  if (!authToken) debug('No user identity available');

  useEffect(() => {
    if (!container || !slot) {
      debug('DOM not ready:');
      return;
    }

    const isAuth = !!authToken && true;
    const templates = slot.querySelectorAll<HTMLTemplateElement>(`template`);
    const template = Array.from(templates).find(t => t.slot === (isAuth ? 'logged-in' : 'logged-out'));

    const newContent = template.innerHTML || template.firstElementChild.outerHTML;

    if (newContent === container.innerHTML) {
      debug("don't render");
    } else if (template) {
      container.innerHTML = newContent;
    }
  }, [slot, container, authToken]);

  return {
    setSlot,
    setContainer,
  };
}
