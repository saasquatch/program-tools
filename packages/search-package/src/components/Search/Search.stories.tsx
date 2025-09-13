import React from "react";
import Search, { SearchProps } from "./Search";
import { isBlank } from './SearchFunctions'
import { useSearch } from "./UseSearch";

export default {
  title: "Search",
  component: Search,
};

export const Default = () => {
  const defaultProps: SearchProps = {
    onIsBlank: isBlank,
    useSearch: useSearch(),
    background: true
  }

  return <Search {...defaultProps}/>;
};

export const NoBackground = () => {
  const defaultProps: SearchProps = {
    onIsBlank: isBlank,
    useSearch: useSearch(),
  }

  return <Search {...defaultProps}/>;
};

export const MiniSearch = () => {
  const miniProps: SearchProps = {
    onIsBlank: isBlank,
    useSearch: useSearch(),
    sidebar: true,
  }

  return <Search {...miniProps}/>;
};

export const MiniSearchNoBackground = () => {
  const miniProps: SearchProps = {
    onIsBlank: isBlank,
    useSearch: useSearch(),
    sidebar: true,
    background: false
  }

  return <Search {...miniProps}/>;
};
