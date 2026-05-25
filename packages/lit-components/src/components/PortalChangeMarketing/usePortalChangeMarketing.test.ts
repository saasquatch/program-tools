import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: { viewer: { customFields: { marketingOptIn: false } } },
    loading: false,
  })),
}));

const universalHooksMock = vi.hoisted(() => ({
  setters: [] as Array<ReturnType<typeof vi.fn>>,
  useState: vi.fn((initial: unknown) => {
    const setter = vi.fn();
    universalHooksMock.setters.push(setter);
    return [initial, setter] as const;
  }),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);
vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { usePortalChangeMarketing } from './usePortalChangeMarketing';

describe('usePortalChangeMarketing', () => {
  beforeEach(() => {
    if (!globalThis.document) {
      Object.defineProperty(globalThis, 'document', {
        value: { dispatchEvent: () => true },
        configurable: true,
        writable: true,
      });
    }
    if (!globalThis.CustomEvent) {
      Object.defineProperty(globalThis, 'CustomEvent', {
        value: class {
          type: string;
          detail: unknown;
          constructor(type: string, init?: { detail?: unknown }) {
            this.type = type;
            this.detail = init?.detail;
          }
        },
        configurable: true,
      });
    }
    universalHooksMock.setters.length = 0;
    componentBoilerplateMock.useQuery.mockClear();
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { viewer: { customFields: { marketingOptIn: false } } },
      loading: false,
    });
  });

  it('returns the initial subscribed state from query data', () => {
    const result = usePortalChangeMarketing({} as any);

    expect(result.subscribed).toBe(false);
  });

  it('dispatches a marketing change event when toggled', async () => {
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent').mockReturnValue(true);
    const result = usePortalChangeMarketing({} as any);

    await result.onToggle();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0]?.[0] as any;
    expect(event.type).toBe('sq:marketing-change');
    expect(event.detail).toEqual({ subscribed: true });
  });

  it('returns the loading state from the query', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: undefined, loading: true });

    const result = usePortalChangeMarketing({} as any);

    expect(result.loading).toBe(true);
  });
});
