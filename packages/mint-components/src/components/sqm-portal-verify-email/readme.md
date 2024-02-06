# sqm-portal-verify-email



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                                                                       | Type                                                                                                                                                                                                  | Default                                                                                                          |
| ------------------- | --------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `demoData`          | --                    |                                                                                                   | `{ states?: { error: string; loading: boolean; verified: boolean; }; data?: { oobCode: string; }; content?: { verifySuccessText?: string; verifyEmailText?: string; verifyInvalidText?: string; }; }` | `undefined`                                                                                                      |
| `failedPage`        | `failed-page`         | Redirect participants to this page if verification fails due to an outdated verification attempt. | `string`                                                                                                                                                                                              | `"/"`                                                                                                            |
| `nextPage`          | `next-page`           | Redirect participants to this page when they successfully verify their email.                     | `string`                                                                                                                                                                                              | `"/"`                                                                                                            |
| `verifyEmailText`   | `verify-email-text`   |                                                                                                   | `string`                                                                                                                                                                                              | `"Verify your email"`                                                                                            |
| `verifyInvalidText` | `verify-invalid-text` |                                                                                                   | `string`                                                                                                                                                                                              | `"The email verification code is invalid or has expired, please try again."`                                     |
| `verifySuccessText` | `verify-success-text` |                                                                                                   | `string`                                                                                                                                                                                              | `"Your email has been verified and you are being redirected. If you are not redirected, please click Continue."` |


## Dependencies

### Depends on

- [sqm-form-message](../sqm-form-message)

### Graph
```mermaid
graph TD;
  sqm-portal-verify-email --> sqm-form-message
  style sqm-portal-verify-email fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
