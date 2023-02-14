import { useMultipleSelection, useSelect, useCombobox } from "downshift";
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
      <SelectView.ListView {...props} empty={!props.items.length} />
    </SelectView.ContainerView>
  );
}

export function MultipleSelectCombobox() {
  const initialSelectedItems = [books[0], books[1]];

  function getFilteredBooksCombobox(
    selectedItems: string[],
    inputValue: string
  ) {
    const lowerCasedInputValue = inputValue.toLowerCase();

    return books.filter(function filterBook(book) {
      return (
        !selectedItems.includes(book) &&
        book.toLowerCase().includes(lowerCasedInputValue)
      );
    });
  }

  const [inputValue, setInputValue] = React.useState("");
  const [selectedItems, setSelectedItems] = React.useState(
    initialSelectedItems
  );
  const items = React.useMemo(
    () => getFilteredBooksCombobox(selectedItems, inputValue),
    [selectedItems, inputValue]
  );
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
  } = useMultipleSelection({
    selectedItems,
    onStateChange({ selectedItems: newSelectedItems, type }) {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          setSelectedItems(newSelectedItems || []);
          break;
        default:
          break;
      }
    },
  });

  const functional = useCombobox({
    items,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    stateReducer(_, actionAndChanges) {
      const { changes, type } = actionAndChanges;

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            ...(changes.selectedItem && { isOpen: true, highlightedIndex: 0 }),
          };
        default:
          return changes;
      }
    },
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
    }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          const guardedSelectItems = selectedItems || [];

          const newSelectedItems = newSelectedItem
            ? [...guardedSelectItems, newSelectedItem]
            : guardedSelectItems;

          setSelectedItems(newSelectedItems);
          break;

        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue || "");

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
  };

  return (
    <SelectView.ContainerView {...props}>
      <SelectView.HandleView {...props} />
      <SelectView.ListView {...props} empty={!items.length} />
    </SelectView.ContainerView>
  );
}

export function MultipleSelectFullWidth() {
  const props = useMultiSelectDemo({ selectItems: books });

  return (
    <SelectView.ContainerView {...props} limitWidth={false}>
      <SelectView.HandleView {...props} limitWidth={false} />
      <SelectView.ListView
        {...props}
        empty={!props.items.length}
        limitWidth={false}
      />
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
      <SelectView.ListView
        limitHeight={true}
        {...props}
        empty={!props.items.length}
        limitWidth={false}
      />
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
