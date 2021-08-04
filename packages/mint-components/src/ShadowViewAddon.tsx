import { AddOn } from "@saasquatch/stencilbook";
import { getElement } from "@stencil/core";
import { h, VNode } from "@stencil/core";

const map = new Map<string, VNode[]>();

export function withShadowView(component: any): void {
  // TODO: Could only do this if rendered in a Stencilbook environment to prevent unintended side-effects

  const element = getElement(component);

  let renderFn = component["render"].bind(component);
  const newRenderFn = () => {
    const key = element.getAttribute("stencilbook-shadow-view");
    if (key) {
      const value = map.get(key);
      if (value) {
        return value;
      }
    }
    return renderFn();
  };
  component["render"] = newRenderFn;
}

/**
 * Any story that defines `parameters.tagname` will be used as a wrapper component around the view
 */
export const ShadowViewAddon: AddOn = ({ story }, children) => {
  let TagName: string = (story.parent.parameters as any)?.tagname;
  if (!TagName) return children;
  const randomInt = Math.round(Math.random() * 100000);
  map.set(randomInt + "", children);
  const RandomTagName = "stencilbook-shawdow-view-" + randomInt;
  // This will only re-render when the tag name changes, so we use a random tag name every time.
  // Altneratively we could try to trick Stencil to call `forceUpdate` every time.
  return (
    <RandomTagName>
      <TagName stencilbook-shadow-view={randomInt} />
    </RandomTagName>
  );
};
