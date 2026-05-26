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

import { useLeadForm } from './useLeadForm';

describe('useLeadForm', () => {
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
    const result = useLeadForm({ programId: '' } as any);

    expect(result.formData).toEqual({});
    expect(result.error).toBe('');
    expect(result.loading).toBe(false);
    expect(result.success).toBe(false);
  });

  it('should update a form field', () => {
    const result = useLeadForm({ programId: '' } as any);

    result.updateField('firstName', 'Ada');

    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith({ firstName: 'Ada' });
  });

  it('should submit the form data', async () => {
    universalHooksMock.values.push({ firstName: 'Ada', company: 'Example Co' });
    const submitForm = vi.fn().mockResolvedValue({ success: true });
    componentBoilerplateMock.useMutation.mockReturnValue([submitForm]);
    const result = useLeadForm({ programId: 'fallback-program' } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[2]).toHaveBeenNthCalledWith(1, true);
    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith('');
    expect(submitForm).toHaveBeenCalledWith({
      formData: { firstName: 'Ada', company: 'Example Co' },
      programId: 'test-program',
    });
    expect(universalHooksMock.setters[3]).toHaveBeenCalledWith(true);
    expect(universalHooksMock.setters[2]).toHaveBeenNthCalledWith(2, false);
  });

  it('should surface a submission error', async () => {
    const submitForm = vi.fn().mockRejectedValue(new Error('boom'));
    componentBoilerplateMock.useMutation.mockReturnValue([submitForm]);
    const result = useLeadForm({ programId: '' } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith('An error occurred. Please try again.');
  });
});
