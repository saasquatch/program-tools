import React, { useCallback, useState } from 'react'
import { Button } from '../Button'
import { Modal, ModalContent, ModalContentDivider, ModalContentAction, ModalContentText, ModalContentBanner, ModalContentTopAction, ModalContentCode } from '../Modal'
import { Dropdown } from '../Dropdown'
import { Input } from '../Input'
import { RadioAction } from '../RadioAction'
import { Icon } from '../Icon'
import { Checkbox } from '../Checkbox'

export default {
  title: 'Components / Modal',
  component: Modal,
}

export const WithPrimaryAction = () => {
  const [active, setActive] = useState(true)
  const handleChange = useCallback(() => setActive(!active), [active])
  return (
    <div style={{ height: 300 }}>
      <Button variant='secondary' onClick={handleChange}>
        Open Modal
      </Button>
      <Modal title='Salesforce Submit Actions' open={active} onClose={handleChange}>
        <ModalContent>
          <ModalContentText>
            Configure actions which will be completed when the form is submitted by a user.
            <br />
            <br />
            You need to first enable and configure the Salesforce integration on the &nbsp; <span style={{ color: '#1f97d2', userSelect: 'none' }}> Integrations Page </span>
          </ModalContentText>
          <ModalContentAction
            primaryAction={{
              text: 'Close',
              onAction: handleChange,
            }}
          />
        </ModalContent>
      </Modal>
    </div>
  )
}

export const WithPrimaryAndSecondaryAction = () => {
  const [active, setActive] = useState(true)
  const handleChange = useCallback(() => setActive(!active), [active])

  return (
    <div style={{ height: 700 }}>
      <Button variant='secondary' onClick={handleChange}>
        Open Modal
      </Button>
      <Modal title='Add Referral Code' open={active} onClose={handleChange}>
        <ModalContent>
          <ModalContentText>
            Select a program <span style={{ color: '#adadad' }}> (required) </span>
            <br />
            <Dropdown text='Referral Program' style={{ margin: '10px 0 10px 0', width: '518px' }} />
            <br />
            Referral Code <span style={{ color: '#adadad' }}> (required) </span>
            <br />
            <Input value='NEW CODE' style={{ margin: '10px 0 10px 0', width: '510px' }} />
            <br />
            <RadioAction
              options={{
                title: 'Set as primary referral code',
                text: (
                  <span>
                    A program's primary referral code will be used in widgets, emails, API and integrations.
                    <br />
                    <br />
                    <strong>SHIRLEYCODE129</strong> will no longer be primary
                    <br />
                    <br />A <strong> new primary sharelink </strong> will be created
                  </span>
                ),
              }}
              value={true}
              onChange={void 0}
            />
            <RadioAction
              options={{
                title: 'Set as secondary referral code',
                text: <span>A program's primary referral code will not be used in widgets, emails, API and integrations.</span>,
              }}
              value={false}
              onChange={void 0}
            />
          </ModalContentText>
          <ModalContentDivider />
          <ModalContentAction
            primaryAction={{
              text: 'Save',
              onAction: handleChange,
            }}
            secondaryAction={{
              text: 'Cancel',
              onAction: handleChange,
            }}
          />
        </ModalContent>
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
      <Modal title='Salesforce Submit Actions' open={active} onClose={handleChange}>
        <ModalContent>
          <ModalContentText>
            Delete this reward?
            <br />
            <br />
            <span style={{ color: '#C71D06' }}> This action cannot be undone </span>{' '}
          </ModalContentText>
          <ModalContentDivider />
          <ModalContentAction
            primaryAction={{
              text: 'Confirm',
              danger: true,
              onAction: handleChange,
            }}
            secondaryAction={{
              text: 'Cancel',
              onAction: handleChange,
            }}
          />
        </ModalContent>
      </Modal>
    </div>
  )
}

