import { useHost } from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { VNode } from "@stencil/core";

export function useNavigationSidebar(
  renderNavigationItem: (child: Element) => Promise<VNode[]>
) {
  const host = useHost();

  const [mobileChildren, setMobileChildren] = useState([]);

  const children = host.children;

  const renderChildren = Array.from(children).map(
    async (child) => await renderNavigationItem(child)
  );

  useEffect(() => {
    if (children) setClonedChildren();
  }, [children]);

  async function setClonedChildren() {
    const clonedChildren = await Promise.all(renderChildren);
    setMobileChildren(clonedChildren);
  }

  return { mobileChildren };
}
