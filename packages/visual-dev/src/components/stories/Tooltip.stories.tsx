import React, { useState } from 'react'
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
const ViewFrame = styled.div`
  padding: 70px 0px 0px 100px;
`

// export const DelayNone = () => (
//   <StoryFrame>
//     <Tooltip text='A tooltip that explains something in detail' delay='none'>
//       <button> Hover </button>
//     </Tooltip>
//   </StoryFrame>
// )

// export const DelayShort = () => (
//   <StoryFrame>
//     <Tooltip text='A tooltip that explains something in detail' delay='short'>
//       <button> Hover </button>
//     </Tooltip>
//   </StoryFrame>
// )

// export const DelayMedium = () => (
//   <StoryFrame>
//     <Tooltip text='A tooltip that explains something in detail' delay='medium'>
//       <button> Hover </button>
//     </Tooltip>
//   </StoryFrame>
// )

// export const DelayLong = () => (
//   <StoryFrame>
//     <Tooltip text='A tooltip that explains something in detail' delay='long'>
//       <button> Hover </button>
//     </Tooltip>
//   </StoryFrame>
// )

export const Default = () => {
  let timeout: ReturnType<typeof setTimeout>
  const delay = 0
  const [enabled, setEnable] = useState(false)

  const showTooltip = () => {
    timeout = setTimeout(() => {
      setEnable(true)
    }, delay)
  }

  const hideTooltip = () => {
    clearInterval(timeout)
    setEnable(false)
  }
  return (
    <StoryFrame>
      <Tooltip onMouseEnter={showTooltip} onMouseLeave={hideTooltip} showTooltip={enabled} direction='top' text='A tooltip that explains something in detail'>
        <button> Hover </button>
      </Tooltip>
    </StoryFrame>
  )
}

export const Top = () => (
  <div style={{ padding: '70px 0px 0px 100px' }}>
    <Tooltip showTooltip={true} direction='top' text='A tooltip that explains something in detail' />
  </div>
)

export const Left = () => (
  <div style={{ padding: '25px 0px 40px 195px' }}>
    <Tooltip showTooltip={true} direction='left' text='A tooltip that explains something in detail' />
  </div>
)

export const Right = () => (
  <div style={{ padding: '25px 0px 40px 8px' }}>
    <Tooltip showTooltip={true} direction='right' text='A tooltip that explains something in detail' />
  </div>
)

export const Bottom = () => (
  <div style={{ padding: '0px 0px 100px 100px' }}>
    <Tooltip showTooltip={true} direction='bottom' text='A tooltip that explains something in detail' />
  </div>
)

// export const Top = () => (
//   <ViewFrame>
//     <Tooltip showTooltip={true} direction='top' text='A tooltip that explains something in detail' />
//   </ViewFrame>
// )

// export const Top = () => (
//   <ViewFrame>
//     <Tooltip showTooltip={true} direction='top' text='A tooltip that explains something in detail' />
//   </ViewFrame>
// )

// export const Right = () => (
//   <StoryFrame>
//     <Tooltip direction='right' text='A tooltip that explains something in detail'>
//       <button> Hover </button>
//     </Tooltip>
//   </StoryFrame>
// )

// export const Bottom = () => (
//   <StoryFrame>
//     <Tooltip direction='bottom' text='A tooltip that explains something in detail'>
//       <button> Hover </button>
//     </Tooltip>
//   </StoryFrame>
// )

// export const Left = () => (
//   <StoryFrame>
//     <Tooltip direction='left' text='A tooltip that explains something in detail'>
//       <button> Hover </button>
//     </Tooltip>
//   </StoryFrame>
// )

// export const Empty = () => (
//   <StoryFrame>
//     <Tooltip>
//       <button> Hover </button>
//     </Tooltip>
//   </StoryFrame>
// )

// export const ShortText = () => (
//   <StoryFrame>
//     <Tooltip direction='top' text='A tip'>
//       <button> Hover </button>
//     </Tooltip>
//   </StoryFrame>
// )

// export const LongText = () => (
//   <StoryFrame>
//     <Tooltip direction='top' text='A tooltip that explains something in a much longer detail'>
//       <button> Hover </button>
//     </Tooltip>
//   </StoryFrame>
// )
