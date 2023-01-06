import { useMultipleSelection, useSelect } from "downshift";
import React from "react";
import { TagView } from "../Tag";
import { SelectView } from "./Select2";

export default {
  title: "Components / Multi Select",
  component: SelectView,
};

export function MultipleSelect() {
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

  // const emptySlot = <>EMPTY</>;

  const props = {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    // emptySlot,
    functional,
    items,
    tagsSlot,
  };

  return (
    <SelectView.ContainerView>
      <SelectView.HandleView {...props} />
      <SelectView.ListView
        {...props}
        // emptySlot={props.emptySlot}
        empty={!items.length}
      />
    </SelectView.ContainerView>
  );
}

export function MultipleSelectFullWidth() {
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

  const limitWidth = false;

  const props = {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    functional,
    items,
    tagsSlot,
    limitWidth,
  };

  return (
    <SelectView.ContainerView {...props}>
      <SelectView.HandleView {...props} />
      <SelectView.ListView {...props} empty={!items.length} />
    </SelectView.ContainerView>
  );
}

export function MultiSelectWithManyItems() {
  const books = [
    "To Kill a Mockingbird",
    "War and Peace",
    "The Idiot",
    "A Picture of Dorian Gray",
    "1984",
    "Pride and Prejudice",
    "Meditations",
    "To Kill a Mockingbird",
    "War and Peace",
    "The Idiot",
    "A Picture of Dorian Gray",
    "1984",
    "Pride and Prejudice",
    "Meditations",
    "To Kill a Mockingbird",
    "War and Peace",
    "The Idiot",
    "A Picture of Dorian Gray",
    "1984",
    "Pride and Prejudice",
    "Meditations",
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

  const limitWidth = false;

  const props = {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    functional,
    items,
    tagsSlot,
    limitWidth,
  };

  return (
    <SelectView.ContainerView {...props}>
      <SelectView.HandleView {...props} />
      <SelectView.ListView
        limitHeight={true}
        {...props}
        empty={!items.length}
      />
    </SelectView.ContainerView>
  );
}

interface Book {
  title: string;
  author: string;
}

const books: Book[] = [
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
      return <></>;
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
  } = useMultipleSelection({ initialSelectedItems: [books[0], books[1]] });

  function getBooksFilter(selectedItems: Book[]) {
    return function booksFilter(book: Book) {
      return selectedItems.indexOf(book) < 0;
    };
  }

  const items = books.filter(getBooksFilter(selectedItems));

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

  // const emptySlot = <>EMPTY</>;

  const props = {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    // emptySlot,
    functional,
    items,
    tagsSlot,
    itemToNode,
    itemToString,
  };

  return (
    <SelectView.ContainerView>
      <SelectView.HandleView {...props} />
      <SelectView.ListView
        {...props}
        // emptySlot={props.emptySlot}
        empty={!items.length}
      />
    </SelectView.ContainerView>
  );
}
