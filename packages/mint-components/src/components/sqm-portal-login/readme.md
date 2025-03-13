# sqm-portal-login



<!-- Auto Generated Below -->


## Properties

| Property                       | Attribute                          | Description                                                       | Type                                                                                                                                                                                                                                                                                  | Default                                                                                                                        |
| ------------------------------ | ---------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `demoData`                     | --                                 |                                                                   | `{ states?: { error: string; loading: boolean; forgotPasswordPath: string; registerPath: string; }; content?: { googleButton?: VNode; forgotPasswordButton?: any; secondaryButton?: any; emailLabel?: string; passwordLabel?: string; submitLabel?: string; pageLabel?: string; }; }` | `undefined`                                                                                                                    |
| `emailLabel`                   | `email-label`                      |                                                                   | `string`                                                                                                                                                                                                                                                                              | `"Email"`                                                                                                                      |
| `forgotPasswordLabel`          | `forgot-password-label`            |                                                                   | `string`                                                                                                                                                                                                                                                                              | `"Forgot Password?"`                                                                                                           |
| `forgotPasswordPath`           | `forgot-password-path`             | Redirect participants to this page to reset their password        | `string`                                                                                                                                                                                                                                                                              | `"/forgotPassword"`                                                                                                            |
| `googleUserNotRegisteredError` | `google-user-not-registered-error` |                                                                   | `string`                                                                                                                                                                                                                                                                              | `"Your google account has not registered on our platform. Please complete the registration process with your Google account."` |
| `networkErrorMessage`          | `network-error-message`            |                                                                   | `string`                                                                                                                                                                                                                                                                              | `"An error occurred while logging you in. Please refresh the page and try again."`                                             |
| `nextPage`                     | `next-page`                        | Redirect participants to this page after they successfully login. | `string`                                                                                                                                                                                                                                                                              | `"/"`                                                                                                                          |
| `pageLabel`                    | `page-label`                       |                                                                   | `string`                                                                                                                                                                                                                                                                              | `"Sign in to your account"`                                                                                                    |
| `passwordLabel`                | `password-label`                   |                                                                   | `string`                                                                                                                                                                                                                                                                              | `"Password"`                                                                                                                   |
| `registerCTA`                  | `register-c-t-a`                   |                                                                   | `string`                                                                                                                                                                                                                                                                              | `"Don't have an account?"`                                                                                                     |
| `registerLabel`                | `register-label`                   |                                                                   | `string`                                                                                                                                                                                                                                                                              | `"Register"`                                                                                                                   |
| `registerPath`                 | `register-path`                    | Redirect participants to this page to start registration.         | `string`                                                                                                                                                                                                                                                                              | `"/register"`                                                                                                                  |
| `showGoogleLogin`              | `show-google-login`                |                                                                   | `boolean`                                                                                                                                                                                                                                                                             | `false`                                                                                                                        |
| `submitLabel`                  | `submit-label`                     |                                                                   | `string`                                                                                                                                                                                                                                                                              | `"Sign In"`                                                                                                                    |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Depends on

- [sqm-google-sign-in](../sqm-google-sign-in)
- [sqm-form-message](../sqm-form-message)

### Graph
```mermaid
graph TD;
  sqm-portal-login --> sqm-google-sign-in
  sqm-portal-login --> sqm-form-message
  sqm-stencilbook --> sqm-portal-login
  style sqm-portal-login fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
