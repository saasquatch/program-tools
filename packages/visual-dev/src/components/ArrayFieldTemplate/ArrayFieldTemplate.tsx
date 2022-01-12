import { ArrayFieldTemplateProps } from "@rjsf/core";
import React from "react";
import styled from "styled-components";
import * as Styles from "./Styles";

export const Container = styled.div`
  ${Styles.Container}
`;

export const FieldContainer = styled.div`
  ${Styles.FieldContainer}
`;

export const Title = styled.label`
  ${Styles.Title}
`;

export const Description = styled.p`
  ${Styles.Description}
`;

export const FrontMatterContainer = styled.div`
  ${Styles.FrontMatterContainer}
`;

export const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  console.log(props);
  return <Container></Container>;
};
