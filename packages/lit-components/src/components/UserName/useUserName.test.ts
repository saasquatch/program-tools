import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({ data: { viewer: { firstName: 'Jane', lastName: 'Doe' } }, loading: false })),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);

import { useUserName } from './useUserName';

describe('useUserName', () => {
  beforeEach(() => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { viewer: { firstName: 'Jane', lastName: 'Doe' } },
      loading: false,
    });
  });

  it('returns the full name when both names are present', () => {
    const result = useUserName({ fallbackText: 'Friend' } as any);

    expect(result.displayName).toBe('Jane Doe');
  });

  it('returns only the first name when the last name is missing', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { viewer: { firstName: 'Jane', lastName: '' } },
      loading: false,
    });

    const result = useUserName({ fallbackText: 'Friend' } as any);

    expect(result.displayName).toBe('Jane');
  });

  it('returns the fallback text when no name is available', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { viewer: { firstName: '', lastName: '' } },
      loading: false,
    });

    const result = useUserName({ fallbackText: 'Friend' } as any);

    expect(result.displayName).toBe('Friend');
  });

  it('returns the loading state from the query', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: undefined, loading: true });

    const result = useUserName({ fallbackText: 'Friend' } as any);

    expect(result.loading).toBe(true);
  });
});
