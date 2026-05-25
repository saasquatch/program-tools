import { useState } from '@saasquatch/universal-hooks';
import type { NavigationMenuProps } from './NavigationMenu';

export function useNavigationMenu(_props: NavigationMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  function onSelect(index: number) {
    setSelectedIndex(index);
    setIsOpen(false);
  }

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return { selectedIndex, isOpen, onSelect, toggleMenu };
}
