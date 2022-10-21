import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { UseComboboxReturnValue, UseSelectReturnValue } from "downshift";
import { InputView } from "../Input";
import { IconButton } from "../Button";
import React from "react";
import { IconKey, IconView } from "../Icon";
import { DataTableView } from "../DataTable";

export type SelectHandleViewProps<ItemType> = HandleOptionProps<ItemType> &
  Partial<React.ComponentProps<"input">>;

export interface SelectContainerViewProps {
  /**
   * Limit the width of the select with a valid CSS size (px, %) [default 300px]
   */
  limitWidth?: SizeType;
  /**
   * Custom CSS for the select handle container
   */
  customContainerCSS?: CSSProp;
  /**
   * Children of the container, generally SelectHandleView and SelectListView
   */
  children: React.ReactNode;
  /**
   * Disable the select
   */
  disabled?: boolean;
}
export interface HandleOptionProps<ItemType> {
  /**
   * Downshift hook for component functionality (useSelect or useCombobox or useMultipleSelection)
   */
  functional: UseSelectReturnValue<ItemType> | UseComboboxReturnValue<ItemType>;
  /**
   * Function to transform item objects to strings for display
   */
  itemToString?: (item: ItemType | null) => string;
  /**
   * Function to transform item objects into template code for dropdown items
   */
  itemToNode?: (item: ItemType) => React.ReactNode;
  /**
   * Disable the select
   */
  disabled?: boolean;
  /**
   * Render the select with red border and background to indicate an error
   */
  errors?: any;
  /**
   * Custom CSS for the select handle
   */
  customCSS?: CSSProp;
  /**
   * Allow the select value to be cleared
   */
  clearable?: boolean;
  /**
   * Placeholder displayed in the handle before a selection is made
   */
  placeholer?: string;
  /**
   * Limit the height of the input in its expanded state with a valid CSS size (px, %) [default 200px]
   */
  limitHeight?: SizeType;
  /**
   * Limit the width of the select with a valid CSS size (px, %) [default 300px]
   */
  limitWidth?: SizeType;
  /**
   * Use a custom icon instead of a chevron
   */
  customIcon?: IconKey;
  /**
   * Slot used to pass tag content to select when using a multi select
   */
  tagsSlot?: React.ReactNode;
}
export interface SelectListViewProps<ItemType> {
  /**
   * Render the select with red border and background to indicate an error
   */
  errors?: any;
  /**
   * Limit the height of the input in its expanded state with a valid CSS size (px, %) [default 200px]
   */
  limitHeight?: SizeType;
  /**
   * Limit the width of the select with a valid CSS size (px, %) [default 300px]
   */
  limitWidth?: SizeType;
  /**
   * Render the handle in the loading state
   */
  loading?: boolean;
  /**
   * Downshift hook for component functionality (useSelect or useCombobox or useMultipleSelection)
   */
  functional: UseSelectReturnValue<ItemType> | UseComboboxReturnValue<ItemType>;
  /**
   * Function to transform item objects to strings for display
   */
  itemToString?: (item: ItemType | null) => string;
  /**
   * Function to transform item objects into template code for dropdown items
   */
  itemToNode?: (item: ItemType) => React.ReactNode;
  /**
   * Disable the select
   */
  disabled?: boolean;
  /**
   * Items to include in the select list
   */
  items: Array<any>;
  /**
   * Render in empty state
   */
  empty: boolean;
  /**
   * Content to display when in the empty state
   */
  emptySlot?: string | React.ReactNode;
  /**
   * Content to display when in the loading state
   */
  loadingSlot?: string | React.ReactNode;
}

type SizeType = boolean | string;

type ItemTypeBase = { description?: string } | string | number | boolean;

type ComplexItemType = { description?: string };

function isComplexItem(item: any): item is ComplexItemType {
  return typeof item === "object" && item !== null;
}

const ItemContainerList = styled.ul<{
  errors: any;
  limitWidth: SizeType;
  limitHeight: SizeType;
  empty: boolean;
}>`
  ${Styles.ItemContainer}
  ${(props) =>
    props.errors &&
    "border-color: var(--sq-border-critical); background-color: var(--sq-surface-critical-subdued);"}
  ${(props) =>
    props.limitWidth
      ? typeof props.limitWidth === "string"
        ? `max-width: ${props.limitWidth};`
        : "max-width: 300px;"
      : "max-width: 100%;"}
  ${(props) =>
    props.limitHeight
      ? typeof props.limitHeight === "string"
        ? `max-height: ${props.limitHeight};`
        : "max-height: 200px;"
      : "max-height: auto;"}
      ${(props) =>
    props.empty && "& li:hover {background: white; cursor: default;}"}
`;

