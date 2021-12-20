import React from 'react'
import { Tag } from '.'

export default {
  title: 'Components / Tag',
  component: Tag,
}

const fake = async () => {
  Promise.resolve(alert('You clicked a tag.'))
}

export const shortTag = () => <Tag onClickClose={fake}>newSegment</Tag>
export const longTag = () => <Tag onClickClose={fake}>A really really long segment</Tag>
