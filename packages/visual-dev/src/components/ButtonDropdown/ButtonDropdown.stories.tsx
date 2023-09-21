import React, { useState } from "react";
import { ButtonDropdownView } from "./ButtonDropdown";

export default {
  title: "Components / Button Dropdown",
  component: ButtonDropdownView,
};

const exampleOnClick = () => alert("You clicked a dropdown item.");

const defaultItems = (
  <>
    <ButtonDropdownView.ItemView onClick={exampleOnClick}>
      {" "}
      Dropdown Item{" "}
    </ButtonDropdownView.ItemView>
    <ButtonDropdownView.ItemView onClick={exampleOnClick}>
      {" "}
      Dropdown Item{" "}
    </ButtonDropdownView.ItemView>
    <ButtonDropdownView.SublistView name="Dropdown Subtitle">
      <ButtonDropdownView.ItemView onClick={exampleOnClick}>
        {" "}
        Dropdown Suboption{" "}
      </ButtonDropdownView.ItemView>
      <ButtonDropdownView.ItemView onClick={exampleOnClick}>
        {" "}
        Dropdown Suboption{" "}
      </ButtonDropdownView.ItemView>
    </ButtonDropdownView.SublistView>
  </>
);

export const Functional = () => {
  const [enabled, setEnable] = useState(true);
  return (
    <div style={{ height: 230 }}>
      <ButtonDropdownView
        showMenu={enabled}
        placeholder="Placeholder"
        emptyText="Empty text"
        handleSlot={
          <ButtonDropdownView.HandleView
            onClickDropdown={() => setEnable(!enabled)}
          >
            Test handle
          </ButtonDropdownView.HandleView>
        }
      >
        {defaultItems}
      </ButtonDropdownView>
    </div>
  );
};

export const FunctionalUpwards = () => {
  const [enabled, setEnable] = useState(true);
  return (
    <div style={{ height: 250, paddingTop: 200 }}>
      <ButtonDropdownView
        popUpwards
        showMenu={enabled}
        handleSlot={
          <ButtonDropdownView.HandleView
            onClickDropdown={() => setEnable(!enabled)}
          >
            Test handle
          </ButtonDropdownView.HandleView>
        }
      >
        {defaultItems}
      </ButtonDropdownView>
    </div>
  );
};

export const FunctionalButtonType = () => {
  const [enabled1, setEnable1] = useState(false);
  const [enabled2, setEnable2] = useState(false);
  const [enabled3, setEnable3] = useState(false);
  return (
    <div
      style={{
        height: 230,
        display: "flex",
        gap: "40px",
        justifyContent: "center",
      }}
    >
      <ButtonDropdownView
        showMenu={enabled1}
        handleSlot={
          <ButtonDropdownView.HandleView
            buttonType="primary"
            onClickDropdown={() => setEnable1(!enabled1)}
          >
            Primary button
          </ButtonDropdownView.HandleView>
        }
      >
        {defaultItems}
      </ButtonDropdownView>
      <ButtonDropdownView
        showMenu={enabled2}
        handleSlot={
          <ButtonDropdownView.HandleView
            buttonType="secondary"
            onClickDropdown={() => setEnable2(!enabled2)}
          >
            Secondary button
          </ButtonDropdownView.HandleView>
        }
      >
        {defaultItems}
      </ButtonDropdownView>
      <ButtonDropdownView
        showMenu={enabled3}
        handleSlot={
          <ButtonDropdownView.HandleView
            buttonType="text"
            onClickDropdown={() => setEnable3(!enabled3)}
          >
            Text button
          </ButtonDropdownView.HandleView>
        }
      >
        {defaultItems}
      </ButtonDropdownView>
    </div>
  );
};

