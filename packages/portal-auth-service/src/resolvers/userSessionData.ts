import fetch from "node-fetch";
import config from "../config";
import { handleWebhookResponseError } from "../util/handleWebhookResponseError";
import { signWithJWK } from "../util/JWKSKeyStore";
import { getLogger } from "../logger";
import { verify } from "jsonwebtoken";
import { UserInputError, AuthenticationError } from "apollo-server-errors";
import { SquatchUserIdentity } from "../util/generateSquatchJWT";

interface SessionDataBody {
  email: string;
  id: string;
  accountId: string;
  tenantAlias: string;
}

interface SessionDataResult {
  sessionData: {
    [key: string]:
      | string
      | number
      | boolean
      | null
      | object
      | Array<string | number | boolean | null | object>;
  };
}
export const userSessionData = async (
  source: any,
  args: Record<string, any>,
  context: { tenantAlias: string }
) => {
  const { tenantAlias } = context;
  const cfg = config(tenantAlias);

  const { input } = args;
  const { squatchJWT } = input;
  let token;
  try {
    token = await new Promise<{ user: SquatchUserIdentity }>(
      (resolve, reject) =>
        verify(squatchJWT, cfg.SQUATCH_API_KEY, (err: any, decoded?: any) => {
          if (err || !decoded) return reject(err);
          resolve(decoded);
        })
    );
  } catch (e) {
    getLogger().error(e.message);
    throw new AuthenticationError("Invalid JWT");
  }

  const squatchUser = token.user;

  let sessionData = {};
  if (cfg.USER_SESSION_DATA_WEBHOOK_URL) {
    const signInBody: SessionDataBody = {
      ...squatchUser,
      tenantAlias,
    };
    const body = JSON.stringify(signInBody);
    const payloadlessHeader = await signWithJWK(body);
    const response = await fetch(cfg.USER_SESSION_DATA_WEBHOOK_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-hook-jws-rfc-7797": payloadlessHeader,
      },
      body,
    });
    handleWebhookResponseError(response);
    const result: SessionDataResult = await response.json();
    sessionData = result.sessionData;
  }

  return {
    squatchJWT,
    sessionData,
  };
};
