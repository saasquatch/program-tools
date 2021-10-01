import React from 'react'
import { Icon } from '../Icon'
import { Action, DataTable, Divider, Popover } from '../DataTable'

export default {
  title: 'Components / DataTable',
  component: DataTable,
}

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
