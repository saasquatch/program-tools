import { useCombobox } from "downshift";
import React, { useState } from "react";
import { Select } from "./Select";
import { SelectView } from "./Select2";

export default {
  title: "Components / Combobox",
  component: Select,
};

export const Basic = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = { items: inputItems, functional };
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
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = {
    items: inputItems,
    functional,
    placeholder: "Placeholder text...",
  };
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

export const CustomIcon = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = {
    items: inputItems,
    functional,
    placeholder: "Search",
  };
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <Select {...props} customIcon="search"></Select>
    </div>
  );
};

export const Empty = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = {
    items: inputItems,
    functional,
    emptySlot: "No list items to display",
    empty: true,
  };
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
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
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
      <Select {...props}></Select>
    </div>
  );
};

export const CustomWidth = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = { limitWidth: "600px", items: inputItems, functional };
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
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = { limitHeight: true, items: inputItems, functional };
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
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = { limitHeight: "100px", items: inputItems, functional };
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

export const WithPlaceholder = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = {
    placeholder: "Enter a value!",
    items: inputItems,
    functional,
  };
  return <Select {...props}></Select>;
};

export const Loading = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = { loading: true, items: inputItems, functional };
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
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = { items: inputItems, functional, clearable: true };
  return <Select {...props}></Select>;
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
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = { items: inputItems, functional, disabled: true };
  return <Select {...props}></Select>;
};

export const Error = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = { items: inputItems, functional, errors: { field1: "error" } };
  return <Select {...props}></Select>;
};

export const CustomCSS = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = {
    css: "color: blue",
    items: inputItems,
    functional,
  };
  return <Select {...props}></Select>;
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
