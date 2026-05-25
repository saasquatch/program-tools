import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: { viewer: { payoutDetails: { payoutStatus: 'APPROVED' } } },
    loading: false,
  })),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);

import { usePayoutStatus } from './usePayoutStatus';

describe('usePayoutStatus', () => {
  const props = {
    approvedText: 'Approved text',
    deniedText: 'Denied text',
    pendingText: 'Pending text',
  };

  beforeEach(() => {
    componentBoilerplateMock.useQuery.mockClear();
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { viewer: { payoutDetails: { payoutStatus: 'APPROVED' } } },
      loading: false,
    });
  });

  it('returns success variant and approved text for approved status', () => {
    const result = usePayoutStatus(props as any);

    expect(result.status).toBe('APPROVED');
    expect(result.variant).toBe('success');
    expect(result.text).toBe('Approved text');
  });

  it('returns danger variant and denied text for denied status', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { viewer: { payoutDetails: { payoutStatus: 'DENIED' } } },
      loading: false,
    });

    const result = usePayoutStatus(props as any);

    expect(result.variant).toBe('danger');
    expect(result.text).toBe('Denied text');
  });

  it('returns warning variant and pending text for pending status', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { viewer: { payoutDetails: { payoutStatus: 'PENDING' } } },
      loading: false,
    });

    const result = usePayoutStatus(props as any);

    expect(result.variant).toBe('warning');
    expect(result.text).toBe('Pending text');
  });

  it('returns neutral variant and empty text for unknown status', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { viewer: { payoutDetails: { payoutStatus: 'OTHER' } } },
      loading: false,
    });

    const result = usePayoutStatus(props as any);

    expect(result.variant).toBe('neutral');
    expect(result.text).toBe('');
  });

  it('returns the loading state from the query', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { viewer: { payoutDetails: { payoutStatus: 'APPROVED' } } },
      loading: true,
    });

    const result = usePayoutStatus(props as any);

    expect(result.loading).toBe(true);
  });
});
