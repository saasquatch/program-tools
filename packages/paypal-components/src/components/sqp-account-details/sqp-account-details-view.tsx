import { h } from '@stencil/core';
import { createStyleSheet } from '../../styling/JSS';

export interface AccountDetailsViewProps {
  setOpen: (open: boolean) => void;
  hasAccount: boolean;
  accountDetails: {
    email: string;
    recentPayment: { amount: number; date: number };
    nextPayment: { date: number };
  };
  detailsContent: {
    headerText: string;
    accountLabel: string;
    recentPaymentLabel: string;
    nextPaymentLabel: string;
    editText: string;
  };
}

export function AccountDetailsView(props: AccountDetailsViewProps) {
  const { detailsContent, accountDetails } = props;

  if (!props.hasAccount) return '';
  const FlexContainer = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '10px',
  };
  const style = {
    Container: {
      extend: FlexContainer,
      flexDirection: 'column',
    },
    HeaderContainer: {
      'extend': FlexContainer,
      '& img': {
        width: '39px',
        height: '39px',
      },
    },

    AccountDetailsContainer: {
      extend: FlexContainer,
      flexDirection: 'column',
    },

    LabelContainer: {
      'extend': FlexContainer,
      'alignItems': 'center',
      '& p': {
        margin: '0',
      },
    },

    Label: {
      fontWeight: 'bold',
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const { classes } = sheet;

  return (
    <div class={classes.Container}>
      <style type="text/css">{styleString}</style>
      <div class={classes.HeaderContainer}>
        <img src="https://res.cloudinary.com/saasquatch-staging/image/upload/v1665099915/tenant_test_ahsf8e6g2r1dh/d2ihkaexgwi6xwmtvkco.png" />
        <h2>{detailsContent.headerText}</h2>
      </div>
      <div class={classes.AccountDetailsContainer}>
        <div class={classes.LabelContainer}>
          <p class={classes.Label}>{detailsContent.accountLabel}:</p> <p>{accountDetails.email}</p>{' '}
          <a
            href=""
            onClick={e => {
              e.preventDefault();
              props.setOpen(true);
            }}
          >
            {detailsContent.editText}
          </a>
        </div>
        <div class={classes.LabelContainer}>
          <p class={classes.Label}>{detailsContent.recentPaymentLabel}:</p>{' '}
          <p>
            {accountDetails.recentPayment.amount} on {accountDetails.recentPayment.date}
          </p>
        </div>
        <div class={classes.LabelContainer}>
          <p class={classes.Label}>{detailsContent.nextPaymentLabel}:</p> <p>{accountDetails.nextPayment.date}</p>
        </div>
      </div>
    </div>
  );
}
