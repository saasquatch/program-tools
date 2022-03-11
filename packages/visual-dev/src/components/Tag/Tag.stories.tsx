import React from "react";
import { Tag } from ".";

export default {
  title: "Components / Tag",
  component: Tag,
};

const fake = async () => {
  Promise.resolve(alert("You clicked a tag."));
};

export const shortTag = () => <Tag onClickClose={fake}>New Segment</Tag>;
export const longTag = () => (
  <Tag onClickClose={fake}>A really really long tag with lots of text</Tag>
);
export const customCSS = () => (
  <Tag
    customCSS={{ background: "lightblue", color: "white", borderColor: "blue" }}
    onClickClose={fake}
  >
    A long segment
  </Tag>
);
export const multipleLines = () => (
  <Tag onClickClose={fake}>
    A multi- <br></br> line tag
  </Tag>
);