export const FunctionalMenuPosition = () => {
  const [enabled1, setEnable1] = useState(false);
  const [enabled2, setEnable2] = useState(false);
  const [enabled3, setEnable3] = useState(false);
  return (
    <div
      style={{
        height: 230,
        display: "flex",
        gap: "40px",
        justifyContent: "center",
      }}
    >
      <ButtonDropdownView
        showMenu={enabled1}
        menuPosition="left"
        handleSlot={
          <ButtonDropdownView.HandleView
            onClickDropdown={() => setEnable1(!enabled1)}
          >
            Left menu
          </ButtonDropdownView.HandleView>
        }
      >
        {defaultItems}
      </ButtonDropdownView>
      <ButtonDropdownView
        showMenu={enabled2}
        menuPosition="center"
        handleSlot={
          <ButtonDropdownView.HandleView
            onClickDropdown={() => setEnable2(!enabled2)}
          >
            Center menu
          </ButtonDropdownView.HandleView>
        }
      >
        {defaultItems}
      </ButtonDropdownView>
      <ButtonDropdownView
        showMenu={enabled3}
        menuPosition="right"
        handleSlot={
          <ButtonDropdownView.HandleView
            onClickDropdown={() => setEnable3(!enabled3)}
          >
            Right menu
          </ButtonDropdownView.HandleView>
        }
      >
        {defaultItems}
      </ButtonDropdownView>
    </div>
  );
};

export const FunctionalIcon = () => {
  const [enabled, setEnable] = useState(true);
  return (
    <div style={{ height: 230 }}>
      <ButtonDropdownView
        showMenu={enabled}
        handleSlot={
          <ButtonDropdownView.HandleView
            icon="calendar"
            onClickDropdown={() => setEnable(!enabled)}
          >
            Test handle
          </ButtonDropdownView.HandleView>
        }
      >
        {defaultItems}
      </ButtonDropdownView>
    </div>
  );
};

export const DefaultClosed = () => {
  return (
    <div style={{ height: 230 }}>
      <ButtonDropdownView
        showMenu={false}
        handleSlot={
          <ButtonDropdownView.HandleView onClickDropdown={exampleOnClick}>
            Test handle
          </ButtonDropdownView.HandleView>
        }
      >
        {defaultItems}
      </ButtonDropdownView>
    </div>
  );
};

export const DefaultOpened = () => {
  return (
    <div style={{ height: 230 }}>
      <ButtonDropdownView
        showMenu={true}
        handleSlot={
          <ButtonDropdownView.HandleView onClickDropdown={exampleOnClick}>
            Test handle
          </ButtonDropdownView.HandleView>
        }
      >
        {defaultItems}
      </ButtonDropdownView>
    </div>
  );
};

export const Disabled = () => {
  return (
    <div style={{ height: 230 }}>
      <ButtonDropdownView
        showMenu={false}
        handleSlot={
          <ButtonDropdownView.HandleView
            onClickDropdown={exampleOnClick}
            disabled
          >
            Test handle
          </ButtonDropdownView.HandleView>
        }
      >
        {defaultItems}
      </ButtonDropdownView>
    </div>
  );
};

export const MenuSuboptions = () => (
  <div style={{ height: 230 }}>
    <ButtonDropdownView
      showMenu={true}
      handleSlot={
        <ButtonDropdownView.HandleView onClickDropdown={exampleOnClick}>
          Menu Suboptions
        </ButtonDropdownView.HandleView>
      }
    >
      <ButtonDropdownView.SublistView name="Dropdown Subtitle">
        <ButtonDropdownView.ItemView>
          {" "}
          Dropdown Suboption{" "}
        </ButtonDropdownView.ItemView>
        <ButtonDropdownView.ItemView>
          {" "}
          Dropdown Suboption{" "}
        </ButtonDropdownView.ItemView>
        <ButtonDropdownView.ItemView>
          {" "}
          Dropdown Suboption{" "}
        </ButtonDropdownView.ItemView>
      </ButtonDropdownView.SublistView>
    </ButtonDropdownView>
  </div>
);

