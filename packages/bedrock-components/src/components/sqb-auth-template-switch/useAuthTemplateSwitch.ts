import { useToken } from '@saasquatch/component-boilerplate';
import { useEffect, useState } from '@saasquatch/universal-hooks';
import debugFn from 'debug';
import { useTemplateChildren } from '../../utils/useTemplateChildren';
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

    function updateTemplates(changes) {
      const isAuth = !!authToken;

      console.log({changes})

      const templates = slot.querySelectorAll<HTMLTemplateElement>(`template`);
      const template = Array.from(templates).find(t => t.slot === (isAuth ? 'logged-in' : 'logged-out'));

      const prev = Array.from(container.querySelectorAll('*')).filter(e => e.slot === 'shown');
      prev.forEach(p => container.removeChild(p));

      const clone = template.content.cloneNode(true);
      const wrapper = document.createElement('div');
      wrapper.slot = 'shown';
      wrapper.appendChild(clone);
      container.appendChild(wrapper);
    }

    useTemplateChildren(slot, updateTemplates);
    updateTemplates({});
  }, [slot, container, authToken]);

  return {
    setSlot,
    setContainer,
  };
}
