import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

type PopoverProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Content to include alongside skeleton
   */
  children?: any;
}

export interface StyleProps {
  /**
   * Custom CSS applied to skeleton
   */
  customCSS?: CSSProp;
}

export interface SkeletonDivProps {
  /**
   * Specify the skeleton width
   */
  size?: string;
  /**
   * Sets the skeleton as a circle with 15px width and height
   */
  circle?: boolean;
  /**
   * Hide the shimmer effect
   */
  hideShimmer?: boolean;
}

const SkeletonDiv = styled.div<Required<StyleProps> & SkeletonDivProps>`
  ${Styles.SkeletonDiv}
  background-color: ${(props) =>
    props.color ? props.color : "var(--sq-border)"};

  height: ${(props) =>
    props.circle ? (props.size ? props.size : "15px") : "15px"};
  width: ${(props) =>
    props.circle
      ? props.size
        ? props.size
        : "15px"
      : props.size
      ? props.size
      : "100%"};

  ${(props) => !props.hideShimmer && Styles.ShimmerStyles}

  ${(props) => props.customCSS};
`;

export const SkeletonView = React.forwardRef<
  React.ElementRef<"div">,
  PopoverProps & SkeletonDivProps
>((props, forwardedRef) => {
  const {
    circle = false,
    size,
    color,
    children,
    customCSS = {},
    hideShimmer = false,
    ...rest
  } = props;

  return (
    <SkeletonDiv
      {...rest}
      circle={circle}
      size={size}
      color={color}
      hideShimmer={hideShimmer}
      ref={forwardedRef}
      customCSS={customCSS}
    >
      {children}
    </SkeletonDiv>
  );
});

/**
 * @deprecated use {@link SkeletonView} instead
 */
export const Skeleton = SkeletonView;
