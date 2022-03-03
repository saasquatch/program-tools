import React, { useState } from "react";
import { Icon } from "../Icon";
import { Skeleton, DataTable, Row, Pagination } from ".";
import { Avatar } from "../Avatar";
import { Text } from "../Text";
import { Dropdown } from "../Dropdown";
import { HoverPopover, Popover } from "../Popover";
import { Badge } from "../Badge";
import { Filter } from "./Filter";
import { Banner } from "./Banner";

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
    <Skeleton circle={true} size="8px" color="#57AC59" /> Success
  </>
);

const text_e = (
  <>
    <Skeleton circle={true} size="8px" color="#FE6666" /> Failed
  </>
);

const text_e_popover = (
  <HoverPopover
    handle={
      <div style={{ display: "flex", alignItems: "center" }}>
        <Skeleton circle={true} size="8px" color="#FE6666" /> Failed
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
      <Filter>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </Filter>
      <DataTable width="958px">
        <Row variant="header">{content_a}</Row>
        <Row>{content_b}</Row>
        <Row>{content_c}</Row>
        <Row>{content_c}</Row>
        <Row>{content_c}</Row>
        <Row>{content_c}</Row>
        <Pagination
          total={17}
          limit={10}
          offset={0}
          updatePagination={updatePaginationDummy}
        />
      </DataTable>
    </>
  );
};

export const PopoverTest = () => {
  return (
    <>
      <DataTable width="958px">
        <Row variant="header">{content_a}</Row>
        <Row>{content_b}</Row>
        <Row>{content_d}</Row>
        <Row>{content_d}</Row>
        <Row>{content_d}</Row>
        <Row>{content_d}</Row>
        <Pagination
          total={17}
          limit={10}
          offset={0}
          updatePagination={updatePaginationDummy}
        />
      </DataTable>
    </>
  );
};

export const FormSubmissionTableWithBanner = () => {
  return (
    <>
      <Filter>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </Filter>
      <DataTable width="958px">
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
        <Row variant="header">{content_a}</Row>
        <Row>{content_b}</Row>
        <Row>{content_c}</Row>
        <Row>{content_c}</Row>
        <Row>{content_c}</Row>
        <Row>{content_c}</Row>
        <Pagination
          total={17}
          limit={10}
          offset={0}
          updatePagination={updatePaginationDummy}
        />
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
      <Filter>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </Filter>
      <DataTable width="958px" empty>
        <Row variant="header">{content_a}</Row>
        <Row empty />
        <Pagination
          total={17}
          limit={10}
          offset={0}
          updatePagination={updatePaginationDummy}
        />
      </DataTable>
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
      <Filter>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </Filter>
      <DataTable width="958px" empty>
        <Row variant="header">{content_a}</Row>
        <Row emptyFilter />
        <Pagination
          total={17}
          limit={10}
          offset={0}
          updatePagination={updatePaginationDummy}
        />
      </DataTable>
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
    <Pagination
      total={440}
      limit={limit}
      offset={offset}
      updatePagination={updatePagination}
    />
  );
};

export const paginationManyStart = () => (
  <Pagination
    total={440}
    limit={10}
    offset={0}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationManyMiddle = () => (
  <Pagination
    total={440}
    limit={10}
    offset={180}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationManyEnd = () => (
  <Pagination
    total={440}
    limit={10}
    offset={430}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationNoTotalStart = () => (
  <Pagination
    limit={10}
    offset={0}
    hasNext={true}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationNoTotalMiddle = () => (
  <Pagination
    limit={10}
    offset={10}
    hasNext={true}
    updatePagination={updatePaginationDummy}
  />
);

export const paginationNoTotalEnd = () => (
  <Pagination limit={10} offset={20} updatePagination={updatePaginationDummy} />
);

export const header = () => {
  const content = [
    { text: "Heading A" },
    { text: "Heading B" },
    { text: "Heading C" },
    { text: "Heading D" },
  ];

  return <Row variant="header">{content}</Row>;
};

export const row = () => {
  const text = "Some content";
  const content = [
    { text: text },
    { text: text },
    { text: text },
    { text: text },
  ];

  return <Row>{content}</Row>;
};

export const rowSkeleton = () => {
  const text = <Skeleton size="91px" />;
  const content = [
    { text: text },
    { text: text },
    { text: text },
    { text: text },
  ];

  return <Row>{content}</Row>;
};

export const headerActions = () => {
  const content = [
    { text: "Heading A", flex: "10" },
    { text: "Heading B", flex: "10" },
    { text: "Heading C", flex: "10" },
    { text: "Heading D", flex: "10" },
    { text: "Actions", center: true },
  ];

  return <Row variant="header">{content}</Row>;
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

  return <Row>{content}</Row>;
};

export const rowActionsSkeleton = () => {
  const text_a = (
    <div>
      <Skeleton size="135px" /> <br />
      <Skeleton size="84px" />
    </div>
  );
  const text_b = <Skeleton size="91px" />;

  const content = [
    { text: text_a, flex: "10" },
    { text: text_b, flex: "10" },
    { text: text_b, flex: "10" },
    { text: text_b, flex: "10" },
    { text: <Icon icon="actions" />, center: true },
  ];

  return <Row>{content}</Row>;
};

export const header_arrow = () => {
  const content = [
    { text: "", flex: 0.1 },
    { text: "Heading A" },
    { text: "Heading B" },
    { text: "Heading C" },
    { text: "Heading D" },
  ];

  return <Row variant="header">{content}</Row>;
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

  return <Row>{content}</Row>;
};
