import { useMultipleSelection, useSelect } from "downshift";
import React from "react";
import { TagView } from "../Tag";
import { SelectView } from "./Select2";
import { useMultiSelectDemo } from "./useMultiSelectDemo";

export default {
  title: "Components / Multi Select",
  component: SelectView,
};

const books = [
  "To Kill a Mockingbird",
  "War and Peace",
  "The Idiot",
  "A Picture of Dorian Gray",
  "1984",
  "Pride and Prejudice",
  "Meditations",
];

export function MultipleSelect() {
  const props = useMultiSelectDemo({ selectItems: books });

  return (
    <SelectView.ContainerView>
      <SelectView.HandleView {...props} />
      <SelectView.ListView {...props} />
    </SelectView.ContainerView>
  );
}

export function MultipleSelectCombobox() {
  const props = useMultiSelectDemo({ selectItems: books, useCombobox: true });

  return (
    <SelectView.ContainerView {...props}>
      <SelectView.HandleView {...props} />
      <SelectView.ListView {...props} />
    </SelectView.ContainerView>
  );
}

// Attempt to recreate https://codesandbox.io/s/o4yp9vmm8z?file=/MultiDownshift.js but with a menu item, not keyboard shortcuts
export function MultipleSelectCreatableCombobox() {
  const props = useMultiSelectDemo({ selectItems: books, useCombobox: true });

  return (
    <SelectView.ContainerView {...props}>
      <SelectView.HandleView {...props} />

      <SelectView.FrameView {...props}>
        <div>+ Create Reward "{props.functional.inputValue}"</div>
        {props.items.map((item: any, index: number) => (
          <SelectView.ItemView
            {...{
              functional: props.functional,
              index,
              item,
            }}
          />
        ))}
      </SelectView.FrameView>
    </SelectView.ContainerView>
  );
}

export function MultipleSelectFullWidth() {
  const props = useMultiSelectDemo({ selectItems: books });

  return (
    <SelectView.ContainerView {...props} limitWidth={false}>
      <SelectView.HandleView {...props} limitWidth={false} />
      <SelectView.ListView {...props} limitWidth={false} />
    </SelectView.ContainerView>
  );
}

export function MultiSelectWithManyItems() {
  const longBooks = [
    "To Kill a Mockingbird",
    "War and Peace",
    "The Idiot",
    "A Picture of Dorian Gray",
    "1984",
    "Pride and Prejudice",
    "Meditations",
    "Harry Potter",
    "The Lord of the Rings",
    "The Alchemist",
    "The Da Vince Code",
    "The Twilight Saga",
    "Gone with the Wind",
    "Think and Grow Rich",
    "A Tale of Two Cities",
    "The Little Prince",
    "The Hobbit",
    "Atomic Habits",
  ];

  const props = useMultiSelectDemo({ selectItems: longBooks });

  return (
    <SelectView.ContainerView {...props} limitWidth={false}>
      <SelectView.HandleView {...props} limitWidth={false} />
      <SelectView.ListView limitHeight={true} {...props} limitWidth={false} />
    </SelectView.ContainerView>
  );
}

interface Book {
  title: string;
  author: string;
}

const booksObject: Book[] = [
  { title: "To Kill a Mockingbird", author: "Harper Lee" },
  { title: "War and Peace", author: "Leo Tolstoy" },
  { title: "A Picture of Dorian Gray", author: "Oscar Wilde" },
  { title: "1984", author: "George Orwell" },
];

export function MultipleSelectObjectItem() {
  const itemToString = (item: Book | null) => {
    return item?.title || "";
  };
  const itemToNode = (item: Book | null) => {
    if (item === null) {
      return null;
    }
    return (
      <div>
        <h3>{item?.title}</h3>
        <p>{item?.author}</p>
      </div>
    );
  };

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({
    initialSelectedItems: [booksObject[0], booksObject[1]],
  });

  function getBooksObjectFilter(selectedItems: Book[]) {
    return function booksFilter(book: Book) {
      return selectedItems.indexOf(book) < 0;
    };
  }

  const items = booksObject.filter(getBooksObjectFilter(selectedItems));

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
            {itemToString(selectedItemForRender)}
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
    itemToNode,
    itemToString,
  };

  return (
    <SelectView.ContainerView>
      <SelectView.HandleView {...props} />
      <SelectView.ListView {...props} empty={!items.length} />
    </SelectView.ContainerView>
  );
}
