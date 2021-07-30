import { useProgramId, useTick, useHost } from '@saasquatch/component-boilerplate';
import { useRef, useEffect } from '@saasquatch/universal-hooks';
import { SlMenu, SlMenuItem } from '@shoelace-style/shoelace';
import { ProgramMenu } from './sqm-program-menu';
import debugFn from 'debug';

const debug = debugFn('sq:useProgramMenu');

type SelectEvent = Event & { detail?: { item: SlMenuItem } };

const UPDATE_PROGRAM_EVENT = 'sq:update-program-id';

export function useProgramMenu(props: ProgramMenu) {
  const programId = useProgramId();
  const host = useHost();
  debug({ programId, props });

  const ref = useRef<SlMenu>();
  const [, rerender] = useTick();

  useEffect(() => {
    ref.current?.addEventListener('sl-select', (e: SelectEvent) => {
      const programId = e.detail.item.value;
      // setProgramId(programId);
      host.dispatchEvent(
        new CustomEvent(UPDATE_PROGRAM_EVENT, {
          detail: programId,
          bubbles: true,
          composed: true,
        }),
      );
    });
  }, [ref.current]);

  return {
    data: {
      programId,
    },
    callbacks: {
      rerender,
    },
    ref,
  };
}
