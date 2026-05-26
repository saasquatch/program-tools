import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: {
      viewer: {
        taxHandling: {
          publisher: {
            userInfoStatus: 'COMPLETE',
            taxFormStatus: 'PENDING',
            bankingInfoStatus: 'PENDING_REVIEW',
            payoutStatus: 'NOT_STARTED',
          },
        },
      },
    },
    loading: false,
  })),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);

import { useTaxAndCashDashboard } from './useTaxAndCashDashboard';

describe('useTaxAndCashDashboard', () => {
  beforeEach(() => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: {
        viewer: {
          taxHandling: {
            publisher: {
              userInfoStatus: 'COMPLETE',
              taxFormStatus: 'PENDING',
              bankingInfoStatus: 'PENDING_REVIEW',
              payoutStatus: 'NOT_STARTED',
            },
          },
        },
      },
      loading: false,
    });
  });

  it('returns steps with the expected labels and statuses', () => {
    const result = useTaxAndCashDashboard({} as any);

    expect(result.steps).toEqual([
      { label: 'Personal Information', status: 'COMPLETE', key: 'user-info' },
      { label: 'Tax Information', status: 'PENDING', key: 'tax-form' },
      { label: 'Banking Information', status: 'PENDING_REVIEW', key: 'banking-info' },
      { label: 'Payout', status: 'NOT_STARTED', key: 'payout' },
    ]);
  });

  it('maps status text correctly', () => {
    const result = useTaxAndCashDashboard({} as any);

    expect(result.getStatusText('COMPLETE')).toBe('Complete');
    expect(result.getStatusText('PENDING')).toBe('Pending');
    expect(result.getStatusText('NOT_STARTED')).toBe('Incomplete');
  });

  it('maps status variants correctly', () => {
    const result = useTaxAndCashDashboard({} as any);

    expect(result.getStatusVariant('COMPLETE')).toBe('success');
    expect(result.getStatusVariant('PENDING_REVIEW')).toBe('warning');
    expect(result.getStatusVariant('NOT_STARTED')).toBe('neutral');
  });

  it('returns the loading state from the query', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: undefined, loading: true });

    const result = useTaxAndCashDashboard({} as any);

    expect(result.loading).toBe(true);
  });

  it('uses label props when provided', () => {
    const result = useTaxAndCashDashboard({
      userInfoLabel: 'Profile',
      taxFormLabel: 'Tax Docs',
      bankingInfoLabel: 'Bank Account',
      payoutLabel: 'Cash Out',
    } as any);

    expect(result.steps.map((step) => step.label)).toEqual(['Profile', 'Tax Docs', 'Bank Account', 'Cash Out']);
  });
});
