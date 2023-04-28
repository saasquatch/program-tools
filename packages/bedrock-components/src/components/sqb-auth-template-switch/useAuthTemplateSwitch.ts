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

    function updateTemplates() {
      const isAuth = !!authToken;
      const templates = slot.querySelectorAll<HTMLTemplateElement>(`template`);
      const template = Array.from(templates).find(t => t.slot === (isAuth ? 'logged-in' : 'logged-out'));

      if (template) {
        const wrapper = document.createElement('div');
        wrapper.slot = 'shown';

        // use outerHTML if template's innerHTML is unset (only happens in Stencilbook)
        const newContent = template.innerHTML || template.firstElementChild.outerHTML;

        // if template contents are an exact match
        if (newContent === container.innerHTML) {
          debug("don't rerender");
        } else if (template) {
          container.innerHTML = newContent;
        }
      }
    }

    updateTemplates();
    return useTemplateChildren({ parent: slot, callback: updateTemplates });
  }, [slot, container, authToken]);

  return {
    setSlot,
    setContainer,
  };
}
