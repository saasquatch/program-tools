import { CSSProp } from "styled-components";
import { UseComboboxReturnValue, UseSelectReturnValue } from "downshift";
import React from "react";
import { IconKey } from "../Icon";
import { SelectView } from "./Select2";

export type SelectProps<ItemType> = OptionProps<ItemType> &
  Partial<React.ComponentProps<"input">>;

export interface OptionProps<ItemType> {
  /**
   * Downshift hook for component functionality (useSelect or useCombobox)
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
   * Items to include in the select list
   */
  items: Array<any>;
  /**
   * Custom CSS for the select handle
   */
  customCSS?: CSSProp;
  /**
   * Custom CSS for the select handle container
   */
  customContainerCSS?: CSSProp;
  /**
   * Allow the select value to be cleared
   */
  clearable?: boolean;
  /**
   * Render the handle in the loading state
   */
  loading?: boolean;
  /**
   * Placeholder displayed in the handle before a selection is made
   */
  placeholer?: string;
  /**
   * Limit the width of the select with a valid CSS size (px, %) [default 300px]
   */
  limitWidth?: SizeType;
  /**
   * Limit the height of the input in its expanded state with a valid CSS size (px, %) [default 200px]
   */
  limitHeight?: SizeType;
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
   * Use a custom icon instead of a chevron
   */
  customIcon?: IconKey;
}

type SizeType = boolean | string;

type ItemTypeBase = { description?: string } | string | number | boolean;

// Redeclare forwardRef for use with generic prop types.
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const SelectInnerView = <ItemType extends ItemTypeBase>(
  props: SelectProps<ItemType>
) => {
  return (
    <SelectView.ContainerView>
      <SelectView.HandleView {...{ ...props, ref: undefined }} />
      <SelectView.ListView {...{ ...props, ref: undefined }} />
    </SelectView.ContainerView>
  );
};

// export const SelectView = React.forwardRef(SelectInnerView);

/**
 * @deprecated use {@link SelectView} instead
 */
export const Select = React.forwardRef(SelectInnerView);
