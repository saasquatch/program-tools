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

const ItemContainer = styled.div`
  ${Styles.ItemContainer}
`;
const ItemContent = styled.div`
  ${Styles.ItemContent}
`;
const ItemButtons = styled.div`
  ${Styles.ItemButtons}
`;
const ArrayContainer = styled.div`
  ${Styles.ArrayContainer}
`;

// Used in the two templates
const DefaultArrayItem = (props: any) => {
  const {
    key,
    children,
    hasToolbar,
    hasMoveDown,
    hasMoveUp,
    hasRemove,
    disabled,
    readonly,
    index,
    onReorderClick,
    onDropIndexClick,
  } = props;
  return (
    <ItemContainer key={key}>
      <ItemContent>{children}</ItemContent>
      <ItemButtons>
        {hasToolbar && (
          <>
            {(hasMoveUp || hasMoveDown) && (
              <IconButton
                size="mini"
                borderless={true}
                icon="chevron_up"
                disabled={disabled || readonly || !hasMoveUp}
                onClick={onReorderClick(index, index - 1)}
              />
            )}

            {(hasMoveUp || hasMoveDown) && (
              <IconButton
                size="mini"
                borderless={true}
                icon="chevron_down"
                disabled={disabled || readonly || !hasMoveDown}
                onClick={onReorderClick(index, index + 1)}
              />
            )}

            {hasRemove && (
              <IconButton
                size="mini"
                borderless={true}
                icon="trash"
                icon_css={{ color: "var(--sq-on-surface-critical)" }}
                disabled={disabled || readonly}
                onClick={onDropIndexClick(index)}
              />
            )}
          </>
        )}
      </ItemButtons>
    </ItemContainer>
  );
};

export const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const {
    title,
    required,
    idSchema,
    items,
    canAdd,
    disabled,
    readonly,
    onAddClick,
    uiSchema,
    schema,
  } = props;
  return (
    <Container>
      {(title || uiSchema["ui:description"] || schema.description) && (
        <FrontMatterContainer>
          {title && (
            <Title key={`array-field-title-${idSchema.$id}`}>
              {title}
              {required && <RequiredLabel> (required)</RequiredLabel>}
            </Title>
          )}

          {(uiSchema["ui:description"] || schema.description) && (
            <Description key={`array-field-description-${idSchema.$id}`}>
              {uiSchema["ui:description"] || schema.description}
            </Description>
          )}
        </FrontMatterContainer>
      )}
      <ArrayContainer key={`array-item-list-${idSchema.$id}`}>
        {items && items.map((p) => DefaultArrayItem(p))}

        {canAdd && (
          <IconButton
            icon="add"
            size="mini"
            borderless={true}
            onClick={onAddClick}
            disabled={disabled || readonly}
            customCSS={"align-self: end;"}
          />
        )}
      </ArrayContainer>
    </Container>
  );
};
