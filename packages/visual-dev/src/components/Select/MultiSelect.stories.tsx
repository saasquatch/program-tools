import { useMultipleSelection, useSelect } from "downshift";
import React from "react";
import { TagView } from "../Tag";
import { SelectView } from "./Select2";

export default {
  title: "Components / Multi Select",
  component: SelectView,
};

export function MultipleSelectExample() {
  const books = [
    "To Kill a Mockingbird",
    "War and Peace",
    "The Idiot",
    "A Picture of Dorian Gray",
    "1984",
    "Pride and Prejudice",
    "Meditations",
  ];
  function getBooksFilter(selectedItems: string[]) {
    return function booksFilter(book: string) {
      return selectedItems.indexOf(book) < 0;
    };
  }
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({ initialSelectedItems: [books[0], books[1]] });
  const items = books.filter(getBooksFilter(selectedItems));
  // const functional = useSelect({ items });
  const functional = useSelect({
    selectedItem: null,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    items,
    stateReducer: (state, actionAndChanges) => {
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

  console.log("current selection", selectedItems);

  return (
    <SelectView.ContainerView limitWidth={false}>
      <SelectView.HandleView
        tagsSlot={
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
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSelectedItem(selectedItemForRender);
                  }}
                >
                  {selectedItemForRender}
                </TagView>
              );
            })}
          </>
        }
        functional={functional}
        {...functional.getToggleButtonProps(
          getDropdownProps({ preventKeyAction: functional.isOpen })
        )}
      />
      <SelectView.ListView items={items} functional={functional} />
    </SelectView.ContainerView>
  );
}
