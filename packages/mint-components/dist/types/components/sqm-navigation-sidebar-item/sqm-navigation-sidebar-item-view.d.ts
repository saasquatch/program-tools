export interface NavigationSidebarItemViewProps {
  states: {
    active: boolean;
  };
  data: {
    label: string;
    icon: string;
    path: string;
  };
}
export declare function NavigationSidebarItemView(props: NavigationSidebarItemViewProps): any;
