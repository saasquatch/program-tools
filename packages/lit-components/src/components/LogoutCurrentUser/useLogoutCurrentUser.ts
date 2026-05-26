export function useLogoutCurrentUser() {
  function onClick() {
    const event = new CustomEvent('sq:logout', {
      bubbles: true,
      composed: true,
    });
    document.dispatchEvent(event);
    try {
      // @ts-expect-error global squatch state
      if (window.squatchToken) window.squatchToken = undefined;
    } catch {
      return undefined;
    }
  }

  return { onClick };
}

export function useDemoLogoutCurrentUser(): ReturnType<typeof useLogoutCurrentUser> {
  return {
    onClick: () => undefined,
  };
}
