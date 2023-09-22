import React from "react";
import styled from "styled-components";
import { SelectView } from "./Select2";
import { useSelectDemo } from "./useSelectDemo";
import { useSelect } from "downshift";

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
const StoryContainerDiv = styled.div`
  resize: both;
  height: 400px;
  overflow: visible;
  margin: 100px;
`;
export const Basic = () => {
  const props = useSelectDemo({ items });
  return (
    <StoryContainerDiv>
      <SelectView.ContainerView {...props.functional}>
        <SelectView.HandleView {...props} />
        <SelectView.ListView {...props} />
      </SelectView.ContainerView>
    </StoryContainerDiv>
  );
};

export const Disabled = () => {
  const props = useSelectDemo({ items });
  const disabledProps = { ...props, disabled: true };
  return (
    <StoryContainerDiv>
      <SelectView.ContainerView {...props.functional}>
        <SelectView.HandleView {...disabledProps} />
        <SelectView.ListView {...disabledProps} />
      </SelectView.ContainerView>
    </StoryContainerDiv>
  );
};

export const Placeholder = () => {
  const props = useSelectDemo({
    items,
  });
  return (
    <StoryContainerDiv>
      <SelectView.ContainerView {...props.functional}>
        <SelectView.HandleView {...props} placeholder="Placeholder text..." />
        <SelectView.ListView {...props} />
      </SelectView.ContainerView>
    </StoryContainerDiv>
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
  const props = useSelectDemo({ items, itemToString });
  return (
    <StoryContainerDiv>
      <SelectView.ContainerView {...props.functional}>
        <SelectView.HandleView {...props} />
        <SelectView.FrameView {...props}>
          {items.map((item: any, index: number) => (
            <SelectView.ItemView
              {...{
                functional: props.functional,
                index,
                item,
                itemToString,
                itemToNode: () => (
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
    </StoryContainerDiv>
  );
};

export const FullWidth = () => {
  const props = useSelectDemo({
    items,
  });
  return (
    <StoryContainerDiv>
      <SelectView.ContainerView {...props} limitWidth={false}>
        <SelectView.HandleView {...props} />
        <SelectView.ListView {...props} limitWidth={false} />
      </SelectView.ContainerView>
    </StoryContainerDiv>
  );
};

export const CustomCSS = () => {
  const props = useSelectDemo({
    items,
  });
  return (
    <StoryContainerDiv>
      <SelectView.ContainerView
        customContainerCSS={
          "& ul { border: 2px solid red; border-radius: 4px; }"
        }
      >
        <SelectView.HandleView {...props} />
        <SelectView.ListView {...props} />
      </SelectView.ContainerView>
    </StoryContainerDiv>
  );
};

export const Frame = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const items2 = ["Orca", "San Juan"];
  const props = {
    ...useSelectDemo({ items: [...items, ...items2] }),
    limitWidth: false,
  };
  return (
    <StoryContainerDiv>
      <SelectView.ContainerView {...props}>
        <SelectView.HandleView {...props} />
        <SelectView.FrameView {...props}>
          <div style={{ fontWeight: "bold" }}>Gulf Islands</div>
          {items.map((item, index) => (
            <SelectView.ItemView
              {...{
                functional: props.functional,
                index,
                item,
              }}
            />
          ))}
          <div style={{ fontWeight: "bold" }}>San Juan Islands</div>
          {items2.map((item, index) => {
            const global_index = items.length + index;
            return (
              <SelectView.ItemView
                {...{
                  functional: props.functional,
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

export const FrameWithItemsDisabled = () => {
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
          {items.map((item, index) => {
            const disabled = index === 2 ? true : false;
            return (
              <SelectView.ItemView
                {...{
                  functional,
                  index,
                  item,
                  disabled,
                }}
              />
            );
          })}
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
  const props = useSelectDemo({ items: [...items, ...items2] });
  return (
    <StoryContainerDiv>
      <SelectView.ContainerView {...props}>
        <SelectView.HandleView {...props} />
        <SelectView.FrameView
          limitHeight={true}
          {...{ ...props, customCSS: { background: "red" } }}
        >
          <div style={{ fontWeight: "bold" }}>Gulf Islands</div>
          {items.map((item, index) => (
            <SelectView.ItemView
              {...{
                functional: props.functional,
                index,
                item,
              }}
            />
          ))}
          <div style={{ fontWeight: "bold" }}>San Juan Islands</div>
          {items2.map((item, index) => {
            const global_index = items.length + index;
            return (
              <SelectView.ItemView
                {...{
                  functional: props.functional,
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
