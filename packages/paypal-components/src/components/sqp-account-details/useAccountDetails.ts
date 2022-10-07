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
      jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2MzQwNmY4MWUzMWUzOTM2ZjkwOTQxZDAiLCJpYXQiOjE2NjUxNjcyMzMsImV4cCI6MTY2NTI1MzYzMywic3ViIjoiYzJGdEt6SXdRSE5oWVhOeGRXRjBMbU5vOmMyRnRLekl3UUhOaFlYTnhkV0YwTG1Ob0B0ZXN0X2E4YjQxam90ZjhhMXY6dXNlcnMiLCJ1c2VyIjp7ImlkIjoic2FtKzIwQHNhYXNxdWF0LmNoIiwiYWNjb3VudElkIjoic2FtKzIwQHNhYXNxdWF0LmNoIiwiZGF0ZUJsb2NrZWQiOm51bGx9fQ.ODn5NEs5iU2WpzarxLycTy0J2eZoA0c9OwrloTGJ2wk',
      id: 'sam+20@saasquat.ch',
      accountId: 'sam+20@saasquat.ch',
      managedIdentity: {
        email: 'sam+20@saasquat.ch',
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
