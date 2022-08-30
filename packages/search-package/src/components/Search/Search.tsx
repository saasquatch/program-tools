import React from "react";
import styled from "styled-components";
import { InputView, RadioView } from "@saasquatch/visual-dev";
import { Results } from "./Results";
import { BreadcrumbLinkProps } from "../SmallViews/BreadcrumbLink";

const SearchContainerDiv = styled.div<{sidebar: boolean}>`
  max-width: ${(props) => (props.sidebar ? "300px" : "1000px")};
`;

const RadioContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export interface useSearchProps {
  response: any;
  query: string;
  setQuery: (newValue: string) => void;
  cat: string;
  setCat: (cat: string) => void;
  setStartIndex: (startIndex: any) => void;
}

export interface SearchProps {
  /**
   * Pass in getBreadcrum function, or a function to create a breadcrumb changed
   */
  onGetBreadcrumbs: (link: string) => Array<BreadcrumbLinkProps>;
  /**
   * Pass in isBlank function to check if query is blank
   */
  onIsBlank: (str?: string) => boolean;
  /**
   * Pass in useSearch function in here
   */
  useSearch: useSearchProps;
  /**
   * If sidebar is true, it'll be mini and remove radio buttons
   */
  sidebar: boolean;
}

export default function Search(props: SearchProps) {
  if (typeof document === "undefined") {
    return <div />;
  }
  console.log(props.sidebar);
  return (
    <>
      <section className="page" id="js-docs-search-results">
        <div className="well search-page">
          <div className="row-fluid text-center">
          {!props.sidebar &&<h3>Help Center Search</h3>}
            <form className="js-search-form form-search" action="/search/">
              <SearchContainerDiv sidebar={props.sidebar}>
                <InputView
                  customCSS={"margin-bottom: var(--sq-spacing-medium);"}
                  limitWidth="false"
                  icon="search"
                  position="left"
                  value={props.useSearch.query}
                  onChange={(e: any) =>
                    props.useSearch.setQuery(e.target.value)
                  }
                />
                {!props.sidebar && (
                  <RadioContainerDiv>
                    <RadioView
                      css=""
                      customLabelCSS="margin-left: 0px; margin-right: 35px;"
                      label="All"
                      value={props.useSearch.cat === "" ? true : false}
                      onChange={() => props.useSearch.setCat("")}
                    />
                    <RadioView
                      css=""
                      customLabelCSS="margin-left: 0px; margin-right: 35px;"
                      label="Developer"
                      value={
                        props.useSearch.cat === "developerCenter" ? true : false
                      }
                      onChange={() => props.useSearch.setCat("developerCenter")}
                    />
                    <RadioView
                      css=""
                      customLabelCSS="margin-left: 0px; margin-right: 35px;"
                      label="Success"
                      value={
                        props.useSearch.cat === "successCenter" ? true : false
                      }
                      onChange={() => props.useSearch.setCat("successCenter")}
                    />
                    <RadioView
                      css=""
                      label="Designer"
                      value={
                        props.useSearch.cat === "designerCenter" ? true : false
                      }
                      onChange={() => props.useSearch.setCat("designerCenter")}
                    />
                  </RadioContainerDiv>
                )}
              </SearchContainerDiv>
            </form>
          </div>
          <div className="row-fluid">
            <div id="pretty-results" className="search-results">
              {!props.sidebar && !props.useSearch.response && (
                <div className="text-center search-spinner">
                  <h3>Searching Help Center...</h3>
                  <i className="fa fa-spinner fa-spin fa-5x"></i>
                </div>
              )}
              {/* @ts-ignore */}
              {props.useSearch.response && props.useSearch.response.error && (
                <div className="text-center">
                  {/* @ts-ignore */}
                  <h3>{props.useSearch.response.error.message}</h3>
                </div>
              )}
              {/* @ts-ignore */}
              {props.useSearch.response && !props.useSearch.response.error && (
                <Results
                  response={props.useSearch.response}
                  setStartIndex={props.useSearch.setStartIndex}
                  query={props.useSearch.query}
                  onGetBreadcrumbs={props.onGetBreadcrumbs}
                  onIsBlank={props.onIsBlank}
                  sidebar={props.sidebar}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
