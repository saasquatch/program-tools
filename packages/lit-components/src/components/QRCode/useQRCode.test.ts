import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: { user: { shareLink: 'https://example.com/share?code=abc' } },
    loading: false,
  })),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);

import { useQRCode } from './useQRCode';

describe('useQRCode', () => {
  beforeEach(() => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { user: { shareLink: 'https://example.com/share?code=abc' } },
      loading: false,
    });
  });

  it('returns a qr url with the default parameters', () => {
    const result = useQRCode({} as any);

    expect(result.qrUrl).toBe(
      'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fexample.com%2Fshare%3Fcode%3Dabc&bgcolor=ffffff&color=000000'
    );
  });

  it('returns an empty qr url when there is no share link', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: { user: { shareLink: '' } }, loading: false });

    const result = useQRCode({} as any);

    expect(result.qrUrl).toBe('');
  });

  it('returns the share link from query data', () => {
    const result = useQRCode({} as any);

    expect(result.shareLink).toBe('https://example.com/share?code=abc');
  });

  it('uses props for size and colors', () => {
    const result = useQRCode({
      size: '300',
      backgroundColor: '#112233',
      foregroundColor: '#445566',
    } as any);

    expect(result.qrUrl).toContain('size=300x300');
    expect(result.qrUrl).toContain('bgcolor=112233');
    expect(result.qrUrl).toContain('color=445566');
  });

  it('returns the loading state from the query', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: undefined, loading: true });

    const result = useQRCode({} as any);

    expect(result.loading).toBe(true);
  });
});
