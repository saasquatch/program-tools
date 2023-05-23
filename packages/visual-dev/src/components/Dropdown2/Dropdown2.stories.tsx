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
