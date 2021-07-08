import { gql } from "apollo-server";

export const schema = gql`
  scalar JSONObject

  type UserAuthenticationResult {
    squatchJWT: String!
    sessionData: JSONObject
  }

  type UserSessionDataResult {
    sessionData: JSONObject
  }

  type SuccessResult {
    success: Boolean!
  }

  input RegisterUserInput {
    email: String!
    password: String!
    formData: JSONObject
  }

  input AuthenticateUserInput {
    email: String!
    password: String!
  }

  input EmailRequestInput {
    email: String!
    nextPageUrlParam: String
  }

  input VerifyEmailInput {
    oobCode: String!
  }

  input ResetPasswordInput {
    password: String!
    oobCode: String!
  }

  input UserSessionDataInput {
    squatchJWT: String!
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): UserAuthenticationResult
    authenticateUser(input: AuthenticateUserInput!): UserAuthenticationResult
    requestVerificationEmail(input: EmailRequestInput!): SuccessResult
    verifyEmail(input: VerifyEmailInput!): SuccessResult
    requestPasswordResetEmail(input: EmailRequestInput!): SuccessResult
    resetPassword(input: ResetPasswordInput!): UserAuthenticationResult
  }
  type Query {
    userSessionData(input: UserSessionDataInput!): UserSessionDataResult
  }
`;
