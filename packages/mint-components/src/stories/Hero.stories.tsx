import { h } from "@stencil/core";
import { HeroView } from "../components/sqm-hero/sqm-hero-view";

export default {
  title: "Hero Layout",
  parameters: {
    //   scenario,
  },
};

export const SimpleOneColumn = () => {
  const props = {
    states: {
      columns: 1 as const,
    },
    content: {},
  };
  return (
    <HeroView {...props}>
      <div>test</div>
    </HeroView>
  );
};

export const OneColumnWithImage = () => {
  return <div></div>;
};

export const SimpleTwoColumn = () => {
  const props = {
    states: {
      columns: 2 as const,
    },
    content: { leftColumn: <div>test1</div>, rightColumn: <div>test2</div> },
  };
  return <HeroView {...props}></HeroView>;
};
