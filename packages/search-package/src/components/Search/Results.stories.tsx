import React from "react";
import { Results, ResultsProps } from "./Results";
import { isBlank } from "./SearchFunctions";

export default {
  title: "Results",
  component: Results,
};

const defaultProps: ResultsProps = {
  response: {
    title: "test",
    items: [
      {
        cacheId: "test",
        displayLink: "docs.saasquatch.com",
        formattedUrl: "https://docs.saasquatch.com",
        htmlFormattedUrl: "https://docs.saasquatch.com",
        htmlSnippet: "Testing...",
        htmlTitle: "Test",
        kind: "customsearch#result",
        link: "https://docs.saasquatch.com",
        pagemap: "",
      },
			{
        cacheId: "test",
        displayLink: "docs.saasquatch.com",
        formattedUrl: "https://docs.saasquatch.com",
        htmlFormattedUrl: "https://docs.saasquatch.com",
        htmlSnippet: "Testing...",
        htmlTitle: "Test",
        kind: "customsearch#result",
        link: "https://docs.saasquatch.com/something/bread/",
        pagemap: "",
      },
			{
        cacheId: "test",
        displayLink: "docs.saasquatch.com",
        formattedUrl: "https://docs.saasquatch.com",
        htmlFormattedUrl: "https://docs.saasquatch.com",
        htmlSnippet: "Testing...",
        htmlTitle: "Test",
        kind: "customsearch#result",
        link: "https://docs.saasquatch.com",
        pagemap: "",
      },
    ],
    kind: "customsearch#search",
    searchInformation: {
      formattedSearchTime: "0.12",
      formattedTotalResults: "0",
      searchTime: 0.123753,
      totalResults: "0",
    },
  },
  setStartIndex: "",
  query: "test",
  onIsBlank: isBlank,
};

export const MultipleItems = () => {
  return <Results {...defaultProps} />;
};
