import React from "react";
import { TagView } from ".";

export default {
  title: "Components / Tag",
  component: TagView,
};

const fake = async () => {
  Promise.resolve(alert("You clicked a tag."));
};

export const shortTag = () => (
  <TagView onClickClose={fake}>New Segment</TagView>
);
export const longTag = () => (
  <TagView onClickClose={fake}>
    A really really long tag with lots of text
  </TagView>
);
export const customCSS = () => (
  <TagView
    customCSS={{ background: "lightblue", color: "white", borderColor: "blue" }}
    onClickClose={fake}
  >
    A long segment
  </TagView>
);
export const multipleLines = () => (
  <TagView onClickClose={fake}>
    A multi- <br></br> line tag
  </TagView>
);
