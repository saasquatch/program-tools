import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: {
      viewer: {
        taxHandling: {
          status: 'IN_PROGRESS',
          publisher: {
            taxFormStatus: 'COMPLETE',
            bankingInfoStatus: 'PENDING',
            payoutStatus: 'APPROVED',
          },
        },
      },
    },
    loading: false,
  })),
}));

const universalHooksMock = vi.hoisted(() => ({
  useState: vi.fn((initial: unknown) => [initial, vi.fn()] as const),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);
vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { useTaxAndCash } from './useTaxAndCash';

describe('useTaxAndCash', () => {
  beforeEach(() => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: {
        viewer: {
          taxHandling: {
            status: 'IN_PROGRESS',
            publisher: {
              taxFormStatus: 'COMPLETE',
              bankingInfoStatus: 'PENDING',
              payoutStatus: 'APPROVED',
            },
          },
        },
      },
      loading: false,
    });
  });

  it('returns statuses from query data', () => {
    const result = useTaxAndCash({} as any);

    expect(result.status).toBe('IN_PROGRESS');
    expect(result.taxFormStatus).toBe('COMPLETE');
    expect(result.bankingInfoStatus).toBe('PENDING');
    expect(result.payoutStatus).toBe('APPROVED');
  });

  it('returns NOT_STARTED defaults when no data exists', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: { viewer: {} }, loading: false });

    const result = useTaxAndCash({} as any);

    expect(result.status).toBe('NOT_STARTED');
    expect(result.taxFormStatus).toBe('NOT_STARTED');
    expect(result.bankingInfoStatus).toBe('NOT_STARTED');
    expect(result.payoutStatus).toBe('NOT_STARTED');
  });

  it('uses props.step or dashboard as the initial current step', () => {
    const withProp = useTaxAndCash({ step: 'banking-info' } as any);
    const withoutProp = useTaxAndCash({} as any);

    expect(withProp.currentStep).toBe('banking-info');
    expect(withoutProp.currentStep).toBe('dashboard');
  });

  it('returns the loading state from the query', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: undefined, loading: true });

    const result = useTaxAndCash({} as any);

    expect(result.loading).toBe(true);
  });
});
