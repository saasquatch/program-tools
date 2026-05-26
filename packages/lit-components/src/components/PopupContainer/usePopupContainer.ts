import { useState } from '@saasquatch/universal-hooks';
import { PopupContainerProps } from './PopupContainer';

export function usePopupContainer(_props: PopupContainerProps) {
  const [isOpen, setIsOpen] = useState(true);

  function close() {
    setIsOpen(false);
    const event = new CustomEvent('sq:popup-close', { bubbles: true, composed: true });
    document.dispatchEvent(event);
  }

  return { isOpen, close };
}
