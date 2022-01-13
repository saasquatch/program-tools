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

const Errors = styled.ul`
  ${Styles.Errors}
`;

const RequiredLabel = styled.span`
  ${Styles.RequiredLabel}
`;

const Container = styled.div`
  ${Styles.Container}
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
  } = props;
  const isCollection = schema.type === "object" || schema.type === "array";
  return (
    <Container className={classNames} id={id}>
      {!isCollection && (
        <Label htmlFor={id} id={`${id}-title`}>
          {label}
          {required ? <RequiredLabel> (required)</RequiredLabel> : null}
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
                return <ErrorItem key={error}>{error}</ErrorItem>;
              })}
            </Errors>
          )}
        </>
      )}
    </Container>
  );
};
