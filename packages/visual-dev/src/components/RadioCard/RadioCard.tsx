import * as React from "react";
import root from "react-shadow/styled-components";
import styled from "styled-components";
import * as Styles from "./Styles";
import { IconKey, Icon } from "../Icon";

type GroupProps = React.ComponentProps<"input">;

type InputProps = OptionProps & React.ComponentProps<"input">;
interface OptionProps {
  value: any;
  optionValue: any;
  onChange?: any;
  title?: string;
  description?: string;
  icon?: IconKey;
}

const ShadowDom = styled(root.div)``;

const RadioLabel = styled.label<{ isChecked: boolean }>`
  ${Styles.RadioLabelStyle}
  ${(props) =>
    props.isChecked
      ? "border: 2px solid var(--sq-action-primary-hovered);"
      : "&:hover {border: 2px solid var(--sq-text-subdued);}"}
`;
const RadioInput = styled.input`
  ${Styles.RadioInputStyle}
`;

const RightSegment = styled.div`
  ${Styles.RightSegmentStyle}
`;

const RadioText = styled.div`
  ${Styles.RadioTextStyle}
`;

const LeftSegment = styled.div<{ isChecked: boolean }>`
  ${Styles.LeftSegmentStyle}
  ${(props) =>
    props.isChecked ? "color: var(--sq-action-primary-hovered);" : ""}
`;

const RadioGrid = styled.div`
  ${Styles.RadioGridStyle}
`;

export const RadioCard = React.forwardRef<
  React.ElementRef<"input">,
  InputProps
>((props, forwardedRef) => {
  const {
    value,
    optionValue,
    title,
    description,
    icon = "calendar",
    ...rest
  } = props;

  const selected = value === optionValue;

  const icon_color = selected ? "var(--sq-action-primary-hovered)" : "";

  return (
    <div>
      <RadioLabel htmlFor={rest.id} isChecked={selected}>
        <RadioInput
          type="radio"
          checked={selected}
          readOnly
          {...rest}
          ref={forwardedRef}
        />
        <LeftSegment isChecked={selected}>
          <Icon icon={icon} size="40px" color={icon_color} />
        </LeftSegment>
        <RightSegment>
          <RadioText>
            {title ? (
              <div style={{ fontWeight: "bold", marginBottom: 4 }}>{title}</div>
            ) : (
              ""
            )}
            {description ? (
              <div style={{ color: "var(--sq-text-subdued)" }}>
                {description}
              </div>
            ) : (
              ""
            )}
          </RadioText>
        </RightSegment>
      </RadioLabel>
    </div>
  );
});

export const RadioCardGroup = React.forwardRef<
  React.ElementRef<"div">,
  GroupProps
>((props) => {
  const { children } = props;

  return (
    <ShadowDom>
      <RadioGrid>{children}</RadioGrid>
    </ShadowDom>
  );
});
