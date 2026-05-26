import { beforeEach, describe, expect, it, vi } from 'vitest';

const universalHooksMock = vi.hoisted(() => ({
  useState: vi.fn((initial: unknown) => [initial, vi.fn()] as const),
}));

vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { usePortalVerifyEmail } from './usePortalVerifyEmail';

describe('usePortalVerifyEmail', () => {
  beforeEach(() => {
    universalHooksMock.useState.mockClear();
    vi.restoreAllMocks();
    vi.stubGlobal('window', {
      location: { search: '' },
    });
  });

  it('should return verifying status by default', () => {
    const result = usePortalVerifyEmail({} as never);

    expect(result.status).toBe('verifying');
    expect(universalHooksMock.useState).toHaveBeenCalledWith('verifying');
  });

  it('should extract the token from oobCode', () => {
    window.location.search = '?oobCode=test-oob-code';

    const result = usePortalVerifyEmail({} as never);

    expect(result.token).toBe('test-oob-code');
  });

  it('should extract the token from token when oobCode is missing', () => {
    window.location.search = '?token=test-token';

    const result = usePortalVerifyEmail({} as never);

    expect(result.token).toBe('test-token');
  });

  it('should return an empty token when no token params are present', () => {
    const result = usePortalVerifyEmail({} as never);

    expect(result.token).toBe('');
  });
});
