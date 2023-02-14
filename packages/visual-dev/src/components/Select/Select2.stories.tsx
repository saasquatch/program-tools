import { useSelect } from "downshift";
import React from "react";
import styled from "styled-components";
import { SelectView } from "./Select2";
import { useDemoSelect } from "./useSelectDemo";

export default {
  title: "Components / Select v2",
  component: SelectView,
};

const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
const TitleP = styled.p`
  margin: 0;
  color: var(--sq-text);
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
`;
const DescriptionP = styled(TitleP)`
  color: var(--sq-text-subdued);
  font-size: var(--sq-font-size-small);
`;
export const Basic = () => {
  const props = useDemoSelect({ items });
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <SelectView.ContainerView {...props.functional}>
        <SelectView.HandleView {...props} />
        <SelectView.ListView {...props} />
      </SelectView.ContainerView>
    </div>
  );
};

export const Placeholder = () => {
  const props = useDemoSelect({
    items,
    placeholder: "Placeholder text...",
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
      <SelectView.ContainerView {...props.functional}>
        <SelectView.HandleView {...props} />
        <SelectView.ListView {...props} />
      </SelectView.ContainerView>
    </div>
  );
};
/********************************************** 
  Stuck here :(
***********************************************/
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
      <SelectView.ContainerView {...{ functional }}>
        <SelectView.HandleView {...props} />
        <SelectView.FrameView {...props}>
          {items.map((item: any, index: number) => (
            <SelectView.ItemView
              {...{
                functional,
                index,
                item,
                itemToString,
                itemToNode: (test: any) => (
                  <div>
                    <TitleP>{item.text}</TitleP>
                    <DescriptionP>{item.description}</DescriptionP>
                  </div>
                ),
              }}
            />
          ))}
        </SelectView.FrameView>
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

export const FrameCustomCSS = () => {
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
        <SelectView.FrameView
          {...{ ...props, customCSS: { background: "red" } }}
        >
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
