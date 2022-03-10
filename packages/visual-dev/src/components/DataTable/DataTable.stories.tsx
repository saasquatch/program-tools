import React, { useState } from "react";
import { Icon } from "../Icon";
import { Avatar } from "../Avatar";
import { Text } from "../Text";
import { Dropdown } from "../Dropdown";
import { HoverPopover, Popover } from "../Popover";
import { Badge } from "../Badge";
import { Filter } from "./Filter";
import { Banner } from "./Banner";
import { DataTable } from ".";

export default {
  title: "Components / DataTable",
  component: DataTable,
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
  <div>
    <strong> A form name </strong> <br />
    form-key
  </div>
);

const text_b = (
  <>
    <div>
      <Avatar firstName="New" lastName="Guy" />
    </div>
    <div style={{ marginLeft: 10 }}>
      <span style={{ color: "#0088CC" }}>new guy</span> <br />
      sam123@test.ca
    </div>
  </>
);

const text_c = "11 months ago";

const text_d = (
  <>
    <DataTable.Skeleton circle={true} size="8px" color="#57AC59" /> Success
  </>
);

const text_e = (
  <>
    <DataTable.Skeleton circle={true} size="8px" color="#FE6666" /> Failed
  </>
);

const text_e_popover = (
  <HoverPopover
    handle={
      <div style={{ display: "flex", alignItems: "center" }}>
        <DataTable.Skeleton circle={true} size="8px" color="#FE6666" /> Failed
      </div>
    }
  >
    <Popover>This is a popover with some Text</Popover>
  </HoverPopover>
);

const text_f = (
  <Badge status="success" icon="gift">
    Success Badge
  </Badge>
);

const content_b = [
  { text: text_a },
  { text: text_b },
  { text: text_c },
  { text: text_d },
  { text: <Icon icon="actions" />, width: "50px", flex: 0.01, center: true },
];
const content_c = [
  { text: text_a },
  { text: text_b },
  { text: text_c },
  { text: text_e },
  { text: <Icon icon="actions" />, width: "50px", flex: 0.01, center: true },
];
const content_d = [
  { text: text_a },
  { text: text_b },
  { text: text_e_popover },
  { text: text_f },
  { text: <Icon icon="actions" />, width: "50px", flex: 0.01, center: true },
];

export const FormSubmissionTable = () => {
  return (
    <>
      <DataTable.Filter>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </DataTable.Filter>
      <DataTable
        width="958px"
        headerSlot={<DataTable.Row variant="header">{content_a}</DataTable.Row>}
        footerSlot={
          <DataTable.Pagination
            total={17}
            limit={10}
            offset={0}
            updatePagination={updatePaginationDummy}
          />
        }
      >
        <DataTable.Row>{content_b}</DataTable.Row>
        <DataTable.Row>{content_c}</DataTable.Row>
        <DataTable.Row>{content_c}</DataTable.Row>
        <DataTable.Row>{content_c}</DataTable.Row>
        <DataTable.Row>{content_c}</DataTable.Row>
      </DataTable>
    </>
  );
};

export const PopoverTest = () => {
  return (
    <>
      <DataTable
        width="958px"
        headerSlot={<DataTable.Row variant="header">{content_a}</DataTable.Row>}
        footerSlot={
          <DataTable.Pagination
            total={17}
            limit={10}
            offset={0}
            updatePagination={updatePaginationDummy}
          />
        }
      >
        <DataTable.Row>{content_b}</DataTable.Row>
        <DataTable.Row>{content_d}</DataTable.Row>
        <DataTable.Row>{content_d}</DataTable.Row>
        <DataTable.Row>{content_d}</DataTable.Row>
        <DataTable.Row>{content_d}</DataTable.Row>
      </DataTable>
    </>
  );
};

