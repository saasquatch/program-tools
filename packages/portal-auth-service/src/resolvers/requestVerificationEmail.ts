import { gql } from "graphql-request";
import config from "../config";
import { getFirebaseAdminAuth } from "../util/getFirebaseAdminAuth";
import { getGraphQLClient } from "../util/getGraphQLClient";
import { queueEmail } from "../util/queueEmail";

interface RequestVerificationEmailInput {
  email: string;
  nextPageUrlParam?: string;
}

export const requestVerificationEmail = async (
  source: any,
  args: Record<"input", RequestVerificationEmailInput>,
  context: { tenantAlias: string }
) => {
  const { tenantAlias } = context;
  const { email, nextPageUrlParam } = args.input;
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for
    // this URL must be whitelisted in the Firebase Console.
    url: "http://localhost:8080",
    // dynamicLinkDomain: 'coolapp.page.link',
  };

  const auth = await getFirebaseAdminAuth(tenantAlias);
  let googleGeneratedLink;
  try {
    googleGeneratedLink = await auth.generateEmailVerificationLink(
      email,
      actionCodeSettings
    );
  } catch (e) {
    //suppress error
    return {
      success: true,
    };
  }
  // Matches oobCode=xxxxx in https://example.com/something?oobCode=xxxx&this=that and groups xxxxx
  const oobCode = googleGeneratedLink.match(/oobCode=(.+?[^&]+)/)?.[1];

  if (!oobCode) {
    throw Error("oobCode was not generated");
  }

  // todo: maybe this should be a protected endpoint and the userId and accountId can be taken from the token..
  const client = getGraphQLClient(tenantAlias);
  const query = gql`
    query lookupEmail($email: String) {
      users(filter: { email_eq: $email }, limit: 1) {
        data {
          id
          accountId
        }
      }
    }
  `;
  const variables = { email };

  const { users } = await client.request(query, variables);
  const user = users.data?.[0];
  const squatchUser = { ...user, tenantAlias };
  const key = config(tenantAlias).VERIFY_EMAIL_EMAIL_KEY;
  const link = `${
    config(tenantAlias).PORTAL_DOMAIN
  }/verifyEmail?oobCode=${oobCode}`;

  await queueEmail(squatchUser, key, link);

  return {
    success: true,
  };
};
