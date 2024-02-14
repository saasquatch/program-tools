# sqm-portal-forgot-password



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                       | Type                                                                                                                                                                                                                   | Default                                                                        |
| --------------------- | ----------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `demoData`            | --                      |                                                                   | `{ states?: { error: string; loading: boolean; success: boolean; loginPath: string; }; content?: { secondaryButton: any; messageSlot: any; emailLabel?: string; submitLabel?: string; successAlertText?: string; }; }` | `undefined`                                                                    |
| `emailLabel`          | `email-label`           |                                                                   | `string`                                                                                                                                                                                                               | `"Email"`                                                                      |
| `headerText`          | `header-text`           |                                                                   | `string`                                                                                                                                                                                                               | `"Enter your email below to receive a password reset link."`                   |
| `loginPath`           | `login-path`            |                                                                   | `string`                                                                                                                                                                                                               | `"/login"`                                                                     |
| `loginText`           | `login-text`            |                                                                   | `string`                                                                                                                                                                                                               | `"Sign In"`                                                                    |
| `networkErrorMessage` | `network-error-message` |                                                                   | `string`                                                                                                                                                                                                               | `"Network request failed."`                                                    |
| `redirectPath`        | `redirect-path`         | Redirect participants to this page after they verify their email. | `string`                                                                                                                                                                                                               | `"/resetPassword"`                                                             |
| `submitLabel`         | `submit-label`          |                                                                   | `string`                                                                                                                                                                                                               | `"Request Password Reset"`                                                     |
| `successAlertText`    | `success-alert-text`    |                                                                   | `string`                                                                                                                                                                                                               | `"If an account with that email exists, a password reset email will be sent."` |


## Dependencies

### Depends on

- [sqm-form-message](../sqm-form-message)

### Graph
```mermaid
graph TD;
  sqm-portal-forgot-password --> sqm-form-message
  style sqm-portal-forgot-password fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
