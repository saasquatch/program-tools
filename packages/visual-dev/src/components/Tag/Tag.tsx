import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { Icon } from "../Icon";

type TagProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  /**
   * Callback triggered when the close on the tag is clicked
   */
  onClickClose?: () => void;
  /**
   * Content displayed inside tag, generally small pieces of content like a <span>
   */
  children: React.ReactNode;
}

export interface StyleProps {
  /**
   * Custom CSS applied to tag
   */
  customCSS?: CSSProp;
}

const TagStyled = styled.div<StyleProps>`
  ${Styles.base}
  ${(props) => props.customCSS}
`;

const IconSegmentStyled = styled.div`
  ${Styles.iconSegment}
`;

const TextSegmentStyled = styled.div`
  ${Styles.textSegment}
`;

export const Tag = React.forwardRef<React.ElementRef<"div">, TagProps>(
  (props, forwardedRef) => {
    const { onClickClose, children, customCSS = {}, ...rest } = props;

    return (
      <TagStyled {...rest} ref={forwardedRef} customCSS={customCSS}>
        <IconSegmentStyled onClick={onClickClose}>
          {<Icon size="10px" icon="close" />}
        </IconSegmentStyled>
        <TextSegmentStyled>{children}</TextSegmentStyled>
      </TagStyled>
    );
  }
);
