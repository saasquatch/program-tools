import React from 'react'
import { Icon } from '../Icon'
import { Skeleton, Content, Action, DataTable, Divider, Popover, Row, Pagination } from '../DataTable'
import { Avatar } from '../Avatar'
import { Text } from '../Text'
import { Dropdown } from '../Dropdown'
import { VisualSpec } from '../meta'

export default {
  title: 'User Page / Rewards Table',
  component: Row,
}

export const FormSubmissionTable = () => {
  const content_a = [{ text: 'DATE CREATED' }, { text: 'VALUE' }, { text: 'TYPE' }, { text: 'SOURCE' }, { text: 'USER' }, { text: 'STATUS' }, { text: 'CUSTOMER NOTE' }, { text: '', width: '50px', flex: 0.01 }]

  const text_a = (
    <Content>
      <div>
        <strong> A form name </strong> <br />
        form-key
      </div>
    </Content>
  )

  const text_b = (
    <Content>
      <div>
        <Avatar firstName='New' lastName='Guy' />
      </div>
      <div style={{ marginLeft: 10 }}>
        <span style={{ color: '#0088CC' }}>new guy</span> <br />
        sam123@test.ca
      </div>
    </Content>
  )

  const text_c = <Content>11 months ago</Content>

  const text_d = (
    <Content>
      <Skeleton circle={true} size='8px' color='#57AC59' /> Success
    </Content>
  )

  const text_e = (
    <Content>
      <Skeleton circle={true} size='8px' color='#FE6666' /> Failed
    </Content>
  )

  const content_b = [{ text: text_a }, { text: text_b }, { text: text_c }, { text: text_d }, { text: '' }, { text: '' }, { text: '' }, { text: <Icon icon='actions' />, width: '50px', flex: 0.01, center: true }]
  const content_c = [{ text: text_a }, { text: text_b }, { text: text_c }, { text: text_e }, { text: '' }, { text: '' }, { text: '' }, { text: <Icon icon='actions' />, width: '50px', flex: 0.01, center: true }]

  const css = `
  .table-stats-container {
    background: #ebebeb;
    padding-bottom: 10px;
    padding-right: 10px;
    width: calc(100% - 10px);
}
.table-stats-container-title {
    color: #aaa;
    font-size: 10px;
    font-weight: bold;
    margin-bottom: -5px;
    margin-left: 10px;
    margin-top: 5px;
    text-transform: uppercase;
}
.table-stat-item {
    background: #b0e0e5;
    border-radius: 5px;
    color: #003b44;
    display: inline-block;
    font-weight: bold;
    margin: 10px 0 0 10px;
    padding: 5px 10px;
}
.exuTrT {
    border: none;
    margin-top: -2px;
    margin-left: -3px;
    padding: 5px 10px;
    font-size: 13px;
    padding-bottom: 4px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 1px solid #999;
    outline: none;
}
`

  return (
    <div>
      <VisualSpec
        spec={`
		Scenario: Rewards Table
		Given there are stuff
		And more stuff
		Then do stuff
		And have stuff`}
      />
      <DataTable width='100%'>
        <div style={{ paddingBottom: 20 }}>
          <Dropdown text='All Forms' css='min-width: 100px; margin-right: 10px;'></Dropdown>
          <Dropdown text='Any Status' css='min-width: 110px;'></Dropdown>
        </div>
        <Row variant='banner'> </Row>
        <Row variant='extra' css='padding: 0;'>
          <style>{css}</style>
          <div className='table-stats-container'>
            <div className='table-stats-container-title'>Rewards Summary</div>
            <div style={{ display: 'inline-block' }}>
              <div className='table-stat-item' style={{ backgroundColor: 'white' }}>
                <div>CAD 0.10 available</div>
              </div>
              <button className='table-stat-item sc-jMMfwr exuTrT'>Exchange</button>
            </div>
            <div style={{ display: 'inline-block' }}>
              <div className='table-stat-item' style={{ backgroundColor: 'white' }}>
                <div>$12 credit available</div>
              </div>
              <button className='table-stat-item sc-jMMfwr exuTrT'>Exchange</button>
            </div>
          </div>{' '}
        </Row>
        <Row variant='row' content={content_a} css='background: #f9f9f9; color: #7c7c7c;' />
        <Row content={content_b} />
        <Row content={content_c} />
        <Row content={content_c} />
        <Row content={content_c} />
        <Row content={content_c} />
        <Pagination></Pagination>
      </DataTable>
    </div>
  )
}
