# sqm-portal-email-verification



<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute                      | Description                                                       | Type                                                                                                                                                                                                                                                                                                                                          | Default                                                                                                                                                  |
| ---------------------------- | ------------------------------ | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `demoData`                   | --                             |                                                                   | `{ states?: { error: string; loading: boolean; success: boolean; isVerified?: boolean; loadingVerification?: boolean; countdown?: number; }; content?: { email: string; verifyMessage: string; emailVerificationHeader: string; resendEmailButtonText: string; verificationStatusMessage?: string; verificationLoadingMessage?: string; }; }` | `undefined`                                                                                                                                              |
| `emailVerificationHeader`    | `email-verification-header`    |                                                                   | `string`                                                                                                                                                                                                                                                                                                                                      | `"Verify your email"`                                                                                                                                    |
| `redirectPath`               | `redirect-path`                | Redirect participants to this page from their verification email. | `string`                                                                                                                                                                                                                                                                                                                                      | `"/verifyEmail"`                                                                                                                                         |
| `resendEmailButtonText`      | `resend-email-button-text`     |                                                                   | `string`                                                                                                                                                                                                                                                                                                                                      | `"Re-send Email"`                                                                                                                                        |
| `verificationLoadingMessage` | `verification-loading-message` |                                                                   | `string`                                                                                                                                                                                                                                                                                                                                      | `"Check verification status:"`                                                                                                                           |
| `verificationStatusMessage`  | `verification-status-message`  |                                                                   | `string`                                                                                                                                                                                                                                                                                                                                      | `"Check verification status: in {countdown}"`                                                                                                            |
| `verifyMessage`              | `verify-message`               |                                                                   | `string`                                                                                                                                                                                                                                                                                                                                      | `"A verification email was sent to {email}. Please verify your email to continue to the portal. Resending an email will invalidate the previous email."` |


## Dependencies

### Depends on

- [sqm-form-message](../sqm-form-message)

### Graph
```mermaid
graph TD;
  sqm-portal-email-verification --> sqm-form-message
  style sqm-portal-email-verification fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
