import { useDomContextState } from '@saasquatch/stencil-hooks';
import { useEffect } from '@saasquatch/universal-hooks';

/**
 * Matches @saasquatch/component-boilerplate
 */
const PROGRAM_CONTEXT = 'sq:program-id';

export function useProgramProvider(programId: string) {
  const [_, setProgramId] = useDomContextState(PROGRAM_CONTEXT, programId);
  useEffect(() => {
    setProgramId(programId);
  }, [programId]);
}
