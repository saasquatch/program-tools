import { h as StencilH, FunctionalComponent, VNode } from "@stencil/core";
import * as Hooks from "@saasquatch/stencil-hooks";

import startCase from "lodash.startcase";
import { Style } from "./stencil-storybook.styles";
import { css } from "@emotion/css";
import { organiseStories } from "./organiseStories";
import {
  StorybookDefaultExport,
  SubStories,
  AddOn,
  OrganisedStoryWithSubs,
  StoryWithSubs,
  Selection,
} from ".";

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

export function useStencilbook(
  imports: unknown[],
  {
    h = StencilH,
    hooks = Hooks,
    title = "Stencilbook",
    addons = [],
  }: {
    h?: typeof StencilH;
    hooks?: typeof Hooks;
    title?: string;
    addons?: AddOn[];
  }
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
  function setSelected(
    story: FunctionalComponent,
    key: string,
    parent: StorybookDefaultExport,
    label: string
  ) {
    setSelectedInternal({
      key,
      story,
      parent,
      label,
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

  const InnerFn = ({ selected }: { selected: Selection }) => {
    const Component = addons.reduce<FunctionalComponent>((PrevFn, AddOnFn) => {
      return () => (
        <AddOnFn
          story={{
            ...selected,
          }}
        >
          <PrevFn />
        </AddOnFn>
      );
    }, selected?.story);
    return <Component />;
  };

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
                              const key = group + "/" + subKey;
                              const subStory = s.subs[subKey];
                              const subStoryView = () => <subStory />;
                              const label =
                                subStory.storyName || startCase(subKey);
                              return (
                                <div
                                  class={`subStory ${
                                    selectedKey === key ? "selected" : ""
                                  }`}
                                >
                                  <a
                                    onClick={() =>
                                      setSelected(subStory, key, s.story, label)
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
            <h3>{Selected.label}</h3>
            <InnerFn selected={Selected} />
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
