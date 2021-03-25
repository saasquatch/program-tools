import { AddOn } from "@saasquatch/stencilbook";
import { forceUpdate, h, VNode } from "@stencil/core";

/**
 * Override's a stencil components `render` method with a hard-coded return value;
 *
 * @param children
 */
function overrideRender(children: VNode[]) {
  return (ref: HTMLElement) => {
    // Ref goes to null when unmounted
    if (!ref) return;
    // @ts-ignore
    ref.render = () => children;
    forceUpdate(ref);
  };
}

/**
 * Any story that defines `parameters.tagname` will be used as a wrapper component around the view
 */
export const ShadowViewAddon: AddOn = ({ story }, children) => {
  let TagName: string = (story.parent.parameters as any)?.tagname;

  if (!TagName) return children;
  return (
    <TagName
      ref={overrideRender(children)}
      key={Math.random()}
      for={story.key}
    />
  );
};
