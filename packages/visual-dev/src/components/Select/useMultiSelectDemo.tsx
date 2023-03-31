import { useMultipleSelection, useSelect, useCombobox } from "downshift";
import React, { useMemo, useState } from "react";
import { TagView } from "../Tag";

type useMultiSelectDemoProps = {
  selectItems: string[];
  onChange?: (value: any) => void;
  itemMap?: { [key: string]: string };
  emptySlot?: React.ReactNode;
  itemToString?: (item: any | null) => string;
  itemToNode?: (item: any) => React.ReactNode;
  useCombobox?: boolean;
};

export const useMultiSelectDemo = ({
  selectItems,
  ...props
}: useMultiSelectDemoProps) => {
  const [filter, setFilter] = useState("");

  function getSelectItemsFilter(selectedItems: string[]) {
    return function selectItemsFilter(book: string) {
      return selectedItems.indexOf(book) < 0;
    };
  }

  const defaultItemToString = (item: any) => {
    return props?.itemMap?.[item] ?? item;
  };

  const itemToString = props.itemToString || defaultItemToString;

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({
    initialSelectedItems: [selectItems[0], selectItems[1]],
  });

  const filteredItems = props.useCombobox
    ? useMemo(
        () =>
          selectItems?.filter((item) => {
            const isSelected = selectedItems.includes(item);

            const isQueried =
              props.itemMap?.[item]
                ?.toLowerCase()
                ?.includes(filter?.toLowerCase()) ||
              item.toLowerCase().includes(filter.toLowerCase());

            return !isSelected && isQueried;
          }),
        [filter, selectedItems, selectItems]
      )
    : selectItems;

  const items = selectItems.filter(getSelectItemsFilter(selectedItems));

  let functional;

  if (props.useCombobox) {
    functional = useCombobox({
      itemToString,
      selectedItem: null,
      items: filteredItems,
      inputValue: filter,
      onInputValueChange: ({ inputValue }) => {
        setFilter(inputValue || "");
      },
      defaultHighlightedIndex: 0, // after selection, highlight the first item.
      stateReducer: (state, actionAndChanges) => {
        const { changes, type } = actionAndChanges;
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
            return {
              ...changes,
              isOpen: true, // keep the menu open after selection.
            };
        }
        return changes;
      },
      onStateChange: ({ type, selectedItem }) => {
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
            if (selectedItem) {
              addSelectedItem(selectedItem);
              setFilter("");
            }
            break;
          default:
            break;
        }
      },
    });
  } else {
    functional = useSelect({
      selectedItem: null,
      defaultHighlightedIndex: 0, // after selection, highlight the first item.
      items,
      stateReducer: (_, actionAndChanges) => {
        const { changes, type } = actionAndChanges;
        switch (type) {
          case useSelect.stateChangeTypes.MenuKeyDownEnter:
          case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
          case useSelect.stateChangeTypes.ItemClick:
            return {
              ...changes,
              isOpen: true, // keep the menu open after selection.
            };
        }
        return changes;
      },
      onStateChange: ({ type, selectedItem }) => {
        switch (type) {
          case useSelect.stateChangeTypes.MenuKeyDownEnter:
          case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
          case useSelect.stateChangeTypes.ItemClick:
            if (selectedItem) {
              addSelectedItem(selectedItem);
            }
            break;
          default:
            break;
        }
      },
    });
  }

  const tagsSlot = (
    <>
      {selectedItems.map(function renderSelectedItem(
        selectedItemForRender,
        index
      ) {
        return (
          <TagView
            key={`selected-item-${index}`}
            {...getSelectedItemProps({
              selectedItem: selectedItemForRender,
              index,
            })}
            onClickClose={(e) => {
              e.stopPropagation();
              removeSelectedItem(selectedItemForRender);
            }}
          >
            {selectedItemForRender}
          </TagView>
        );
      })}
    </>
  );

  return {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    functional,
    items: props.useCombobox ? filteredItems : items,
    tagsSlot,
    empty: !items.length,
  };
};
