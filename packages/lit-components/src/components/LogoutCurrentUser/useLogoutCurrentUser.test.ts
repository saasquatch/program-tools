import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useLogoutCurrentUser } from './useLogoutCurrentUser';

describe('useLogoutCurrentUser', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal('document', { dispatchEvent: vi.fn() });
    vi.stubGlobal('window', {} as Window & { squatchToken?: string });
  });

  it('should return an onClick handler', () => {
    const result = useLogoutCurrentUser();

    expect(typeof result.onClick).toBe('function');
  });

  it('should dispatch a logout event on click', () => {
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = useLogoutCurrentUser();

    result.onClick();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:logout');
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
  });

  it('should clear window.squatchToken on click', () => {
    (window as Window & { squatchToken?: string }).squatchToken = 'test-token';
    const result = useLogoutCurrentUser();

    result.onClick();

    expect((window as Window & { squatchToken?: string }).squatchToken).toBeUndefined();
  });
});
