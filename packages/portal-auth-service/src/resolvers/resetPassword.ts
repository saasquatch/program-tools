import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from "apollo-server-errors";
import { getFirebaseAuth } from "../util/getFirebaseAuth";

interface ResetPasswordInput {
  password: string;
  oobCode: string;
}

export const resetPassword = async (
  source: any,
  args: Record<"input", ResetPasswordInput>,
  context: { tenantAlias: string }
) => {
  const { tenantAlias } = context;
  const { password, oobCode } = args.input;

  const auth = getFirebaseAuth(tenantAlias);
  try {
    await auth.verifyPasswordResetCode(oobCode);
    await auth.confirmPasswordReset(oobCode, password);
  } catch (e) {
    switch (e?.code) {
      case "auth/expired-action-code":
      case "auth/invalid-action-code":
      case "auth/user-not-found":
        throw new AuthenticationError("Invalid Code.");
      case "auth/user-disabled":
        throw new ForbiddenError("Account Disabled.");
      case "auth/weak-password":
        throw new UserInputError("Password too weak.");
      default:
        throw new ApolloError(e.message, "INTERNAL_SERVER_ERROR");
    }
  }

  return {
    success: true,
  };
};
