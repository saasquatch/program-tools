# sqm-portal-forgot-password



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                                                                          | Type                                                                                                                                                                                                                                                                                                       | Default                                                                        |
| --------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `backgroundColor`     | `background-color`      |                                                                                                                      | `string`                                                                                                                                                                                                                                                                                                   | `"var(--sqm-portal-background, #ffffff)"`                                      |
| `border`              | `border`                |                                                                                                                      | `string`                                                                                                                                                                                                                                                                                                   | `"1px solid var(--sqm-border-color, #eaeaea)"`                                 |
| `borderRadius`        | `border-radius`         |                                                                                                                      | `string`                                                                                                                                                                                                                                                                                                   | `"var(--sqm-border-radius-normal, 8px)"`                                       |
| `demoData`            | --                      |                                                                                                                      | `{ states?: { error: string; loading: boolean; success: boolean; loginPath: string; }; content?: { messageSlot: any; emailLabel?: string; submitLabel?: string; successAlertText?: string; loginText?: string; backgroundColor?: string; borderRadius?: string; border?: string; textColor?: string; }; }` | `undefined`                                                                    |
| `emailLabel`          | `email-label`           |                                                                                                                      | `string`                                                                                                                                                                                                                                                                                                   | `"Email"`                                                                      |
| `headerText`          | `header-text`           |                                                                                                                      | `string`                                                                                                                                                                                                                                                                                                   | `"Enter your email below to receive a password reset link."`                   |
| `loginPath`           | `login-path`            |                                                                                                                      | `string`                                                                                                                                                                                                                                                                                                   | `"/login"`                                                                     |
| `loginText`           | `login-text`            |                                                                                                                      | `string`                                                                                                                                                                                                                                                                                                   | `"Sign In"`                                                                    |
| `networkErrorMessage` | `network-error-message` | Displayed when the forgot password action fails due to a network error. The participant can try refreshing the page. | `string`                                                                                                                                                                                                                                                                                                   | `"An error occurred while loading this page. Please refresh the page."`        |
| `redirectPath`        | `redirect-path`         | Redirect participants to this page after they verify their email.                                                    | `string`                                                                                                                                                                                                                                                                                                   | `"/resetPassword"`                                                             |
| `submitLabel`         | `submit-label`          |                                                                                                                      | `string`                                                                                                                                                                                                                                                                                                   | `"Request Password Reset"`                                                     |
| `successAlertText`    | `success-alert-text`    |                                                                                                                      | `string`                                                                                                                                                                                                                                                                                                   | `"If an account with that email exists, a password reset email will be sent."` |


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
