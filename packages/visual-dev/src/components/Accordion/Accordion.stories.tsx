import React from "react";
import { AccordionView } from ".";

export default {
  title: "Components / Accordion",
  component: AccordionView,
};

export const Default = () => (
  <>
    <hr />
    <AccordionView title="Test Title" description="This is a test description">
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
    <AccordionView title="Test Title">
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
    <AccordionView customCSS={"background: Wheat"} title="Test Title">
      <p>
        A simple paragraph to test the accordion. <br></br> Look it has some
        height too!
      </p>
    </AccordionView>
    <hr />
  </>
);
