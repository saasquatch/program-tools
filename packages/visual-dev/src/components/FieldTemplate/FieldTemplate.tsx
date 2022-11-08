import { FieldTemplateProps } from "@rjsf/core";
import React from "react";
import styled, { CSSProp } from "styled-components";
import { IconView } from "../Icon";
import * as Styles from "./Styles";

const Label = styled.label`
  ${Styles.Label}
`;

const Description = styled.div`
  ${Styles.Description}
`;

const HelpText = styled.div`
  ${Styles.HelpText}
`;

const Errors = styled.ul`
  ${Styles.Errors}
`;

const RequiredLabel = styled.span`
  ${Styles.RequiredLabel}
`;

const Container = styled.div<{ customCSS?: any }>`
  ${Styles.Container}
  ${(props) => props.customCSS}
`;

const ErrorItem = styled.li`
  ${Styles.ErrorItem}
`;

export const FieldTemplate = (props: FieldTemplateProps) => {
  const {
    id,
    classNames,
    label,
    help,
    required,
    description,
    children,
    schema,
    rawErrors,
    uiSchema,
  } = props;
  const isCollection = schema.type === "object" || schema.type === "array";
  return (
    <Container
      customCSS={uiSchema["ui:options"]?.customCSS}
      className={classNames}
      id={id}
    >
      {!isCollection && label && (
        <Label htmlFor={id} id={`${id}-title`}>
          {label}
          {required && <RequiredLabel> (required)</RequiredLabel>}
        </Label>
      )}
      {children}

      {!isCollection && (
        <>
          <Description id={`${id}-description`}>{description}</Description>
          <HelpText id={`${id}-help`}>{help}</HelpText>
          {rawErrors?.length > 0 && (
            <Errors id={`${id}-errors`}>
              {rawErrors.map((error: string) => {
                return (
                  <ErrorItem key={error}>
                    <IconView icon="info" size="15px" />
                    <span>{error}</span>
                  </ErrorItem>
                );
              })}
            </Errors>
          )}
        </>
      )}
    </Container>
  );
};

FieldTemplate.Label = Label;
FieldTemplate.Description = Description;
FieldTemplate.HelpText = HelpText;
FieldTemplate.Errors = Errors;
FieldTemplate.Container = Container;
FieldTemplate.ErrorItem = ErrorItem;
FieldTemplate.RequiredLabel = RequiredLabel;
