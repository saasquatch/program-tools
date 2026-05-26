import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useRadioCard } from './useRadioCard';

describe('useRadioCard', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should return an empty object', () => {
    const result = useRadioCard({
      fieldName: 'plan',
      fieldValue: 'pro',
      fieldDisabled: false,
      fieldChecked: false,
    });

    expect(result).toEqual({});
  });
});
