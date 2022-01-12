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

const RequiredLabel = styled.span`
  ${Styles.RequiredLabel}
`;

export const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  const {
    idSchema,
    title,
    description,
    properties,
    required,
    uiSchema,
  } = props;
  return (
    <Container>
      <FrontMatterContainer>
        {(uiSchema["ui:title"] || title) && (
          <Title id={`${idSchema.$id}-title`}>
            {title}
            {required ? <RequiredLabel> (required)</RequiredLabel> : null}
          </Title>
        )}
        {description && (
          <Description id={`${idSchema.$id}-description`}>
            {description}
          </Description>
        )}
      </FrontMatterContainer>
      {properties.map((element: any, index: number) => (
        <FieldContainer className="property-wrapper" key={index}>
          {element.content}
        </FieldContainer>
      ))}
    </Container>
  );
};
