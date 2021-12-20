import * as React from 'react'
import DetailedRadio from './DetailedRadio'
import styled from 'styled-components'

interface DetailedRadiosWidgetProps {
  value: string
  onChange: (p: string) => void
  options: {
    cardFormat?: boolean
    radioOptions: Array<{
      key: string
      label: string
      description: string
      primaryInfo?: any
      name: string
    }>
    currentLink: string
    currentCode: string
  }
  id: string
}

const InfoWrapper = styled.div`
  margin-bottom: 32px;
  padding-left: 32px;
  & * {
    color: #999;
  }
  & b {
    color: #575757;
  }
`

const CardFormatWrapper = styled.div`
  display: grid;
  grid-template-columns: 49% 49%;
  grid-column-gap: 16px;
  grid-template-rows: repeat(auto-fill);
  grid-row-gap: 0px;
  grid-auto-flow: row;
`

const CardFormat = styled.div<{ checked: boolean }>`
  padding: 16px;
  padding-bottom: 0;
  background: ${({ checked }) => (checked ? '#f9f9f9' : 'none')};
  border-radius: 4px;
`

const RadioCards: React.FC<DetailedRadiosWidgetProps> = (props: DetailedRadiosWidgetProps) => {
  const { cardFormat } = props.options

  const Wrapper = cardFormat ? CardFormatWrapper : React.Fragment
  const Card = cardFormat ? CardFormat : React.Fragment
  return (
    <Wrapper>
      {props.options.radioOptions.map((option) => {
        const { key, primaryInfo, name, ...options } = option
        const checked = props.value === key
        const cardProps = cardFormat ? { checked } : {}
        return (
          <Card key={props.id + '_' + key} {...cardProps}>
            <DetailedRadio checked={checked} onChange={props.onChange} id={props.id + '_' + key} value={key} name={props.id} {...options} />
            {key === 'setAsPrimary' && checked && primaryInfo && <InfoWrapper>{primaryInfo.map((info: React.ReactNode) => info)}</InfoWrapper>}
          </Card>
        )
      })}
    </Wrapper>
  )
}

export default RadioCards
