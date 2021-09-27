import React from 'react'
import { Button } from '../Button'
import { Modal } from '../Modal'

export default {
  title: 'Components / Modal',
  component: Modal,
}

export const Default = () => (
  <div style={{ height: 300 }}>
    {/* <Button variant='secondary'> Open Modal </Button> */}
    <Modal title='Salesforce Submit Actions'>
      Configure actions which will be completed when the form is submitted by a user.
      <br />
      <br />
      You need to first enable and configure the Salesforce integration on the Integrations Page
    </Modal>
  </div>
)
