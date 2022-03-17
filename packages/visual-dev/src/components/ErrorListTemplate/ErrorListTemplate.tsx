import { ErrorListProps } from "@rjsf/core";
import React from "react";
import styled from "styled-components";
import { Alert } from "../Alert";
import * as Styles from "./Styles";

const Errors = styled.ul`
  ${Styles.Errors}
`;

const Container = styled.div`
  ${Styles.Container}
`;

const ErrorItem = styled.li`
  ${Styles.ErrorItem}
`;

export const ErrorListTemplate = (props: ErrorListProps) => {
  const { errors } = props;
  return (
    <Container>
      <Alert type="critical" title="Error List">
        <Errors>
          {errors.map((error) => (
            <ErrorItem key={error.stack}>{error.stack}</ErrorItem>
          ))}
        </Errors>
      </Alert>
    </Container>
  );
};

ErrorListTemplate.Container = Container;
ErrorListTemplate.List = Errors;
ErrorListTemplate.Item = ErrorItem;
