import { useSelect } from "downshift";
import React from "react";
import { SelectView } from "@saasquatch/visual-dev";
import styled from "styled-components";

export default {
  title: "Components / Select v2",
  component: SelectView,
};

interface SelectStoryProps {
  width?: string;
  items?: string[];
}

type DescriptionProps = Omit<SelectStoryProps, "items">;

type SelectWithDescriptionProps = DescriptionProps & {
  items?: { title: any; description: any }[];
  TitleWrapper?: React.ComponentType;
  DescriptionWrapper?: React.ComponentType;
};

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

export const SelectStory = ({
  width,
  items = ["Salt Spring", "Gabriola", "Mayne", "Pender"],
}: SelectStoryProps) => {
  const functional = useSelect({ items });
  const props = { items, functional };
  return (
    <SelectView.ContainerView
      {...{ functional }}
      limitWidth={width ? width : "100%"}
    >
      <SelectView.HandleView {...props} />
      <SelectView.ListView {...props} limitWidth={width ? width : "100%"} />
    </SelectView.ContainerView>
  );
};

export const SelectWithDescriptionsStory = ({
  width,
  items = [
    { title: "San José", description: "Costa Rica" },
    { title: "Ottawa", description: "Canada" },
    { title: "Washington D.C.", description: "United States" },
  ],
  TitleWrapper = TitleP,
  DescriptionWrapper = DescriptionP,
}: SelectWithDescriptionProps) => {
  const itemToString = (item: any | null) => {
    return item ? item.title : "";
  };
  const functional = useSelect({ items, itemToString });
  const props = { items, functional, itemToString };

  return (
    <SelectView.ContainerView
      {...{ functional }}
      limitWidth={width ? width : "100%"}
    >
      <SelectView.HandleView {...props} />
      <SelectView.FrameView {...props} limitWidth={width ? width : "100%"}>
        {items.map((item: any, index: number) => (
          <SelectView.ItemView
            {...{
              functional,
              index,
              item,
              itemToString,
              itemToNode: (test: any) => (
                <div>
                  <TitleWrapper>{item.title}</TitleWrapper>
                  <DescriptionWrapper>{item.description}</DescriptionWrapper>
                </div>
              ),
            }}
          />
        ))}
      </SelectView.FrameView>
    </SelectView.ContainerView>
  );
};
