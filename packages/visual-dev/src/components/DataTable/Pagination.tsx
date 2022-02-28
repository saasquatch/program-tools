import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { Dropdown, DropdownItem } from "../Dropdown";
import { IconButton } from "../..";
import * as styles from "./Styles";

type PopoverProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

interface OptionProps {
  children?: any;
  offset: number;
  limit: number;
  total?: number;
  hasNext?: boolean;
  updatePagination: (limit: number, offset: number) => void;
}

interface StyleProps {
  customCSS?: CSSProp;
}

const PaginationDiv = styled.div<Required<StyleProps>>`
  ${styles.PaginationDiv}

  ${(props) => props.customCSS}
`;

const TextDiv = styled.div<{ selected?: boolean }>`
  ${styles.PaginationText}
  ${(props) =>
    props.selected
      ? "font-weight: var(--sq-font-weight-bold);"
      : "font-weight: var(--sq-font-weight-regular);"}
`;

const Container = styled.div`
  ${styles.PaginationContainer}
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
    hasNext = false,
    customCSS = {},
    ...rest
  } = props;

  const current_page = Math.floor((offset + 1) / limit);
  const pages = total
    ? Array.from(Array(Math.ceil(total / limit)).keys())
    : [current_page];
  const total_pages = pages[pages.length - 1];

  const filteredPages = pages.filter(
    (page) =>
      Math.abs(page - current_page) < 3 ||
      Math.abs(page - total_pages) < 3 ||
      Math.abs(page) < 3
  );

  const [dropdown, setDropdown] = React.useState(false);

  return (
    <PaginationDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
      {total &&
        `${offset + 1} - ${Math.min(offset + limit, total)} of ${total}`}
      <Container>
        <IconButton
          borderless={true}
          size="mini"
          icon="chevron_left"
          customCSS="margin: -3px; &:hover{background: none;}"
          disabled={offset == 0}
          onClick={() => {
            updatePagination(limit, Math.max(offset - limit, 0));
          }}
        />
        {filteredPages.map((p: number, i: number) => (
          <React.Fragment key={`page-${i}`}>
            {i != 0 && filteredPages[i - 1] + 1 != p && (
              <TextDiv style={{ cursor: "default" }}>...</TextDiv>
            )}
            <TextDiv
              selected={current_page === p}
              onClick={() => {
                updatePagination(limit, Math.max(limit * p, 0));
              }}
            >
              {p + 1}
            </TextDiv>
          </React.Fragment>
        ))}
        <IconButton
          size="mini"
          icon="chevron_right"
          borderless={true}
          customCSS="margin: -3px; margin-right: var(--sq-spacing-x-large); &:hover{background: none;}"
          disabled={total != null ? offset + limit >= total : !hasNext}
          onClick={() => {
            updatePagination(limit, offset + limit);
          }}
        />
        <Dropdown
          onClickDropdown={() => setDropdown(!dropdown)}
          showMenu={dropdown}
          pill
          center
          popUpwards
          text={`${limit} Per Page`}
          customCSS="min-width: 165px; width: 165px; display: inline-block"
        >
          <DropdownItem
            onClick={() => {
              updatePagination(10, 0);
              setDropdown(false);
            }}
          >
            10 Per Page
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              updatePagination(25, 0);
              setDropdown(false);
            }}
          >
            25 Per Page
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              updatePagination(50, 0);
              setDropdown(false);
            }}
          >
            50 Per Page
          </DropdownItem>
        </Dropdown>
      </Container>
    </PaginationDiv>
  );
});
