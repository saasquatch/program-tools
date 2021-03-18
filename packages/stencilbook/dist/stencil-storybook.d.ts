import { h as StencilH, FunctionalComponent, VNode } from "@stencil/core";
import * as Hooks from "@saasquatch/stencil-hooks";
/**
 *
 * Based on Component Story Format (CSF)
 *
 * For portability: https://storybook.js.org/docs/web-components/api/csf
 *
 */
export declare type StorybookDefaultExport = {
    title: string;
    component: FunctionalComponent;
    decorators?: unknown[];
    parameters?: {};
};
export declare type SubStories = {
    [name: string]: SubStory;
};
declare type SubStory = FunctionalComponent & SubStoryFields;
declare type SubStoryFields = {
    storyName?: string;
    decorators?: unknown[];
    parameters?: {};
};
export declare type Return = {
    class: string;
    children: VNode;
    View: FunctionalComponent<{}>;
    selected: Selection;
};
declare type Selection = {
    key: string;
    story: SubStory;
};
export declare function useStencilbook(imports: unknown[], { h, hooks, title, }: {
    h?: typeof StencilH;
    hooks?: typeof Hooks;
    title?: string;
}): Return;
export {};
