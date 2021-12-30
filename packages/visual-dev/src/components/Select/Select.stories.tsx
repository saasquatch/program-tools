import { useSelect } from "downshift";
import React from "react";
import { Select } from "./Select";

export default {
  title: "Components / Select",
  component: Select,
};

export const Functional = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { items, functional };
  return <Select {...props}></Select>;
};
