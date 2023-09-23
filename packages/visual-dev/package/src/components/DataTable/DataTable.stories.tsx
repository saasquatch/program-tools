import React, { useState } from "react";
import { IconView } from "../Icon";
import { AvatarView } from "../Avatar";
import { Text } from "../Text";
import { Dropdown } from "../Dropdown";
import { HoverPopover, PopoverView } from "../Popover";
import { BadgeView } from "../Badge";
import { BannerView } from "./Banner";
import { DataTableView } from ".";

export default {
  tags: ["autodocs"],
  title: "Components / DataTable",
  component: DataTableView,
};

const updatePaginationDummy = (limit: number, offset: number) => {
  console.log("pagination updated");
  console.log("limit", limit);
  console.log("offset", offset);
};

const content_a = [
  { text: "Form" },
  { text: "User" },
  { text: "Date Submitted" },
  { text: "Status" },
  { text: "", width: "50px", flex: 0.01 },
];

const text_a = (
  <div style={{ flex: "1 1 100px", width: "100px" }}>
    <strong> A form name </strong> <br />
    form-key
  </div>
);

const text_b = (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      flex: "1 1 100px",
      width: "100px",
    }}
  >
    <div>
      <AvatarView firstName="New" lastName="Guy" />
    </div>
    <div style={{ marginLeft: 10 }}>
      <span style={{ color: "#0088CC" }}>new guy</span> <br />
      sam123@test.ca
    </div>
  </div>
);

const text_c = (
  <div style={{ flex: "1 1 100px", width: "100px" }}>11 months ago</div>
);

const text_d = (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      flex: "1 1 100px",
      width: "100px",
    }}
  >
    <DataTableView.SkeletonView circle={true} size="8px" color="#57AC59" />{" "}
    Success
  </div>
);

const text_e = (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      flex: "1 1 100px",
      width: "100px",
    }}
  >
    <DataTableView.SkeletonView circle={true} size="8px" color="#FE6666" />{" "}
    Failed
  </div>
);

const text_e_popover = (
  <HoverPopover
    handle={
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: "1 1 100px",
          width: "100px",
        }}
      >
        <DataTableView.SkeletonView circle={true} size="8px" color="#FE6666" />{" "}
        Failed
      </div>
    }
  >
    <PopoverView>This is a popover with some Text</PopoverView>
  </HoverPopover>
);

const text_f = (
  <BadgeView status="success" icon="gift">
    Success Badge
  </BadgeView>
);

const content_b = [
  { text: text_a },
  { text: text_b },
  { text: text_c },
  { text: text_d },
  {
    text: <IconView icon="actions" />,
    width: "50px",
    flex: 0.01,
    center: true,
  },
];
const content_c = [
  { text: text_a },
  { text: text_b },
  { text: text_c },
  { text: text_e },
  {
    text: <IconView icon="actions" />,
    width: "50px",
    flex: 0.01,
    center: true,
  },
];
const content_d = [
  { text: text_a },
  { text: text_b },
  { text: text_e_popover },
  { text: text_f },
  {
    text: <IconView icon="actions" />,
    width: "50px",
    flex: 0.01,
    center: true,
  },
];

export const FormSubmissionTable = () => {
  return (
    <>
      <DataTableView.FilterView>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </DataTableView.FilterView>
      <DataTableView
        width="958px"
        headerSlot={
          <DataTableView.RowView variant="header">
            {content_a}
          </DataTableView.RowView>
        }
        footerSlot={
          <DataTableView.PaginationView
            total={17}
            limit={10}
            offset={0}
            updatePagination={updatePaginationDummy}
          />
        }
      >
        <DataTableView.RowView>{content_b}</DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
      </DataTableView>
    </>
  );
};

export const FormSubmissionTableWithActionsSlot = () => {
  return (
    <>
      <DataTableView.FilterView>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </DataTableView.FilterView>
      <DataTableView
        width="958px"
        headerSlot={
          <DataTableView.RowView variant="header">
            {content_a}
          </DataTableView.RowView>
        }
        footerSlot={
          <DataTableView.PaginationView
            total={17}
            limit={10}
            offset={0}
            updatePagination={updatePaginationDummy}
          />
        }
      >
        <DataTableView.RowView actionsSlot={<div>ACTIONS SLOT</div>}>
          {content_b}
        </DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
      </DataTableView>
    </>
  );
};

