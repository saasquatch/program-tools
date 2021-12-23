import * as React from "react";
import root from "react-shadow/styled-components";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { IconKey, Icon } from "../Icon";
import type {UseSelectInterface} from "downshift"

type InputProps = OptionProps & React.ComponentProps<"input">;

export interface OptionProps extends UseSelectInterface {
  disabled?: boolean;
  errors?: any;
  value?: any;
  css?: CSSProp;
}

const ShadowDom = styled(root.div)`
  display: contents;
`;

const IconDiv = styled.div<{ position: string }>`
  ${Styles.IconStyle}
  ${(props) => (props.position == "left" ? "left: 13px;" : "left: 277px;")}
`;

export const Input = React.forwardRef<React.ElementRef<"input">, InputProps>(
  (props, forwardedRef) => {
    const {
      css = {},
      errors: rawErrors,
      ...rest
    } = props;

    return (
      <ShadowDom>
        <Input
          {...rest}
          type={"text"}
          ref={forwardedRef}
          errors={rawErrors}
          css={css}
        />
        {isOpen ? (
          <IconDiv position={"right"}>
            <Icon icon={"arrow_up"} size={"22px"} color="var(--sq-text-subdued)" />
          </IconDiv>
        ) : (
          <IconDiv position={"right"}>
            <Icon icon={"arrow_down"} size={"22px"} color="var(--sq-text-subdued)" />
          </IconDiv>
        )}
      </ShadowDom>
    );
  }
);
