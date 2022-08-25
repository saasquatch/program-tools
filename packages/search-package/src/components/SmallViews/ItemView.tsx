import React from "react";
import styled from "styled-components";
import BreadcrumbLink, { BreadcrumbLinkProps } from "./BreadcrumbLink";

export interface ItemViewProps {
  item: {
    cacheId: string;
    displayLink: string;
    formattedUrl: string;
    htmlSnippet: string;
    htmlTitle: string;
    kind: string;
    link: string;
    pagemap: any;
    snippet: string;
    title: string;
  };
  onGetBreadcrumbs: (link: string) => Array<BreadcrumbLinkProps>;
}

const ItemContainerDiv = styled.div`
  padding: var(--sq-spacing-large) var(--sq-spacing-x-small);
  border-bottom: 1px solid var(--sq-border);
  &:hover {
    cursor: pointer;
    /* h3 {
      color: #06966F;
    } */
    background-color: #E7EDEE;
  }
`;

const TitleDiv = styled.h3`
  margin: 0;
  font-weight: bold;
  color: var(--sq-text);
  margin-bottom: var(--sq-spacing-xxsmall);
`;

const DescriptionDiv = styled.div`
  font-size: 15px;
  overflow-wrap: break-word;
  color: var(--sq-text);
`;

const BreadcrumbContainerDiv = styled.div`
  display: row;
  flex-direction: column;
  margin-bottom: var(--sq-spacing-small);
`;

const ItemView = (props: ItemViewProps) => {
  return (
    <ItemContainerDiv>
      <TitleDiv
        dangerouslySetInnerHTML={{
          __html: props.item.htmlTitle,
        }}
      ></TitleDiv>
      <BreadcrumbContainerDiv>
        {props.onGetBreadcrumbs(props.item.link).map((item) => {
          return <BreadcrumbLink {...item} />;
        })}
      </BreadcrumbContainerDiv>
      <DescriptionDiv
        dangerouslySetInnerHTML={{
          __html: props.item.htmlSnippet,
        }}
      ></DescriptionDiv>
    </ItemContainerDiv>
  );
};

export default ItemView;
