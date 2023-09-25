import React, { useState } from "react";
import { IconView } from "../Icon";
import { DetailsView } from "./Details";
export default {
  tags: ["autodocs"],
  title: "Components / Details",
  component: DetailsView,
};

export const Closed = () => {
  return (
    <DetailsView
      setOpen={() => console.log("open")}
      open={false}
      iconSlot={<IconView icon={"chevron_down"} size={"small"} />}
      summary={"summary"}
    >
      <div>This is children</div>
    </DetailsView>
  );
};

export const ClosedWithSummarySlot = () => {
  return (
    <DetailsView
      setOpen={() => console.log("open")}
      open={false}
      iconSlot={<IconView icon={"chevron_down"} size={"small"} />}
      summary={
        <h2
          style={{
            color: "slateblue",
            border: "2px dashed slateblue",
            padding: "8px 4px",
          }}
        >
          Summary can be a slot or a string
        </h2>
      }
    >
      <div>This is children</div>
    </DetailsView>
  );
};

export const Open = () => {
  return (
    <DetailsView
      setOpen={() => console.log("open")}
      open={true}
      iconSlot={<IconView icon={"chevron_up"} size={"small"} />}
      summary={"summary"}
    >
      <div>This is children</div>
    </DetailsView>
  );
};

export const CustomCSS = () => {
  return (
    <DetailsView
      setOpen={() => console.log("open")}
      open={true}
      iconSlot={<IconView icon={"chevron_up"} size={"small"} />}
      summary={
        <p
          style={{
            color: "white",
            fontWeight: "bold",
            margin: "0",
          }}
        >
          Summary
        </p>
      }
      customCSS="padding: 20px; border: 2px solid chocolate; color: white; font-weight: bold; background: lightblue"
    >
      <div>This is children</div>
    </DetailsView>
  );
};

export const Functional = () => {
  const [open, setOpen] = useState(false);

  return (
    <DetailsView
      open={open}
      setOpen={() => setOpen(!open)}
      iconSlot={
        <IconView icon={open ? "chevron_up" : "chevron_down"} size={"small"} />
      }
      summary={open ? "View details" : "Hide details"}
    >
      <div>This is children</div>
    </DetailsView>
  );
};
