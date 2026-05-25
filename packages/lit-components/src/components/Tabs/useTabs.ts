import { useState } from '@saasquatch/universal-hooks';

export function useTabs() {
  const [activeTab, setActiveTab] = useState(0);

  function onTabClick(index: number) {
    setActiveTab(index);
  }

  return { activeTab, onTabClick };
}
