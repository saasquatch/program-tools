import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({ data: { user: { shareLink: 'https://example.com/share?ref=123' } }, loading: false })),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);

import { useReferralIframe } from './useReferralIframe';

describe('useReferralIframe', () => {
  beforeEach(() => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { user: { shareLink: 'https://example.com/share?ref=123' } },
      loading: false,
    });
  });

  it('returns the iframe url with the share link appended', () => {
    const result = useReferralIframe({ iframeUrl: 'https://iframe.example.com' } as any);

    expect(result.url).toBe(
      'https://iframe.example.com?shareLink=https%3A%2F%2Fexample.com%2Fshare%3Fref%3D123'
    );
  });

  it('uses an ampersand when the iframe url already has query params', () => {
    const result = useReferralIframe({ iframeUrl: 'https://iframe.example.com?lang=en' } as any);

    expect(result.url).toBe(
      'https://iframe.example.com?lang=en&shareLink=https%3A%2F%2Fexample.com%2Fshare%3Fref%3D123'
    );
  });

  it('returns an empty url when iframeUrl is missing', () => {
    const result = useReferralIframe({ iframeUrl: '' } as any);

    expect(result.url).toBe('');
  });

  it('returns the loading state from the query', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: undefined, loading: true });

    const result = useReferralIframe({ iframeUrl: 'https://iframe.example.com' } as any);

    expect(result.loading).toBe(true);
  });
});
