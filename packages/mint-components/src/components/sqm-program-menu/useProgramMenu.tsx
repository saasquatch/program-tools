import {
  setProgramId,
  useProgramId,
  useQuery,
  useTick,
} from "@saasquatch/component-boilerplate";
// import { useDomContextState } from "@saasquatch/stencil-hooks";
import { useRef } from "@saasquatch/universal-hooks";
import { SlMenu, SlMenuItem } from "@shoelace-style/shoelace";
import { gql } from "graphql-request";
import { useEffect } from "haunted";
import { ProgramMenu } from "./sqm-program-menu";

import debugFn from "debug";
const debug = debugFn("sq:useProgramMenu");

type SelectEvent = Event & { detail: { item: SlMenuItem } };

// function handleMenu(e: SelectEvent) {
//   navigation.push(e.detail.item.value);
// }
// const PROGRAM_CONTEXT = "sq:program-id";

const GET_PROGRAMS = gql`
  query {
    viewer {
      ... on User {
        programShareLinks
        referralCodes
      }
    }
  }
`;

export function useProgramMenu(props: ProgramMenu) {
  const { data, loading } = useQuery(GET_PROGRAMS, {});
  const programId = useProgramId();
  // const [_, setProgramId] = useDomContextState(PROGRAM_CONTEXT, programId);
  debug({ data, loading, programId, props });

  const ref = useRef<SlMenu>();
  const [, rerender] = useTick();

  useEffect(() => {
    ref.current?.addEventListener("sl-select", (e: SelectEvent) => {
      setProgramId(e.detail.item.value);
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
