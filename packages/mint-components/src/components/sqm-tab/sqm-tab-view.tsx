import { FunctionalComponent, h, Host } from "@stencil/core";

type TabViewProps = {};

export const TabView: FunctionalComponent<TabViewProps> = ({}, children) => {
  return <Host>{children}</Host>;
};
