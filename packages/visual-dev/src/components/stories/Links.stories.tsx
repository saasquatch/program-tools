import { storiesOf } from "@storybook/react";
import React from "react";
import { Link } from "../Links";

storiesOf("Components / Links", module).add("Text Link", () => {
  return (
    <div style={{ margin: "100px" }}>
      <Link>This is a text link</Link>
    </div>
  );
});

storiesOf("Components / Links", module).add("Text Link Blue", () => {
  return (
    <div style={{ margin: "100px" }}>
      <Link blue={true}>This is a blue text link</Link>
    </div>
  );
});

storiesOf("Components / Links", module).add("Text Link Bold", () => {
  return (
    <div style={{ margin: "100px" }}>
      <Link bold={true}>This is a bold text link</Link>
    </div>
  );
});

storiesOf("Components / Links", module).add("Text Link Blue Bold", () => {
  return (
    <div style={{ margin: "100px" }}>
      <Link blue={true} bold={true}>This is a bold blue text link</Link>
    </div>
  );
});