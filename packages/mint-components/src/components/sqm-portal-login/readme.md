# sqm-portal-login



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description | Type                                                                                                                                                                                                                                                            | Default                     |
| --------------------- | ----------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `demoData`            | --                      |             | `{ states?: { error: string; loading: boolean; forgotPasswordPath: string; registerPath: string; }; content?: { forgotPasswordButton?: any; secondaryButton?: any; emailLabel?: string; passwordLabel?: string; submitLabel?: string; pageLabel?: string; }; }` | `undefined`                 |
| `emailLabel`          | `email-label`           |             | `string`                                                                                                                                                                                                                                                        | `"Email"`                   |
| `forgotPasswordLabel` | `forgot-password-label` |             | `string`                                                                                                                                                                                                                                                        | `"Forgot Password?"`        |
| `forgotPasswordPath`  | `forgot-password-path`  |             | `string`                                                                                                                                                                                                                                                        | `"/forgotPassword"`         |
| `nextPage`            | `next-page`             |             | `string`                                                                                                                                                                                                                                                        | `"/"`                       |
| `pageLabel`           | `page-label`            |             | `string`                                                                                                                                                                                                                                                        | `"Sign in to your account"` |
| `passwordLabel`       | `password-label`        |             | `string`                                                                                                                                                                                                                                                        | `"Password"`                |
| `registerLabel`       | `register-label`        |             | `string`                                                                                                                                                                                                                                                        | `"Register"`                |
| `registerPath`        | `register-path`         |             | `string`                                                                                                                                                                                                                                                        | `"/register"`               |
| `submitLabel`         | `submit-label`          |             | `string`                                                                                                                                                                                                                                                        | `"Sign In"`                 |


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
