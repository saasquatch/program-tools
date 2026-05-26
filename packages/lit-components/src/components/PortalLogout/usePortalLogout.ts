import type { PortalLogoutProps } from './PortalLogout';

export function usePortalLogout(props: PortalLogoutProps) {
  function logout() {
    const event = new CustomEvent('sq:logout', { bubbles: true, composed: true });
    document.dispatchEvent(event);
    if (props.redirectUrl) {
      window.location.hash = props.redirectUrl;
    }
  }

  logout();
  return { logout };
}

export function useDemoPortalLogout(_props: PortalLogoutProps): ReturnType<typeof usePortalLogout> {
  return {
    logout: () => undefined,
  };
}
