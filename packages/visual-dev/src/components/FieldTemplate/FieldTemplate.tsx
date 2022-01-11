import { FieldTemplateProps } from "@rjsf/core";
import React from "react";
import styled from "styled-components";
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

const Errors = styled.div`
  ${Styles.Errors}
`;

const RequiredLabel = styled.span`
  ${Styles.RequiredLabel}
`;

const Container = styled.div`
  ${Styles.Container}
`;

export const FieldTemplate = (props: FieldTemplateProps) => {
  const {
    id,
    classNames,
    label,
    help,
    required,
    description,
    errors,
    children,
    schema,
  } = props;
  const isCollection = schema.type === "object" || schema.type === "array";
  return (
    <Container className={classNames} id={id}>
      {!isCollection && (
        <Label htmlFor={id}>
          {label}
          {required ? <RequiredLabel> (required)</RequiredLabel> : null}
        </Label>
      )}
      {children}
      {!isCollection && (
        <>
          <Description>{description}</Description>
          <Errors>{errors}</Errors>
          <HelpText>{help}</HelpText>
        </>
      )}
    </Container>
  );
};
