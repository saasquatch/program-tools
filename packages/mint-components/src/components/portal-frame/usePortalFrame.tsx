import {
  navigation,
  useTick,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useRef } from "@saasquatch/universal-hooks";
import { SlMenu, SlMenuItem } from "@shoelace-style/shoelace";
import { useEffect } from "haunted";
import { PortalFrame } from "./portal-frame";
import { PortalFrameViewProps } from "./portal-frame-view";

export interface PortalFrameProps {
  headertext: string;
  description: string;
}

type SelectEvent = Event & { detail: { item: SlMenuItem } };

function handleMenu(
  e: SelectEvent,
  paths: { dashboardPath: string; profilePath: string; logoutPath: string }
) {
  switch (e.detail.item.value) {
    case "dashboard":
      navigation.push(paths.dashboardPath);
      break;
    case "edit-profile":
      navigation.push(paths.profilePath);
      break;
    case "bye":
      navigation.push(paths.logoutPath);
      break;
    default:
      throw Error(
        `Unknown menu value "${e.detail.item.value}" in sl-select event.`
      );
  }
}

export function usePortalFrame(props: PortalFrame): PortalFrameViewProps {
  const ref = useRef<SlMenu>();
  const [_, rerender] = useTick();

  const user = useUserIdentity();

  useEffect(() => {
    ref.current?.addEventListener("sl-select", (e: SelectEvent) =>
      handleMenu(e, props)
    );
  }, [ref.current]);

  return {
    states: {
      includeDropdown: (user.id || user.accountId || user.jwt) !== undefined,
      styles: {
        headertext: props.headertext,
        description: props.description,
      },
    },
    data: {
      email: "example@example.com",
    },
    callbacks: {
      rerender,
    },
    ref,
  };
}
