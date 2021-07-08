import unitSteps from "./unit";
import { authenticateUserSteps } from "./authenticateUser.steps";
import { registerUserSteps } from "./registerUser.steps";
import { requestPasswordResetEmailSteps } from "./requestPasswordResetEmail.steps";
import { requestVerificationEmailSteps } from "./requestVerificationEmail.steps";
import { resetPasswordSteps } from "./resetPassword.steps";
import { verifyEmailSteps } from "./verifyEmail.steps";
import { serverSteps } from "./server.steps";

// all step definitions exported as array
export default [
  ...unitSteps,
  authenticateUserSteps,
  registerUserSteps,
  requestPasswordResetEmailSteps,
  requestVerificationEmailSteps,
  resetPasswordSteps,
  verifyEmailSteps,
  serverSteps,
];
