import { generateSquatchJWT } from "../util/generateSquatchJWT";
import { getFirebaseAdminAuth } from "../util/getFirebaseAdminAuth";
import fetch from "node-fetch";
import config from "../config";
import { handleWebhookResponseError } from "../util/handleWebhookResponseError";
import { safeJsonata } from "../util/safeJSONata";
import { getGraphQLClient } from "../util/getGraphQLClient";
import { gql } from "graphql-request";
import {
  ApolloError,
  ForbiddenError,
  UserInputError,
} from "apollo-server-errors";
import { signWithJWK } from "../util/JWKSKeyStore";
import { getLogger } from "../logger";

interface RegisterUserBody {
  email: string;
  id: string;
  accountId: string;
  tenantAlias: string;
  [key: string]:
    | string
    | number
    | boolean
    | null
    | object
    | Array<string | number | boolean | null | object>;
}

interface RegisterUserResult {
  sessionData?: {
    [key: string]:
      | string
      | number
      | boolean
      | null
      | object
      | Array<string | number | boolean | null | object>;
  };
  userUpsert?: {
    email?: string;
    id?: string;
    accountId?: string;
    firstName?: string;
    lastName?: string;
    countryCode?: string;
    referralCode?: string;
    referralCodes?: {
      [program: string]: string;
    };
    shareLinks?: {
      [program: string]: string;
    };
    imageUrl?: string;
    paymentProviderId?: string;
    locale?: string;
    referredByCodes?: string[];
    cookies?: string;
    referable?: boolean;
    customFields?: {
      [field: string]: string | number | boolean;
    };
    segments?: string[];
    programGoals?: {
      goalId: string;
      programId: string | number;
      count: number; // Int
      firstDate: number; // Int
      lastDate: number; // Int
      conversionCount: number; // Int
    }[];
    dateCreated?: number; // Int
    dateUsTaxFormSubmitted?: number; // Int
  };
}

export const registerUser = async (
  source: any,
  args: Record<string, any>,
  context: { tenantAlias: string }
) => {
  const { tenantAlias } = context;
  const cfg = config(tenantAlias);

  const { input } = args;
  const { email, password, formData } = input;
  const auth = await getFirebaseAdminAuth(tenantAlias);
  let uid;
  try {
    const firebaseUser = await auth.createUser({ email, password });
    uid = firebaseUser.uid;
  } catch (e) {
    if (e?.errorInfo?.code === "auth/email-already-exists") {
      throw new ForbiddenError("A user with this email already exists."); // Maybe this shouldn't be included..
    }
    if (e?.errorInfo?.code === "auth/invalid-password") {
      throw new UserInputError(e?.errorInfo?.message || "Password too weak.");
    }
    throw new ApolloError(e.message, "INTERNAL_SERVER_ERROR");
  }

  let squatchUser;
  let sessionData;
  try {
    const registrationData: RegisterUserBody = {
      email,
      id: config(tenantAlias).ID_PREFIX + uid,
      accountId: config(tenantAlias).ID_PREFIX + uid,
      tenantAlias,
      ...formData,
    };

    const defaultJSONataTransformation = `
      {
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "countryCode": country,
        "id": id,
        "accountId": accountId,
        "customFields": customFields,
        "segments": segments
      }
    `;

    const JSONataTransformation =
      cfg.USER_UPSERT_JSONATA_TRANSFORMATION || defaultJSONataTransformation;
    //replace with either custom transformation url // default JSONata transformation

    let userUpsert = safeJsonata(JSONataTransformation, registrationData);

    if (cfg.REGISTER_USER_WEBHOOK_URL) {
      const body = JSON.stringify(registrationData);
      const payloadlessHeader = await signWithJWK(body);
      const response = await fetch(cfg.REGISTER_USER_WEBHOOK_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-hook-jws-rfc-7797": payloadlessHeader,
        },
        body,
      });
      handleWebhookResponseError(response);
      const result: RegisterUserResult = await response.json();
      sessionData = result.sessionData || {};
      if (result.userUpsert) {
        userUpsert = result.userUpsert;
      }
    } else {
      sessionData = {};
    }

    squatchUser = {
      id: userUpsert.id,
      accountId: userUpsert.accountId || userUpsert.id,
      email,
    };

    const client = getGraphQLClient(tenantAlias);
    const userInput = { ...userUpsert, ...squatchUser };
    const mutation = gql`
      mutation upsert($userInput: UserInput!) {
        upsertUser(userInput: $userInput) {
          id
        }
      }
    `;
    const variables = { userInput };

    await client.request(mutation, variables);
    getLogger().debug("USER CREATED: ", userInput.id);
  } catch (e) {
    // todo: what to do if this fails, add retry
    await auth.deleteUser(uid);
    throw e;
  }

  const squatchJWT = await generateSquatchJWT(
    { ...squatchUser, verified: false },
    tenantAlias
  );

  return {
    squatchJWT,
    sessionData,
  };
};
