import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { Dropdown, DropdownItem } from "../Dropdown";
import { IconButton } from "../..";

type PopoverProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

interface OptionProps {
  children?: any;
  offset: number;
  limit: number;
  total?: number;
  updatePagination: (limit: number, offset: number) => void;
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
  border-top: 0px;
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

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const Pagination = React.forwardRef<
  React.ElementRef<"div">,
  PopoverProps
>((props, forwardedRef) => {
  const {
    children,
    offset,
    limit,
    updatePagination,
    total = null,
    customCSS = {},
    ...rest
  } = props;

  const current_page = Math.floor(offset + 1 / limit);
  const pages = total
    ? Array.from(Array(Math.ceil(total / limit)).keys())
    : [current_page];

  const [dropdown, setDropdown] = React.useState(false);

  return (
    <PaginationDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
      {total &&
        `${offset + 1} - ${Math.min(offset + limit, total)} of ${total}`}
      <PaginationContainer>
        <IconButton
          borderless={true}
          size="mini"
          icon="chevron_left"
          customCSS="margin: -3px;"
          disabled={offset == 0}
          onClick={() => {
            updatePagination(limit, Math.max(offset - limit, 0));
          }}
        />
        {pages.map((x: any) => (
          <TextDiv
            selected={current_page === x}
            onClick={() => {
              updatePagination(limit, limit * (x - 1));
            }}
          >
            {x + 1}
          </TextDiv>
        ))}
        <IconButton
          size="mini"
          icon="chevron_right"
          borderless={true}
          customCSS="margin: -3px; margin-right: var(--sq-spacing-x-large);"
          disabled={total ? offset + limit > total : false}
          onClick={() => {
            updatePagination(limit, offset + limit);
          }}
        />
        <Dropdown
          onClickDropdown={() => setDropdown(!dropdown)}
          showMenu={dropdown}
          pill
          center
          text={`${limit} Per Page`}
          customCSS="min-width: 165px; width: 165px; display: inline-block"
        >
          <DropdownItem
            onClick={() => {
              updatePagination(10, offset);
              setDropdown(false);
            }}
          >
            10 Per Page
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              updatePagination(25, offset);
              setDropdown(false);
            }}
          >
            25 Per Page
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              updatePagination(50, offset);
              setDropdown(false);
            }}
          >
            50 Per Page
          </DropdownItem>
        </Dropdown>
      </PaginationContainer>
    </PaginationDiv>
  );
});
