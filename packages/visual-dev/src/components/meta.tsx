import styled from 'styled-components'
import React from 'react'
import marked from 'marked'

const VisualSpecContainer = styled.div`
  width: 100%;
  & pre {
    padding: 20px;
    background-color: #f9f9f9;
  }
  & code {
    font-size: 14px;
    color: black;
    word-break: break-word;
    & span {
      color: #439b76;
    }
    & br {
      content: '';
      margin: 1.25em;
      display: block;
      font-size: 25%;
    }
  }
`

interface VisualSpecProps {
  spec: string
  onModal?: boolean
}

export const VisualSpec = ({ spec, onModal = false }: VisualSpecProps) => {
  try {
    const html = marked(spec)
    const highlighted_html = html.replace(/\Given\b|\bThen\b|\bAnd\b|\bWhen\b/g, '<span>$&</span>')
    const spaced_highlighted_html = highlighted_html.replace(/(\r\n|\n|\r)/gm, '<br />').replace(/<br \/>\w*<br \/>/gm, '<br/> <br/>')
    return (
      <>
        {onModal && <div style={{ marginTop: '300px' }} />}
        <VisualSpecContainer dangerouslySetInnerHTML={{ __html: spaced_highlighted_html }} />
        <br />
      </>
    )
  } catch (e) {
    return (
      <>
        <br />
        <VisualSpecContainer>Error {JSON.stringify(e)}</VisualSpecContainer>
        <br />
      </>
    )
  }
}
