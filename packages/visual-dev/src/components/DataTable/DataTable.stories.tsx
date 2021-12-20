import React from "react"
import { Icon } from "../Icon"
import { Skeleton, Content, Action, DataTable, Divider, Popover, Row, Pagination } from "."
import { Avatar } from "../Avatar"
import { Text } from "../Text"

export default {
  title: "Components / DataTable",
  component: DataTable,
}

export const FormSubmissionTable = () => {
  const content_a = [{ text: "Form" }, { text: "User" }, { text: "Date Submitted" }, { text: "Status" }, { text: "", width: "50px", flex: 0.01 }]

  const text_a = (
    <Content>
      <div>
        <strong> A form name </strong> <br />
        form-key
      </div>
    </Content>
  )

  const text_b = (
    <Content>
      <div>
        <Avatar firstName="New" lastName="Guy" />
      </div>
      <div style={{ marginLeft: 10 }}>
        <span style={{ color: "#0088CC" }}>new guy</span> <br />
        sam123@test.ca
      </div>
    </Content>
  )

  const text_c = <Content>11 months ago</Content>

  const text_d = (
    <Content>
      <Skeleton circle={true} size="8px" color="#57AC59" /> Success
    </Content>
  )

  const text_e = (
    <Content>
      <Skeleton circle={true} size="8px" color="#FE6666" /> Failed
    </Content>
  )

  const content_b = [{ text: text_a }, { text: text_b }, { text: text_c }, { text: text_d }, { text: <Icon icon="actions" />, width: "50px", flex: 0.01, center: true }]
  const content_c = [{ text: text_a }, { text: text_b }, { text: text_c }, { text: text_e }, { text: <Icon icon="actions" />, width: "50px", flex: 0.01, center: true }]

  return (
    <DataTable width="958px">
      <Row variant="header" content={content_a} />
      <Row content={content_b} />
      <Row content={content_c} />
      <Row content={content_c} />
      <Row content={content_c} />
      <Row content={content_c} />
      <Pagination total={17} pages={[1, 2]} />
    </DataTable>
  )
}

export const FormSubmissionTableEmpty = () => {
  const content_a = [{ text: "Form" }, { text: "User" }, { text: "Date Submitted" }, { text: "Status" }, { text: "", width: "50px", flex: 0.01 }]

  return (
    <DataTable width="958px" empty>
      <Row variant="header" content={content_a} />
      <Row empty />
      <Pagination />
    </DataTable>
  )
}
export const FormSubmissionTableFilter = () => {
  const content_a = [{ text: "Form" }, { text: "User" }, { text: "Date Submitted" }, { text: "Status" }, { text: "", width: "50px", flex: 0.01 }]

  return (
    <DataTable width="958px" empty>
      <Row variant="header" content={content_a} />
      <Row filter />
      <Pagination />
    </DataTable>
  )
}

export const pagination = () => <Pagination selected={2} pages={[1, 2, 3]} />

export const header = () => {
  const content = [{ text: "Heading A" }, { text: "Heading B" }, { text: "Heading C" }, { text: "Heading D" }]

  return <Row variant="header" content={content} />
}

export const row = () => {
  const text = "Some content"
  const content = [{ text: text }, { text: text }, { text: text }, { text: text }]

  return <Row content={content} />
}

export const rowSkeleton = () => {
  const text = <Skeleton size="91px" />
  const content = [{ text: text }, { text: text }, { text: text }, { text: text }]

  return <Row content={content} />
}

export const headerActions = () => {
  const content = [
    { text: "Heading A", flex: "10" },
    { text: "Heading B", flex: "10" },
    { text: "Heading C", flex: "10" },
    { text: "Heading D", flex: "10" },
    { text: "Actions", center: true },
  ]

  return <Row variant="header" content={content} />
}

export const rowActions = () => {
  const text_a = (
    <div>
      <strong> A title for this content </strong> <br />
      Some content
    </div>
  )
  const text_b = <Text>Some content</Text>

  const content = [
    { text: text_a, flex: "10" },
    { text: text_b, flex: "10" },
    { text: text_b, flex: "10" },
    { text: text_b, flex: "10" },
    { text: <Icon icon="actions" />, center: true },
  ]

  return <Row content={content} />
}

export const rowActionsSkeleton = () => {
  const text_a = (
    <div>
      <Skeleton size="135px" /> <br />
      <Skeleton size="84px" />
    </div>
  )
  const text_b = <Skeleton size="91px" />

  const content = [
    { text: text_a, flex: "10" },
    { text: text_b, flex: "10" },
    { text: text_b, flex: "10" },
    { text: text_b, flex: "10" },
    { text: <Icon icon="actions" />, center: true },
  ]

  return <Row content={content} />
}

export const header_arrow = () => {
  const content = [{ text: "", flex: 0.1 }, { text: "Heading A" }, { text: "Heading B" }, { text: "Heading C" }, { text: "Heading D" }]

  return <Row variant="header" content={content} />
}

export const row_arrow = () => {
  const text_a = (
    <div>
      <strong> A title for this content </strong> <br />
      Some content
    </div>
  )
  const text_b = <Text>Some content</Text>

  const content = [{ text: <Icon icon="arrow_dropdown" size="40px" customCSS="margin: -50px; margin-top: 0px;" />, flex: 0.1, center: true }, { text: text_a }, { text: text_b }, { text: text_b }, { text: text_b }]

  return <Row content={content} />
}

