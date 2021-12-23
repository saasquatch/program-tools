import * as React from "react";
import root from "react-shadow/styled-components";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { Icon } from "../Icon";
import type { UseSelectReturnValue } from "downshift";
import { Input } from "../Input";

type SelectProps<ItemType> = OptionProps<ItemType> &
  React.ComponentProps<"input">;

export interface OptionProps<ItemType> {
  functional: UseSelectReturnValue<ItemType>;
  disabled?: boolean;
  errors?: any;
  value?: any;
  items: Array<any>;
  css?: CSSProp;
}

const ShadowDom = styled(root.div)`
  display: contents;
`;

const IconDiv = styled.div<{ position: string }>`
  ${Styles.IconStyle}
  ${(props) => (props.position == "left" ? "left: 13px;" : "left: 277px;")}
`;

const ItemContainer = styled("ul")`
  ${Styles.ItemContainer}
`;

const Item = styled("li")`
  ${Styles.Item}
`;

// Redeclare forwardRef for use with generic prop types.
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const SelectInner = <ItemType,>(
  props: SelectProps<ItemType>,
  ref: React.Ref<HTMLInputElement>
) => {
  const { css = {}, errors: rawErrors, functional, items, ...rest } = props;

  return (
    <ShadowDom>
      <Input {...rest} type={"text"} ref={ref} errors={rawErrors} css={css} />
      {functional.isOpen ? (
        <IconDiv position={"right"}>
          <Icon
            icon={"arrow_up"}
            size={"22px"}
            color="var(--sq-text-subdued)"
          />
        </IconDiv>
      ) : (
        <IconDiv position={"right"}>
          <Icon
            icon={"arrow_down"}
            size={"22px"}
            color="var(--sq-text-subdued)"
          />
        </IconDiv>
      )}
      {functional.isOpen && (
        <ItemContainer {...functional.getMenuProps()}>
          {items.map((item, index) => (
            <Item
              key={`${item}${index}`}
              {...functional.getItemProps({ item, index })}
            >
              {item}
            </Item>
          ))}
        </ItemContainer>
      )}
    </ShadowDom>
  );
};

export const Select = React.forwardRef(SelectInner);