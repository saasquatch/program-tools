import * as React from "react";
import root from "react-shadow/styled-components";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { Icon } from "../Icon";
import type { UseSelectReturnValue } from "downshift";

type SelectProps<ItemType> = OptionProps<ItemType> &
  React.ComponentProps<"button">;

export interface OptionProps<ItemType> {
  functional: UseSelectReturnValue<ItemType>;
  disabled?: boolean;
  errors?: any;
  items: Array<any>;
  css?: CSSProp;
}

const ShadowDom = styled(root.div)`
  display: contents;
`;

const SelectInput = styled.button<{ disabled: boolean | undefined; errors: any }>`
  ${Styles.SelectInputStyle}
  ${(props) => props.disabled && "background: var(--sq-surface-input-disabled)"}
  ${(props) =>
    props.errors &&
    "border-color: var(--sq-border-critical); background: var(--sq-surface-critical-subdued)"}
`;

const SelectValue = styled.span``

const IconDiv = styled.div`
  ${Styles.IconStyle}
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
  const {
    css = {},
    disabled = false,
    errors: rawErrors,
    functional,
    items,
    ...rest
  } = props;

  return (
    <ShadowDom>
      <SelectInput
        {...rest}
        disabled={disabled}
        ref={ref}
        errors={rawErrors}
        css={css}
        {...functional.getToggleButtonProps()}
      >
        <SelectValue>{"" || functional.selectedItem}</SelectValue>
        {functional.isOpen ? (
          <IconDiv>
            <Icon
              icon={"chevron_up"}
              size={"small"}
              color="var(--sq-text-subdued)"
            />
          </IconDiv>
        ) : (
          <IconDiv>
            <Icon
              icon={"chevron_down"}
              size={"small"}
              color="var(--sq-text-subdued)"
            />
          </IconDiv>
        )}
      </SelectInput>

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
