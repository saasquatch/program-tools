import React from "react";
import styled from "styled-components";
import { InputView, RadioView } from "@saasquatch/visual-dev";
import { Results } from "./Results";
import { BreadcrumbLinkProps } from "../SmallViews/BreadcrumbLink";

const SearchContainerDiv = styled.div<{sidebar: boolean}>`
  max-width: ${(props) => (props.sidebar ? "470px" : "1000px")};
`;

const RadioContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const WellDiv = styled.div<{sidebar: boolean}>`
  min-height: ${(props) => (!props.sidebar && "20px")}; 
  padding: ${(props) => (!props.sidebar && "19px;")};
  text-align: center;
  margin-bottom: ${(props) => (!props.sidebar && "20px;")};
  background-color: ${(props) => (!props.sidebar && "#f5f5f5;")};
  border: ${(props) => (!props.sidebar && "1px solid #e3e3e3;")};
  -webkit-border-radius: ${(props) => (!props.sidebar && "4px;")};
  -moz-border-radius: ${(props) => (!props.sidebar && "4px;")};
  border-radius: ${(props) => (!props.sidebar && "4px;")};
  -webkit-box-shadow: ${(props) => (!props.sidebar && "inset 0 1px 1px rgba(0, 0, 0, 0.05);")};
  -moz-box-shadow: ${(props) => (!props.sidebar && "inset 0 1px 1px rgba(0, 0, 0, 0.05);")};
  box-shadow: ${(props) => (!props.sidebar && "inset 0 1px 1px rgba(0, 0, 0, 0.05);")};
`

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
      <section>
        <WellDiv sidebar={props.sidebar}>
          {!props.sidebar && <h3>Help Center Search</h3>}
            <form action="/search/">
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
          <div>
            <div>
              {!props.sidebar && !props.useSearch.response && (
                <div>
                  <h3>Searching Help Center...</h3>
                  <i></i>
                </div>
              )}
              {/* @ts-ignore */}
              {props.useSearch.response && props.useSearch.response.error && (
                <div>
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
        </WellDiv>
      </section>
    </>
  );
}
