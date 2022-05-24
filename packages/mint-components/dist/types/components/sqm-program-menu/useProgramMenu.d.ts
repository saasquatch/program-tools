import { SlMenu } from '@shoelace-style/shoelace';
import { ProgramMenu } from './sqm-program-menu';
export declare function useProgramMenu(props: ProgramMenu): {
  data: {
    programId: string;
  };
  callbacks: {
    rerender: () => unknown;
  };
  ref: {
    current: SlMenu;
  };
};
