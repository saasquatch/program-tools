import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { IconView } from "../Icon";
import * as Styles from "./Styles";

type AvatarProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Used for first initial in avatar
   */
  firstName?: string;
  /**
   * Used for second initial in avatar
   */
  lastName?: string;
  /**
   * Display large style avatar with full colour background
   */
  large?: boolean;
}

export interface StyleProps {
  /**
   * Custom CSS for avatar container
   */
  customCSS?: CSSProp;
}

const AvatarDiv = styled.div<Required<StyleProps>>`
  ${Styles.AvatarDiv}
  ${(props) => props.customCSS}
`;

const AvatarCircle = styled.div<{ large: boolean; color: string }>`
  ${(props) =>
    props.large ? Styles.AvatarCircleStyleLarge : Styles.AvatarCircleStyle};
  ${(props) => (props.large ? "background-color: " + props.color : "")};
`;

const AvatarSpan = styled.span<{ large: boolean; color: string }>`
  ${(props) =>
    props.large ? Styles.AvatarTextStyleLarge : Styles.AvatarTextStyle};
  ${(props) => (props.large ? "" : "color: " + props.color)};
`;

export const AvatarView = React.forwardRef<
  React.ElementRef<"div">,
  AvatarProps
>((props, forwardedRef) => {
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
    <AvatarDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
      {!(firstName || lastName) ? (
        <IconView
          icon="avatar"
          size={
            large
              ? "var(--sq-icon-size-avatar-large)"
              : "var(--sq-icon-size-avatar)"
          }
        />
      ) : (
        <AvatarCircle large={large} color={colors[random]}>
          <AvatarSpan large={large} color={colors[random]}>
            {initials}
          </AvatarSpan>
        </AvatarCircle>
      )}
    </AvatarDiv>
  );
});

/**
 * @deprecated use {@link AvatarView} instead
 */
export const Avatar = AvatarView;
