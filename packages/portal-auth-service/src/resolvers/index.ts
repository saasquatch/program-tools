import { registerUser } from "./registerUser";
import { authenticateUser } from "./authenticateUser";
import { requestVerificationEmail } from "./requestVerificationEmail";
import { requestPasswordResetEmail } from "./requestPasswordResetEmail";
import { resetPassword } from "./resetPassword";
import { verifyEmail } from "./verifyEmail";
import { userSessionData } from "./userSessionData";

export default {
  Mutation: {
    registerUser,
    authenticateUser,
    requestVerificationEmail,
    requestPasswordResetEmail,
    resetPassword,
    verifyEmail,
  },
  Query: {
    userSessionData,
  },
};
