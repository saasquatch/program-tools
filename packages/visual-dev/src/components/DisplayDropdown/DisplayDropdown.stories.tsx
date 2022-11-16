import React, { useState } from "react";
import { DisplayDropdown } from "./DisplayDropdown";

export default {
  title: "Components / Display Dropdown",
  component: DisplayDropdown,
};

export const Functional = () => {
  const [open, setEnable] = useState(false);
  return (
    <div style={{ margin: "150px 200px" }}>
      <DisplayDropdown.ContainerView>
        <DisplayDropdown.HandleView
          onClickHandle={() => setEnable(!open)}
          currentValue="Initial Value"
        />
        <DisplayDropdown.MenuView isOpen={open}>
          <DisplayDropdown.ItemView
            onClickItem={() => setEnable(!open)}
            isSelected={false}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
          <DisplayDropdown.ItemView
            onClickItem={() => setEnable(!open)}
            isSelected={false}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
          <DisplayDropdown.ItemView
            onClickItem={() => setEnable(!open)}
            isSelected={true}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
          <DisplayDropdown.ItemView
            onClickItem={() => setEnable(!open)}
            isSelected={false}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
        </DisplayDropdown.MenuView>
      </DisplayDropdown.ContainerView>
    </div>
  );
};

export const DisplayDropdownOpen = () => {
  return (
    <div style={{ margin: "150px 200px" }}>
      <DisplayDropdown.ContainerView>
        <DisplayDropdown.HandleView
          onClickHandle={() => alert("Clicked Handle!")}
          currentValue="Initial Value"
        />
        <DisplayDropdown.MenuView isOpen={true}>
          <DisplayDropdown.ItemView
            onClickItem={() => alert("Clicked Item!")}
            isSelected={false}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
          <DisplayDropdown.ItemView
            onClickItem={() => alert("Clicked Item!")}
            isSelected={false}
          >
            Dropdown Item loooooooooooooooooooooooong item
          </DisplayDropdown.ItemView>
          <DisplayDropdown.ItemView
            onClickItem={() => alert("Clicked Item!")}
            isSelected={true}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
          <DisplayDropdown.ItemView
            onClickItem={() => alert("Clicked Item!")}
            isSelected={false}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
        </DisplayDropdown.MenuView>
      </DisplayDropdown.ContainerView>
    </div>
  );
};

export const DisplayDropdownClosed = () => {
  return (
    <div style={{ margin: "150px 200px" }}>
      <DisplayDropdown.ContainerView>
        <DisplayDropdown.HandleView
          onClickHandle={() => alert("Clicked Handle!")}
          currentValue="Initial Value"
        />
        <DisplayDropdown.MenuView isOpen={false}>
          <DisplayDropdown.ItemView
            onClickItem={() => alert("Clicked Item!")}
            isSelected={false}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
          <DisplayDropdown.ItemView
            onClickItem={() => alert("Clicked Item!")}
            isSelected={false}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
          <DisplayDropdown.ItemView
            onClickItem={() => alert("Clicked Item!")}
            isSelected={true}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
          <DisplayDropdown.ItemView
            onClickItem={() => alert("Clicked Item!")}
            isSelected={false}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
        </DisplayDropdown.MenuView>
      </DisplayDropdown.ContainerView>
    </div>
  );
};

export const OneItem = () => {
  return (
    <div style={{ margin: "150px 200px" }}>
      <DisplayDropdown.ContainerView>
        <DisplayDropdown.HandleView
          onClickHandle={() => alert("Clicked Handle!")}
          currentValue="Initial Value"
        />
        <DisplayDropdown.MenuView isOpen={true}>
          <DisplayDropdown.ItemView
            onClickItem={() => alert("Clicked Item!")}
            isSelected={false}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
        </DisplayDropdown.MenuView>
      </DisplayDropdown.ContainerView>
    </div>
  );
};

export const CustomCSSOpen = () => {
  return (
    <div style={{ margin: "150px 200px" }}>
      <DisplayDropdown.ContainerView>
        <DisplayDropdown.HandleView
          onClickHandle={() => alert("Clicked Handle!")}
          currentValue="Initial Value"
        />
        <DisplayDropdown.MenuView isOpen={true} customCSS={{ width: "300px" }}>
          <DisplayDropdown.ItemView
            onClickItem={() => alert("Clicked Item!")}
            isSelected={false}
            customCSS={{ fontWeight: "bold" }}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
          <DisplayDropdown.ItemView
            onClickItem={() => alert("Clicked Item!")}
            isSelected={true}
            customCSS={{ fontWeight: "bold" }}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
        </DisplayDropdown.MenuView>
      </DisplayDropdown.ContainerView>
    </div>
  );
};

export const CustomCSSClosed = () => {
  return (
    <div style={{ margin: "150px 200px" }}>
      <DisplayDropdown.ContainerView
        customCSS={{ width: "200px", backgroundColor: "red" }}
      >
        <DisplayDropdown.HandleView
          onClickHandle={() => alert("Clicked Handle!")}
          currentValue="Initial Value"
        />
        <DisplayDropdown.MenuView isOpen={false}>
          <DisplayDropdown.ItemView
            onClickItem={() => alert("Clicked Item!")}
            isSelected={false}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
          <DisplayDropdown.ItemView
            onClickItem={() => alert("Clicked Item!")}
            isSelected={true}
          >
            Dropdown Item
          </DisplayDropdown.ItemView>
        </DisplayDropdown.MenuView>
      </DisplayDropdown.ContainerView>
    </div>
  );
};
