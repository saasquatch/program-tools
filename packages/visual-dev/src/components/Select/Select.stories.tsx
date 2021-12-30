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

export const Disabled = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { items, functional, disabled: true };
  return <Select {...props}></Select>;
};

export const Error = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { items, functional, errors: { field1: "error" } };
  return <Select {...props}></Select>;
};
