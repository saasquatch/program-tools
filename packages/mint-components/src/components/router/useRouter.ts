import { useCurrentPage } from '@saasquatch/component-boilerplate';
import { useEffect, useState } from '@saasquatch/universal-hooks';
import debugFn from 'debug';
const debug = debugFn('sq:useRouter');

export function useRouter() {
  const location = useCurrentPage();

  const [slot, setSlot] = useState<HTMLElement>(undefined);
  const [container, setContainer] = useState<HTMLDivElement>(undefined);

  const page = location.pathname;

  useEffect(() => {
    if (!container || !slot) {
      debug('DOM not ready for navigation rendering on:', page);
      return;
    }
    const template = slot.querySelector<HTMLTemplateElement>(`template[path="${page}"]`);

    if (!template) {
      // No matching page, go to default page
      debug('No matching page found for ', page, ' so navigating to /login');
      return;
    }

    debug('Page updated to ', page, template);

    if (container.dataset.page === page) {
      // Same page, do not re-render
      // Reduces dom mutations, speeds up page speed
    } else {
      // const element = template.content.cloneNode(true);
      container.innerHTML = template.innerHTML;
      container.dataset.page = page;
      // container.appendChild(element);
    }
  }, [slot, container, page]);

  return {
    callbacks: {
      setSlot,
      setContainer,
    },
  };
}
