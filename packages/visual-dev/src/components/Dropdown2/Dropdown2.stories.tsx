import React, { useState } from "react";
import { Dropdown2View } from "./Dropdown2";

export default {
  title: "Components / Dropdown2",
  component: Dropdown2View,
};

const exampleOnClick = () => alert("You clicked a dropdown item.");

const defaultItems = (
  <>
    <Dropdown2View.ItemView onClick={exampleOnClick}>
      {" "}
      Dropdown Item{" "}
    </Dropdown2View.ItemView>
    <Dropdown2View.ItemView onClick={exampleOnClick}>
      {" "}
      Dropdown Item{" "}
    </Dropdown2View.ItemView>
    {/* <Dropdown2View.SublistView name="Dropdown Subtitle">
      <Dropdown2View.ItemView onClick={exampleOnClick}>
        {" "}
        Dropdown Suboption{" "}
      </Dropdown2View.ItemView>
      <Dropdown2View.ItemView onClick={exampleOnClick}>
        {" "}
        Dropdown Suboption{" "}
      </Dropdown2View.ItemView>
    </Dropdown2View.SublistView> */}
  </>
);

export const Functional = () => {
  const [enabled, setEnable] = useState(true);
  return (
    <div style={{ height: 280 }}>
      <Dropdown2View
        showMenu={enabled}
        handleSlot={
          <Dropdown2View.HandleView onClickDropdown={() => setEnable(!enabled)}>
            Test handle
          </Dropdown2View.HandleView>
        }
      >
        {defaultItems}
      </Dropdown2View>
    </div>
  );
};

export const FunctionalUpwards = () => {
  const [enabled, setEnable] = useState(true);
  return (
    <div style={{ height: 280 }}>
      <Dropdown2View
        showMenu={enabled}
        handleSlot={
          <Dropdown2View.HandleView onClickDropdown={() => setEnable(!enabled)}>
            Test handle
          </Dropdown2View.HandleView>
        }
      >
        {defaultItems}
      </Dropdown2View>
    </div>
  );
};

export const FunctionalIcon = () => {
  const [enabled, setEnable] = useState(true);
  return (
    <div style={{ height: 280 }}>
      <Dropdown2View
        showMenu={enabled}
        handleSlot={
          <Dropdown2View.HandleView
            icon="calendar"
            onClickDropdown={() => setEnable(!enabled)}
          >
            Test handle
          </Dropdown2View.HandleView>
        }
      >
        {defaultItems}
      </Dropdown2View>
    </div>
  );
};

export const DefaultClosed = () => {
  return (
    <div style={{ height: 280 }}>
      <Dropdown2View
        showMenu={false}
        handleSlot={
          <Dropdown2View.HandleView onClickDropdown={exampleOnClick}>
            Test handle
          </Dropdown2View.HandleView>
        }
      >
        {defaultItems}
      </Dropdown2View>
    </div>
  );
};

export const DefaultOpened = () => {
  return (
    <div style={{ height: 280 }}>
      <Dropdown2View
        showMenu={true}
        handleSlot={
          <Dropdown2View.HandleView onClickDropdown={exampleOnClick}>
            Test handle
          </Dropdown2View.HandleView>
        }
      >
        {defaultItems}
      </Dropdown2View>
    </div>
  );
};

export const Disabled = () => {
  return (
    <div style={{ height: 280 }}>
      <Dropdown2View
        showMenu={false}
        disabled
        handleSlot={
          <Dropdown2View.HandleView onClickDropdown={exampleOnClick}>
            Test handle
          </Dropdown2View.HandleView>
        }
      >
        {defaultItems}
      </Dropdown2View>
    </div>
  );
};

// todo - make story
export const Description = () => {
  return (
    <div style={{ height: 280 }}>
      <Dropdown2View
        showMenu={true}
        handleSlot={
          <Dropdown2View.HandleView onClickDropdown={exampleOnClick}>
            Test handle
          </Dropdown2View.HandleView>
        }
      >
        {defaultItems}
      </Dropdown2View>
    </div>
  );
};

// todo - make story
export const SideDescription = () => {
  return (
    <div style={{ height: 280 }}>
      <Dropdown2View
        showMenu={true}
        handleSlot={
          <Dropdown2View.HandleView onClickDropdown={exampleOnClick}>
            Test handle
          </Dropdown2View.HandleView>
        }
      >
        {defaultItems}
      </Dropdown2View>
    </div>
  );
};

// todo - make story
export const BothDescriptions = () => {
  return (
    <div style={{ height: 280 }}>
      <Dropdown2View
        showMenu={true}
        handleSlot={
          <Dropdown2View.HandleView onClickDropdown={exampleOnClick}>
            Test handle
          </Dropdown2View.HandleView>
        }
      >
        {defaultItems}
      </Dropdown2View>
    </div>
  );
};

// todo - make story
export const Checked = () => {
  return (
    <div style={{ height: 280 }}>
      <Dropdown2View
        showMenu={true}
        handleSlot={
          <Dropdown2View.HandleView onClickDropdown={exampleOnClick}>
            Test handle
          </Dropdown2View.HandleView>
        }
      >
        {defaultItems}
      </Dropdown2View>
    </div>
  );
};

export const PlaceholderWithoutText = () => {
  return (
    <div style={{ height: 280 }}>
      <Dropdown2View
        showMenu={false}
        handleSlot={
          <Dropdown2View.HandleView
            onClickDropdown={exampleOnClick}
            placeholder="Test placeholder"
          ></Dropdown2View.HandleView>
        }
      >
        {defaultItems}
      </Dropdown2View>
    </div>
  );
};
export const PlaceholderWithText = () => {
  return (
    <div style={{ height: 280 }}>
      <Dropdown2View
        showMenu={false}
        handleSlot={
          <Dropdown2View.HandleView
            onClickDropdown={exampleOnClick}
            placeholder="Test placeholder"
          >
            Menu options
          </Dropdown2View.HandleView>
        }
      >
        {defaultItems}
      </Dropdown2View>
    </div>
  );
};
export const NoItems = () => {
  return (
    <div style={{ height: 280 }}>
      <Dropdown2View
        showMenu={true}
        handleSlot={
          <Dropdown2View.HandleView
            onClickDropdown={exampleOnClick}
            placeholder="Test placeholder"
          >
            Menu options
          </Dropdown2View.HandleView>
        }
      ></Dropdown2View>
    </div>
  );
};
