import React, { useState } from "react";
import { DropdownView } from ".";

export default {
  title: "Components / Dropdown",
  component: DropdownView,
};

const exampleOnClick = () => alert("You clicked a dropdown item.");

export const Functional = () => {
  const [enabled, setEnable] = useState(true);
  return (
    <div style={{ height: 280 }}>
      <DropdownView
        text="Default Dropdown"
        onClickDropdown={() => setEnable(!enabled)}
        showMenu={enabled}
      >
        <DropdownView.ItemView onClick={exampleOnClick}>
          {" "}
          Dropdown Item{" "}
        </DropdownView.ItemView>
        <DropdownView.ItemView onClick={exampleOnClick}>
          {" "}
          Dropdown Item{" "}
        </DropdownView.ItemView>
        <DropdownView.SublistView name="Dropdown Subtitle">
          <DropdownView.ItemView onClick={exampleOnClick}>
            {" "}
            Dropdown Suboption{" "}
          </DropdownView.ItemView>
          <DropdownView.ItemView onClick={exampleOnClick}>
            {" "}
            Dropdown Suboption{" "}
          </DropdownView.ItemView>
        </DropdownView.SublistView>
      </DropdownView>
    </div>
  );
};

export const FunctionalUpwards = () => {
  const [enabled, setEnable] = useState(true);
  return (
    <div style={{ height: 280, paddingTop: 400 }}>
      <DropdownView
        popUpwards={true}
        text="Default Dropdown"
        onClickDropdown={() => setEnable(!enabled)}
        showMenu={enabled}
      >
        <DropdownView.ItemView onClick={exampleOnClick}>
          {" "}
          Dropdown Item{" "}
        </DropdownView.ItemView>
        <DropdownView.ItemView onClick={exampleOnClick}>
          {" "}
          Dropdown Item{" "}
        </DropdownView.ItemView>
        <DropdownView.SublistView name="Dropdown Subtitle">
          <DropdownView.ItemView onClick={exampleOnClick}>
            {" "}
            Dropdown Suboption{" "}
          </DropdownView.ItemView>
          <DropdownView.ItemView onClick={exampleOnClick}>
            {" "}
            Dropdown Suboption{" "}
          </DropdownView.ItemView>
        </DropdownView.SublistView>
      </DropdownView>
    </div>
  );
};

export const DefaultClosed = () => (
  <DropdownView text="Default Closed" showMenu={false} />
);

export const DefaultOpen = () => (
  <DropdownView text="Default Open" showMenu={true} />
);

export const Disabled = () => <DropdownView text="Disabled" disabled={true} />;

export const CenterAlignedClosed = () => (
  <DropdownView text="Center Align Closed" showMenu={false} center={true} />
);

export const CenterAlignedOpen = () => (
  <DropdownView text="Center Align Open" showMenu={true} center={true} />
);

export const IconClosed = () => (
  <DropdownView text="Icon Closed" icon="calendar" showMenu={false} />
);

export const IconOpen = () => (
  <DropdownView text="Icon Open" icon="calendar" showMenu={true} />
);

export const PillClosed = () => (
  <DropdownView text="Left Align Closed" showMenu={false} pill={true} />
);

export const PillOpen = () => (
  <DropdownView text="Left Align Open" showMenu={true} pill={true} />
);

export const PillDisabled = () => (
  <DropdownView text="Disabled" disabled={true} pill={true} />
);

export const PillCenterAlignedClosed = () => (
  <DropdownView
    text="Center Align Closed"
    showMenu={false}
    center={true}
    pill={true}
  />
);

export const PillCenterAlignedOpen = () => (
  <DropdownView
    text="Center Align Open"
    showMenu={true}
    center={true}
    pill={true}
  />
);

export const PillIconClosed = () => (
  <DropdownView
    text="Icon Closed"
    icon="calendar"
    showMenu={false}
    pill={true}
  />
);

export const PillIconOpen = () => (
  <DropdownView text="Icon Open" icon="calendar" showMenu={true} pill={true} />
);

export const NarrowDefaultClosed = () => (
  <DropdownView text="Default Closed" showMenu={false} narrow={true} />
);

export const NarrowPillClosed = () => (
  <DropdownView
    text="Left Align Closed"
    showMenu={false}
    pill={true}
    narrow={true}
  />
);

export const MenuOptions = () => (
  <div style={{ height: 180 }}>
    <DropdownView text="Menu Options" showMenu={true}>
      <DropdownView.ItemView> Dropdown Item </DropdownView.ItemView>
      <DropdownView.ItemView> Dropdown Item </DropdownView.ItemView>
      <DropdownView.ItemView> Dropdown Item </DropdownView.ItemView>
    </DropdownView>
  </div>
);

export const MenuSuboptions = () => (
  <div style={{ height: 240 }}>
    <DropdownView text="Menu Suboptions" showMenu={true}>
      <DropdownView.SublistView name="Dropdown Subtitle">
        <DropdownView.ItemView> Dropdown Suboption </DropdownView.ItemView>
        <DropdownView.ItemView> Dropdown Suboption </DropdownView.ItemView>
        <DropdownView.ItemView> Dropdown Suboption </DropdownView.ItemView>
      </DropdownView.SublistView>
    </DropdownView>
  </div>
);

export const Description = () => (
  <div style={{ height: 240 }}>
    <DropdownView text="Menu Suboptions" showMenu={true}>
      <DropdownView.ItemView description="description">
        {" "}
        Dropdown Item
      </DropdownView.ItemView>
      <DropdownView.ItemView description="description">
        {" "}
        Dropdown Item
      </DropdownView.ItemView>
    </DropdownView>
  </div>
);

export const SideDescription = () => (
  <div style={{ height: 240 }}>
    <DropdownView text="Menu Suboptions" showMenu={true}>
      <DropdownView.ItemView sideDescription="side">
        {" "}
        Dropdown Item
      </DropdownView.ItemView>
      <DropdownView.ItemView sideDescription="side">
        {" "}
        Dropdown Item
      </DropdownView.ItemView>
    </DropdownView>
  </div>
);

export const BothDescriptions = () => (
  <div style={{ height: 240 }}>
    <DropdownView text="Menu Suboptions" showMenu={true}>
      <DropdownView.ItemView description="description" sideDescription="side">
        {" "}
        Dropdown Item
      </DropdownView.ItemView>
      <DropdownView.ItemView description="description" sideDescription="side">
        {" "}
        Dropdown Item
      </DropdownView.ItemView>
    </DropdownView>
  </div>
);

export const Checked = () => (
  <div style={{ height: 240 }}>
    <DropdownView text="Menu Suboptions" showMenu={true}>
      <DropdownView.ItemView checked> Dropdown Item</DropdownView.ItemView>
      <DropdownView.ItemView checked> Dropdown Item</DropdownView.ItemView>
    </DropdownView>
  </div>
);

export const PlaceholderWithoutText = () => (
  <div style={{ height: 240 }}>
    <DropdownView placeholder="Placeholder" showMenu={false}>
      <DropdownView.ItemView checked> Dropdown Item</DropdownView.ItemView>
      <DropdownView.ItemView checked> Dropdown Item</DropdownView.ItemView>
    </DropdownView>
  </div>
);

export const PlaceholderWithText = () => (
  <div style={{ height: 240 }}>
    <DropdownView
      placeholder="Placeholder"
      text="Menu Suboptions"
      showMenu={false}
    >
      <DropdownView.ItemView checked> Dropdown Item</DropdownView.ItemView>
      <DropdownView.ItemView checked> Dropdown Item</DropdownView.ItemView>
    </DropdownView>
  </div>
);
