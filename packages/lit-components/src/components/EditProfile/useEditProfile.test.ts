import { beforeEach, describe, expect, it, vi } from 'vitest';

const updateProfileMock = vi.hoisted(() => vi.fn());

const componentBoilerplateMock = vi.hoisted(() => ({
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: { viewer: { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' } },
    loading: false,
  })),
  useMutation: vi.fn(() => [updateProfileMock]),
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

import { useEditProfile } from './useEditProfile';

describe('useEditProfile', () => {
  beforeEach(() => {
    updateProfileMock.mockReset();
    updateProfileMock.mockResolvedValue({});
    universalHooksMock.setters.length = 0;
    universalHooksMock.useState.mockClear();
    componentBoilerplateMock.useUserIdentity.mockReturnValue({ jwt: 'test-jwt' });
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { viewer: { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' } },
      loading: false,
    });
    componentBoilerplateMock.useMutation.mockReturnValue([updateProfileMock]);
  });

  it('returns initial state from query data', () => {
    const result = useEditProfile({} as any);

    expect(result.firstName).toBe('Jane');
    expect(result.lastName).toBe('Doe');
    expect(result.email).toBe('jane@example.com');
  });

  it('prevents default and calls the update mutation on submit', async () => {
    const result = useEditProfile({} as any);
    const preventDefault = vi.fn();

    await result.onSubmit({ preventDefault } as any);

    expect(preventDefault).toHaveBeenCalled();
    expect(updateProfileMock).toHaveBeenCalledWith({ firstName: 'Jane', lastName: 'Doe' });
  });

  it('handles mutation errors in onSubmit', async () => {
    updateProfileMock.mockRejectedValue(new Error('nope'));
    const result = useEditProfile({} as any);

    await result.onSubmit({ preventDefault: vi.fn() } as any);

    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('Failed to update profile. Please try again.');
  });

  it('returns the query loading state', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: undefined, loading: true });

    const result = useEditProfile({} as any);

    expect(result.loading).toBe(true);
  });
});
