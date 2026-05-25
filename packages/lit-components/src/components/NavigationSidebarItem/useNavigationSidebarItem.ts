import type { NavigationSidebarItemProps } from './NavigationSidebarItem';

export function useNavigationSidebarItem(props: NavigationSidebarItemProps) {
  function onClick() {
    if (props.disabled) return;

    const event = new CustomEvent('sq:navigate', {
      bubbles: true,
      composed: true,
      detail: { path: props.path },
    });

    document.dispatchEvent(event);
  }

  return { onClick };
}
