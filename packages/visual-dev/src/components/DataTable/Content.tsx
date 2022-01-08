import * as React from "react";
import styled, { CSSProp } from "styled-components";

type PopoverProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate"|"css">;

interface OptionProps {
  children?: any;
}

interface StyleProps {
  customCSS?: CSSProp;
}

const ContentDiv = styled.div<Required<StyleProps>>`
  ${(props) => props.customCSS}

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  /* Body/Body Regular (14) */

  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  /* On Surface/Text Dark */

  color: #232323;
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
  float: left;
  margin-right: 8px;
  background: ${(props) => (props.color ? props.color : "#e2e2e2")};
  border-radius: 50px;

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
  const { circle = false, size, color, children, customCSS = {}, ...rest } = props;

  return (
    <SkeletonDiv
      circle={circle}
      size={size}
      color={color}
      {...rest}
      ref={forwardedRef}
      customCSS={customCSS}
    >
      {children}
    </SkeletonDiv>
  );
});
