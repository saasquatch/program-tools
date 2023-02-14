import React from "react";
import { SelectView, TagView } from "@saasquatch/visual-dev";
import { useMultipleSelection, useSelect } from "downshift";

export default {
  title: "Components / Multi Select",
  component: SelectView,
};

const countries = [
  "Canada",
  "Costa Rica",
  "Greece",
  "Ireland",
  "Japan",
  "Mexico",
  "United States",
];

function getCountriesFilter(selectedItems: string[]) {
  return function countriesFilter(country: string) {
    return selectedItems.indexOf(country) < 0;
  };
}

export function MultipleSelectStory({
  width = "100%",
  itemsArray = countries,
}: {
  width?: string;
  itemsArray?: string[];
}) {
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({
    initialSelectedItems: [itemsArray[0], itemsArray[1]],
  });

  const items = itemsArray.filter(getCountriesFilter(selectedItems));
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

  const props = {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    functional,
    items,
    tagsSlot,
    limitWidth: width,
  };

  return (
    <SelectView.ContainerView {...props}>
      <SelectView.HandleView {...props} />
      <SelectView.ListView {...props} empty={!items.length} />
    </SelectView.ContainerView>
  );
}
