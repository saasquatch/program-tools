import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useNavigationSidebarItem } from './useNavigationSidebarItem';

describe('useNavigationSidebarItem', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal('document', { dispatchEvent: vi.fn() });
  });

  it('should return an onClick handler', () => {
    const result = useNavigationSidebarItem({ label: 'Dashboard', path: '/dashboard' });

    expect(typeof result.onClick).toBe('function');
  });

  it('should dispatch a navigate event with the provided path', () => {
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = useNavigationSidebarItem({ label: 'Dashboard', path: '/dashboard' });

    result.onClick();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:navigate');
    expect(event.detail).toEqual({ path: '/dashboard' });
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
  });

  it('should not dispatch when disabled', () => {
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = useNavigationSidebarItem({ label: 'Dashboard', path: '/dashboard', disabled: true });

    result.onClick();

    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
