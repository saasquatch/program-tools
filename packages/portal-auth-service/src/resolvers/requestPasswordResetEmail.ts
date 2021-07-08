import { gql } from "graphql-request";
import config from "../config";
import { getFirebaseAdminAuth } from "../util/getFirebaseAdminAuth";
import { getGraphQLClient } from "../util/getGraphQLClient";
import { queueEmail } from "../util/queueEmail";

interface RequestPasswordResetEmailInput {
  email: string;
  urlParams?: { [key: string]: string };
}

export const requestPasswordResetEmail = async (
  source: any,
  args: Record<"input", RequestPasswordResetEmailInput>,
  context: { tenantAlias: string }
) => {
  const { tenantAlias } = context;
  const { email, urlParams } = args.input;
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for
    // this URL must be whitelisted in the Firebase Console.
    url: "http://localhost:8080",
    // dynamicLinkDomain: 'coolapp.page.link',
  };

  const auth = await getFirebaseAdminAuth(tenantAlias);
  let googleGeneratedLink;
  try {
    googleGeneratedLink = await auth.generatePasswordResetLink(
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
  const key = config(tenantAlias).RESET_PASSWORD_EMAIL_KEY;

  const params = new URLSearchParams({ ...urlParams, oobCode }).toString();
  const link = `${config(tenantAlias).PORTAL_DOMAIN}/resetPassword?${params}`;

  await queueEmail(squatchUser, key, link);

  return {
    success: true,
  };
};
