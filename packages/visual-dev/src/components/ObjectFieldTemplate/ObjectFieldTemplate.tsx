import { ObjectFieldTemplateProps } from "@rjsf/core";
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

export const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  return (
    <Container>
      <FrontMatterContainer>
        <Title>{props.title}</Title>
        <Description>{props.description}</Description>
      </FrontMatterContainer>
      {props.properties.map((element) => (
        <FieldContainer className="property-wrapper">
          {element.content}
        </FieldContainer>
      ))}
    </Container>
  );
};
