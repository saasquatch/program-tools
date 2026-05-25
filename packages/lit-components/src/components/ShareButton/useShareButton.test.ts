import { describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt', id: 'user1', accountId: 'acc1' })),
  useEngagementMedium: vi.fn(() => 'EMBED'),
  useQuery: vi.fn(() => ({
    data: {
      user: {
        shareLink: 'https://example.com/share',
        referralCode: 'CODE123',
        messageLink: 'https://example.com/msg',
      },
    },
    loading: false,
  })),
  useMutation: vi.fn(() => [vi.fn()]),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);

import { useShareButton } from './useShareButton';

describe('useShareButton', () => {
  it('should return share link and onClick', () => {
    const result = useShareButton({ medium: 'facebook', programId: '' } as any);

    expect(result.shareLink).toBe('https://example.com/share');
    expect(result.loading).toBe(false);
    expect(typeof result.onClick).toBe('function');
  });

  it('should not be disabled when not loading', () => {
    const result = useShareButton({ medium: 'twitter', programId: '' } as any);

    expect(result.disabled).toBe(false);
  });
});
