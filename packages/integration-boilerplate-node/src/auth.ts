import { Base64 } from "js-base64";
import jwksRsa from "jwks-rsa";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import { Logger } from "winston";
import { URLSearchParams } from "url";
import NodeCache from "node-cache";

import { PermissionDeniedError } from "./errors";

function createSaasquatchJwksClient(appDomain: string) {
  return jwksRsa({
    jwksUri: `https://${appDomain}/.well-known/jwks.json`,
    cache: true,
    cacheMaxEntries: 5, // We only have 2 right now
  });
}

/**
 * Validate the given JWT with public JWKS and get the claims.
 * @param token The input JWT
 */
function validateWithJwks(
  token: string,
  jwksClient: jwksRsa.JwksClient,
  options?: jwt.VerifyOptions
): Promise<object> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      (header, callback) => {
        jwksClient.getSigningKey(header.kid!, (err, key) => {
          callback(err, key ? key.getPublicKey() : undefined);
        });
      },
      options,
      (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          if (!decoded) {
            reject();
          } else {
            resolve(decoded);
          }
        }
      }
    );
  });
}

export class Auth {
  private jwksClientCache: NodeCache;
  private saasquatchTokenCache: NodeCache;

  constructor(
    private appDomain: string,
    private auth0ClientId: string,
    private auth0ClientSecret: string,
    private auth0Domain: string,
    private logger: Logger
  ) {
    this.jwksClientCache = new NodeCache({
      stdTTL: 86400, // 1 day
      useClones: false,
      maxKeys: 1,
    });
    this.saasquatchTokenCache = new NodeCache({
      stdTTL: 3600 * 6, // 6 hours
      maxKeys: 1,
    });
  }

  private getJwksClient() {
    if (this.jwksClientCache.has("the")) {
      this.logger.debug(`Retrieving JWKS client from from cache`);
      return this.jwksClientCache.get("the") as jwksRsa.JwksClient;
    }

    const client = createSaasquatchJwksClient(this.appDomain);
    this.jwksClientCache.set("the", client);
    return client;
  }

  /**
   * Validate a request coming from SaaSquatch.
   *
   * @param requestBody The raw text of the request body.
   * @param jwsNoPayloadHeader The value of the X-Hook-JWS-RFC-7797 header.
   */
  async validateSaaSquatchRequest(
    requestBody: string,
    jwsNoPayloadHeader: string
  ) {
    const requestBodyBase64 = Base64.encodeURI(requestBody);
    const token = jwsNoPayloadHeader.replace(
      "..",
      "." + requestBodyBase64 + "."
    );

    return await validateWithJwks(token, this.getJwksClient());
  }

  /**
   * Validate a tenant-scoped token (from SaaSquatch Integrations page)
   *
   * @param token the tenant-scoped token
   */
  async validateSaaSquatchToken(token: string) {
    return await validateWithJwks(token, this.getJwksClient(), {
      issuer: `https://${this.appDomain}/`,
      audience: `${this.auth0ClientId}@clients.machines.saasquat.ch`,
    });
  }

  /**
   * Get a SaaSquatch API access token from Auth0.
   */
  async getSaasquatchApiToken(): Promise<string> {
    if (this.saasquatchTokenCache.has("the")) {
      this.logger.debug(`Retrieving SaaSquatch API token from cache`);
      return this.saasquatchTokenCache.get("the") as string;
    }

    try {
      const body = new URLSearchParams();
      body.append("client_id", this.auth0ClientId);
      body.append("client_secret", this.auth0ClientSecret);
      // NOTE: Unfortunately the API for prod was set up in Auth0 with a trailing / and staging wasn't, so we have
      // to match that in the audience here
      body.append(
        "audience",
        `https://${this.appDomain}${
          this.appDomain === "app.referralsaasquatch.com" ? "/" : ""
        }`
      );
      body.append("grant_type", "client_credentials");

      const response = await fetch(`https://${this.auth0Domain}/oauth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(`Invalid response from Auth0: ${JSON.stringify(json)}`);
      }

      if (!json.access_token) {
        throw new Error("No access_token in Auth0 response");
      }

      this.logger.debug("Successful Auth0 SaaSquatch API token response");
      this.saasquatchTokenCache.set("the", json.access_token);

      return json.access_token;
    } catch (e) {
      throw new PermissionDeniedError(e.message);
    }
  }
}
