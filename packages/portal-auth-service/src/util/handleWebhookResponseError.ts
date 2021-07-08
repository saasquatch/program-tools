import { ApolloError, UserInputError } from "apollo-server-errors";
import { Response } from "node-fetch";

// this is used by custom registration and sign in requests.
export const handleWebhookResponseError = (response: Response) => {
  if (response.ok) return;

  if (response.status === 400) {
    // pass on validation errors to the front end
    throw new UserInputError(response.statusText);
  }
  if (response.status >= 500) {
    // translate 500 level errors into 503
    throw new ApolloError("Service Unavailable", "SERVICE_UNAVAILABLE");
  }
  // translate the rest into 500
  throw new ApolloError(
    response.statusText || "Error sending webhook",
    "INTERNAL_SERVER_ERROR"
  );
};
