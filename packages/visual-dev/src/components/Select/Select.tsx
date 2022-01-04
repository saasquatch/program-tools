import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { Icon } from "../Icon";
import { UseSelectReturnValue } from "downshift";
import { IconButton } from "../Button";
// import root from "react-shadow/styled-components";

type SelectProps<ItemType> = OptionProps<ItemType> &
  React.ComponentProps<"button">;

export interface OptionProps<ItemType> {
  functional: UseSelectReturnValue<ItemType>;
  itemToString?: (item: ItemType) => string;
  itemToNode?: (item: ItemType) => React.ReactNode;
  disabled?: boolean;
  errors?: any;
  items: Array<any>;
  css?: CSSProp;
  clearable?: boolean;
}

type ItemTypeBase = { description?: string } | string | number | boolean;

type ComplexItemType = { description?: string };

function isComplexItem(item: any): item is ComplexItemType {
  return typeof item === "object" && item !== null;
}

const SelectInput = styled.button<{
  disabled: boolean | undefined;
  errors: any;
  isOpen: boolean;
}>`
  ${Styles.SelectInputStyle}
  ${(props) =>
    props.disabled &&
    "background: var(--sq-surface-input-disabled); cursor: default;"}
  ${(props) => props.isOpen && "border-color: var(--sq-focused);"}
  ${(props) =>
    !props.isOpen &&
    !props.disabled &&
    `&:hover{
    border-color: ${
      props.errors
        ? "var(--sq-surface-critical-hovered)"
        : "var(--sq-action-secondary-border)"
    } ;
  }`}

  ${(props) =>
    props.errors &&
    "border-color: var(--sq-border-critical); background: var(--sq-surface-critical-subdued);"}
`;

const SelectedValue = styled.span`
  ${Styles.SelectedValue}
`;

const ButtonDiv = styled.div`
  ${Styles.ButtonDiv}
`;

const ItemContainer = styled.ul<{
  errors: any;
}>`
  ${Styles.ItemContainer}
  ${(props) =>
    props.errors &&
    "border-color: var(--sq-border-critical); background-color: var(--sq-surface-critical-subdued);"}
`;

const Item = styled("li")`
  ${Styles.Item}
`;

const ItemDescription = styled("span")`
  ${Styles.ItemDescription}
`;

// const ShadowDom = styled(root.div)`
//   display: contents;
// `;

// Redeclare forwardRef for use with generic prop types.
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const SelectInner = <ItemType extends ItemTypeBase>(
  props: SelectProps<ItemType>,
  ref: React.Ref<HTMLInputElement>
) => {
  const {
    css = {},
    disabled = false,
    errors = false,
    clearable = false,
    functional,
    items,
    itemToString = (item: ItemType) => {
      return item;
    },
    itemToNode = (item: ItemType) => {
      if (isComplexItem(item)) {
        return (
          <>
            <span>{itemToString(item)}</span>
            {item.description && (
              <>
                <br />
                <ItemDescription>{item.description}</ItemDescription>
              </>
            )}
          </>
        );
      } else {
        return <span>{itemToString(item)}</span>;
      }
    },
    ...rest
  } = props;

  const showClear = clearable ? "visible" : "hidden";

  return (
    <div style={{ position: "relative" }}>
      <SelectInput
        {...rest}
        isOpen={functional.isOpen}
        disabled={disabled}
        ref={ref}
        errors={errors}
        css={css}
        {...functional.getToggleButtonProps()}
      >
        <SelectedValue>
          {functional.selectedItem ? itemToString(functional.selectedItem) : ""}
        </SelectedValue>
        <ButtonDiv>
          <IconButton
            disabled={disabled}
            icon={"close"}
            borderless={true}
            css={{
              visibility: showClear,
              height: "12px",
              width: "12px",
              padding: "0",
            }}
            icon_css={{ height: "12px", width: "12px" }}
            color={
              errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)"
            }
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.stopPropagation();
              functional.selectItem((null as unknown) as ItemType);
            }}
          />
          {functional.isOpen ? (
            <Icon
              icon={"chevron_up"}
              size={"small"}
              color={
                errors
                  ? "var(--sq-border-critical)"
                  : "var(--sq-text-on-secondary)"
              }
            />
          ) : (
            <Icon
              icon={"chevron_down"}
              size={"small"}
              color={
                errors
                  ? "var(--sq-border-critical)"
                  : "var(--sq-text-on-secondary)"
              }
            />
          )}
        </ButtonDiv>
      </SelectInput>
      <ItemContainer errors={errors} {...functional.getMenuProps()}>
        {functional.isOpen &&
          items.map((item: ItemType, index) => (
            <Item
              key={`${itemToString(item)}-${index}`}
              style={
                functional.highlightedIndex === index
                  ? { backgroundColor: "var(--sq-surface-hover)" }
                  : {}
              }
              {...functional.getItemProps({ item, index })}
            >
              {itemToNode(item)}
            </Item>
          ))}
      </ItemContainer>
    </div>
  );
};

export const Select = React.forwardRef(SelectInner);
