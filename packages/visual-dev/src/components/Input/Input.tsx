import * as React from "react";
import root from "react-shadow/styled-components";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { IconKey, Icon } from "../Icon";

type InputProps = OptionProps & React.ComponentProps<"input">;

interface OptionProps {
  value?: any;
  onChange?: any;
  disabled?: any;
  type?: any;
  errors?: any;
  icon?: IconKey;
  buttons?: React.ReactElement;
  position?: "left" | "right";
  css?: CSSProp;
}

const ShadowDom = styled(root.div)`
  display: contents;
`;

const InputBox = styled.input<{
  isInvalid: boolean;
  position: string;
  css: CSSProp;
}>`
  ${Styles.InputBoxStyle}
  ${(props) => (props.isInvalid ? Styles.invalid : "")}
  ${(props) => (props.position == "left" ? "text-indent: 40px;" : "")}
  ${(props) => props.css}
`;

const IconDiv = styled.div<{ position: string }>`
  ${Styles.IconStyle}
  ${(props) => (props.position == "left" ? "left: 13px;" : "left: 277px;")}
`;

export const Input = React.forwardRef<React.ElementRef<"input">, InputProps>(
  (props, forwardedRef) => {
    const {
      icon,
      position = "right",
      type = "text",
      buttons = false,
      errors: rawErrors,
      css = {},
      ...rest
    } = props;

    return (
      <ShadowDom>
        <InputBox
          {...rest}
          type={type}
          position={position}
          ref={forwardedRef}
          isInvalid={rawErrors}
          css={css}
        />
        {icon && (
          <IconDiv position={position}>
            <Icon icon={icon} size={"22px"} color="var(--sq-text-subdued)" />
          </IconDiv>
        )}
        {buttons}
      </ShadowDom>
    );
  }
);