const ListItem = styled("li")`
  ${Styles.Item}
`;

const ButtonContainerDiv = styled.div`
  ${Styles.ButtonContainer}
`;

const ItemDescriptionSpan = styled("span")`
  ${Styles.ItemDescription}
`;

const ContainerDiv = styled("div")<{
  customContainerCSS: CSSProp;
  limitWidth: SizeType;
}>`
  ${Styles.Container}
  ${(props) =>
    props.limitWidth
      ? typeof props.limitWidth === "string"
        ? `max-width: ${props.limitWidth};`
        : "max-width: 300px;"
      : "max-width: 100%;"}
  ${(props) => props.customContainerCSS}
`;

const TagsSlotWrapperDiv = styled.div`
  ${Styles.TagsSlotWrapper}
`;

const SelectInputButton = styled.button<{
  disabled: boolean | undefined;
  errors: any;
  isOpen: boolean;
  customCSS: CSSProp;
}>`
  ${Styles.SelectInputStyle}
  ${(props) =>
    props.disabled &&
    "background: var(--sq-surface-input-disabled); cursor: default;"}
  ${(props) =>
    props.isOpen &&
    !props.disabled &&
    "border-color: var(--sq-focused); border-bottom: none;"}
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
    !props.disabled &&
    `&:focus {
    border-color: var(--sq-focused);
  }`}

  ${(props) =>
    props.errors &&
    "border-color: var(--sq-border-critical); background: var(--sq-surface-critical-subdued);"}

  ${(props) => props.customCSS}
`;

const SelectedValueSpan = styled.span<{
  subdued: boolean;
}>`
  ${Styles.SelectedValue}
  ${(props) => props.subdued && "color: var(--sq-text-subdued)"}
`;

const ButtonDiv = styled.div`
  ${Styles.ButtonDiv}
`;

const EmptyContainerDiv = styled.div`
  ${Styles.EmptyContainerDiv}
`;

const LabelSpan = styled.span`
  ${Styles.LabelSpan}
`;

// Redeclare forwardRef for use with generic prop types.
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const SelectContainerView = (props: SelectContainerViewProps) => {
  const { limitWidth = true, customContainerCSS = ``, children } = props;

  return (
    <ContainerDiv
      customContainerCSS={customContainerCSS}
      limitWidth={limitWidth}
    >
      {children}
    </ContainerDiv>
  );
};

const SelectHandleInnerView = <ItemType extends ItemTypeBase>(
  props: SelectHandleViewProps<ItemType>,
  ref: React.Ref<HTMLInputElement>
) => {
  const {
    customCSS = ``,
    disabled = false,
    errors = false,
    clearable = false,
    placeholder = "",
    limitWidth = true,
    limitHeight = false,
    customIcon,
    functional,
    tagsSlot,
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
                <ItemDescriptionSpan>{item.description}</ItemDescriptionSpan>
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

  const showClear = clearable ? "inline-flex" : "none";

  function isCombobox(
    hook: UseSelectReturnValue<ItemType> | UseComboboxReturnValue<ItemType>
  ): hook is UseComboboxReturnValue<ItemType> {
    return (
      (hook as UseComboboxReturnValue<ItemType>).getComboboxProps !== undefined
    );
  }

  const isOpen = disabled ? false : functional.isOpen;

  return !isCombobox(functional) ? (
    <SelectInputButton
      {...rest}
      type={"button"}
      role={"button"}
      isOpen={functional.isOpen}
      disabled={disabled}
      ref={ref}
      errors={errors}
      customCSS={customCSS}
      {...functional.getToggleButtonProps()}
    >
      {tagsSlot && <TagsSlotWrapperDiv>{tagsSlot}</TagsSlotWrapperDiv>}
      <SelectedValueSpan subdued={functional.selectedItem ? false : true}>
        {functional.selectedItem
          ? itemToString(functional.selectedItem)
          : placeholder}
      </SelectedValueSpan>
      <ButtonDiv>
        <IconButton
          disabled={disabled}
          icon={"close"}
          borderless={true}
          size="mini"
          customCSS={{
            display: showClear,
            color: "var(--sq-text-subdued)",
          }}
          icon_css={{
            margin: "auto",
            height: "16px",
            width: "16px",
          }}
          color={"var(--sq-text-subdued)"}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            functional.selectItem((null as unknown) as ItemType);
          }}
        />
        {customIcon ? (
          <IconView
            icon={customIcon}
            size={"small"}
            customCSS={
              "padding: var(--sq-spacing-x-small) var(--sq-spacing-small) var(--sq-spacing-x-small) var(--sq-spacing-x-small); box-sizing: content-box;"
            }
            color={"var(--sq-text-subdued)"}
          />
        ) : (
          <IconView
            icon={isOpen ? "chevron_up" : "chevron_down"}
            size={"small"}
            customCSS={
              "padding: var(--sq-spacing-x-small) var(--sq-spacing-small) var(--sq-spacing-x-small) var(--sq-spacing-x-small); box-sizing: content-box;"
            }
            color={"var(--sq-text-subdued)"}
          />
        )}
      </ButtonDiv>
    </SelectInputButton>
  ) : (
    <div {...functional.getComboboxProps()}>
      <InputView
        {...rest}
        placeholder={placeholder}
        type={"text"}
        ref={ref}
        errors={errors}
        limitWidth={limitWidth}
        customCSS={`
              ${customCSS};
              ${isOpen && "border: 2px solid var(--sq-focused)"};
              ${
                clearable
                  ? "padding-right: var(--sq-spacing-xxxx-large)"
                  : "padding-right: var(--sq-spacing-xxx-large)"
              };
            `}
        disabled={disabled}
        {...functional.getInputProps()}
      />
      <ButtonContainerDiv>
        <IconButton
          disabled={disabled}
          icon={"close"}
          borderless={true}
          size="mini"
          customCSS={{
            color: "var(--sq-text-subdued)",
            display: showClear,
          }}
          icon_css={{ marginTop: "var(--sq-spacing-xxx-small)" }}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            functional.selectItem((null as unknown) as ItemType);
          }}
        />
        {customIcon ? (
          <IconButton
            disabled={disabled}
            icon={customIcon}
            borderless={true}
            size="small"
            customCSS={{
              padding:
                "10px var(--sq-spacing-x-small) var(--sq-spacing-x-small)",
            }}
            icon_css={{
              color: "var(--sq-text-subdued)",
            }}
            {...functional.getToggleButtonProps()}
          />
        ) : (
          <IconButton
            disabled={disabled}
            icon={isOpen ? "chevron_up" : "chevron_down"}
            borderless={true}
            size="small"
            customCSS={{ padding: "var(--sq-spacing-x-small)" }}
            icon_css={{
              color: "var(--sq-text-subdued)",
            }}
            {...functional.getToggleButtonProps()}
          />
        )}
      </ButtonContainerDiv>
    </div>
  );
};

