import { useSelect } from "downshift";
import React from "react";
import { Select } from ".";

export default {
  title: "Components / Select",
  component: Select,
};

export const Basic = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { items, functional };
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <Select {...props}></Select>
    </div>
  );
};

export const FullWidth = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { limitWidth: false, items, functional };
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <Select {...props}></Select>
    </div>
  );
};

export const CustomWidth = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { limitWidth: "600px", items, functional };
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <Select {...props}></Select>
    </div>
  );
};

export const LimitHeight = () => {
  const items = [
    "Salt Spring",
    "Galiano",
    "Saturna",
    "Sidney",
    "Gabriola",
    "Mayne",
    "Pender",
  ];
  const functional = useSelect({ items });
  const props = { limitHeight: true, items, functional };
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <Select {...props}></Select>
    </div>
  );
};

export const CustomHeight = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { limitHeight: "100px", items, functional };
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <Select {...props}></Select>
    </div>
  );
};

export const LongItemName = () => {
  const items = [
    "Salt Spring",
    "Gabriola",
    "Mayne",
    "Pender",
    "Some really super long name that runs off the input",
  ];
  const functional = useSelect({ items });
  const props = { items, functional };
  return <Select {...props}></Select>;
};

export const WithPlaceholder = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = {
    placeholder: "Enter a value! Long text placeholder with ellipses",
    items,
    functional,
  };
  return <Select {...props}></Select>;
};

export const Loading = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const hooks = useSelect({ items });
  const props = { loading: true, items, functional: hooks };
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <Select {...props}></Select>
    </div>
  );
};

export const Clearable = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { items, functional, clearable: true };
  return <Select {...props}></Select>;
};

export const Detailed = () => {
  interface Islands {
    text: string;
    description: string;
  }
  const items = [
    { text: "Salt Spring", description: "The big one" },
    { text: "Gabriola", description: "Way up north" },
    { text: "Mayne", description: "With a y" },
    { text: "Pender", description: "There's actually two" },
  ];
  const itemToString = (item: Islands) => (item ? item.text : "");
  const functional = useSelect({ items, itemToString });
  const props = { items, functional, itemToString };
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
  const props = {
    items,
    functional,
    errors: { field1: "error" },
  };
  return <Select {...props}></Select>;
};

export const CustomCSS = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { css: "color: blue", items, functional };
  return <Select {...props}></Select>;
};
