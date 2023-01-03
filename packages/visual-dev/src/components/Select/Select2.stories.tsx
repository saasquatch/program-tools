import { useSelect } from "downshift";
import React from "react";
import { SelectView } from "./Select2";

export default {
  title: "Components / Select v2",
  component: SelectView,
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
      <SelectView.ContainerView {...{ functional }}>
        <SelectView.HandleView {...props} />
        <SelectView.ListView {...props} />
      </SelectView.ContainerView>
    </div>
  );
};

export const Placeholder = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { items, functional, placeholder: "Placeholder text..." };
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <SelectView.ContainerView {...{ functional }}>
        <SelectView.HandleView {...props} />
        <SelectView.ListView {...props} />
      </SelectView.ContainerView>
    </div>
  );
};

export const WithItemToString = () => {
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
  const itemToString = (item: Islands | null) => {
    return item ? item.text : "";
  };
  const functional = useSelect({ items, itemToString });
  const props = { items, functional, itemToString };
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
        <SelectView.ListView {...props} />
      </SelectView.ContainerView>
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
      <SelectView.ContainerView {...props}>
        <SelectView.HandleView {...props} />
        <SelectView.ListView {...props} />
      </SelectView.ContainerView>
    </div>
  );
};

export const CustomCSS = () => {
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
      <SelectView.ContainerView
        customContainerCSS={
          "& ul { border: 2px solid red; border-radius: 4px; }"
        }
      >
        <SelectView.HandleView {...props} />
        <SelectView.ListView {...props} />
      </SelectView.ContainerView>
    </div>
  );
};

export const Frame = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const items2 = ["Orca", "San Juan"];
  const functional = useSelect({ items: [...items, ...items2] });
  const props = { limitWidth: false, items, functional, limitHeight: true };
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <SelectView.ContainerView {...props}>
        <SelectView.HandleView {...props} />
        <SelectView.FrameView {...props}>
          <div>Gulf Islands</div>
          {items.map((item, index) => (
            <SelectView.ItemView
              {...{
                functional,
                index,
                item,
              }}
            />
          ))}
          <div>San Juan Islands</div>
          {items2.map((item, index) => {
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
