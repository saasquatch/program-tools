import React from "react";
import styled from "styled-components";
import {
  ColumnContainer,
  RowContainer,
  StyledHR,
  WidgetContainer,
} from "./Layouts";
import { H3, P } from "./Typography";
import { TextLink as TextButton } from "./TextButton";
import { Icon } from "./Icons";

const RequiredSpan = styled(H3)`
  color: #b5b5b5;
  font-weight: 400;
  white-space: pre;
  margin: 0;
`;

const DescriptionContainer = styled.div`
  margin-bottom: 15px;

  p {
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 13px;
    font-weight: normal;
    color: #575757;
  }
`

type LabelProps = {
  label: string | React.ReactElement;
  required: boolean;
  id: string;
};

type DefaultTemplateProps = {
  id: string;
  label: string | React.ReactElement;
  children: React.ReactNode;
  errors: React.ReactElement;
  help: React.ReactElement;
  description: string | React.ReactElement;
  hidden: boolean;
  required: boolean;
  displayLabel: boolean;
};

export const ActionsArrayTemplate = (props: any) => {
  return (
    <ColumnContainer className={props.className} gapSize={"20px"}>
      {props.items &&
        props.items.map((element: any, index: number) => {
          return (
            <WidgetContainer
              key={element.key}
              className={element.className}
              gapSize={"0px"}
            >
              <RowContainer
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                <H3 noMargin={true}>Action {index + 1}</H3>
                <RowContainer>
                  {element.hasMoveUp ? (
                    <TextButton
                      onClick={element.onReorderClick(
                        element.index,
                        element.index - 1
                      )}
                    >
                      <Icon
                        fontSize={"14px"}
                        color={"#7C7C7C"}
                        icon="icon-sqh-chevron-up"
                      />
                    </TextButton>
                  ) : (
                    <P noMargin={true} color={"#e2e2e2"}>
                      <Icon
                        fontSize={"14px"}
                        color={"#e2e2e2"}
                        icon="icon-sqh-chevron-up"
                      />
                    </P>
                  )}
                  {element.hasMoveDown ? (
                    <TextButton
                      onClick={element.onReorderClick(
                        element.index,
                        element.index + 1
                      )}
                    >
                      <Icon
                        fontSize={"14px"}
                        color={"#7C7C7C"}
                        icon="icon-sqh-chevron-down"
                      />
                    </TextButton>
                  ) : (
                    <P noMargin={true} color={"#e2e2e2"}>
                      <Icon
                        fontSize={"14px"}
                        color={"#e2e2e2"}
                        icon="icon-sqh-chevron-down"
                      />
                    </P>
                  )}
                  <TextButton onClick={element.onDropIndexClick(element.index)}>
                    Remove
                  </TextButton>
                </RowContainer>
              </RowContainer>
              <StyledHR style={{ marginTop: "20px", marginBottom: "-20px" }} />
              <div>{element.children}</div>
            </WidgetContainer>
          );
        })}

      {props.canAdd && (
        <TextButton orange={true} onClick={props.onAddClick} type="button">
          + Add Action
        </TextButton>
      )}
    </ColumnContainer>
  );
};

function Label(props: LabelProps) {
  const { label, required, id } = props;
  if (!label) {
    return null;
  }
  return (
    <div style={{ marginTop: "40px", marginBottom: "10px" }}>
      <label className="control-label" htmlFor={id} style={{marginBottom:"0px"}}>
        <H3 noMargin={true}>{label}</H3>
        {required && <RequiredSpan> (required)</RequiredSpan>}
      </label>
    </div>
  );
}

export function DefaultTemplate(props: DefaultTemplateProps) {
  const {
    id,
    label,
    children,
    errors,
    help,
    description,
    hidden,
    required,
    displayLabel,
  } = props;
  if (hidden) {
    return <div className="hidden">{children}</div>;
  }
  return (
    <div>
      {displayLabel && <Label label={label} required={required} id={id} />}
      {displayLabel && description ? (
        <DescriptionContainer>{description}</DescriptionContainer>
      ) : null}
      {children}
      {errors}
      {help}
    </div>
  );
}
