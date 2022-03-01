import { Scroll } from "./sqm-scroll";

const REVEAL_EVENT = "sq:reveal";

export function useScroll(props: Scroll) {
  const { scrollTagName, scrollId } = props;
  async function scroll() {
    const element = document?.querySelector(scrollTagName || `#${scrollId}`);
    element.dispatchEvent(
      new CustomEvent(REVEAL_EVENT, {
        detail: scrollTagName || `#${scrollId}`,
        bubbles: true,
        composed: true,
      })
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    element.scrollIntoView({ behavior: props.scrollAnimation });
  }

  return {
    callbacks: { scroll },
  };
}
