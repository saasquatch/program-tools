import { h as StencilH, FunctionalComponent, VNode } from "@stencil/core";
import { useState, useMemo, useEffect } from "@saasquatch/universal-hooks";

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
    title = "Stencilbook",
    homepage = <h3>Select a story!</h3>,
    addons = [],
  }: {
    h?: typeof StencilH;
    title?: string;
    homepage?: VNode;
    addons?: AddOn[];
  }
): Return {
  const stories: OrganisedStoryWithSubs = useMemo(
    () =>
      imports
        .map(loadStory)
        .reduce(organiseStories, { _: [] as StoryWithSubs[] }),
    imports
  );

  const urlStoryKey = decodeURIComponent(window.location.hash).replace("#", "");
  const [Selected, setSelectedInternal] = useState<Selection>(
    getStoryFromKey(urlStoryKey)
  );
  const selectedKey = Selected?.key;
  const [layout, setLayout] = useState<Layout>("desktop");
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [darkCanvas, setDarkCanvas] = useState<boolean>(false);

  function getStoryFromKey(key?: string) {
    if (!key) return undefined;

    const keys = decodeURIComponent(key).split("-");
    const group = keys[0];
    const parentTitle = keys[1];
    const subKey = keys[2];

    const s = stories[group]?.find(
      (element) => element.story.title === parentTitle
    );
    const subStory = s.subs[subKey];
    return {
      key,
      story: subStory,
      parent: s?.story,
      label: subStory?.name,
    };
  }
  function setSelectedStory(key: string) {
    window.location.hash = encodeURIComponent(key);
    setSelectedInternal(getStoryFromKey(key));
  }

  const WidthSelector = () => {
    // Not the best way to display these buttons but don't wanna put too much time
    return (
      <div class="dynamic-display-wrapper">
        <button
          class={darkCanvas ? "active" : ""}
          onClick={() => setDarkCanvas((isDark) => !isDark)}
        >
          Toggle Dark Background
        </button>
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

  const GoHome = () => {
    setSelectedInternal(undefined);
  };

  const View = () => (
    <div class="story-book-outer-div">
      <div class={`story-div ${!showSidebar ? hide : ""}`}>
        <div class="header" onClick={() => GoHome()}>
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
                              const key = `${group}-${s.story.title}-${subKey}`;
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
                                  <a onClick={() => setSelectedStory(key)}>
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
        {!selectedKey && homepage}
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
