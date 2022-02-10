import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

type PopoverProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

interface OptionProps {
  children?: any;
}

interface StyleProps {
  customCSS?: CSSProp;
}

const ContentDiv = styled.div<Required<StyleProps>>`
  ${Styles.ContentDiv}

  ${(props) => props.customCSS}
`;

export const Content = React.forwardRef<React.ElementRef<"div">, PopoverProps>(
  (props, forwardedRef) => {
    const { children, customCSS = {}, ...rest } = props;

    return (
      <ContentDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
        {children}
      </ContentDiv>
    );
  }
);

const SkeletonDiv = styled.div<
  Required<StyleProps> & { size?: string; circle: boolean; color?: string }
>`
  ${Styles.SkeletonDiv}
  background: ${(props) => (props.color ? props.color : "var(--sq-border)")};

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

  ${(props) => props.customCSS};
`;

export const Skeleton = React.forwardRef<
  React.ElementRef<"div">,
  PopoverProps & { size?: string; circle?: boolean }
>((props, forwardedRef) => {
  const {
    circle = false,
    size,
    color,
    children,
    customCSS = {},
    ...rest
  } = props;

  return (
    <SkeletonDiv
      {...rest}
      circle={circle}
      size={size}
      color={color}
      ref={forwardedRef}
      customCSS={customCSS}
    >
      {children}
    </SkeletonDiv>
  );
});
