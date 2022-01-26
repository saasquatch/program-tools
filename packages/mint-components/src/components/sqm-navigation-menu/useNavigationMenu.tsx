import {
  navigation,
  useTick,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useRef } from "@saasquatch/universal-hooks";
// TODO: replace samsquatch
import { SlMenu, SlMenuItem } from "@samsquatch/shoelace";
import { useEffect } from "haunted";
import { NavigationMenu } from "./sqm-navigation-menu";
import { NavigationMenuViewProps } from "./sqm-navigation-menu-view";

type SelectEvent = Event & { detail: { item: SlMenuItem } };

function handleMenu(e: SelectEvent) {
  navigation.push(e.detail.item.value);
}

export function useNavigationMenu(
  props: NavigationMenu
): NavigationMenuViewProps {
  const ref = useRef<SlMenu>();
  const [, rerender] = useTick();

  const user = useUserIdentity();

  useEffect(() => {
    ref.current?.addEventListener("sl-select", (e: SelectEvent) =>
      handleMenu(e)
    );
  }, [ref.current]);

  return {
    states: {
      includeDropdown: (user?.id || user?.accountId || user?.jwt) !== undefined,
      styles: {
        menuLabel: props.menuLabel,
      },
    },
    callbacks: {
      rerender,
    },
    ref,
  };
}
