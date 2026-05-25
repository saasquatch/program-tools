import { beforeEach, describe, expect, it, vi } from 'vitest';

const universalHooksMock = vi.hoisted(() => ({
  useEffect: vi.fn((callback: () => void) => callback()),
}));

vi.mock('@saasquatch/universal-hooks', () => ({
  useEffect: universalHooksMock.useEffect,
}));

import { useBrand } from './useBrand';

describe('useBrand', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();

    const head = {
      appendChild: vi.fn((node) => {
        (node as { parentNode?: unknown }).parentNode = head;
        return node;
      }),
      removeChild: vi.fn(),
    };

    vi.stubGlobal('document', {
      head,
      createElement: vi.fn(() => {
        const attributes = new Map<string, string>();
        return {
          parentNode: null,
          setAttribute: (name: string, value: string) => attributes.set(name, value),
          getAttribute: (name: string) => attributes.get(name) ?? null,
        };
      }),
    });
  });

  it('should return default brand values', () => {
    const result = useBrand({} as any);
    const appendSpy = document.head.appendChild as ReturnType<typeof vi.fn>;

    expect(result.font).toBe('Nunito Sans');
    expect(result.brandColorCss).toBe('');
    expect(appendSpy).toHaveBeenCalledTimes(1);
    const link = appendSpy.mock.calls[0][0] as { getAttribute: (name: string) => string | null };
    expect(link.getAttribute('rel')).toBe('stylesheet');
    expect(link.getAttribute('href')).toContain('https://fonts.googleapis.com/css2?family=Nunito%20Sans');
  });

  it('should return custom brand values', () => {
    const result = useBrand({ brandFont: 'Roboto', brandColor: '#4CAF50' } as any);

    expect(result.font).toBe('Roboto');
    expect(result.brandColorCss).toContain('--sql-brand-color: #4CAF50;');
  });
});
