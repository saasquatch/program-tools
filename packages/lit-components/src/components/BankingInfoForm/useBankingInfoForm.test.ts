import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useMutation: vi.fn(() => [vi.fn().mockResolvedValue({ success: true })]),
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

import { useBankingInfoForm } from './useBankingInfoForm';

describe('useBankingInfoForm', () => {
  const createEvent = () => ({ preventDefault: vi.fn() }) as unknown as Event;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    universalHooksMock.setters.length = 0;
    universalHooksMock.values.length = 0;
    componentBoilerplateMock.useProgramId.mockReturnValue('test-program');
    componentBoilerplateMock.useMutation.mockReturnValue([vi.fn().mockResolvedValue({ success: true })]);
  });

  it('should return initial state', () => {
    const result = useBankingInfoForm({ programId: '' } as any);

    expect(result.accountName).toBe('');
    expect(result.bankName).toBe('');
    expect(result.accountNumber).toBe('');
    expect(result.routingNumber).toBe('');
    expect(result.error).toBe('');
    expect(result.loading).toBe(false);
    expect(result.success).toBe(false);
  });

  it('should validate empty fields', async () => {
    const submitBanking = vi.fn();
    componentBoilerplateMock.useMutation.mockReturnValue([submitBanking]);
    const result = useBankingInfoForm({ programId: '' } as any);
    const event = createEvent();

    await result.onSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(universalHooksMock.setters[4]).toHaveBeenCalledWith('All fields are required');
    expect(submitBanking).not.toHaveBeenCalled();
  });

  it('should submit banking info with the resolved program id', async () => {
    universalHooksMock.values.push('Ada Lovelace', 'Bank of Tests', '123456789', '987654321');
    const submitBanking = vi.fn().mockResolvedValue({ success: true });
    componentBoilerplateMock.useMutation.mockReturnValue([submitBanking]);
    const result = useBankingInfoForm({ programId: 'fallback-program' } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[5]).toHaveBeenNthCalledWith(1, true);
    expect(universalHooksMock.setters[4]).toHaveBeenCalledWith('');
    expect(universalHooksMock.setters[6]).toHaveBeenNthCalledWith(1, false);
    expect(submitBanking).toHaveBeenCalledWith({
      bankingInfo: {
        accountName: 'Ada Lovelace',
        bankName: 'Bank of Tests',
        accountNumber: '123456789',
        routingNumber: '987654321',
      },
      programId: 'test-program',
    });
    expect(universalHooksMock.setters[6]).toHaveBeenNthCalledWith(2, true);
    expect(universalHooksMock.setters[5]).toHaveBeenNthCalledWith(2, false);
  });
});
