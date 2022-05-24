export interface NavigationMenuViewProps {
  states: {
    includeDropdown: boolean;
    styles: {
      menuLabel: string;
    };
  };
  callbacks: {
    rerender: Function;
  };
  ref: {
    current: any;
  };
}
export declare function NavigationMenuView(props: NavigationMenuViewProps): any;
