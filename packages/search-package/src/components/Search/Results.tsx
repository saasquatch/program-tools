import React from "react";
import styled from "styled-components";
import ItemView from "../SmallViews/ItemView";

const ItemsContainerDiv = styled.div<{sidebar?: boolean, query: string, background?: boolean}>`
  max-width: ${(props) => (props.sidebar ? "470px" : "1000px")};
  margin-top: var(--sq-spacing-large);
  min-height: ${(props) => (props.background && props.query && props.sidebar  && "20px")}; 
  padding: ${(props) => (props.background && props.query && props.sidebar  && "19px;")};
  margin-bottom: ${(props) => (props.background && props.query && props.sidebar  && "20px;")};
  background-color: ${(props) => (props.background && props.query && props.sidebar  && "#f5f5f5;")};
  border: ${(props) => (props.background && props.query && props.sidebar  && "1px solid #e3e3e3;")};
  -webkit-border-radius: ${(props) => (props.background && props.query && props.sidebar  && "4px;")};
  -moz-border-radius: ${(props) => (props.background && props.query && props.sidebar  && "4px;")};
  border-radius: ${(props) => (props.background && props.query && props.sidebar  && "4px;")};
  -webkit-box-shadow: ${(props) => (props.background && props.query && props.sidebar  && "inset 0 1px 1px rgba(0, 0, 0, 0.05);")};
  -moz-box-shadow: ${(props) => (props.background && props.query && props.sidebar  && "inset 0 1px 1px rgba(0, 0, 0, 0.05);")};
  box-shadow: ${(props) => (props.background && props.query && props.sidebar  && "inset 0 1px 1px rgba(0, 0, 0, 0.05);")};
`;

const PrevNextDiv = styled.div<{ sidebar?: boolean }>`
  max-width: ${(props) => (props.sidebar ? "470px" : "1000px")};
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.sidebar ? "right" : "center")};
`;

const PrevA = styled.a`
  color: #06966f;
  cursor: pointer;
  &:hover {
    color: #06966f;
  }
`;

const NextA = styled.a`
  color: #06966f;
  margin-left: var(--sq-spacing-medium);
  cursor: pointer;
  &:hover {
    color: #06966f;
  }
`;

const ContainerA = styled.a`
  display: flex;
  flex-direction: column;
  margin: 0;
  text-decoration: none !important;
  &:hover > div {
    text-decoration: none !important;
  }
`;

export interface ResultsProps {
  response: any;
  setStartIndex: any;
  query: string;
  onIsBlank: (str?: string) => boolean;
  sidebar?: boolean;
  background?: boolean;
  linkComponent?: React.ReactNode;
}

// @ts-ignore
export function Results(props: ResultsProps) {
  const { items, queries, searchInformation } = props.response;
  const { background = true } = props;

  return (
    <>
      <ItemsContainerDiv sidebar={props.sidebar} query={props.query} background={background}>
        {items &&
          items
            // @ts-ignore
            .filter((item) => item)
            // @ts-ignore
            .map((item, i) => (
              // getBreadcrumb(item.link)
              <ContainerA href={item.link}>
                <ItemView
                  item={item}
                />
              </ContainerA>
            ))}
            {items && (
        <p>
          {searchInformation.totalResults} total results found in{" "}
          {searchInformation.formattedSearchTime} seconds
        </p>
      )}
      <PrevNextDiv sidebar={props.sidebar}>
        {queries?.previousPage && (
          <PrevA
            onClick={() =>
              props.setStartIndex(queries.previousPage[0].startIndex)
            }
          >
            Previous
          </PrevA>
        )}

        {queries?.nextPage && (
          <NextA
            onClick={() => props.setStartIndex(queries.nextPage[0].startIndex)}
          >
            Next
          </NextA>
        )}
      </PrevNextDiv>

      {!props.sidebar && !items && props.onIsBlank(props.query) && (
        <div>
          <p>What are you looking for?</p>
        </div>
      )}
      {!items && !props.onIsBlank(props.query) && (
        <div>
          <h3>
            No matching Docs!
          </h3>
          <p>
            Looks like we couldn't find any Help Center page that matches your
            search term <strong>"{props.query}"</strong>
          </p>
        </div>
      )}
      </ItemsContainerDiv>
    </>
  );
}
