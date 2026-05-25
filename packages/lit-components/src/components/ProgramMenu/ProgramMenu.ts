import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { ProgramMenuView } from './ProgramMenuView';
import { useProgramMenu } from './useProgramMenu';

export interface ProgramMenuItem {
  programId: string;
  program?: {
    name?: string;
  };
  shareLink?: string;
}

export interface ProgramMenuProps {
  programId?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-program-menu': HTMLElement;
  }
}

export const ProgramMenu = useComponent<ProgramMenuProps>(
  (host) => {
    const props: ProgramMenuProps = {
      ...getProps(host),
    };

    const hookProps = useProgramMenu(props);

    return ProgramMenuView({ ...props, ...hookProps });
  },
  'sql-program-menu',
  ['program-id'] as const
);
