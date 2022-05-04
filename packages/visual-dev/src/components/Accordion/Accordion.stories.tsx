import React from "react";
import { AccordionView } from ".";
import { SwitchView } from "../Switch";

export default {
  title: "Components / Accordion",
  component: AccordionView,
};

export const Default = () => (
  <>
    <hr />
    <AccordionView
      heading="Test Title"
      description="This is a test description"
    >
      <p>
        A simple paragraph to test the accordion. <br></br> Look it has some
        height too!
      </p>
    </AccordionView>
    <hr />
  </>
);

export const NoDescription = () => (
  <>
    <hr />
    <AccordionView heading="Test Title">
      <p>
        A simple paragraph to test the accordion. <br></br> Look it has some
        height too!
      </p>
    </AccordionView>
    <hr />
  </>
);

export const WithSwitch = () => (
  <>
    <hr />
    <AccordionView
      heading={
        <span
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "var(--sq-spacing-x-small)",
          }}
        >
          This is a test title
          <SwitchView></SwitchView>
        </span>
      }
      description="This is a test description"
    >
      <p>
        A simple paragraph to test the accordion. <br></br> Look it has some
        height too!
      </p>
    </AccordionView>
    <hr />
  </>
);

export const CustomCSS = () => (
  <>
    <hr />
    <AccordionView customCSS={"background: Wheat"} heading="Test Title">
      <p>
        A simple paragraph to test the accordion. <br></br> Look it has some
        height too!
      </p>
    </AccordionView>
    <hr />
  </>
);
