import React from 'react'
import { Icon } from '../Icon'
import { Skeleton, Content, Action, DataTable, Divider, Popover } from '../DataTable'
import { Avatar } from '../Avatar'

export default {
  title: 'Components / DataTable',
  component: DataTable,
}

export const skeleton = () => <Skeleton />
export const content = () => <Content> Some content </Content>
export const contentSkeleton = () => (
  <Content>
    <Skeleton size='90px' />
  </Content>
)
export const contentSkeletonCircle = () => (
  <Content>
    <Skeleton circle={true} /> <Skeleton size='90px' />
  </Content>
)

export const contentSkeletonAvatarA = () => (
  <Content>
    <Skeleton circle={true} size='34px' />
    <Skeleton size='120px' css='align-self: flex-start;' />
    <Skeleton size='90px' css='align-self: flex-end; margin-left: -128px;' />
  </Content>
)

export const contentSkeletonAvatarB = () => (
  <Content>
    <Avatar firstName='New' lastName='Guy' />
    <span style={{ alignSelf: 'flex-start', marginLeft: 8 }}> new guy </span>
    <span style={{ alignSelf: 'flex-end', marginLeft: -52, marginTop: 18, color: '#858585' }}> sam123@test.ca </span>
  </Content>
)

export const contentSkeletonAvatar = () => (
  <Content>
    <Skeleton circle={true} size='34px' />
    <Skeleton size='120px' css='align-self: flex-start;' />
    <Skeleton size='90px' css='align-self: flex-end; margin-left: -128px;' />
  </Content>
)

export const contentStatus = () => (
  <Content>
    <Skeleton circle={true} size='8px' /> Status
  </Content>
)

export const contentEnabled = () => (
  <Content>
    <Skeleton circle={true} size='8px' color='#57AC59' /> Enabled
  </Content>
)

export const contentDisabled = () => (
  <Content>
    <Skeleton circle={true} size='8px' color='#FE6666' /> Disabled
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
  <Popover css='width: 254px;'>
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
      <span style={{ color: '#F49C20', cursor: 'pointer' }}>
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
  <Popover css=' div + div.action { margin-top: 20px;}'>
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
  <Popover css=' div + div.action { margin-top: 20px;}'>
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
  <Popover notification icon='mail'>
    <Action>
      <strong> On submission failure </strong> <br />
      noah.clarke@referralsaasquatch.com
    </Action>
  </Popover>
)

export const PopoverIconProp = () => (
  <Popover notification icon='action'>
    <Action>A really really really really long long long long text</Action>
  </Popover>
)

export const PopoverTextIcon = () => (
  <Popover notification>
    <Action>
      Some text to be copied <Icon icon='copy' size='30px' css='color: #F49C20; margin: -5px;' />
    </Action>
  </Popover>
)
