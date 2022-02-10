import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { Icon } from "../Icon";
import { Dropdown } from "../Dropdown";

type PopoverProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

interface OptionProps {
  children?: any;
  selected?: number;
  pages?: any;
  total?: number;
}

interface StyleProps {
  customCSS?: CSSProp;
}

const PaginationDiv = styled.div<Required<StyleProps>>`
  display: flex;
  padding: var(--sq-spacing-large);
  align-items: center;
  background: var(--sq-background);
  border: 2px solid var(--sq-border);
  box-sizing: border-box;
  border-radius: 0px 0px 6px 6px;
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);

  ${(props) => props.customCSS}
`;

const TextDiv = styled.div<{ selected?: boolean }>`
  padding: 6px;
  display: inline;
  color: var(--sq-text-interactive);
  cursor: pointer;
  font-family: var(--sq-font-family-sans);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  ${(props) =>
    props.selected
      ? "font-weight: var(--sq-font-weight-bold);"
      : "font-weight: var(--sq-font-weight-regular);"}
`;

export const Pagination = React.forwardRef<
  React.ElementRef<"div">,
  PopoverProps
>((props, forwardedRef) => {
  const {
    children,
    selected = 1,
    pages = [1],
    total = 0,
    customCSS = {},
    ...rest
  } = props;

  return (
    <PaginationDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
      1-10 of {total}
      <div style={{ marginLeft: "auto" }}>
        <Icon size="24px" icon="chevron_left" customCSS="margin: -3px;" />
        {pages.map((x: any) => (
          <TextDiv selected={selected === x}>{x}</TextDiv>
        ))}
        <Icon
          size="24px"
          icon="chevron_right"
          customCSS="margin: -3px; margin-right: var(--sq-spacing-x-large);"
        />
        <Dropdown
          pill
          center
          text="10 per page"
          customCSS="min-width: 165px; width: 165px; display: inline-block"
        />
      </div>
    </PaginationDiv>
  );
});
