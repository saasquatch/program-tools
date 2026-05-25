import { beforeEach, describe, expect, it, vi } from 'vitest';

import { usePayoutButton } from './usePayoutButtonScroll';

describe('usePayoutButton', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal('document', {
      dispatchEvent: vi.fn(),
      getElementById: vi.fn(() => null),
    });
  });

  it('should return an onClick handler', () => {
    const result = usePayoutButton({ buttonText: 'Cash Out', disabled: false });

    expect(typeof result.onClick).toBe('function');
  });

  it('should dispatch a payout click event on click', () => {
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = usePayoutButton({ buttonText: 'Cash Out', disabled: false });

    result.onClick();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:payout-click');
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
  });

  it('should scroll to the target when scrollTargetId is provided', () => {
    const target = { scrollIntoView: vi.fn() };
    vi.mocked(document.getElementById).mockReturnValue(target as never);

    const result = usePayoutButton({
      buttonText: 'Cash Out',
      disabled: false,
      scrollTargetId: 'payout-target',
    });

    result.onClick();

    expect(document.getElementById).toHaveBeenCalledWith('payout-target');
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