export const FormSubmissionTableWithControllerMapping = () => {
  const headers = [
    <span style={{ flex: "1 1 100px", width: "100px" }}>Form</span>,
    <span style={{ flex: "1 1 100px", width: "100px" }}>User</span>,
    <span style={{ flex: "1 1 100px", width: "100px" }}>Date Submitted</span>,
    <span style={{ flex: "1 1 100px", width: "100px" }}>Status</span>,
  ];
  const rowMatrix = [
    [text_a, text_b, text_c, text_d],
    [text_a, text_b, text_c, text_d],
    [text_a, text_b, text_c, text_d],
  ];
  return (
    <>
      <DataTableView
        width="958px"
        headerSlot={
          <DataTableView.TableRowView variant="header">
            {headers.map((header) => {
              return header;
            })}
          </DataTableView.TableRowView>
        }
        footerSlot={
          <DataTableView.PaginationView
            total={17}
            limit={10}
            offset={0}
            updatePagination={updatePaginationDummy}
          />
        }
      >
        {rowMatrix.map((row) => {
          return (
            <DataTableView.TableRowView>
              {row.map((cell) => {
                return cell;
              })}
            </DataTableView.TableRowView>
          );
        })}
      </DataTableView>
    </>
  );
};

export const PopoverTest = () => {
  return (
    <>
      <DataTableView
        width="958px"
        headerSlot={
          <DataTableView.RowView variant="header">
            {content_a}
          </DataTableView.RowView>
        }
        footerSlot={
          <DataTableView.PaginationView
            total={17}
            limit={10}
            offset={0}
            updatePagination={updatePaginationDummy}
          />
        }
      >
        <DataTableView.RowView>{content_b}</DataTableView.RowView>
        <DataTableView.RowView>{content_d}</DataTableView.RowView>
        <DataTableView.RowView>{content_d}</DataTableView.RowView>
        <DataTableView.RowView>{content_d}</DataTableView.RowView>
        <DataTableView.RowView>{content_d}</DataTableView.RowView>
      </DataTableView>
    </>
  );
};
PopoverTest.parameters = {
  storyshots: { disable: true },
};

export const FormSubmissionTableWithBanner = () => {
  return (
    <>
      <DataTableView.FilterView>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </DataTableView.FilterView>
      <DataTableView
        width="958px"
        headerSlot={
          <>
            <BannerView>
              FilterView Rewards by Program
              <div
                style={{
                  background: "white",
                  width: 2,
                  height: "100%",
                  margin: "0 20px",
                }}
              >
                .
              </div>
              5 rewards earned across all programs
            </BannerView>
            <DataTableView.RowView variant="header">
              {content_a}
            </DataTableView.RowView>
          </>
        }
        footerSlot={
          <DataTableView.PaginationView
            total={17}
            limit={10}
            offset={0}
            updatePagination={updatePaginationDummy}
          />
        }
      >
        <DataTableView.RowView>{content_b}</DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
      </DataTableView>
    </>
  );
};

export const FormSubmissionTableEmpty = () => {
  const content_a = [
    { text: "Form" },
    { text: "User" },
    { text: "Date Submitted" },
    { text: "Status" },
    { text: "", width: "50px", flex: 0.01 },
  ];

  return (
    <>
      <DataTableView.FilterView>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </DataTableView.FilterView>
      <DataTableView
        width="958px"
        empty
        headerSlot={
          <DataTableView.RowView variant="header">
            {content_a}
          </DataTableView.RowView>
        }
        footerSlot={
          <DataTableView.PaginationView
            total={17}
            limit={10}
            offset={0}
            updatePagination={updatePaginationDummy}
          />
        }
      ></DataTableView>
    </>
  );
};

