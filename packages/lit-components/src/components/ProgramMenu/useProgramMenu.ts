import { useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import { ProgramMenuProps } from './ProgramMenu';

const PROGRAMS_QUERY = gql`
  query getPrograms {
    viewer {
      ... on User {
        programShareLinks {
          programId
          program {
            name
          }
          shareLink
        }
      }
    }
  }
`;

export function useProgramMenu(props: ProgramMenuProps) {
  const user = useUserIdentity();
  const { data, loading } = useQuery(PROGRAMS_QUERY, {}, !user?.jwt);
  const [selected, setSelected] = useState(props.programId || '');

  const programs = data?.viewer?.programShareLinks || [];

  function onSelect(programId: string) {
    setSelected(programId);
    const event = new CustomEvent('sq:program-select', {
      bubbles: true,
      composed: true,
      detail: { programId },
    });
    document.dispatchEvent(event);
  }

  return { programs, selected, loading, onSelect };
}

export function useDemoProgramMenu(props: ProgramMenuProps): ReturnType<typeof useProgramMenu> {
  const [selected, setSelected] = useState(props.programId || 'demo-program-1');
  const programs = [
    {
      programId: 'demo-program-1',
      program: { name: 'Referral Program' },
      shareLink: 'https://example.com/referral',
    },
    {
      programId: 'demo-program-2',
      program: { name: 'Partner Program' },
      shareLink: 'https://example.com/partner',
    },
  ];

  function onSelect(programId: string) {
    setSelected(programId);
  }

  return { programs, selected, loading: false, onSelect };
}