const SelectInnerListView = <ItemType extends ItemTypeBase>(
  props: SelectListViewProps<ItemType>,
  ref: React.Ref<HTMLInputElement>
) => {
  const {
    errors = false,
    limitWidth = true,
    limitHeight = false,
    disabled = false,
    loading = false,
    functional,
    items,
    loadingSlot = (
      <>
        <ListItem style={{ height: "32px" }} key={`1`}>
          <DataTableView.SkeletonView size="120px" />
        </ListItem>
        <ListItem style={{ height: "32px" }} key={`2`}>
          <DataTableView.SkeletonView size="120px" />
        </ListItem>
        <ListItem style={{ height: "32px" }} key={`3`}>
          <DataTableView.SkeletonView size="120px" />
        </ListItem>
      </>
    ),
    empty = false,
    emptySlot = (
      <EmptyContainerDiv>
        <LabelSpan>No results found</LabelSpan>
      </EmptyContainerDiv>
    ),
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
                <ItemDescriptionSpan>{item.description}</ItemDescriptionSpan>
              </>
            )}
          </>
        );
      } else {
        return <span>{itemToString(item)}</span>;
      }
    },
  } = props;

  const isOpen = disabled || loading ? false : functional.isOpen;

  console.log("isOpen", isOpen);
  console.log("items", items);

  return (
    <ItemContainerList
      limitWidth={limitWidth}
      limitHeight={limitHeight}
      errors={errors}
      empty={empty}
      ref={ref}
      {...functional.getMenuProps()}
    >
      {/* Place the conditional render inside getMenuProps call to avoid downshift errors */}
      {isOpen ? (
        loading ? (
          loadingSlot
        ) : empty ? (
          <ListItem key={`3`}>{emptySlot}</ListItem>
        ) : (
          items.map((item, index) => (
            <ListItem
              style={
                functional.highlightedIndex === index
                  ? { backgroundColor: "var(--sq-surface-hover)" }
                  : {}
              }
              key={`${itemToString(item)}-${index}`}
              {...functional.getItemProps({ item, index })}
            >
              {itemToNode(item)}
            </ListItem>
          ))
        )
      ) : (
        <></>
      )}
    </ItemContainerList>
  );
};

export const SelectView = {
  HandleView: React.forwardRef(SelectHandleInnerView),
  ListView: React.forwardRef(SelectInnerListView),
  ContainerView: SelectContainerView,
};
