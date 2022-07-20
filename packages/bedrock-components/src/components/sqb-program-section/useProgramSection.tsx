import { useEffect } from '@saasquatch/universal-hooks';
import { useProgramId, setProgramId } from '@saasquatch/component-boilerplate';

export function useProgramSection(programId: string) {
  const currentProgramId = useProgramId();
  useEffect(() => {
    if (programId !== currentProgramId) {
      setProgramId(programId);
    }
  }, [programId]);
}
