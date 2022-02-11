import * as React from 'react'
import { List } from '.'

export default { 
  title: "Components / List",
  component: List
}

export const defaultList = () => (
  <List>
    <List.Item>First element</List.Item>
    <List.Item>Second element</List.Item>
    <List.Item>Third element</List.Item>
  </List>
)

export const numberedList = () => (
  <List type="number">
    <List.Item>First element</List.Item>
    <List.Item>Second element</List.Item>
    <List.Item>Third element</List.Item>
  </List>
)

