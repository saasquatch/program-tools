import { useSelect } from "downshift";
import React from "react";
import { Select } from "./Select";

export default {
  title: "Components / Select",
  component: Select,
};

export const Functional = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { items, functional };
  console.log(functional);
  return <Select {...props}></Select>;
};

export const Ripped = () => {
  // import React from 'react'
  // import { useSelect } from 'downshift'
  // import { items, menuStyles } from './utils'
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];

  function DropdownSelect() {
    const {
      isOpen,
      selectedItem,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      highlightedIndex,
      getItemProps,
    } = useSelect({ items })
    return (
      <div>
        <label {...getLabelProps()}>Choose an element:</label>
        <button type="button" {...getToggleButtonProps()}>
          {selectedItem || 'Elements'}
        </button>
        <ul {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <li
                style={
                  highlightedIndex === index
                    ? { backgroundColor: '#bde4ff' }
                    : {}
                }
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    )
  }
  return <DropdownSelect />
}