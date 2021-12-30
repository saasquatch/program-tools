import { useCombobox } from "downshift";
import React from "react";
import { Combobox } from "./Combobox";

export default {
  title: "Components / Combobox",
  component: Combobox,
};

export const Functional = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useCombobox({ items });
  const props = { items, functional };
  return <Combobox {...props}></Combobox>;
};
