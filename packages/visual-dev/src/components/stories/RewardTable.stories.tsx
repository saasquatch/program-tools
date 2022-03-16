import React from "react";
import { Icon } from "../Icon";
import { DataTable } from "../DataTable";
import { Avatar } from "../Avatar";
import { Dropdown } from "../Dropdown";
import { VisualSpec } from "../meta";

export default {
  title: "User Page / Rewards Table",
  component: DataTable,
};

const updatePaginationDummy = (limit: number, offset: number) => {
  console.log("pagination updated");
  console.log("limit", limit);
  console.log("offset", offset);
};

export const FormSubmissionTable = () => {
  const content_a = [
    { text: "DATE CREATED" },
    { text: "VALUE" },
    { text: "TYPE" },
    { text: "SOURCE" },
    { text: "USER" },
    { text: "STATUS" },
    { text: "CUSTOMER NOTE" },
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

  const text_c = <>11 months ago</>;

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

  const content_b = [
    { text: text_a },
    { text: text_b },
    { text: text_c },
    { text: text_d },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: <Icon icon="actions" />, width: "50px", flex: 0.01, center: true },
  ];
  const content_c = [
    { text: text_a },
    { text: text_b },
    { text: text_c },
    { text: text_e },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: <Icon icon="actions" />, width: "50px", flex: 0.01, center: true },
  ];

  return (
    <div>
      <VisualSpec
        spec={`
		Scenario: Rewards Table
		Given there are stuff
		And more stuff
		Then do stuff
		And have stuff`}
      />
      <DataTable width="100%">
        <div style={{ paddingBottom: 20 }}>
          <Dropdown
            text="All Forms"
            css="min-width: 100px; margin-right: 10px;"
          ></Dropdown>
          <Dropdown text="Any Status" css="min-width: 110px;"></Dropdown>
        </div>
        <DataTable.Banner> </DataTable.Banner>
        <DataTable.Row variant="extra">
          <div></div>
        </DataTable.Row>
        <DataTable.Row css="background: #f9f9f9; color: #7c7c7c;">
          {content_a}
        </DataTable.Row>
        <DataTable.Row>{content_b}</DataTable.Row>
        <DataTable.Row>{content_c}</DataTable.Row>
        <DataTable.Row>{content_c}</DataTable.Row>
        <DataTable.Row>{content_c}</DataTable.Row>
        <DataTable.Row>{content_c}</DataTable.Row>
        <DataTable.Pagination
          total={17}
          limit={5}
          offset={0}
          updatePagination={updatePaginationDummy}
        />
      </DataTable>
    </div>
  );
};
