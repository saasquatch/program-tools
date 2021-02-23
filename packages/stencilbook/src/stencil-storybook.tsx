import { h as StencilH, FunctionalComponent, VNode } from "@stencil/core";
import * as Hooks from "@saasquatch/stencil-hooks";

import startCase from "lodash.startcase";
import { Style } from "./stencil-storybook.styles";
import { css } from "@emotion/css";

function organiseStories(
  prev: OrganisedStoryWithSubs,
  curr: StoryWithSubs
): OrganisedStoryWithSubs {
  const splitTitle = curr.story.title.split("/");
  const group = splitTitle[1] ? splitTitle[0] : "_";
  const title = splitTitle[1] || splitTitle[0];

  return {
    ...prev,
    [group]: [
      ...(prev[group] || []),
      {
        story: {
          ...curr.story,
          title,
        },
        subs: curr.subs,
      },
    ].sort((a, b) => a.story.title.localeCompare(b.story.title)),
  };
}
/**
 *
 * Based on Component Story Format (CSF)
 *
 * For portability: https://storybook.js.org/docs/web-components/api/csf
 *
 */
export type StorybookDefaultExport = {
  title: string;
  component: FunctionalComponent;
  decorators?: unknown[];
  parameters?: {};
};
export type SubStories = {
  [name: string]: SubStory;
};
type SubStory = FunctionalComponent & SubStoryFields;
type SubStoryFields = {
  storyName?: string;
  decorators?: unknown[];
  parameters?: {};
};
type StoryWithSubs = {
  story: StorybookDefaultExport;
  subs?: SubStories;
};
type OrganisedStoryWithSubs = {
  [key: string]: StoryWithSubs[];
};

function loadStory(imps: any) {
  // TODO: Validate if something doesn't export things in Component Story Format (CSF)
  const { default: defaultStory, ...rest } = imps;
  return {
    story: defaultStory as StorybookDefaultExport,
    subs: rest as SubStories,
  };
}

type Layout = "desktop" | "tablet" | "mobile";

export type Return = {
  class: string;
  children: VNode;
  View: FunctionalComponent<{}>;
  selected: Selection;
};

type Selection = {
  key: string;
  story: SubStory;
};

export function useStencilbook(
  imports: unknown[],
  {
    h = StencilH,
    hooks = Hooks,
    title = "Stencilbook",
  }: { h?: typeof StencilH; hooks?: typeof Hooks; title?: string }
): Return {
  const stories: OrganisedStoryWithSubs = hooks.useMemo(
    () =>
      imports
        .map(loadStory)
        .reduce(organiseStories, { _: [] as StoryWithSubs[] }),
    imports
  );

  const [Selected, setSelectedInternal] = hooks.useState<Selection>(undefined);
  const selectedKey = Selected?.key;
  const [layout, setLayout] = hooks.useState<Layout>("desktop");
  const [showSidebar, setShowSidebar] = hooks.useState<boolean>(true);
  const [darkCanvas, setDarkCanvas] = hooks.useState<boolean>(false);
  function setSelected(story: FunctionalComponent, key: string) {
    setSelectedInternal({
      key,
      story,
    });
  }
  const WidthSelector = () => {
    // Not the best way to display these buttons but don't wanna put too much time
    return (
      <div class="dynamic-display-wrapper">
        <div class="button-wrapper">
          <button
            class={layout === "desktop" ? "active" : ""}
            onClick={() => setLayout("desktop")}
          >
            Desktop
          </button>
          <button
            class={layout === "tablet" ? "active" : ""}
            onClick={() => setLayout("tablet")}
          >
            Tablet
          </button>
          <button
            class={layout === "mobile" ? "active" : ""}
            onClick={() => setLayout("mobile")}
          >
            Mobile
          </button>
        </div>
        <p>
          Note: Currently doesn't test breakpoints, use the native tester for
          now
        </p>
        <hr />
        <button
          class={darkCanvas ? "active" : ""}
          onClick={() => setDarkCanvas((isDark) => !isDark)}
        >
          Toggle Dark Background
        </button>
        <hr />
        <button
          class={showSidebar ? "active" : ""}
          onClick={() => setShowSidebar((isshown) => !isshown)}
        >
          Toggle Sidebar
        </button>
      </div>
    );
  };

  // Mobile/tablet widths are based on avocode designs
  const containerWidth =
    layout === "mobile" ? "375px" : layout === "tablet" ? "768px" : "1124px";
  const responsiveWidth = css`
    max-width: ${containerWidth};
    margin-left: ${showSidebar ? "250px" : "0px"};
  `;

  const hide = css`
    display: none;
  `;

  if (darkCanvas) {
    document.body.style.backgroundColor = "#232323";
  } else {
    document.body.style.backgroundColor = "#fafafa";
  }

  const View = () => (
    <div class="story-book-outer-div">
      <div class={`story-div ${!showSidebar ? hide : ""}`}>
        <div class="header">
          <h2>{title}</h2>
        </div>
        <ul class="parentStoryList">
          {Object.keys(stories)
            .sort()
            .map((group) => {
              return (
                <div class="group-wrapper">
                  {group !== "_" && <h4 class="group-header">{group}</h4>}
                  {stories[group].map((s) => {
                    return (
                      <li class="parentStory">
                        <details style={{ marginBottom: "10px" }}>
                          <summary style={{ outline: "none" }}>
                            {s.story.title}
                          </summary>
                          {s.subs &&
                            Object.keys(s.subs).map((subKey) => {
                              const subStory = s.subs[subKey];
                              const subStoryView = () => <subStory />;
                              const label =
                                subStory.storyName || startCase(subKey);
                              return (
                                <div
                                  class={`subStory ${
                                    selectedKey === subKey ? "selected" : ""
                                  }`}
                                >
                                  <a
                                    onClick={() =>
                                      setSelected(subStory, subKey)
                                    }
                                  >
                                    {label}
                                  </a>
                                </div>
                              );
                            })}
                        </details>
                      </li>
                    );
                  })}
                </div>
              );
            })}
        </ul>
      </div>
      <WidthSelector />
      <div class={`component ${responsiveWidth}`}>
        {!selectedKey && <h3>Select a story!</h3>}
        {selectedKey && (
          <div>
            {/* <pre>{selected.specs}</pre> */}
            <h3>{Selected.story.storyName || startCase(selectedKey)}</h3>
            <Selected.story />
          </div>
        )}
      </div>
    </div>
  );

  return {
    class: Style,
    children: <View />,
    View,
    selected: Selected,
  };
}
