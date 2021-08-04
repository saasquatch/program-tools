import { h } from "@stencil/core";

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
  ref: { current: any };
}

export function NavigationMenuView(props: NavigationMenuViewProps) {
  const { states } = props;
  const { styles } = states;
  return states.includeDropdown ? (
    <sl-dropdown style="margin-bottom: var(--sl-spacing-large)">
      <sl-button
        slot="trigger"
        caret
        onClick={props.callbacks.rerender}
        exportparts="base: dropdownbutton-base"
      >
        {styles.menuLabel}
      </sl-button>
      <sl-menu
        ref={(r) => {
          if (props.ref.current === undefined) {
            props.ref.current = r;
            props.callbacks.rerender();
          }
        }}
      >
        <slot />
      </sl-menu>
    </sl-dropdown>
  ) : (
    ""
  );
}
