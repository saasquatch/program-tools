import * as React from 'react';
import { Popover } from '.';
import { Paragraph } from '../Paragraph'
import { Text } from '../Text'
import { Button } from '../Button'
import { Icon } from '../Icon'

export default {
  title: "Components / Popover",
  component: Popover
}

export const Default = () => {
  return (
    <Popover show={true} relativePosition="bottom">
      <Popover.Section>
        <Paragraph size="2" bold>Shown in widgets, emails, and used in integrations, API, for:</Paragraph>
        <Paragraph size="2">Test program</Paragraph>
      </Popover.Section>
      <Popover.Section>
        Here is a long amount of text by itself to show that the text wraps after a certain width
      </Popover.Section>
      <Popover.Section>
        <Popover.Action>Popover action</Popover.Action>
      </Popover.Section>
    </Popover>
  )
}

export const OnlyAction = () => (
  <Popover show={true} relativePosition="bottom">
    <Popover.Action onClick={() => console.log("Hello")}>Someting</Popover.Action>
  </Popover>
)

export const OnlyOneChild = () => (
  <Popover show={true} relativePosition="bottom">
    Here is a long amount of text by itself to show that the text wraps after a certain width
  </Popover>
)

export const CopyPopover = () => (
  <Popover show={true} relativePosition="bottom">
    <span style={{display: "flex", alignItems: "center", gap:"8px"}}>
      http://coleton-example.com/mz3aN3 <Icon icon="copy" color="var(--sq-action-primary)" />
    </span>
  </Popover>
)
