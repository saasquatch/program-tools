import React from "react";
import { CardContainer } from "./Layouts";

export default {
  title: "Misc",
};

export const Link = () => {
  return <a href="https://www.saasquatch.com/">Test link</a>;
};

export const Pre = () => {
  return <pre>Test pre element text</pre>;
};

export const Hr = () => {
  return <hr></hr>;
};

export const ContentCard = () => {
  return <CardContainer>This is some card content</CardContainer>;
};
