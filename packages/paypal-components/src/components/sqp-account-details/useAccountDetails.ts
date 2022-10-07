import { setUserIdentity, useQuery } from '@saasquatch/component-boilerplate';
import { useEffect } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';

const ACCOUNT_DETAILS_QUERY = gql`
  query {
    viewer {
      ... on User {
        id
        accountId
        firstName
        customFields
      }
    }
  }
`;

export function useAccountDetails(props) {
  // hacking in a user for ez development
  useEffect(() => {
    setUserIdentity({
      jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2MzNmNjFlMmY5YTY1NDFjZmNlNmMyOTgiLCJpYXQiOjE2NjUwOTgyMTAsImV4cCI6MTY2NTE4NDYxMCwic3ViIjoiYzJGdEt6RXlRSE5oWVhOeGRXRjBMbU5vOmMyRnRLekV5UUhOaFlYTnhkV0YwTG1Ob0B0ZXN0X2E4YjQxam90ZjhhMXY6dXNlcnMiLCJ1c2VyIjp7ImlkIjoic2FtKzEyQHNhYXNxdWF0LmNoIiwiYWNjb3VudElkIjoic2FtKzEyQHNhYXNxdWF0LmNoIiwiZGF0ZUJsb2NrZWQiOm51bGx9fQ.QMYyTFfP8G1rSw2xGP0o0Wafv9ZS4VIy0kyiXY_wXWE',
      id: 'sam+12@saasquat.ch',
      accountId: 'sam+12@saasquat.ch',
      managedIdentity: {
        email: 'sam+12@saasquat.ch',
        emailVerified: true,
        sessionData: {},
      },
    });
  }, []);

  const { data } = useQuery(ACCOUNT_DETAILS_QUERY, {});

  function setupAccount() {}
  return {
    setupAccount,
    hasAccount: !!data?.viewer?.customFields?.paypalEmail,
    accountDetails: {
      email: data?.viewer?.customFields?.paypalEmail,
      recentPayment: { amount: 10000, date: 12345678900 },
      nextPayment: {
        date: 12345678900,
      },
    },

    content: {
      headerText: props.headerText,
      accountLabel: props.accountLabel,
      recentPaymentLabel: props.recentPaymentLabel,
      nextPaymentLabel: props.nextPaymentLabel,
      editText: props.editText,
    },
  };
}
