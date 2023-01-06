import React from 'react';
import { Heading } from '../Heading'

export default {
  title: "Typography / Heading",
  component: Heading
}

export const H1 = () => <Heading>Hello</Heading>
export const H2 = () => <Heading size='2' as='h2'>Hello</Heading>
export const H3 = () => <Heading size='3' as='h3'>Hello</Heading>
