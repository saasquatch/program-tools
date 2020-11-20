import { storiesOf } from "@storybook/react";
import React from "react";
import { AttributeHeading, H1, H2, H3, P, WidgetTitle } from "../Typography";

storiesOf("Components / Typography", module).add("Header 1", () => {
  return (
    <div style={{ margin: "100px" }}>
      <H1>This is a H1</H1>
    </div>
  );
});

storiesOf("Components / Typography", module).add("Header 2", () => {
  return (
    <div style={{ margin: "100px" }}>
      <H2>This is a H2</H2>
    </div>
  );
});

storiesOf("Components / Typography", module).add("Header 3", () => {
  return (
    <div style={{ margin: "100px" }}>
      <H3>This is a H3</H3>
    </div>
  );
});

storiesOf("Components / Typography", module).add("Paragraph", () => {
  return (
    <div style={{ margin: "100px" }}>
      <P>This is a P</P>
    </div>
  );
});

storiesOf("Components / Typography", module).add("Paragraph no margin", () => {
  return (
    <div style={{ margin: "100px" }}>
      <P noMargin={true}>This is a P without margins</P>
    </div>
  );
});

storiesOf("Components / Typography", module).add("Attribute heading", () => {
  return (
    <div style={{ margin: "100px" }}>
      <AttributeHeading >This is an attribute heading</AttributeHeading>
    </div>
  );
});

storiesOf("Components / Typography", module).add("Widget title", () => {
  return (
    <div style={{ margin: "100px" }}>
      <WidgetTitle >This is an widget title</WidgetTitle>
    </div>
  );
});

