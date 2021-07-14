import { NavigationSidebar } from "./sqm-navigation-sidebar";
import { NavigationSidebarViewProps } from "./sqm-navigation-sidebar-view";

export function useNavigationSidebar(
  props: NavigationSidebar
): NavigationSidebarViewProps {
  return {
    data: {
      programs: [
        {
          key: "program1",
          label: "My Referral Program",
        },
        {
          key: "program2",
          label: "My Rewards Program",
        },
      ],
    },
  };
}
