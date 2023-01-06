import React from 'react';
import {Paragraph} from '../Paragraph'

export default {
  title: "Typography / Paragraph",
  component: Text
}

export const Default = () => <Paragraph size="1">This is a Paragraph size 1. A really long paragraph of text, to demonstrate prose text, like for example, the kind you might read in a blog post. The reason we're using prose here is because the most common use case for this container size is longform text. So we're previewing some longform text here so we can make sure the container width provides an optimal line length for this font size.</Paragraph>

export const Caption = () => <Paragraph size="2">This is a Paragraph size 2. A really long paragraph of text, to demonstrate prose text, like for example, the kind you might read in a blog post. The reason we're using prose here is because the most common use case for this container size is longform text. So we're previewing some longform text here so we can make sure the container width provides an optimal line length for this font size.</Paragraph>
