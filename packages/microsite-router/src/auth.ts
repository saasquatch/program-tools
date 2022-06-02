import decode from "jwt-decode";

type UserIdentity = {
  id: string;
  accountId: string;
  jwt?: string;
  managedIdentity?: {
    email: string;
    emailVerified: boolean;
    sessionData?: { [key: string]: any };
  };
};

type DecodedSquatchJWT = {
  exp?: number;
  user: {
    accountId: string;
    id: string;
  };
};

const USER_LOCAL_STORAGE_KEY = "sq:user-identity";

function isDecodedSquatchJWT(decoded: any): decoded is DecodedSquatchJWT {
  return decoded.user && decoded.user.id && decoded.user.accountId;
}

function userIdentityFromJwt(jwt?: string): UserIdentity | undefined {
  if (!jwt) return undefined;

  try {
    const decoded = decode<DecodedSquatchJWT>(jwt);
    const exp = decoded.exp;

    let userId: string | undefined = undefined,
      accountId: string | undefined = undefined;

    if (isDecodedSquatchJWT(decoded)) {
      accountId = decoded.user.accountId;
      userId = decoded.user.id;
    }

    if (!userId || !accountId) {
      return undefined;
    }

    // Check if the JWT has expired
    if (exp && Date.now() >= exp * 1000) {
      return undefined;
    }

    return {
      id: userId,
      accountId: accountId,
      jwt,
    };
  } catch (e) {
    // Invalid JWT
    return undefined;
  }
}

export function getUserIdentity(): UserIdentity | undefined {
  const stored = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  if (!stored) return undefined;

  try {
    const potentialUserIdent = JSON.parse(stored) as UserIdentity;
    const identity = userIdentityFromJwt(potentialUserIdent.jwt);
    if (identity) {
      return {
        ...potentialUserIdent, // for any stored managedIdentity fields
        ...identity,
      };
    }
    return undefined;
  } catch (e) {
    // Not valid JSON
    return undefined;
  }
}
