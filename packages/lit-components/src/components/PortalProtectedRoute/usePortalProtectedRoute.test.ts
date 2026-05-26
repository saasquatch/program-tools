import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useProgramId: vi.fn(),
  useQuery: vi.fn(),
  useMutation: vi.fn(),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);

import { usePortalProtectedRoute } from './usePortalProtectedRoute';

describe('usePortalProtectedRoute', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    componentBoilerplateMock.useUserIdentity.mockReset();
    componentBoilerplateMock.useUserIdentity.mockReturnValue({ jwt: 'test-jwt' });
    vi.stubGlobal('window', { location: { hash: '' } });
  });

  it('should return authenticated when a jwt is present', () => {
    const result = usePortalProtectedRoute({ redirectUrl: '/login' });

    expect(result.isAuthenticated).toBe(true);
    expect(window.location.hash).toBe('');
  });

  it('should return unauthenticated when no jwt is present', () => {
    componentBoilerplateMock.useUserIdentity.mockReturnValue(undefined);

    const result = usePortalProtectedRoute({ redirectUrl: '' });

    expect(result.isAuthenticated).toBe(false);
  });

  it('should redirect when unauthenticated and redirectUrl is provided', () => {
    componentBoilerplateMock.useUserIdentity.mockReturnValue(undefined);

    const result = usePortalProtectedRoute({ redirectUrl: '/login' });

    expect(result.isAuthenticated).toBe(false);
    expect(window.location.hash).toBe('/login');
  });
});
