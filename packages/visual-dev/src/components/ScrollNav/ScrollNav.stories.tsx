import React from "react";
import { ScrollNavView } from ".";

export default {
  title: "Components / Scroll Nav",

  component: ScrollNavView,
};

export const Default = () => {
  return (
    <ScrollNavView currentSection={1}>
      <ScrollNavView.ItemView
        onClick={() => console.log("Scrolling to section")}
      >
        Item1
      </ScrollNavView.ItemView>
      <ScrollNavView.ItemView
        onClick={() => console.log("Scrolling to section")}
      >
        A very long nav item that breaks
      </ScrollNavView.ItemView>
      <ScrollNavView.ItemView
        onClick={() => console.log("Scrolling to section")}
      >
        Item3
      </ScrollNavView.ItemView>
    </ScrollNavView>
  );
};

export const OnSection2 = () => {
  return (
    <ScrollNavView currentSection={2}>
      <ScrollNavView.ItemView
        onClick={() => console.log("Scrolling to section")}
      >
        Item1
      </ScrollNavView.ItemView>
      <ScrollNavView.ItemView
        onClick={() => console.log("Scrolling to section")}
      >
        A very long nav item that breaks
      </ScrollNavView.ItemView>
      <ScrollNavView.ItemView
        onClick={() => console.log("Scrolling to section")}
      >
        Item3
      </ScrollNavView.ItemView>
    </ScrollNavView>
  );
};

export const CustomCSS = () => {
  return (
    <ScrollNavView
      currentSection={3}
      customCSS={{ width: "300px", maxWidth: "unset" }}
    >
      <ScrollNavView.ItemView
        onClick={() => console.log("Scrolling to section")}
      >
        Item1
      </ScrollNavView.ItemView>
      <ScrollNavView.ItemView
        onClick={() => console.log("Scrolling to section")}
      >
        A very long nav item that breaks
      </ScrollNavView.ItemView>
      <ScrollNavView.ItemView
        onClick={() => console.log("Scrolling to section")}
        customCSS={{ backgroundColor: "pink" }}
      >
        Item3
      </ScrollNavView.ItemView>
    </ScrollNavView>
  );
};
