import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { UseComboboxReturnValue, UseSelectReturnValue } from "downshift";
import { InputView } from "../Input";
import { IconButtonView } from "../Button";
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
  empty?: boolean;
  /**
   * Content to display when in the empty state
   */
  emptySlot?: string | React.ReactNode;
  /**
   * Content to display when in the loading state
   */
  loadingSlot?: string | React.ReactNode;
  /**
   * Custom CSS applied to the list container
   */
  customCSS?: CSSProp;
}

export interface ListItemViewProps<ItemType> {
  /**
   * Index of the current list item in the full list (including subgroups)
   */
  index: number;
  /**
   * Set item to disabled
   */
  disabled?: boolean;
  /**
   * Current list item to render
   */
  item: ItemType;
  /**
   * Function to transform item objects to strings for display
   */
  itemToString?: (item: ItemType | null) => string;
  /**
   * Function to transform item objects into template code for dropdown items
   */
  itemToNode?: (item: ItemType) => React.ReactNode;
  /**
   * Downshift hook for component functionality (useSelect or useCombobox or useMultipleSelection)
   */
  functional: UseSelectReturnValue<ItemType> | UseComboboxReturnValue<ItemType>;
  /**
   * Custom CSS applied to the item's container
   */
  customCSS?: CSSProp;
}

export type SelectFrameViewProps<ItemType> = Omit<
  SelectListViewProps<ItemType>,
  "itemToNode" | "itemToString"
> & { children: React.ReactNode | React.ReactNode[] };

type SizeType = boolean | string;

type ItemTypeBase =
  | { description?: string }
  | string
  | number
  | boolean
  | object;

const ItemContainerList = styled.ul<{
  errors: any;
  limitWidth: SizeType;
  limitHeight: SizeType;
  empty: boolean;
  customCSS: CSSProp;
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
    ${(props) => props.customCSS}
`;

const ListItem = styled.li<{ isHighlighted?: boolean; customCSS?: CSSProp }>`
  ${Styles.Item}
  ${(props) =>
    props.isHighlighted ? "background-color: var(--sq-surface-hover);" : ""}
    ${(props) => props.customCSS}
`;

const ListItemDisabled = styled.li<{ customCSS?: CSSProp }>`
  ${Styles.ItemDisabled}

  ${(props) => props.customCSS}
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
    `border-radius: ${
      props.isOpen
        ? "var(--sq-border-radius-normal) var(--sq-border-radius-normal) 0 0"
        : "var(--sq-border-radius-normal)"
    };`}
  ${(props) =>
    props.isOpen &&
    !props.disabled &&
    "border-color: var(--sq-focused); border-bottom: none; padding-bottom: var(--sq-spacing-xxx-small);"}
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

const InputWrapperDiv = styled.div`
  ${Styles.InputWrapperDiv}
`;

const ComboboxContainerDiv = styled.div<{
  isOpen: boolean;
  errors: boolean;
  disabled: boolean;
}>`
  ${Styles.ComboboxContainerDiv}
  ${(props) =>
    props.isOpen
      ? "border: 2px solid var(--sq-focused); border-bottom: none; border-radius: var(--sq-border-radius-normal) var(--sq-border-radius-normal) 0 0; padding-bottom: var(--sq-spacing-xxx-small)"
      : ""};
  ${(props) =>
    props.errors
      ? "border-color: var(--sq-border-critical); background-color: var(--sq-surface-critical-subdued);"
      : ""}
  ${(props) =>
    props.disabled ? "background: var(--sq-surface-input-disabled);" : ""}
`;

// Redeclare forwardRef for use with generic prop types.
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const ItemView = <ItemType extends ItemTypeBase>(
  props: ListItemViewProps<ItemType> & Partial<React.ComponentProps<"input">>
) => {
  const {
    item,
    index,
    disabled = false,
    itemToString = itemToStringDefault,
    itemToNode = itemToNodeDefault,
    functional,
    customCSS = {},
    ...rest
  } = props;

  if (disabled) {
    return (
      //@ts-ignore
      <ListItemDisabled
        customCSS={customCSS}
        key={`${itemToString(item)}-${index}`}
        {...functional.getItemProps({ item, index, disabled: true })}
        {...rest}
      >
        {itemToNode(item)}
      </ListItemDisabled>
    );
  }

  return (
    <ListItem
      customCSS={customCSS}
      isHighlighted={functional.highlightedIndex === index}
      key={`${itemToString(item)}-${index}`}
      {...functional.getItemProps({ item, index })}
      {...rest}
    >
      {itemToNode(item)}
    </ListItem>
  );
};

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

