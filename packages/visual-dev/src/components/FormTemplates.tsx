import React from "react";
import { P } from "./Typography";
import { TextLink as TextButton } from "./TextButton"
import { ColumnContainer, RowContainer, StyledHR, WidgetContainer } from "./Layouts";

export const ActionsArrayTemplate = (props: any) => {
  return (
    <ColumnContainer className={props.className}>
      {props.items &&
        props.items.map((element: any) => {
          console.log("Element", element);
          return (
            <WidgetContainer key={element.key} className={element.className}>
              <RowContainer style={{alignSelf:"flex-end", marginBottom:"20px"}}>
                {element.hasMoveDown ? (
                  <TextButton
                    onClick={element.onReorderClick(
                      element.index,
                      element.index + 1
                    )}
                  >
                    Down
                  </TextButton>
                ) : (
                  <P noMargin={true} color={"#9E9E9E"}>Down</P>
                )}
                {element.hasMoveUp ? (
                  <TextButton
                    onClick={element.onReorderClick(
                      element.index,
                      element.index - 1
                    )}
                  >
                    Up
                  </TextButton>
                ) : (
                  <P noMargin={true} color={"#9E9E9E"}>Up</P>
                )}
                <TextButton onClick={element.onDropIndexClick(element.index)}>
                  Remove
                </TextButton>
              </RowContainer>
              <StyledHR />
              <div>{element.children}</div>
            </WidgetContainer>
          );
        })}

      {props.canAdd && (
        <TextButton action={true} onClick={props.onAddClick} type="button">
          + Add Action
        </TextButton>
      )}
    </ColumnContainer>
  );
};
