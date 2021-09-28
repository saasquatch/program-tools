import React, { useCallback, useState } from 'react'
import { Button } from '../Button'
import { Modal, ModalSection, ModalDivier } from '../Modal'

export default {
  title: 'Components / Modal',
  component: Modal,
}

export const Default = () => {
  const [active, setActive] = useState(true)
  const handleChange = useCallback(() => setActive(!active), [active])
  return (
    <div style={{ height: 300 }}>
      <Button variant='secondary' onClick={handleChange}>
        Open Modal
      </Button>
      <Modal
        title='Salesforce Submit Actions'
        open={active}
        onClose={handleChange}
        primaryAction={{
          text: 'Close',
          onAction: handleChange,
        }}>
        <ModalSection>
          Configure actions which will be completed when the form is submitted by a user.
          <br />
          <br />
          You need to first enable and configure the Salesforce integration on the Integrations Page
        </ModalSection>
      </Modal>
    </div>
  )
}

export const WithCriticalAction = () => {
  const [active, setActive] = useState(true)
  const handleChange = useCallback(() => setActive(!active), [active])
  return (
    <div style={{ height: 300 }}>
      <Button variant='secondary' onClick={handleChange}>
        Open Modal
      </Button>
      <Modal
        title='Delete Reward - VIP Reward'
        open={active}
        onClose={handleChange}
        primaryAction={{
          text: 'Confirm',
          danger: true,
          onAction: handleChange,
        }}
        secondaryAction={{
          text: 'Cancel',
          onAction: handleChange,
        }}>
        <ModalSection>
          Delete this reward?
          <br />
          <br />
          <span style={{ color: '#C71D06' }}> This action cannot be undone </span>
        </ModalSection>
        <ModalDivier />
      </Modal>
    </div>
  )
}
