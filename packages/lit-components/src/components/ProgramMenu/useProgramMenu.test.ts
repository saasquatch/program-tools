import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: {
      viewer: {
        programShareLinks: [
          { programId: 'p1', program: { name: 'Program 1' }, shareLink: 'https://example.com/1' },
          { programId: 'p2', program: { name: 'Program 2' }, shareLink: 'https://example.com/2' },
        ],
      },
    },
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

import { useProgramMenu } from './useProgramMenu';

describe('useProgramMenu', () => {
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
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: {
        viewer: {
          programShareLinks: [
            { programId: 'p1', program: { name: 'Program 1' }, shareLink: 'https://example.com/1' },
            { programId: 'p2', program: { name: 'Program 2' }, shareLink: 'https://example.com/2' },
          ],
        },
      },
      loading: false,
    });
  });

  it('returns programs from query data', () => {
    const result = useProgramMenu({ programId: 'p1' } as any);

    expect(result.programs).toHaveLength(2);
    expect(result.programs[0]?.programId).toBe('p1');
  });

  it('uses props.programId as the initial selected value', () => {
    const result = useProgramMenu({ programId: 'p2' } as any);

    expect(result.selected).toBe('p2');
  });

  it('dispatches a program select event on select', () => {
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent').mockReturnValue(true);
    const result = useProgramMenu({ programId: 'p1' } as any);

    result.onSelect('p2');

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0]?.[0] as any;
    expect(event.type).toBe('sq:program-select');
    expect(event.detail).toEqual({ programId: 'p2' });
  });

  it('returns the loading state from the query', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: undefined, loading: true });

    const result = useProgramMenu({ programId: 'p1' } as any);

    expect(result.loading).toBe(true);
  });
});
