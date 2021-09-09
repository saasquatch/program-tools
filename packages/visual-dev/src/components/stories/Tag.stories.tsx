import React from "react";
import { Tag } from "../Tag";

export default {
  title: "Examples / Tag",
  component: Tag,
};

const fake = async () => {
  Promise.resolve(alert("You clicked a tag."));
};

export const shortTag = () => <Tag onClick={fake}>newSegment</Tag>;
export const longTag = () => (
  <Tag onClick={fake}>A really really long segment</Tag>
);
