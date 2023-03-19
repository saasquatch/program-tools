import fs from "fs";
import jwt from "jsonwebtoken";
import { AuthenticationClient } from "auth0";
import { Logger } from "winston";

export interface Auth0WorkloadIdentityCredentialProviderOptions {
  auth0Domain: string;
  auth0ClientId: string;
  auth0ClientSecret: string;
  googleWorkloadProjectId: string;
  googleWorkloadIdentityPool: string;
  googleWorkloadIdentityProvider: string;
  googleWorkloadServiceAccountEmail: string;
  tokenFile?: string;
  workloadIdentityFile?: string;
}

export default class Auth0WorkloadIdentityCredentialProvider {
  private tokenFile: string;
  private workloadIdentityFile: string;

  constructor(
    private logger: Logger,
    private options: Auth0WorkloadIdentityCredentialProviderOptions
  ) {
    this.tokenFile = options.tokenFile ?? "token.json";
    this.workloadIdentityFile =
      options.workloadIdentityFile ?? "workload-identity.json";
    this.prepareGoogleCredentials();
    this.refreshAccessToken();
  }

  prepareGoogleCredentials() {
    const credentials = {
      type: "external_account",
      audience: `//iam.googleapis.com/projects/${this.options.googleWorkloadProjectId}/locations/global/workloadIdentityPools/${this.options.googleWorkloadIdentityPool}/providers/${this.options.googleWorkloadIdentityProvider}`,
      subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
      token_url: "https://sts.googleapis.com/v1/token",
      service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${this.options.googleWorkloadServiceAccountEmail}:generateAccessToken`,
      credential_source: {
        file: this.tokenFile,
        format: {
          type: "json",
          subject_token_field_name: "access_token",
        },
      },
    };

    fs.writeFileSync(this.workloadIdentityFile, JSON.stringify(credentials));

    // By setting this in the environment, any Google library used from here on out will try to use
    // these credentials
    process.env["GOOGLE_APPLICATION_CREDENTIALS"] = this.workloadIdentityFile;

    this.logger.debug(
      "Wrote workload identity configuration file and configured GOOGLE_APPLICATION_CREDENTIALS."
    );
  }

  async getWorkloadIdentityAccessToken() {
    const auth0 = new AuthenticationClient({
      domain: this.options.auth0Domain,
      clientId: this.options.auth0ClientId,
      clientSecret: this.options.auth0ClientSecret,
    });

    const audience = `https://iam.googleapis.com/projects/${this.options.googleWorkloadProjectId}/locations/global/workloadIdentityPools/${this.options.googleWorkloadIdentityPool}/providers/${this.options.googleWorkloadIdentityProvider}`;

    const response = await auth0.clientCredentialsGrant({
      audience,
    });

    return response;
  }

  async refreshAccessToken() {
    const reschedule = (inSeconds: number) => {
      setTimeout(this.refreshAccessToken.bind(this), inSeconds * 1000);
    };

    try {
      const token = await this.getWorkloadIdentityAccessToken();
      const decoded = jwt.decode(token.access_token);

      if (isValidJwtPayload(decoded)) {
        fs.writeFileSync(this.tokenFile, JSON.stringify(token));

        // Reschedule token refresh in 75% of the expiry time of the new token
        const expiresInSeconds = decoded.exp - decoded.iat;
        const refreshInSeconds = Math.max(10, expiresInSeconds * 0.75);

        this.logger.debug(
          "Refreshed workload identity token, expires in %d seconds.",
          expiresInSeconds
        );

        reschedule(refreshInSeconds);
      } else {
        throw new Error("Did not get a valid JWT payload from Auth0");
      }
    } catch (e) {
      this.logger.error(
        "Failed to refresh workload identity token: %s",
        (e as Error).message
      );

      // If we fail to get a new token from Auth0, let's hope we already have a token that hasn't
      // expired yet. Schedule a refresh in 5 seconds to try again.
      // There's really not much else we can do here besides keep trying to get a token, and hope
      // that it works on retry.
      reschedule(5);
    }
  }
}

function isValidJwtPayload(
  token: ReturnType<typeof jwt.decode>
): token is jwt.JwtPayload & { iat: number; exp: number } {
  return (
    token != undefined &&
    token != null &&
    typeof token === "object" &&
    token.hasOwnProperty("iat") &&
    token.hasOwnProperty("exp")
  );
}
