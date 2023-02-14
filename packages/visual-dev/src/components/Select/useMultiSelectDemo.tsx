import { useMultipleSelection, useSelect } from "downshift";
import React from "react";
import { TagView } from "../Tag";

type useMultiSelectDemoProps = {
  selectItems: string[];
};

export const useMultiSelectDemo = ({
  selectItems,
}: useMultiSelectDemoProps) => {
  function getSelectItemsFilter(selectedItems: string[]) {
    return function selectItemsFilter(book: string) {
      return selectedItems.indexOf(book) < 0;
    };
  }

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({
    initialSelectedItems: [selectItems[0], selectItems[1]],
  });

  const items = selectItems.filter(getSelectItemsFilter(selectedItems));
  const functional = useSelect({
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
    items,
    tagsSlot,
  };
};
