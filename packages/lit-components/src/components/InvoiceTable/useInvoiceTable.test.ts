import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: { user: { payoutInvoices: { data: [{ id: 'inv-1' }], totalCount: 9 } } },
    loading: false,
  })),
}));

const universalHooksMock = vi.hoisted(() => {
  const setters: Array<ReturnType<typeof vi.fn>> = [];
  const values: unknown[] = [];

  return {
    setters,
    values,
    useState: vi.fn((initial: unknown) => {
      const index = setters.length;
      const setter = vi.fn();
      setters.push(setter);
      return [index < values.length ? values[index] : initial, setter] as const;
    }),
  };
});

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);
vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { useInvoiceTable } from './useInvoiceTable';

describe('useInvoiceTable', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    universalHooksMock.setters.length = 0;
    universalHooksMock.values.length = 0;
    componentBoilerplateMock.useProgramId.mockReturnValue('test-program');
    componentBoilerplateMock.useUserIdentity.mockReturnValue({ jwt: 'test-jwt' });
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { user: { payoutInvoices: { data: [{ id: 'inv-1' }, { id: 'inv-2' }], totalCount: 9 } } },
      loading: false,
    });
  });

  it('should return invoices from the query and calculate pagination', () => {
    const result = useInvoiceTable({ programId: 'fallback-program' } as any);

    expect(componentBoilerplateMock.useQuery).toHaveBeenCalledWith(
      expect.anything(),
      { programId: 'test-program', offset: 0, limit: 4 },
      false
    );
    expect(result.invoices).toEqual([{ id: 'inv-1' }, { id: 'inv-2' }]);
    expect(result.totalCount).toBe(9);
    expect(result.totalPages).toBe(3);
    expect(result.currentPage).toBe(0);
    expect(result.empty).toBe(false);
  });

  it('should expose empty when there are no invoices', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { user: { payoutInvoices: { data: [], totalCount: 0 } } },
      loading: false,
    });

    const result = useInvoiceTable({ programId: '' } as any);

    expect(result.invoices).toEqual([]);
    expect(result.empty).toBe(true);
  });

  it('should advance and go back between pages', () => {
    let result = useInvoiceTable({ programId: '' } as any);
    result.nextPage();
    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith(1);

    universalHooksMock.setters.length = 0;
    universalHooksMock.values.length = 0;
    universalHooksMock.values.push(1);
    result = useInvoiceTable({ programId: '' } as any);
    result.prevPage();
    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith(0);
  });
});
