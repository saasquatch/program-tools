import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: { viewer: { taxHandling: { publisher: { docusignUrl: 'https://example.com/sign' } } } },
    loading: false,
  })),
}));

const universalHooksMock = vi.hoisted(() => {
  const setters: Array<ReturnType<typeof vi.fn>> = [];

  return {
    setters,
    useEffect: vi.fn((callback: () => void) => callback()),
    useState: vi.fn((initial: unknown) => {
      const setter = vi.fn();
      setters.push(setter);
      return [initial, setter] as const;
    }),
  };
});

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);
vi.mock('@saasquatch/universal-hooks', () => ({
  useEffect: universalHooksMock.useEffect,
  useState: universalHooksMock.useState,
}));

import { useDocusignForm } from './useDocusignForm';

describe('useDocusignForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    universalHooksMock.setters.length = 0;
    componentBoilerplateMock.useProgramId.mockReturnValue('test-program');
    componentBoilerplateMock.useUserIdentity.mockReturnValue({ jwt: 'test-jwt' });
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { viewer: { taxHandling: { publisher: { docusignUrl: 'https://example.com/sign' } } } },
      loading: false,
    });
    vi.stubGlobal('window', {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  it('should return the initial query state', () => {
    const result = useDocusignForm({ programId: '' } as any);

    expect(result.docusignUrl).toBe('https://example.com/sign');
    expect(result.loading).toBe(false);
    expect(result.signed).toBe(false);
  });

  it('should prefer the iframeUrl prop when provided', () => {
    const result = useDocusignForm({ iframeUrl: 'https://iframe.example.com', programId: '' } as any);

    expect(result.docusignUrl).toBe('https://iframe.example.com');
  });

  it('should mark the form as signed after a docusign message', () => {
    useDocusignForm({ programId: '' } as any);

    const addEventListenerSpy = window.addEventListener as ReturnType<typeof vi.fn>;
    const handler = addEventListenerSpy.mock.calls[0][1] as EventListener;
    handler({ data: { type: 'docusign-complete' } } as MessageEvent);

    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith(true);
  });
});
