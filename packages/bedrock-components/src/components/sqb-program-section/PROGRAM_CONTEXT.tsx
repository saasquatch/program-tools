import { useDomContextState } from '@saasquatch/stencil-hooks';
import { useEffect } from '@saasquatch/universal-hooks';
import { useHost } from '@saasquatch/component-boilerplate';
/**
 * Matches @saasquatch/component-boilerplate
 */
const PROGRAM_CONTEXT = 'sq:program-id';

export function useProgramProvider(programId: string) {
  const host = useHost();
  const [_, setProgramId] = useDomContextState(PROGRAM_CONTEXT, programId || null);

  useEffect(() => {
    host?.addEventListener('sq:update-program-id', (e: CustomEvent) => setProgramId(e.detail || null));
  }, []);

  useEffect(() => {
    setProgramId(programId || null);
  }, [programId]);
}
