import React from "react";
import styled from "styled-components";
import { BreadcrumbLinkProps } from "../SmallViews/BreadcrumbLink";
import ItemView from "../SmallViews/ItemView";

const ItemsContainerDiv = styled.div`
  max-width: 1000px;
  margin-top: var(--sq-spacing-large);
`;

const PrevNextDiv = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
    onGetBreadcrumbs: (link: string) => Array<BreadcrumbLinkProps>;
    onIsBlank: (str?: string) => boolean;
}

// @ts-ignore
export function Results(props: ResultsProps) {
  const { items, queries, searchInformation } = props.response;
  console.log(props.response);

  return (
    <>
      <ItemsContainerDiv>
        {items &&
          items
            // @ts-ignore
            .filter((item) => item)
            // @ts-ignore
            .map((item, i) => (
              // getBreadcrumb(item.link)
              <ContainerA href={item.link}>
                <ItemView item={item} onGetBreadcrumbs={props.onGetBreadcrumbs} />
              </ContainerA>
            ))}
      </ItemsContainerDiv>

      {items && (
        <p>
          {searchInformation.totalResults} total results found in{" "}
          {searchInformation.formattedSearchTime} seconds
        </p>
      )}
      <PrevNextDiv>
        {queries?.previousPage && (
          <PrevA
            onClick={() => props.setStartIndex(queries.previousPage[0].startIndex)}
          >
            Previous
          </PrevA>
        )}

        {queries?.nextPage && (
          <NextA onClick={() => props.setStartIndex(queries.nextPage[0].startIndex)}>
            Next
          </NextA>
        )}
      </PrevNextDiv>

      {!items && props.onIsBlank(props.query) && (
        <div className="search-results-none text-center">
          <p className="lead">What are you looking for?</p>
        </div>
      )}
      {!items && !props.onIsBlank(props.query) && (
        <div className="search-results-none text-center">
          <h3 className="visible-desktop" style={{ paddingTop: "43px" }}>
            No matching Docs!
          </h3>
          <p className="lead">
            Looks like we couldn't find any Help Center page that matches your
            search term <strong>"{props.query}"</strong>
          </p>
        </div>
      )}
    </>
  );
}