export const FormSubmissionTableEmptyCustomGraphic = () => {
  const content_a = [
    { text: "Form" },
    { text: "User" },
    { text: "Date Submitted" },
    { text: "Status" },
    { text: "", width: "50px", flex: 0.01 },
  ];

  return (
    <>
      <DataTableView.FilterView>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </DataTableView.FilterView>
      <DataTableView
        width="958px"
        empty
        emptyGraphic={
          <img src="https://www.saasquatch.com/wp-content/themes/saasquatch/dist/images/trees.svg" />
        }
        headerSlot={
          <DataTableView.RowView variant="header">
            {content_a}
          </DataTableView.RowView>
        }
        footerSlot={
          <DataTableView.PaginationView
            total={17}
            limit={10}
            offset={0}
            updatePagination={updatePaginationDummy}
          />
        }
      ></DataTableView>
    </>
  );
};

export const FormSubmissionTableEmptyInlineSVG = () => {
  const content_a = [
    { text: "Form" },
    { text: "User" },
    { text: "Date Submitted" },
    { text: "Status" },
    { text: "", width: "50px", flex: 0.01 },
  ];

  return (
    <>
      <DataTableView
        width="958px"
        empty
        emptyContent="Empty table custom text"
        emptyGraphic={
          <img
            src="https://www.saasquatch.com/wp-content/themes/saasquatch/dist/images/trees.svg"
            width="100px"
            height="auto"
          />
        }
        headerSlot={
          <DataTableView.RowView variant="header">
            {content_a}
          </DataTableView.RowView>
        }
        footerSlot={
          <DataTableView.PaginationView
            total={17}
            limit={10}
            offset={0}
            updatePagination={updatePaginationDummy}
          />
        }
      ></DataTableView>
    </>
  );
};

export const FormSubmissionTableFilterView = () => {
  const content_a = [
    { text: "Form" },
    { text: "User" },
    { text: "Date Submitted" },
    { text: "Status" },
    { text: "", width: "50px", flex: 0.01 },
  ];

  return (
    <>
      <DataTableView.FilterView>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </DataTableView.FilterView>
      <DataTableView
        width="958px"
        empty
        headerSlot={
          <DataTableView.RowView variant="header">
            {content_a}
          </DataTableView.RowView>
        }
        footerSlot={
          <DataTableView.PaginationView
            total={17}
            limit={10}
            offset={0}
            updatePagination={updatePaginationDummy}
          />
        }
      ></DataTableView>
    </>
  );
};

export const PaginationFunctional = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const updatePagination = (newLimit: number, newOffset: number) => {
    setOffset(newOffset);
    setLimit(newLimit);
  };

  return (
    <DataTableView.PaginationView
      total={440}
      limit={limit}
      offset={offset}
      updatePagination={updatePagination}
    />
  );
};