export const WithBanner = () => {
  const [active, setActive] = useState(true)
  const handleChange = useCallback(() => setActive(!active), [active])
  const program_icon = (
    <svg width='37' height='36' viewBox='0 0 37 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fill-rule='evenodd' clip-rule='evenodd' d='M15.6319 6.63158C15.6319 8.72445 13.9353 10.4211 11.8424 10.4211C9.74955 10.4211 8.05294 8.72445 8.05294 6.63158C8.05294 4.53871 9.74955 2.84211 11.8424 2.84211C13.9353 2.84211 15.6319 4.53871 15.6319 6.63158ZM18.474 6.63158C18.474 10.2941 15.5049 13.2632 11.8424 13.2632C8.1799 13.2632 5.21084 10.2941 5.21084 6.63158C5.21084 2.96906 8.1799 0 11.8424 0C15.5049 0 18.474 2.96906 18.474 6.63158ZM10.2285 18.3971C7.41317 18.8416 4.67213 20.834 2.69239 24.7934C2.34141 25.4954 1.48782 25.78 0.785852 25.429C0.0838822 25.078 -0.200649 24.2244 0.150335 23.5224C2.43375 18.9556 5.85061 16.211 9.78526 15.5898C13.7007 14.9715 17.7916 16.5098 21.3357 19.8008C21.9108 20.3348 21.9441 21.234 21.4101 21.8091C20.876 22.3842 19.9769 22.4175 19.4018 21.8835C16.3143 19.0165 13.0631 17.9495 10.2285 18.3971ZM26.5266 34.5789C26.5266 35.3638 27.1629 36 27.9477 36C28.7325 36 29.3687 35.3638 29.3687 34.5789V29.3684H35.0529C35.8378 29.3684 36.474 28.7322 36.474 27.9474C36.474 27.1625 35.8378 26.5263 35.0529 26.5263H29.3687V20.3684C29.3687 19.5836 28.7325 18.9474 27.9477 18.9474C27.1629 18.9474 26.5266 19.5836 26.5266 20.3684V26.5263H20.8424C20.0576 26.5263 19.4214 27.1625 19.4214 27.9474C19.4214 28.7322 20.0576 29.3684 20.8424 29.3684H26.5266V34.5789Z' fill='white' />
    </svg>
  )
  return (
    <div style={{ height: 750 }}>
      <Button variant='secondary' onClick={handleChange}>
        Open Modal
      </Button>
      <Modal title='Signup Program' open={active} onClose={handleChange}>
        <ModalContent>
          <ModalContentBanner banner={{ text: 'A section heading', icon: program_icon }} />
          <ModalContentText>
            Encourage new users to try your product or service by offering a special reward upon signup.
            <br />
            <br />
            This can be leveraged to increase sales or engagement during the holidays or any special event with unique and exclusive incentives.
            <br />
            <br />
            <h3>Example:</h3>
            An e-learning subscription platform is ready to scale up their customer base at the start of the school year.
            <br />
            <br />
            The company launches a signup program that gives a free month premium subscription for brand new signups during the month of September.
            <br />
            <br />
            <h3>Features:</h3>
            <ul>
              <li>Specify the conditions that will cause users to be rewarded.</li>
              <li>Specify the reward earned when signup is completed.</li>
              <li>Customize the email to notify users when they get a reward.</li>
            </ul>
          </ModalContentText>
          <ModalContentDivider />
          <ModalContentAction
            primaryAction={{
              text: 'Create',
              onAction: handleChange,
            }}
            secondaryAction={{
              text: 'Cancel',
              onAction: handleChange,
            }}
          />
        </ModalContent>
      </Modal>
    </div>
  )
}

export const WithHeaderAction = () => {
  const [active, setActive] = useState(true)
  const handleChange = useCallback(() => setActive(!active), [active])
  return (
    <div style={{ height: 550 }}>
      <Button variant='secondary' onClick={handleChange}>
        Open Modal
      </Button>
      <Modal title='Referral Program With Objectives Program' open={active} onClose={handleChange}>
        <ModalContent>
          <ModalContentTopAction action={{ text: 'Back to Learn More', icon: <Icon size='20px' icon='leftward_arrow' /> }} />
          <ModalContentText>
            <span style={{ color: '#989898' }}> Name your program to start setting up your program rules. </span>
            <br />
            <br />
            Program Name
            <Input value='' style={{ margin: '10px 0 10px 0' }} />
            <br />
            Program ID
            <Input disabled style={{ margin: '10px 0 10px 0' }} />
          </ModalContentText>
          <ModalContentDivider />
          <ModalContentAction
            primaryAction={{
              text: 'Create',
              onAction: handleChange,
            }}
            secondaryAction={{
              text: 'Cancel',
              onAction: handleChange,
            }}
          />
        </ModalContent>
      </Modal>
    </div>
  )
}

export const WithMultipleSectionsAndActions = () => {
  const [active, setActive] = useState(true)
  const handleChange = useCallback(() => setActive(!active), [active])
  return (
    <div style={{ height: 900 }}>
      <Button variant='secondary' onClick={handleChange}>
        Open Modal
      </Button>
      <Modal title='Signup Program' open={active} onClose={handleChange}>
        <ModalContent>
          <ModalContentText>
            <h2 style={{ marginTop: 0, marginBottom: 8 }}>Change Email Address</h2>
            <span style={{ color: '#989898' }}> (Current address: shirley.lam@referralsaasquatch.com) </span>
            <br />
            <br />
            Enter New Email
            <Input value='' style={{ margin: '10px 0 10px 0' }} />
            Enter Password
            <Input value='' style={{ margin: '10px 0 10px 0' }} />
          </ModalContentText>
          <ModalContentAction
            primaryAction={{
              text: 'Save',
              onAction: handleChange,
            }}
          />
          <ModalContentDivider />
          <ModalContentText>
            <h2 style={{ marginTop: 25, marginBottom: 8 }}>Change Password</h2>
            <span style={{ color: '#989898' }}> Passwords must be at least 8 characters long </span>
            <br />
            <br />
            Current Password
            <Input value='' style={{ margin: '10px 0 10px 0' }} />
            New Password
            <Input value='' style={{ margin: '10px 0 10px 0' }} />
            Re-enter New Password
            <Input value='' style={{ margin: '10px 0 10px 0' }} />
          </ModalContentText>
          <ModalContentAction
            primaryAction={{
              text: 'Save',
              onAction: handleChange,
            }}
          />
        </ModalContent>
      </Modal>
    </div>
  )
}

