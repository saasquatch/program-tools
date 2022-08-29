import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { DropdownView } from "../Dropdown";
import { IconButtonView } from "../Button";
import * as styles from "./Styles";
import { DataTableView } from ".";

type PopoverProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Pagination offset, first item in table page
   */
  offset: number;
  /**
   * Pagination limit, number of items per page
   */
  limit: number;
  /**
   * Total number of items to display in the table across all pages
   */
  total?: number;
  /**
   * Page exists after current page, used when total not available
   */
  hasNext?: boolean;
  /**
   * Hide the "N Per Page" dropdown
   */
  hidePerPage?: boolean;
  /**
   * Update pagination callback, for requesting a new page
   */
  updatePagination: (limit: number, offset: number) => void;
  /**
   * Display in loading state (shows skeletons)
   */
  loading?: boolean;
}

export interface StyleProps {
  /**
   * Custom CSS applied to pagination section
   */
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

const ContainerDiv = styled.div`
  ${styles.PaginationContainer}
`;

export const PaginationView = React.forwardRef<
  React.ElementRef<"div">,
  PopoverProps
>((props, forwardedRef) => {
  const {
    offset,
    limit,
    updatePagination,
    hidePerPage = false,
    total = null,
    hasNext = false,
    loading = false,
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
      {loading ? (
        <DataTableView.SkeletonView
          customCSS={{ marginLeft: "auto" }}
          size="160px"
        />
      ) : (
        <>
          {total !== null &&
            `${offset + 1} - ${Math.min(offset + limit, total)} of ${total}`}

          <ContainerDiv>
            <IconButtonView
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

            <IconButtonView
              size="mini"
              icon="chevron_right"
              borderless={true}
              customCSS={`margin: -3px; &:hover{background: none;} ${
                !hidePerPage && "margin-right: var(--sq-spacing-x-large);"
              }`}
              disabled={total != null ? offset + limit >= total : !hasNext}
              onClick={() => {
                updatePagination(limit, offset + limit);
              }}
            />

            {!hidePerPage && (
              <DropdownView
                onClickDropdown={() => setDropdown(!dropdown)}
                showMenu={dropdown}
                pill
                center
                popUpwards
                text={`${limit} Per Page`}
                customCSS="min-width: 165px; width: 165px; display: inline-block"
              >
                <DropdownView.ItemView
                  onClick={() => {
                    updatePagination(10, 0);
                    setDropdown(false);
                  }}
                >
                  10 Per Page
                </DropdownView.ItemView>
                <DropdownView.ItemView
                  onClick={() => {
                    updatePagination(25, 0);
                    setDropdown(false);
                  }}
                >
                  25 Per Page
                </DropdownView.ItemView>
                <DropdownView.ItemView
                  onClick={() => {
                    updatePagination(50, 0);
                    setDropdown(false);
                  }}
                >
                  50 Per Page
                </DropdownView.ItemView>
              </DropdownView>
            )}
          </ContainerDiv>
        </>
      )}
    </PaginationDiv>
  );
});

/**
 * @deprecated use {@link PaginationView} instead
 */
export const Pagination = PaginationView;
