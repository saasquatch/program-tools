import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  isDemo: vi.fn(() => false),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: { user: { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', countryCode: 'US' } },
    loading: false,
  })),
}));

const universalHooksMock = vi.hoisted(() => ({
  setters: [] as Array<ReturnType<typeof vi.fn>>,
  stateValues: [] as unknown[],
  useEffect: vi.fn((effect: () => void) => effect()),
  useState: vi.fn((initial: unknown) => {
    const setter = vi.fn();
    universalHooksMock.setters.push(setter);
    const value = universalHooksMock.stateValues.length ? universalHooksMock.stateValues.shift() : initial;
    return [value, setter] as const;
  }),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);
vi.mock('@saasquatch/universal-hooks', () => ({
  useEffect: universalHooksMock.useEffect,
  useState: universalHooksMock.useState,
}));

import { usePortalProfile } from './usePortalProfile';

describe('usePortalProfile', () => {
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
    universalHooksMock.stateValues.splice(0, universalHooksMock.stateValues.length, 'Jane', 'Doe', 'jane@example.com', 'US', '', false, false);
    componentBoilerplateMock.isDemo.mockReturnValue(false);
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { user: { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', countryCode: 'US' } },
      loading: false,
    });
  });

  it('returns the loading state from the query', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: undefined, loading: true });
    universalHooksMock.stateValues.splice(0, universalHooksMock.stateValues.length, '', '', '', '', '', false, false);

    const result = usePortalProfile({} as any);

    expect(result.loading).toBe(true);
  });

  it('dispatches a profile update event on submit', async () => {
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent').mockReturnValue(true);
    const result = usePortalProfile({} as any);
    const preventDefault = vi.fn();

    await result.onSubmit({ preventDefault } as any);

    expect(preventDefault).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0]?.[0] as any;
    expect(event.type).toBe('sq:profile-update');
    expect(event.detail).toEqual({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      country: 'US',
    });
  });

  it('returns form state values', () => {
    const result = usePortalProfile({} as any);

    expect(result.firstName).toBe('Jane');
    expect(result.lastName).toBe('Doe');
    expect(result.email).toBe('jane@example.com');
    expect(result.country).toBe('US');
  });
});
