import { useState } from '@saasquatch/universal-hooks';
import { ScrollProps } from './Scroll';

export function useScroll(_props: ScrollProps) {
  const [scrollTop, setScrollTop] = useState(0);

  function onScroll(e: Event) {
    const target = e.target as HTMLElement;
    setScrollTop(target.scrollTop);
  }

  return { scrollTop, onScroll, isScrolled: scrollTop > 0 };
}
