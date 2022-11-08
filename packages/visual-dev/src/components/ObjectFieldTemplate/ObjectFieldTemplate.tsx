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

export const FieldsContainer = styled.div<{ customCSS?: any }>`
  ${(props) => props.customCSS}
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
      {(title || description) && (
        <FrontMatterContainer>
          {title && (
            <Title id={`${idSchema.$id}-title`}>
              {title}
              {required && <RequiredLabel> (required)</RequiredLabel>}
            </Title>
          )}
          {description && (
            <Description id={`${idSchema.$id}-description`}>
              {description}
            </Description>
          )}
        </FrontMatterContainer>
      )}
      <FieldsContainer customCSS={uiSchema["ui:options"]?.customCSS}>
        {properties.map((element: any, index: number) => (
          <FieldContainer className="property-wrapper" key={index}>
            {element.content}
          </FieldContainer>
        ))}
      </FieldsContainer>
    </Container>
  );
};