export const paginationZero = () => (
  <DataTableView.PaginationView
    total={0}
    limit={10}
    offset={0}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationLoading = () => (
  <DataTableView.PaginationView
    total={440}
    limit={10}
    offset={0}
    loading
    updatePagination={updatePaginationDummy}
  />
);

export const paginationHidePerPage = () => (
  <DataTableView.PaginationView
    total={440}
    limit={10}
    offset={0}
    hidePerPage
    updatePagination={updatePaginationDummy}
  />
);

export const paginationManyStart = () => (
  <DataTableView.PaginationView
    total={440}
    limit={10}
    offset={0}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationManyMiddle = () => (
  <DataTableView.PaginationView
    total={440}
    limit={10}
    offset={180}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationManyEnd = () => (
  <DataTableView.PaginationView
    total={440}
    limit={10}
    offset={430}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationNoTotalStart = () => (
  <DataTableView.PaginationView
    limit={10}
    offset={0}
    hasNext={true}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationNoTotalMiddle = () => (
  <DataTableView.PaginationView
    limit={10}
    offset={10}
    hasNext={true}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationNoTotalEnd = () => (
  <DataTableView.PaginationView
    limit={10}
    offset={20}
    updatePagination={updatePaginationDummy}
  />
);

export const header = () => {
  const content = [
    { text: "Heading A" },
    { text: "Heading B" },
    { text: "Heading C" },
    { text: "Heading D" },
  ];

  return (
    <DataTableView.RowView variant="header">{content}</DataTableView.RowView>
  );
};

export const row = () => {
  const text = "Some content";
  const content = [
    { text: text },
    { text: text },
    { text: text },
    { text: text },
  ];

  return <DataTableView.RowView>{content}</DataTableView.RowView>;
};

export const rowSkeleton = () => {
  const text = <DataTableView.SkeletonView size="91px" />;
  const content = [
    { text: text },
    { text: text },
    { text: text },
    { text: text },
  ];

  return <DataTableView.RowView>{content}</DataTableView.RowView>;
};
rowSkeleton.parameters = {
  storyshots: { disable: true },
};

export const rowSkeletonHideShimmer = () => {
  const text = <DataTableView.SkeletonView size="91px" hideShimmer />;
  const content = [
    { text: text },
    { text: text },
    { text: text },
    { text: text },
  ];

  return <DataTableView.RowView>{content}</DataTableView.RowView>;
};

export const FormSubmissionTableLoading = () => {
  return (
    <>
      <DataTableView.FilterView>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </DataTableView.FilterView>
      <DataTableView
        loading={true}
        loadingSlot={
          <>
            {rowSkeleton()}
            {rowSkeleton()}
            {rowSkeleton()}
            {rowSkeleton()}
          </>
        }
        width="958px"
        headerSlot={
          <DataTableView.RowView variant="header">
            {content_a}
          </DataTableView.RowView>
        }
        footerSlot={
          <DataTableView.PaginationView
            total={17}
            limit={10}
            offset={0}
            updatePagination={updatePaginationDummy}
          />
        }
      >
        <DataTableView.RowView>{content_b}</DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
        <DataTableView.RowView>{content_c}</DataTableView.RowView>
      </DataTableView>
    </>
  );
};
FormSubmissionTableLoading.parameters = {
  storyshots: { disable: true },
};

export const headerActions = () => {
  const content = [
    { text: "Heading A", flex: "10" },
    { text: "Heading B", flex: "10" },
    { text: "Heading C", flex: "10" },
    { text: "Heading D", flex: "10" },
    { text: "Actions", center: true },
  ];

  return (
    <DataTableView.RowView variant="header">{content}</DataTableView.RowView>
  );
};

export const rowActions = () => {
  const text_a = (
    <div>
      <strong> A title for this content </strong> <br />
      Some content
    </div>
  );
  const text_b = <Text>Some content</Text>;

  const content = [
    { text: text_a, flex: "10" },
    { text: text_b, flex: "10" },
    { text: text_b, flex: "10" },
    { text: text_b, flex: "10" },
    { text: <IconView icon="actions" />, center: true },
  ];

  return <DataTableView.RowView>{content}</DataTableView.RowView>;
};

export const rowActionsSkeleton = () => {
  const text_a = (
    <div>
      <DataTableView.SkeletonView size="135px" /> <br />
      <DataTableView.SkeletonView size="84px" />
    </div>
  );
  const text_b = <DataTableView.SkeletonView size="91px" />;

  const content = [
    { text: text_a, flex: "10" },
    { text: text_b, flex: "10" },
    { text: text_b, flex: "10" },
    { text: text_b, flex: "10" },
    { text: <IconView icon="actions" />, center: true },
  ];

  return <DataTableView.RowView>{content}</DataTableView.RowView>;
};
rowActionsSkeleton.parameters = {
  storyshots: { disable: true },
};

export const header_arrow = () => {
  const content = [
    { text: "", flex: 0.1 },
    { text: "Heading A" },
    { text: "Heading B" },
    { text: "Heading C" },
    { text: "Heading D" },
  ];

  return (
    <DataTableView.RowView variant="header">{content}</DataTableView.RowView>
  );
};

export const row_arrow = () => {
  const text_a = (
    <div>
      <strong> A title for this content </strong> <br />
      Some content
    </div>
  );
  const text_b = <Text>Some content</Text>;

  const content = [
    {
      text: (
        <span style={{ textAlign: "center", width: "100%" }}>
          <IconView icon="arrow_dropdown" size="40px" />
        </span>
      ),
      flex: 0.1,
      center: true,
    },
    { text: text_a },
    { text: text_b },
    { text: text_b },
    { text: text_b },
  ];

  return <DataTableView.RowView>{content}</DataTableView.RowView>;
};
