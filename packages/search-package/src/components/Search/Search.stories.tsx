import React from "react";
import Search, { SearchProps } from "./Search";
import { getBreadcrumbHook, isBlank } from './SearchFunctions'
import { useSearch } from "./UseSearch";

export default {
  title: "Search",
  component: Search,
};

export const Default = () => {
  const defaultProps: SearchProps = {
    onGetBreadcrumbs: getBreadcrumbHook,
    onIsBlank: isBlank,
    useSearch: useSearch()
  }

  return <Search {...defaultProps}/>;
};
