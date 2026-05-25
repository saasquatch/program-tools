import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: {
      user: {
        referralCodes: [
          { referralCode: 'ABC123', dateCreated: '2024-01-01', dateCopied: null },
          { referralCode: 'XYZ789', dateCreated: '2024-01-02', dateCopied: '2024-01-03' },
        ],
      },
    },
    loading: false,
  })),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);

import { useReferralCodes } from './useReferralCodes';

describe('useReferralCodes', () => {
  beforeEach(() => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: {
        user: {
          referralCodes: [
            { referralCode: 'ABC123', dateCreated: '2024-01-01', dateCopied: null },
            { referralCode: 'XYZ789', dateCreated: '2024-01-02', dateCopied: '2024-01-03' },
          ],
        },
      },
      loading: false,
    });
  });

  it('returns referral codes from query data', () => {
    const result = useReferralCodes({} as any);

    expect(result.codes).toHaveLength(2);
    expect(result.codes[0]?.referralCode).toBe('ABC123');
  });

  it('returns an empty array when data is missing', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: { user: {} }, loading: false });

    const result = useReferralCodes({} as any);

    expect(result.codes).toEqual([]);
  });

  it('returns the loading state from the query', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: undefined, loading: true });

    const result = useReferralCodes({} as any);

    expect(result.loading).toBe(true);
  });
});
