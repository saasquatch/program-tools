import { storiesOf } from "@storybook/react";
import React from "react";
import { Icon } from "../Icons";

storiesOf("Components / Icons", module).add("Default ", () => {
    return (
      <div style={{ margin: "100px" }}>
        <Icon icon={"icon-sqh-trash"} />
      </div>
    );
  });


storiesOf("Components / Icons", module).add("Color Icon", () => {
    return (
      <div style={{ margin: "100px" }}>
        <Icon color={"#65bd60"} icon={"icon-sqh-trash"} />
      </div>
    );
  });

storiesOf("Components / Icons", module).add("Large Icon", () => {
    return (
      <div style={{ margin: "100px" }}>
        <Icon fontSize={"32px"} icon={"icon-sqh-trash"} />
      </div>
    );
  });

storiesOf("Components / Icons", module).add("Salesforce Icon", () => {
    return (
      <div style={{ margin: "100px" }}>
        <Icon color={"black"} fontSize={"32px"} icon={"icon-sqh-salesforce"} />
      </div>
    );
  });