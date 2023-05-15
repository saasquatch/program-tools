import { useCombobox } from "downshift";
import React, { useState } from "react";
import styled from "styled-components";
import { Select } from "./Select";
import { SelectView } from "./Select2";
import { useComboboxDemo } from "./useComboboxDemo";

export default {
  title: "Components / Combobox",
  component: Select,
};
const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
const StoryContainerDiv = styled.div`
  resize: both;
  height: 400px;
  overflow: auto;
  margin: 100px;
`;

export const Basic = () => {
  const props = useComboboxDemo({
    items,
  });
  return (
    <StoryContainerDiv>
      <Select {...props}></Select>
    </StoryContainerDiv>
  );
};

export const Placeholder = () => {
  const props = useComboboxDemo({
    items,
  });
  return (
    <StoryContainerDiv>
      <Select {...props} placeholder="Placeholder text..."></Select>
    </StoryContainerDiv>
  );
};

export const CustomIcon = () => {
  const props = useComboboxDemo({
    items,
  });
  return (
    <StoryContainerDiv>
      <Select {...props} customIcon="search" placeholder="Search"></Select>
    </StoryContainerDiv>
  );
};

export const Empty = () => {
  const props = useComboboxDemo({
    items,
  });
  return (
    <StoryContainerDiv>
      <Select
        {...props}
        empty={true}
        emptySlot="No list items to display"
      ></Select>
    </StoryContainerDiv>
  );
};

export const FullWidth = () => {
  const props = useComboboxDemo({
    items,
  });
  return (
    <StoryContainerDiv>
      <Select {...props} limitWidth={false}></Select>
    </StoryContainerDiv>
  );
};

export const CustomWidth = () => {
  const props = useComboboxDemo({
    items,
  });
  return (
    <StoryContainerDiv>
      <Select {...props} limitWidth="600px"></Select>
    </StoryContainerDiv>
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
    <StoryContainerDiv>
      <Select {...props} limitHeight={true}></Select>
    </StoryContainerDiv>
  );
};

export const CustomHeight = () => {
  const props = useComboboxDemo({
    items,
  });
  return (
    <StoryContainerDiv>
      <Select {...props} limitHeight="100px"></Select>
    </StoryContainerDiv>
  );
};

export const Loading = () => {
  const props = useComboboxDemo({
    items,
  });
  return (
    <StoryContainerDiv>
      <Select {...props} loading={true}></Select>
    </StoryContainerDiv>
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
  const selectItems: Array<Islands> = [
    { text: "Salt Spring", description: "The big one" },
    { text: "Gabriola", description: "Way up north" },
    { text: "Mayne", description: "With a y" },
    { text: "Pender", description: "There's actually two" },
  ];
  const itemToString = (item: Islands | null) => (item ? item.text : "");
  const props = useComboboxDemo({ items: selectItems, itemToString });
  return (
    <SelectView.ContainerView {...props.functional}>
      <SelectView.HandleView {...props} />
      <SelectView.FrameView {...props}>
        {props.items.map((item: any, index: number) => (
          <SelectView.ItemView
            {...{
              functional: props.functional,
              index,
              item,
              itemToString,
              itemToNode: () => (
                <div>
                  <p>{item.text}</p>
                  <p>{item.description}</p>
                </div>
              ),
            }}
          />
        ))}
      </SelectView.FrameView>
    </SelectView.ContainerView>
  );
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
  return <Select {...props} customCSS="color: blue"></Select>;
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
    <StoryContainerDiv>
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
    </StoryContainerDiv>
  );
};