export const FormSubmissionTableWithBanner = () => {
  return (
    <>
      <DataTable.Filter>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </DataTable.Filter>
      <DataTable
        width="958px"
        headerSlot={
          <>
            <Banner>
              Filter Rewards by Program
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
            </Banner>
            <DataTable.Row variant="header">{content_a}</DataTable.Row>
          </>
        }
        footerSlot={
          <DataTable.Pagination
            total={17}
            limit={10}
            offset={0}
            updatePagination={updatePaginationDummy}
          />
        }
      >
        <DataTable.Row>{content_b}</DataTable.Row>
        <DataTable.Row>{content_c}</DataTable.Row>
        <DataTable.Row>{content_c}</DataTable.Row>
        <DataTable.Row>{content_c}</DataTable.Row>
        <DataTable.Row>{content_c}</DataTable.Row>
      </DataTable>
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
      <DataTable.Filter>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </DataTable.Filter>
      <DataTable
        width="958px"
        empty
        headerSlot={<DataTable.Row variant="header">{content_a}</DataTable.Row>}
        footerSlot={
          <DataTable.Pagination
            total={17}
            limit={10}
            offset={0}
            updatePagination={updatePaginationDummy}
          />
        }
      ></DataTable>
    </>
  );
};
export const FormSubmissionTableFilter = () => {
  const content_a = [
    { text: "Form" },
    { text: "User" },
    { text: "Date Submitted" },
    { text: "Status" },
    { text: "", width: "50px", flex: 0.01 },
  ];

  return (
    <>
      <DataTable.Filter>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </DataTable.Filter>
      <DataTable
        width="958px"
        empty
        headerSlot={<DataTable.Row variant="header">{content_a}</DataTable.Row>}
        footerSlot={
          <DataTable.Pagination
            total={17}
            limit={10}
            offset={0}
            updatePagination={updatePaginationDummy}
          />
        }
      ></DataTable>
    </>
  );
};

export const paginationFunctional = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const updatePagination = (newLimit: number, newOffset: number) => {
    setOffset(newOffset);
    setLimit(newLimit);
  };

  return (
    <DataTable.Pagination
      total={440}
      limit={limit}
      offset={offset}
      updatePagination={updatePagination}
    />
  );
};

export const paginationManyStart = () => (
  <DataTable.Pagination
    total={440}
    limit={10}
    offset={0}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationManyMiddle = () => (
  <DataTable.Pagination
    total={440}
    limit={10}
    offset={180}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationManyEnd = () => (
  <DataTable.Pagination
    total={440}
    limit={10}
    offset={430}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationNoTotalStart = () => (
  <DataTable.Pagination
    limit={10}
    offset={0}
    hasNext={true}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationNoTotalMiddle = () => (
  <DataTable.Pagination
    limit={10}
    offset={10}
    hasNext={true}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationNoTotalEnd = () => (
  <DataTable.Pagination
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

  return <DataTable.Row variant="header">{content}</DataTable.Row>;
};

export const row = () => {
  const text = "Some content";
  const content = [
    { text: text },
    { text: text },
    { text: text },
    { text: text },
  ];

  return <DataTable.Row>{content}</DataTable.Row>;
};

export const rowSkeleton = () => {
  const text = <DataTable.Skeleton size="91px" />;
  const content = [
    { text: text },
    { text: text },
    { text: text },
    { text: text },
  ];

  return <DataTable.Row>{content}</DataTable.Row>;
};

export const headerActions = () => {
  const content = [
    { text: "Heading A", flex: "10" },
    { text: "Heading B", flex: "10" },
    { text: "Heading C", flex: "10" },
    { text: "Heading D", flex: "10" },
    { text: "Actions", center: true },
  ];

  return <DataTable.Row variant="header">{content}</DataTable.Row>;
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
    { text: <Icon icon="actions" />, center: true },
  ];

  return <DataTable.Row>{content}</DataTable.Row>;
};

export const rowActionsSkeleton = () => {
  const text_a = (
    <div>
      <DataTable.Skeleton size="135px" /> <br />
      <DataTable.Skeleton size="84px" />
    </div>
  );
  const text_b = <DataTable.Skeleton size="91px" />;

  const content = [
    { text: text_a, flex: "10" },
    { text: text_b, flex: "10" },
    { text: text_b, flex: "10" },
    { text: text_b, flex: "10" },
    { text: <Icon icon="actions" />, center: true },
  ];

  return <DataTable.Row>{content}</DataTable.Row>;
};

export const header_arrow = () => {
  const content = [
    { text: "", flex: 0.1 },
    { text: "Heading A" },
    { text: "Heading B" },
    { text: "Heading C" },
    { text: "Heading D" },
  ];

  return <DataTable.Row variant="header">{content}</DataTable.Row>;
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
          <Icon
            icon="arrow_dropdown"
            size="40px"
            customCSS="top: 8px; height: auto;"
          />
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

  return <DataTable.Row>{content}</DataTable.Row>;
};
