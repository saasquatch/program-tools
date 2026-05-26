import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useEngagementMedium: vi.fn(() => 'EMBED'),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);

import { useContextRouter } from './useContextRouter';

describe('useContextRouter', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    componentBoilerplateMock.useEngagementMedium.mockReturnValue('POPUP');
  });

  it('should return the current engagement medium', () => {
    const result = useContextRouter();

    expect(result.engagementMedium).toBe('POPUP');
  });

  it('should default to EMBED when no engagement medium is available', () => {
    componentBoilerplateMock.useEngagementMedium.mockReturnValue(undefined);

    const result = useContextRouter();

    expect(result.engagementMedium).toBe('EMBED');
  });
});
