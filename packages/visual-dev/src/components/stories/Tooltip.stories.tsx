import React from 'react'
import { Tooltip } from '../Tooltip'
import styled from 'styled-components'

export default {
  title: 'Components / Tooltip',
  component: Tooltip,
}

const StoryFrame = styled.div`
  width: 900px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const DelayNone = () => (
  <StoryFrame>
    <Tooltip text='A tooltip that explains something in detail' delay='none'>
      <button> Hover </button>
    </Tooltip>
  </StoryFrame>
)

export const DelayShort = () => (
  <StoryFrame>
    <Tooltip text='A tooltip that explains something in detail' delay='short'>
      <button> Hover </button>
    </Tooltip>
  </StoryFrame>
)

export const DelayMedium = () => (
  <StoryFrame>
    <Tooltip text='A tooltip that explains something in detail' delay='medium'>
      <button> Hover </button>
    </Tooltip>
  </StoryFrame>
)

export const DelayLong = () => (
  <StoryFrame>
    <Tooltip text='A tooltip that explains something in detail' delay='long'>
      <button> Hover </button>
    </Tooltip>
  </StoryFrame>
)

export const Top = () => (
  <StoryFrame>
    <Tooltip direction='top' text='A tooltip that explains something in detail'>
      <button> Hover </button>
    </Tooltip>
  </StoryFrame>
)

export const Right = () => (
  <StoryFrame>
    <Tooltip direction='right' text='A tooltip that explains something in detail'>
      <button> Hover </button>
    </Tooltip>
  </StoryFrame>
)

export const Bottom = () => (
  <StoryFrame>
    <Tooltip direction='bottom' text='A tooltip that explains something in detail'>
      <button> Hover </button>
    </Tooltip>
  </StoryFrame>
)

export const Left = () => (
  <StoryFrame>
    <Tooltip direction='left' text='A tooltip that explains something in detail'>
      <button> Hover </button>
    </Tooltip>
  </StoryFrame>
)

export const Empty = () => (
  <StoryFrame>
    <Tooltip>
      <button> Hover </button>
    </Tooltip>
  </StoryFrame>
)

export const ShortText = () => (
  <StoryFrame>
    <Tooltip direction='top' text='A tip'>
      <button> Hover </button>
    </Tooltip>
  </StoryFrame>
)

export const LongText = () => (
  <StoryFrame>
    <Tooltip direction='top' text='A tooltip that explains something in a much longer detail'>
      <button> Hover </button>
    </Tooltip>
  </StoryFrame>
)
