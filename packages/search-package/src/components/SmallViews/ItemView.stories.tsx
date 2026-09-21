import React from "react";
import { getBreadcrumb } from "../Search/SearchFunctions";
import ItemView, { ItemViewProps } from "./ItemView";


export default {
  title: "Item",
  component: ItemView,
};

const defaultProps: ItemViewProps = {
    item: {
        cacheId: "test",
        displayLink: "docs.saasquatch.com",
        formattedUrl: "https://docs.saasquatch.com",
        htmlSnippet: "Testing...",
        htmlTitle: "Test",
        kind: "customsearch#result",
        link: "https://docs.saasquatch.com/Test/Test/",
        pagemap: "",
        snippet: "",
        title: ""
    },
    onGetBreadcrumbs: getBreadcrumb
}

export const OneItem = () => {
    return <ItemView {...defaultProps}/>
}