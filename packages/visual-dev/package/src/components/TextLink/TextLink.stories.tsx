import React from "react";
import { TextLinkView } from "./TextLink";

export default {
  tags: ["autodocs"],
  title: "Components / Text Link",
  component: TextLinkView,
};

export const Default = () => (
  <TextLinkView href="https://example.com" target="_blank" rel="noopener">
    Test text link
  </TextLinkView>
);

export const Underline = () => (
  <div style={{ display: "grid", gap: "24px" }}>
    <TextLinkView underline="none">underline="none"</TextLinkView>
    <TextLinkView underline="hover">underline="hover"</TextLinkView>
    <TextLinkView underline="always">underline="always"</TextLinkView>
  </div>
);
