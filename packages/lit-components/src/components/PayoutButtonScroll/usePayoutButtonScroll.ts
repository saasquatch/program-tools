import { PayoutButtonScrollProps } from './PayoutButtonScroll';

export function usePayoutButton(props: PayoutButtonScrollProps) {
  function onClick() {
    if (props.scrollTargetId) {
      const target = document.getElementById(props.scrollTargetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }

    const event = new CustomEvent('sq:payout-click', {
      bubbles: true,
      composed: true,
    });
    document.dispatchEvent(event);
  }

  return { onClick };
}

export function useDemoPayoutButton(_props: PayoutButtonScrollProps): ReturnType<typeof usePayoutButton> {
  return {
    onClick: () => undefined,
  };
}
