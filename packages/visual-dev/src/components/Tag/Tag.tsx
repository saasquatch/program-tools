import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { IconView } from "../Icon";

type TagProps = OptionProps & StyleProps & Partial<React.ComponentProps<"div">>;

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

const TagDiv = styled.div<StyleProps>`
  ${Styles.base}
  ${(props) => props.customCSS}
`;

const IconSegmentDiv = styled.div`
  ${Styles.iconSegment}
`;

const TextSegmentDiv = styled.div`
  ${Styles.textSegment}
`;

export const TagView = React.forwardRef<React.ElementRef<"div">, TagProps>(
  (props, forwardedRef) => {
    const { onClickClose, children, customCSS = {}, ...rest } = props;

    return (
      <TagDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
        <IconSegmentDiv onClick={onClickClose}>
          {<IconView size="16px" icon="close" />}
        </IconSegmentDiv>
        <TextSegmentDiv>{children}</TextSegmentDiv>
      </TagDiv>
    );
  }
);

/**
 * @deprecated use {@link TagView} instead
 */
export const Tag = TagView;
