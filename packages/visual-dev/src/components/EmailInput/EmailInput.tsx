import React from "react";
import styled, { CSSProp } from "styled-components";
import { IconButtonView } from "../Button";
import * as Styles from "./Styles";

export type EmailInputViewProps = OptionProps &
  Partial<React.ComponentProps<"span">>;

export interface OptionProps {
  /**
   * Slot for tags of fully input emails
   */
  tagContent: React.ReactNode | React.ReactNode[];
}

export interface EmailTagViewProps {
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

const ContainerDiv = styled.div<StyleProps>`
  ${Styles.ContainerDiv}
`;

const StyledInput = styled.span<StyleProps>`
  ${Styles.StyledInputSpan}
`;

const TagDiv = styled.div<StyleProps>`
  ${Styles.TagDiv}
`;

export const EmailTagView = (props: EmailTagViewProps) => {
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

const EmailInputView = React.forwardRef<
  React.ElementRef<"span">,
  EmailInputViewProps
>((props, forwardedRef) => {
  const { tagContent, ...rest } = props;
  return (
    <ContainerDiv>
      {tagContent}
      <StyledInput
        {...rest}
        ref={forwardedRef}
        role="textbox"
        contentEditable
      />
    </ContainerDiv>
  );
});

const EmailInputNamespace = Object.assign(EmailInputView, {
  TagView: EmailTagView,
});

export { EmailInputNamespace as EmailInputView };
