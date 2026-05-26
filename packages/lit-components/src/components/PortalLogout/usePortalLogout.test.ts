import { beforeEach, describe, expect, it, vi } from 'vitest';

import { usePortalLogout } from './usePortalLogout';

describe('usePortalLogout', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.stubGlobal('document', { dispatchEvent: vi.fn() });
    vi.stubGlobal('window', { location: { hash: '' } });
  });

  it('should return a logout function', () => {
    const result = usePortalLogout({} as any);

    expect(typeof result.logout).toBe('function');
  });

  it('should dispatch logout when the hook is used and when logout is called', () => {
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = usePortalLogout({} as any);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect((dispatchSpy.mock.calls[0][0] as CustomEvent).type).toBe('sq:logout');

    result.logout();

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect((dispatchSpy.mock.calls[1][0] as CustomEvent).type).toBe('sq:logout');
  });

  it('should set the hash when redirectUrl is provided', () => {
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');

    usePortalLogout({ redirectUrl: '/login' } as any);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect((dispatchSpy.mock.calls[0][0] as CustomEvent).type).toBe('sq:logout');
    expect(window.location.hash).toBe('/login');
  });
});