const StyledIconButtonView = styled(IconButtonView)`
  &:hover {
    background: transparent;
  }
`;

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
    itemToString = itemToStringDefault,
    itemToNode = itemToNodeDefault,
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
        <IconButtonView
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
    <ComboboxContainerDiv
      {...functional.getComboboxProps()}
      isOpen={isOpen}
      errors={errors}
      disabled={disabled}
      style={{
        paddingRight: `${
          clearable
            ? " var(--sq-spacing-xxxx-large)"
            : "var(--sq-spacing-xxx-large)"
        }`,
      }}
    >
      {tagsSlot && (
        <TagsSlotWrapperDiv
          style={{ padding: "1px var(--sq-spacing-x-small)" }}
        >
          {tagsSlot}
        </TagsSlotWrapperDiv>
      )}
      <InputWrapperDiv>
        <InputView
          {...rest}
          placeholder={placeholder}
          type={"text"}
          ref={ref}
          errors={errors}
          limitWidth={limitWidth}
          customCSS={`
              background-color: transparent;
              ${customCSS};
              border: none !important;
              height: 32px;
            `}
          disabled={disabled}
          {...functional.getInputProps()}
        />
      </InputWrapperDiv>
      <ButtonContainerDiv>
        <StyledIconButtonView
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
          <StyledIconButtonView
            disabled={disabled}
            icon={customIcon}
            borderless={true}
            size="small"
            customCSS={{
              padding: "var(--sq-spacing-x-small)",
            }}
            icon_css={{
              color: "var(--sq-text-subdued)",
            }}
            {...functional.getToggleButtonProps()}
          />
        ) : (
          <StyledIconButtonView
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
    </ComboboxContainerDiv>
  );
};

interface itemsToNodeProps<ItemType> {
  items: Array<ItemType>;
  functional: UseSelectReturnValue<ItemType> | UseComboboxReturnValue<ItemType>;
  itemToString: (item: ItemType | null) => string;
  itemToNode: (item: ItemType) => React.ReactNode;
}

const itemsToNode = <ItemType extends ItemTypeBase>(
  props: itemsToNodeProps<ItemType>
): React.ReactNode | React.ReactNode[] => {
  const { items, functional, itemToString, itemToNode } = props;
  return items.map((item, index) => (
    <SelectView.ItemView
      {...{
        functional,
        index,
        item,
        itemToNode,
        itemToString,
      }}
    />
  ));
};

const SelectInnerFrameView = <ItemType extends ItemTypeBase>(
  props: SelectFrameViewProps<ItemType>,
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
    children,
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
    empty = !items.length,
    emptySlot = (
      <EmptyContainerDiv>
        <LabelSpan>No results found</LabelSpan>
      </EmptyContainerDiv>
    ),
    customCSS = {},
  } = props;

  const isOpen = !disabled && functional.isOpen;

  return (
    <ItemContainerList
      limitWidth={limitWidth}
      limitHeight={limitHeight}
      errors={errors}
      empty={empty}
      ref={ref}
      customCSS={customCSS}
      {...functional.getMenuProps()}
    >
      {/* Place the conditional render inside getMenuProps call to avoid downshift errors */}
      {isOpen ? (
        loading ? (
          loadingSlot
        ) : empty ? (
          <ListItem key={`empty`}>{emptySlot}</ListItem>
        ) : (
          children
        )
      ) : (
        <></>
      )}
    </ItemContainerList>
  );
};

function itemToStringDefault<ItemType>(item: ItemType | null): string {
  return `${item}`;
}

function itemToNodeDefault<ItemType>(
  item: ItemType & { description?: string }
) {
  if (typeof item === "object" && item !== null) {
    return (
      <>
        <span>{itemToStringDefault(item)}</span>
        {item.hasOwnProperty("description") && item.description && (
          <>
            <br />
            <ItemDescriptionSpan>{item.description}</ItemDescriptionSpan>
          </>
        )}
      </>
    );
  } else {
    return <span>{itemToStringDefault(item)}</span>;
  }
}

const SelectInnerListView = <ItemType extends ItemTypeBase>(
  props: SelectListViewProps<ItemType>,
  ref: React.Ref<HTMLInputElement>
) => {
  const {
    itemToString = itemToStringDefault,
    itemToNode = itemToNodeDefault,
    ...rest
  } = props;
  return (
    <SelectInnerFrameView {...{ ...rest, ref }}>
      {itemsToNode({
        items: props.items,
        functional: props.functional,
        itemToString,
        itemToNode,
      })}
    </SelectInnerFrameView>
  );
};

export const SelectView = {
  HandleView: React.forwardRef(SelectHandleInnerView),
  ListView: React.forwardRef(SelectInnerListView),
  FrameView: React.forwardRef(SelectInnerFrameView),
  ContainerView: SelectContainerView,
  ItemView: ItemView,
  ItemToNode: itemToNodeDefault,
  ItemToString: itemToStringDefault,
};
