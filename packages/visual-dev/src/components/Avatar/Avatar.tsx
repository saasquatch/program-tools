import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { Icon } from "../Icon";
import * as Styles from "./Styles";

type AvatarProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate"|"css">;

export interface OptionProps {
  firstName?: string;
  lastName?: string;
  large?: boolean;
}

export interface StyleProps {
  customCSS?: CSSProp;
}

const AvatarStyle = styled.div<Required<StyleProps>>`
  ${(props) => props.customCSS}
`;

const AvatarCircle = styled.div<{ large: boolean; color: string }>`
  ${(props) =>
    props.large ? Styles.AvatarCircleStyleLarge : Styles.AvatarCircleStyle};
  ${(props) => (props.large ? "background-color: " + props.color : "")};
`;

const AvatarText = styled.span<{ large: boolean; color: string }>`
  ${(props) =>
    props.large ? Styles.AvatarTextStyleLarge : Styles.AvatarTextStyle};
  ${(props) => (props.large ? "" : "color: " + props.color)};
`;

export const Avatar = React.forwardRef<React.ElementRef<"div">, AvatarProps>(
  (props, forwardedRef) => {
    const {
      firstName = "",
      large = false,
      lastName = "",
      customCSS = {},
      ...rest
    } = props;
    let initials = "";
    if (firstName || lastName) {
      initials = firstName.charAt(0) + lastName.charAt(0);
    }
    const colors = [
      "#023B44",
      "#0FA177",
      "#00C75F",
      "#0092AD",
      "#44BFD5",
      "#F5A624",
    ];
    const random = initials.charCodeAt(0) % 6;

    return (
      <AvatarStyle {...rest} ref={forwardedRef} customCSS={customCSS}>
        {!(firstName || lastName) ? (
          <Icon
            icon="avatar"
            size={
              large
                ? "var(--sq-icon-size-avatar-large)"
                : "var(--sq-icon-size-avatar)"
            }
          />
        ) : (
          <AvatarCircle large={large} color={colors[random]}>
            <AvatarText large={large} color={colors[random]}>
              {initials}
            </AvatarText>
          </AvatarCircle>
        )}
      </AvatarStyle>
    );
  }
);
