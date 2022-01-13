import { ArrayFieldTemplateProps } from "@rjsf/core";
import React from "react";
import styled from "styled-components";
import { IconButton } from "../Button";
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

const ItemContainer = styled.div``;
const ItemContent = styled.div``;
const ItemButtons = styled.div``;
const ArrayContainer = styled.div``;

// Used in the two templates
const DefaultArrayItem = (props: any) => {
  return (
    <ItemContainer key={props.key}>
      <ItemContent>{props.children}</ItemContent>
      <ItemButtons>
        {props.hasToolbar && (
          <>
            {(props.hasMoveUp || props.hasMoveDown) && (
              <IconButton
                icon="chevron_up"
                disabled={props.disabled || props.readonly || !props.hasMoveUp}
                onClick={props.onReorderClick(props.index, props.index - 1)}
              />
            )}

            {(props.hasMoveUp || props.hasMoveDown) && (
              <IconButton
                icon="chevron_down"
                disabled={
                  props.disabled || props.readonly || !props.hasMoveDown
                }
                onClick={props.onReorderClick(props.index, props.index + 1)}
              />
            )}

            {props.hasRemove && (
              <IconButton
                icon="trash"
                disabled={props.disabled || props.readonly}
                onClick={props.onDropIndexClick(props.index)}
              />
            )}
          </>
        )}
      </ItemButtons>
    </ItemContainer>
  );
};

export const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  return (
    <Container>
      <FrontMatterContainer>
        <Title key={`array-field-title-${props.idSchema.$id}`}>
          {props.TitleField || props.uiSchema["ui:title"] || props.title}
          {props.required ? <RequiredLabel> (required)</RequiredLabel> : null}
        </Title>

        {(props.uiSchema["ui:description"] || props.schema.description) && (
          <Description key={`array-field-description-${props.idSchema.$id}`}>
            {props.DescriptionField ||
              props.uiSchema["ui:description"] ||
              props.schema.description}
          </Description>
        )}
      </FrontMatterContainer>
      <ArrayContainer key={`array-item-list-${props.idSchema.$id}`}>
        {props.items && props.items.map((p) => DefaultArrayItem(p))}

        {props.canAdd && (
          <IconButton
            icon="add"
            onClick={props.onAddClick}
            disabled={props.disabled || props.readonly}
          />
        )}
      </ArrayContainer>
    </Container>
  );
};
