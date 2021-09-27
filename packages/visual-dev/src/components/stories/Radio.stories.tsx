import React, { useState } from 'react'
import { RadioGroup, Radio } from '../Radio'
import root from 'react-shadow/styled-components'
import styled from 'styled-components'

export default {
  title: 'Components / Radio',
  component: Radio,
}

const ShadowDom = styled(root.div)``

export const Functional = () => {
  return (
    <RadioGroup>
      <Radio options={{ text: 'Option 1' }} name='group1' />
      <Radio options={{ text: 'Option 2' }} name='group1' />
      <Radio options={{ text: 'Option 3' }} name='group1' />
    </RadioGroup>
  )
}

export const radio = () => {
  const options = {
    text: 'Radio',
  }
  return <Radio options={options} value={false} onChange={() => void 0} />
}

export const radioChecked = () => {
  const options = {
    text: 'Checked',
  }
  return <Radio options={options} value={true} onChange={() => void 0} />
}
