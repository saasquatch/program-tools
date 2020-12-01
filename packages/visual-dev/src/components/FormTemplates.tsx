import React from "react";
import { H3, P } from "./Typography";
import { TextLink as TextButton } from "./TextButton";
import {
  ColumnContainer,
  RowContainer,
  StyledHR,
  WidgetContainer,
} from "./Layouts";
import { Icon } from "./Icons";
import styled from "styled-components";

const RequiredSpan = styled(H3)`
  color: #e2e2e2;
  font-weight: 400;
  white-space: pre;
`;

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
          console.log("EL", element);
          return (
            <WidgetContainer
              key={element.key}
              className={element.className}
              gapSize={"40px"}
            >
              <RowContainer style={{ width: "100%", justifyContent:"space-between"}}>
                <H3 noMargin={true}>Action {index + 1}</H3>
                <RowContainer>
                  {element.hasMoveUp ? (
                    <TextButton
                      onClick={element.onReorderClick(
                        element.index,
                        element.index - 1
                      )}
                    >
                      <Icon fontSize={"14px"} color={"#7C7C7C"} icon="icon-sqh-chevron-up" />
                    </TextButton>
                  ) : (
                    <P noMargin={true} color={"#e2e2e2"}>
                      <Icon fontSize={"14px"} color={"#e2e2e2"} icon="icon-sqh-chevron-up" />
                    </P>
                  )}
                  {element.hasMoveDown ? (
                    <TextButton
                      onClick={element.onReorderClick(
                        element.index,
                        element.index + 1
                      )}
                    >
                      <Icon fontSize={"14px"} color={"#7C7C7C"} icon="icon-sqh-chevron-down" />
                    </TextButton>
                  ) : (
                    <P noMargin={true} color={"#e2e2e2"}>
                      <Icon fontSize={"14px"} color={"#e2e2e2"} icon="icon-sqh-chevron-down" />
                    </P>
                  )}
                  <TextButton onClick={element.onDropIndexClick(element.index)}>
                    Remove
                  </TextButton>
                </RowContainer>
              </RowContainer>
              <StyledHR />
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
    <label className="control-label" htmlFor={id}>
      <H3>{label}</H3>
      {required && <RequiredSpan> (required)</RequiredSpan>}
    </label>
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
      {displayLabel && description ? description : null}
      {children}
      {errors}
      {help}
    </div>
  );
}