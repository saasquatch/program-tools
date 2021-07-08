import * as jwt from "jsonwebtoken";
import config from "../config";
export interface SquatchUserIdentity {
  id: string;
  accountId: string;
  email: string;
  verified: boolean;
}

export async function generateSquatchJWT(
  user: SquatchUserIdentity,
  tenantAlias: string
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      { user },
      config(tenantAlias).SQUATCH_API_KEY,
      (err: any, jwt?: string) => {
        if (err || !jwt) return reject(err);
        return resolve(jwt);
      }
    );
  });
}