export const Description = () => {
  return (
    <div style={{ height: 230 }}>
      <ButtonDropdownView
        showMenu={true}
        handleSlot={
          <ButtonDropdownView.HandleView onClickDropdown={exampleOnClick}>
            Test handle
          </ButtonDropdownView.HandleView>
        }
      >
        <ButtonDropdownView.ItemView description="description">
          Dropdown Item
        </ButtonDropdownView.ItemView>
        <ButtonDropdownView.ItemView description="description">
          Dropdown Item
        </ButtonDropdownView.ItemView>
      </ButtonDropdownView>
    </div>
  );
};

export const SideDescription = () => {
  return (
    <div style={{ height: 230 }}>
      <ButtonDropdownView
        showMenu={true}
        handleSlot={
          <ButtonDropdownView.HandleView onClickDropdown={exampleOnClick}>
            Test handle
          </ButtonDropdownView.HandleView>
        }
      >
        <ButtonDropdownView.ItemView sideDescription="side">
          Dropdown Item
        </ButtonDropdownView.ItemView>
        <ButtonDropdownView.ItemView sideDescription="side">
          Dropdown Item
        </ButtonDropdownView.ItemView>
      </ButtonDropdownView>
    </div>
  );
};

export const BothDescriptions = () => {
  return (
    <div style={{ height: 230 }}>
      <ButtonDropdownView
        showMenu={true}
        handleSlot={
          <ButtonDropdownView.HandleView onClickDropdown={exampleOnClick}>
            Test handle
          </ButtonDropdownView.HandleView>
        }
      >
        <ButtonDropdownView.ItemView
          description="description"
          sideDescription="side"
        >
          Dropdown Item
        </ButtonDropdownView.ItemView>
        <ButtonDropdownView.ItemView
          description="description"
          sideDescription="side"
        >
          Dropdown Item
        </ButtonDropdownView.ItemView>
      </ButtonDropdownView>
    </div>
  );
};

export const Checked = () => {
  return (
    <div style={{ height: 230 }}>
      <ButtonDropdownView
        showMenu={true}
        handleSlot={
          <ButtonDropdownView.HandleView onClickDropdown={exampleOnClick}>
            Test handle
          </ButtonDropdownView.HandleView>
        }
      >
        <ButtonDropdownView.ItemView checked>
          Dropdown Item
        </ButtonDropdownView.ItemView>
        <ButtonDropdownView.ItemView checked>
          Dropdown Item
        </ButtonDropdownView.ItemView>
      </ButtonDropdownView>
    </div>
  );
};

export const PlaceholderWithoutText = () => {
  return (
    <div style={{ height: 230 }}>
      <ButtonDropdownView
        showMenu={false}
        handleSlot={
          <ButtonDropdownView.HandleView
            onClickDropdown={exampleOnClick}
            placeholder="Test placeholder"
          ></ButtonDropdownView.HandleView>
        }
      >
        {defaultItems}
      </ButtonDropdownView>
    </div>
  );
};
export const PlaceholderWithText = () => {
  return (
    <div style={{ height: 230 }}>
      <ButtonDropdownView
        showMenu={false}
        handleSlot={
          <ButtonDropdownView.HandleView
            onClickDropdown={exampleOnClick}
            placeholder="Test placeholder"
          >
            Menu options
          </ButtonDropdownView.HandleView>
        }
      >
        {defaultItems}
      </ButtonDropdownView>
    </div>
  );
};
export const NoItems = () => {
  return (
    <div style={{ height: 230 }}>
      <ButtonDropdownView
        emptyText="Empty text"
        showMenu={true}
        handleSlot={
          <ButtonDropdownView.HandleView
            onClickDropdown={exampleOnClick}
            placeholder="Test placeholder"
          >
            Menu options
          </ButtonDropdownView.HandleView>
        }
      ></ButtonDropdownView>
    </div>
  );
};
