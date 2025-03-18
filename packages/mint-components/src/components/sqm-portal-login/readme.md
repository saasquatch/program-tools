# sqm-portal-login



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                                                         | Type                                                                                                                                                                                                                                                            | Default                                                                            |
| --------------------- | ----------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `demoData`            | --                      |                                                                                                     | `{ states?: { error: string; loading: boolean; forgotPasswordPath: string; registerPath: string; }; content?: { forgotPasswordButton?: any; secondaryButton?: any; emailLabel?: string; passwordLabel?: string; submitLabel?: string; pageLabel?: string; }; }` | `undefined`                                                                        |
| `emailLabel`          | `email-label`           |                                                                                                     | `string`                                                                                                                                                                                                                                                        | `"Email"`                                                                          |
| `forgotPasswordLabel` | `forgot-password-label` |                                                                                                     | `string`                                                                                                                                                                                                                                                        | `"Forgot Password?"`                                                               |
| `forgotPasswordPath`  | `forgot-password-path`  | Redirect participants to this page to reset their password                                          | `string`                                                                                                                                                                                                                                                        | `"/forgotPassword"`                                                                |
| `networkErrorMessage` | `network-error-message` | Displayed when the login fails due to a network error. The participant can try refreshing the page. | `string`                                                                                                                                                                                                                                                        | `"An error occurred while logging you in. Please refresh the page and try again."` |
| `nextPage`            | `next-page`             | Redirect participants to this page after they successfully login.                                   | `string`                                                                                                                                                                                                                                                        | `"/"`                                                                              |
| `pageLabel`           | `page-label`            |                                                                                                     | `string`                                                                                                                                                                                                                                                        | `"Sign in to your account"`                                                        |
| `passwordLabel`       | `password-label`        |                                                                                                     | `string`                                                                                                                                                                                                                                                        | `"Password"`                                                                       |
| `registerLabel`       | `register-label`        |                                                                                                     | `string`                                                                                                                                                                                                                                                        | `"Register"`                                                                       |
| `registerPath`        | `register-path`         | Redirect participants to this page to start registration.                                           | `string`                                                                                                                                                                                                                                                        | `"/register"`                                                                      |
| `submitLabel`         | `submit-label`          |                                                                                                     | `string`                                                                                                                                                                                                                                                        | `"Sign In"`                                                                        |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Depends on

- [sqm-form-message](../sqm-form-message)

### Graph
```mermaid
graph TD;
  sqm-portal-login --> sqm-form-message
  sqm-stencilbook --> sqm-portal-login
  style sqm-portal-login fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
