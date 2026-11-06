import React from "react";
import styled from "styled-components";

export interface BreadcrumbLinkProps {
  link: string;
  linkName: string;
}

const BreadLink = styled.a`
  cursor: pointer;
  border: none;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  border: none;
  color: var(--sq-text-subdued);
  &:hover {
    color: #0088CC;
  }
  &:visited {
    color: #681DA8;
  }
  text-decoration: none;
  background: none;
  font-size: var( --sq-font-size-regular);
`;

const BreadcrumbLink = (props: BreadcrumbLinkProps) => {
  return <BreadLink href={props.link}>{props.linkName}</BreadLink>;
};

export default BreadcrumbLink;
