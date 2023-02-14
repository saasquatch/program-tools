import { useCombobox } from "downshift";
import React, { useState } from "react";
import { Select } from "./Select";
import { SelectView } from "./Select2";
import { useComboboxDemo } from "./useComboboxDemo";

export default {
  title: "Components / Combobox",
  component: Select,
};
const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];

export const Basic = () => {
  const props = useComboboxDemo({
    items,
  });
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

export const Placeholder = () => {
  const props = useComboboxDemo({
    items,
  });
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <Select {...props} placeholder="Placeholder text..."></Select>
    </div>
  );
};

export const CustomIcon = () => {
  const props = useComboboxDemo({
    items,
  });
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <Select {...props} customIcon="search" placeholder="Search"></Select>
    </div>
  );
};

export const Empty = () => {
  const props = useComboboxDemo({
    items,
  });
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <Select
        {...props}
        empty={true}
        emptySlot="No list items to display"
      ></Select>
    </div>
  );
};

export const FullWidth = () => {
  const props = useComboboxDemo({
    items,
  });
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <Select {...props} limitWidth={false}></Select>
    </div>
  );
};

export const CustomWidth = () => {
  const props = useComboboxDemo({
    items,
  });
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <Select {...props} limitWidth="600px"></Select>
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
  const props = useComboboxDemo({
    items,
  });
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <Select {...props} limitHeight={true}></Select>
    </div>
  );
};

export const CustomHeight = () => {
  const props = useComboboxDemo({
    items,
  });
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <Select {...props} limitHeight="100px"></Select>
    </div>
  );
};

export const Loading = () => {
  const props = useComboboxDemo({
    items,
  });
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <Select {...props} loading={true}></Select>
    </div>
  );
};

export const Clearable = () => {
  const props = useComboboxDemo({
    items,
  });
  return <Select {...props} clearable={true}></Select>;
};

export const Detailed = () => {
  interface Islands {
    text: string;
    description: string;
  }
  const items: Array<Islands> = [
    { text: "Salt Spring", description: "The big one" },
    { text: "Gabriola", description: "Way up north" },
    { text: "Mayne", description: "With a y" },
    { text: "Pender", description: "There's actually two" },
  ];
  const itemToString = (item: Islands | null) => (item ? item.text : "");
  const functional = useCombobox({ items, itemToString });
  const props = { items, functional, itemToString };
  return <Select {...props}></Select>;
};

export const Disabled = () => {
  const props = useComboboxDemo({
    items,
  });
  return <Select {...props} disabled={true}></Select>;
};

export const Error = () => {
  const props = useComboboxDemo({
    items,
  });
  return <Select {...props} errors={{ field1: "error" }}></Select>;
};

export const CustomCSS = () => {
  const props = useComboboxDemo({
    items,
  });
  return <Select {...props} css="color: blue"></Select>;
};

export const Frame = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const items2 = ["Orca", "San Juan"];
  const combinedItems = [...items, ...items2];
  const [inputItems, setInputItems] = useState(combinedItems);
  const functional = useCombobox({
    items: [...items, ...items2],
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        combinedItems.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = { limitWidth: false, items: inputItems, functional };
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <SelectView.ContainerView>
        <SelectView.HandleView {...props} />
        <SelectView.FrameView {...props}>
          <div>Gulf Islands</div>
          {inputItems
            .filter((x) => items.includes(x))
            .map((item, index) => (
              <SelectView.ItemView
                {...{
                  functional,
                  index,
                  item,
                }}
              />
            ))}
          <div>San Juan Islands</div>
          {inputItems
            .filter((x) => items2.includes(x))
            .map((item, index) => {
              const global_index = items.length + index;
              return (
                <SelectView.ItemView
                  {...{
                    functional,
                    index: global_index,
                    item,
                  }}
                />
              );
            })}
        </SelectView.FrameView>
      </SelectView.ContainerView>
    </div>
  );
};
