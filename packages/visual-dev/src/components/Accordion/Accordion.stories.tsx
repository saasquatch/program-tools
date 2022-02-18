import React from "react";
import { Accordion } from ".";

export default {
  title: "Components / Accordion",
  component: Accordion,
};

export const Default = () => (
  <>
    <hr />
    <Accordion title="Test Title" description="This is a test description">
      <p>
        A simple paragraph to test the accordion. <br></br> Look it has some
        height too!
      </p>
    </Accordion>
    <hr />
  </>
);
