import { useToken, useVerificationContext } from '@saasquatch/component-boilerplate';
import { useCallback, useEffect, useState } from '@saasquatch/universal-hooks';
import debugFn from 'debug';
import { useTemplateChildren } from '../../utils/useTemplateChildren';
const debug = debugFn('sq:useAuthTemplateSwitch');

type Options = { verification?: boolean };
export function useAuthTemplateSwitch(options?: Options) {
  const token = useToken();
  const verificationToken = useVerificationContext()?.token;
  const authToken = options.verification ? verificationToken : token;

  const [container, setContainer] = useState<HTMLDivElement>(undefined);
  const [slot, setSlot] = useState<HTMLDivElement>(undefined);

  if (!authToken) debug('No user identity available');

  const updateTemplates = useCallback(() => {
    const isAuth = !!authToken;
    const templates = slot.querySelectorAll<HTMLTemplateElement>(`template`);
    const template = Array.from(templates).find(t => t.slot === (isAuth ? 'logged-in' : 'logged-out'));

    if (template) {
      // use outerHTML if template's innerHTML is unset (only happens in Stencilbook)
      const newContent = template.innerHTML || template.firstElementChild.outerHTML;

      // if template contents are an exact match
      if (newContent === container.innerHTML) {
        debug("don't rerender");
      } else if (template) {
        container.innerHTML = newContent;
      }
    }

    const plopTargets = Array.from(slot.children).filter(el => el.tagName === 'RAISINS-PLOP-TARGET');

    // if editing in raisins
    if (plopTargets.length) {
      const loggedInPlopTargets = plopTargets.filter(el => el.slot === 'logged-in');

      const loggedOutPlopTargets = plopTargets.filter(el => el.slot === 'logged-out');

      loggedOutPlopTargets.forEach((target: HTMLElement, i) => {
        if (isAuth) {
          target.style.display = 'none';
          return;
        }
        // Place last plop target at the bottom of the parent
        if (i === loggedOutPlopTargets.length - 1) {
          target.style.bottom = '0px';
          target.style.left = '0px';
          target.style.right = '0px';
          target.style.position = 'absolute';
        }

        target.style.height = '25px';
      });

      loggedInPlopTargets.forEach((target: HTMLElement, i) => {
        if (!isAuth) {
          target.style.display = 'none';
          return;
        }
        // Place last plop target at the bottom of the parent
        if (i === loggedInPlopTargets.length - 1) {
          target.style.bottom = '0px';
          target.style.left = '0px';
          target.style.right = '0px';
          target.style.position = 'absolute';
        }

        target.style.height = '25px';
      });
    }
  }, [container, slot, authToken]);

  useEffect(() => {
    if (!container || !slot) {
      debug('DOM not ready:');
      return;
    }

    // Run on first render
    updateTemplates();

    return useTemplateChildren({ parent: slot, callback: updateTemplates });
  }, [slot, container, authToken]);

  return {
    setSlot,
    setContainer,
  };
}
