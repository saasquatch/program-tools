import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
} from "apollo-server-errors";
import { getFirebaseAuth } from "../util/getFirebaseAuth";

interface VerifyEmailInput {
  oobCode: string;
}

export const verifyEmail = async (
  source: any,
  args: Record<"input", VerifyEmailInput>,
  context: { tenantAlias: string }
) => {
  const { tenantAlias } = context;
  const { oobCode } = args.input;

  const auth = getFirebaseAuth(tenantAlias);
  try {
    await auth.applyActionCode(oobCode);
  } catch (e) {
    switch (e?.code) {
      case "auth/expired-action-code":
      case "auth/invalid-action-code":
      case "auth/user-not-found":
        throw new AuthenticationError("Invalid Code.");
      case "auth/user-disabled":
        throw new ForbiddenError("Account Disabled.");
      default:
        throw new ApolloError(e.message, "INTERNAL_SERVER_ERROR");
    }
  }
  return {
    success: true,
  };
};
