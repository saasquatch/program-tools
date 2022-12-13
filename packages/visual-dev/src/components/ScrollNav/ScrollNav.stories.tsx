import React from "react";
import { ScrollNavView } from "./ScrollNav";

export default {
  title: "Components / Scroll Nav",

  component: ScrollNavView,
};

const defaultProps = { currentSection: 1 };

const defaultItemProps = {
  onClick: () => console.log("click"),
};

export const Default = () => {
  return (
    <ScrollNavView {...defaultProps}>
      <ScrollNavView.ItemView {...defaultItemProps}>
        Item1
      </ScrollNavView.ItemView>
      <ScrollNavView.ItemView {...{ ...defaultItemProps, active: true }}>
        A very long nav item that breaks
      </ScrollNavView.ItemView>
      <ScrollNavView.ItemView {...defaultItemProps}>
        Item3
      </ScrollNavView.ItemView>
    </ScrollNavView>
  );
};

export const Section2 = () => {
  return (
    <ScrollNavView currentSection={2}>
      <ScrollNavView.ItemView {...defaultItemProps}>
        Item1
      </ScrollNavView.ItemView>
      <ScrollNavView.ItemView {...{ ...defaultItemProps, active: true }}>
        A very long nav item that breaks
      </ScrollNavView.ItemView>
      <ScrollNavView.ItemView {...defaultItemProps}>
        Item3
      </ScrollNavView.ItemView>
    </ScrollNavView>
  );
};

export const Section3 = () => {
  return (
    <ScrollNavView currentSection={3}>
      <ScrollNavView.ItemView {...defaultItemProps}>
        Item1
      </ScrollNavView.ItemView>
      <ScrollNavView.ItemView {...{ ...defaultItemProps, active: true }}>
        A very long nav item that breaks
      </ScrollNavView.ItemView>
      <ScrollNavView.ItemView {...defaultItemProps}>
        Item3
      </ScrollNavView.ItemView>
    </ScrollNavView>
  );
};