export const skeleton = () => <Skeleton />
export const content = () => <Content> Some content </Content>
export const contentWithTitle = () => (
  <Content>
    <div>
      <strong> A title for this content </strong> <br />
      Some content
    </div>
  </Content>
)
export const contentSkeleton = () => (
  <Content>
    <Skeleton size="90px" />
  </Content>
)
export const contentSkeletonCircle = () => (
  <Content>
    <Skeleton circle={true} /> <Skeleton size="90px" />
  </Content>
)

export const contentSkeletonAvatarA = () => (
  <Content>
    <div>
      <Skeleton circle={true} size="34px" />
    </div>
    <div>
      <Skeleton size="120px" />
      <br />
      <Skeleton size="120px" />
    </div>
  </Content>
)

export const contentSkeletonAvatarB = () => (
  <Content>
    <div>
      <Skeleton circle={true} size="34px" />
    </div>
    <div>
      <Skeleton size="120px" />
      <br />
      <Skeleton size="90px" />
    </div>
  </Content>
)

export const contentAvatar = () => (
  <Content>
    <div>
      <Avatar firstName="New" lastName="Guy" />
    </div>
    <div style={{ marginLeft: 10 }}>
      new guy <br />
      sam123@test.ca
    </div>
  </Content>
)

export const contentStatus = () => (
  <Content>
    <Skeleton circle={true} size="8px" /> Status
  </Content>
)

export const contentEnabled = () => (
  <Content>
    <Skeleton circle={true} size="8px" color="#57AC59" /> Enabled
  </Content>
)

export const contentDisabled = () => (
  <Content>
    <Skeleton circle={true} size="8px" color="#FE6666" /> Disabled
  </Content>
)

export const contentIconA = () => (
  <Content>
    <Icon icon="action" style={{ marginRight: 10 }} /> Some content
  </Content>
)

export const contentIconB = () => (
  <Content>
    <div>
      <Icon icon="mail" style={{ marginRight: 10 }} />
    </div>
    <div>
      <strong> A title for this content </strong> <br />
      Some content
    </div>
  </Content>
)

export const PopoverOneAction = () => (
  <Popover>
    <Action> An action</Action>
  </Popover>
)

export const PopoverTwoActions = () => (
  <Popover>
    <Action> First action</Action>
    <Action> Second action</Action>
  </Popover>
)

export const PopoverMultipleActions = () => (
  <Popover>
    <Action> First action</Action>
    <Action> Second action</Action>
    <Action> Third action</Action>
    <Action> Another action</Action>
  </Popover>
)

export const PopoverLongAction = () => (
  <Popover>
    <Action> A really long name for a single action that takes up mulitple lines</Action>
  </Popover>
)

export const PopoverVariousActions = () => (
  <Popover>
    <Action> Short action </Action>
    <Action> A really long name for a single action that takes up mulitple lines</Action>
    <Action> Another action</Action>
  </Popover>
)

export const PopoverSectionActions = () => (
  <Popover css="width: 254px;">
    <Action>
      <strong> A short title: </strong> <br />
      Some code or link
    </Action>
    <Divider />
    <Action>
      <strong> A really really long title that takes up two lines : </strong> <br />
      Another line of text
    </Action>
    <Divider />
    <Action>
      <span style={{ color: "#F49C20", cursor: "pointer" }}>
        <strong>Some Text Link</strong>
      </span>
    </Action>
  </Popover>
)

export const PopoverSubmissionSuccessOne = () => (
  <Popover>
    <Action>
      <strong> On submission success </strong> <br />
      shirley.lam@referralsaasquatch.com
    </Action>
  </Popover>
)

export const PopoverSubmissionSuccessTwo = () => (
  <Popover css=" div + div.action { margin-top: 20px;}">
    <Action>
      <strong> On submission success </strong> <br />
      shirley.lam@referralsaasquatch.com
    </Action>
    <Action>
      <strong> On submission failure </strong> <br />
      noah.clarke@referralsaasquatch.com
    </Action>
  </Popover>
)

export const PopoverSubmissionSuccessLong = () => (
  <Popover css=" div + div.action { margin-top: 20px;}">
    <Action>
      <strong> On submission success </strong> <br />
      shirley.lam1984353914388582484839247932@referralsaasquatch.com
    </Action>
    <Action>
      <strong> On submission failure </strong> <br />
      noah.clarke@referralsaasquatch.com
      <br />
      derek.siemens@referralsaasquatch.com
    </Action>
  </Popover>
)

export const PopoverIconPropOne = () => (
  <Popover notification icon="mail">
    <Action>
      <strong> On submission failure </strong> <br />
      noah.clarke@referralsaasquatch.com
    </Action>
  </Popover>
)

export const PopoverIconProp = () => (
  <Popover notification icon="action">
    <Action>A really really really really long long long long text</Action>
  </Popover>
)

export const PopoverTextIcon = () => (
  <Popover notification>
    <Action>
      Some text to be copied <Icon icon="copy" size="30px" customCSS="color: #F49C20; margin: -5px;" />
    </Action>
  </Popover>
)