export const WithFormElements = () => {
  const [active, setActive] = useState(true)
  const handleChange = useCallback(() => setActive(!active), [active])
  return (
    <div style={{ height: 700 }}>
      <Button variant='secondary' onClick={handleChange}>
        Open Modal
      </Button>
      <Modal title='Add User' open={active} onClose={handleChange}>
        <ModalContent>
          <ModalContentText>
            First Name
            <Input value='' style={{ margin: '10px 0 10px 0' }} />
            Last Name
            <Input value='' style={{ margin: '10px 0 10px 0' }} />
            Email
            <Input value='' style={{ margin: '10px 0 10px 0' }} />
            Account ID <span style={{ color: '#989898' }}> (required) </span>
            <Input value='' style={{ margin: '10px 0 10px 0' }} />
            User ID <span style={{ color: '#989898' }}> (required) </span>
            <Input value='' style={{ margin: '10px 0 10px 0' }} />
            <br />
            <Checkbox value={true} options={{ text: 'Referrable' }}></Checkbox>
          </ModalContentText>
          <ModalContentDivider />
          <ModalContentAction
            primaryAction={{
              text: 'Add',
              onAction: handleChange,
            }}
            secondaryAction={{
              text: 'Cancel',
              onAction: handleChange,
            }}
          />
        </ModalContent>
      </Modal>
    </div>
  )
}

export const WithCodeBlock = () => {
  const code = `Insert c{
"id": "61425f36976a1d00171c46c7",
"type": "CREDIT",
"value": 1,
"prettyValue": "1 MONTH",
"prettyRedeemedCredit": "0 MONTH",
"prettyAssignedCredit": "1 MONTH",
"prettyAvailableValue": "1 MONTH",
"usTaxableValue": 0,
"unit": "MONTH",
"currency": null,
"rewardUnit": {
	"key": "MONTH",
	"name": "Month",
	"currency": null,
"__typename": "RewardUnit"
},
"name": "Signup Reward",`

  const [active, setActive] = useState(true)
  const handleChange = useCallback(() => setActive(!active), [active])
  return (
    <div style={{ height: 700 }}>
      <Button variant='secondary' onClick={handleChange}>
        Open Modal
      </Button>
      <Modal title='Reward Details' open={active} onClose={handleChange}>
        <ModalContent>
          <ModalContentCode>{code}</ModalContentCode>
          <ModalContentDivider />
          <ModalContentAction
            primaryAction={{
              text: 'Add',
              onAction: handleChange,
            }}
            secondaryAction={{
              text: 'Cancel',
              onAction: handleChange,
            }}
          />
        </ModalContent>
      </Modal>
    </div>
  )
}

export const WithCodeBlockOverflow = () => {
  const code = `{
"id": "61425f36976a1d00171c46c7",
"type": "CREDIT",
"value": 1,
"prettyValue": "1 MONTH",
"prettyRedeemedCredit": "0 MONTH",
"prettyAssignedCredit": "1 MONTH",
"prettyAvailableValue": "1 MONTH",
"usTaxableValue": 0,
"unit": "MONTH",
"currency": null,
"rewardUnit": {
	"key": "MONTH",
	"name": "Month",
	"currency": null,
	"__typename": "RewardUnit"
},
"name": "Signup Reward",
"dateGiven": 1631739702723,
"dateExpires": null,
"dateCancelled": null,
"dateCreated": 1631739702723,
"dateScheduledFor": null,
"rewardSource": "AUTOMATED",
"fuelTankCode": null,
"fuelTankType": null,
"programId": "looking-at-signup",
"programRewardKey": "signupReward",
"program": {
	"id": "looking-at-signup",
	"name": "looking at signup",
	"__typename": "Program"
},
"integration": null,
"description": null,
"redeemedCredit": 0,
"statuses": [
	"AVAILABLE"
],
"pendingReasons": [],
"assignedCredit": 1,
"cancellable": true,
"meta": null,
"__typename": "FlatReward"
}`

  const [active, setActive] = useState(true)
  const handleChange = useCallback(() => setActive(!active), [active])
  return (
    <div style={{ height: 900 }}>
      <Button variant='secondary' onClick={handleChange}>
        Open Modal
      </Button>
      <Modal title='Reward Details' open={active} onClose={handleChange}>
        <ModalContent>
          <ModalContentCode>{code}</ModalContentCode>
          <ModalContentDivider />
          <ModalContentAction
            primaryAction={{
              text: 'Add',
              onAction: handleChange,
            }}
            secondaryAction={{
              text: 'Cancel',
              onAction: handleChange,
            }}
          />
        </ModalContent>
      </Modal>
    </div>
  )
}
