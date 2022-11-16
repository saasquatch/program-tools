import React from "react";
import styled, { CSSProp } from "styled-components";
import { IconButtonView } from "../Button";
import { InputWidthType } from "../Input";
import * as Styles from "./Styles";

export type TagInputViewProps = OptionProps &
  Partial<React.ComponentProps<"span">>;

export interface OptionProps {
  /**
   * Slot for tags of fully input emails
   */
  tagSlot: React.ReactNode | React.ReactNode[];
  /**
   * Limit the input width using a valid CSS size value (e.g. px, %) [default 300px]
   */
  limitWidth?: InputWidthType;
}

export interface TagViewProps {
  id: number;
  onDelete: (id: number) => void;
  children: React.ReactNode | React.ReactNode[];
}

export interface StyleProps {
  /**
   * Custom CSS applied to badge
   */
  customCSS?: CSSProp;
}

const ContainerDiv = styled.div<StyleProps & { limitWidth: InputWidthType }>`
  ${Styles.ContainerDiv}

  ${(props) =>
    props.limitWidth
      ? typeof props.limitWidth === "string"
        ? `max-width: ${props.limitWidth};`
        : "max-width: 300px;"
      : "max-width: 100%;"}
`;

const StyledInput = styled.span<StyleProps>`
  ${Styles.StyledInputSpan}
`;

const TagDiv = styled.div<StyleProps>`
  ${Styles.TagDiv}
`;

export const TagView = (props: TagViewProps) => {
  const { children } = props;
  return (
    <TagDiv key={props.id}>
      {children}
      <IconButtonView
        size={"small"}
        borderless
        icon={"close"}
        style={{ marginTop: "-4px" }}
        onClick={() => props.onDelete(props.id)}
        customCSS={Styles.customButtonCSS}
      />
    </TagDiv>
  );
};

const TagInputView = React.forwardRef<
  React.ElementRef<"span">,
  TagInputViewProps
>((props, forwardedRef) => {
  const { tagSlot, limitWidth = true, ...rest } = props;
  return (
    <ContainerDiv limitWidth={limitWidth}>
      {tagSlot}
      <StyledInput
        {...rest}
        ref={forwardedRef}
        role="textbox"
        contentEditable
      />
    </ContainerDiv>
  );
});

const TagInputNamespace = Object.assign(TagInputView, {
  TagView: TagView,
});

export { TagInputNamespace as TagInputView };
