# sqm-portal-register



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                    | Description                                                        | Type                                                                                                                                                                                                                                                                                                                                                                                                              | Default              |
| -------------------------- | ---------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `confirmPassword`          | `confirm-password`           |                                                                    | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                         | `false`              |
| `confirmPasswordLabel`     | `confirm-password-label`     |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                          | `"Confirm Password"` |
| `demoData`                 | --                           |                                                                    | `{ states?: { error: string; loading: boolean; confirmPassword: boolean; hideInputs: boolean; validationState?: FormState; enablePasswordValidation?: boolean; loginPath: string; }; refs?: { formRef: any; }; content?: { formData?: any; passwordField?: any; secondaryButton?: any; emailLabel?: string; passwordLabel?: string; submitLabel?: string; pageLabel?: string; confirmPasswordLabel: string; }; }` | `undefined`          |
| `emailLabel`               | `email-label`                |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                          | `"Email"`            |
| `enablePasswordValidation` | `enable-password-validation` |                                                                    | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                         | `true`               |
| `hideInputs`               | `hide-inputs`                |                                                                    | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                         | `false`              |
| `loginLabel`               | `login-label`                |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                          | `"Sign in"`          |
| `loginPath`                | `login-path`                 |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                          | `"/login"`           |
| `nextPage`                 | `next-page`                  |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                          | `"/"`                |
| `pageLabel`                | `page-label`                 |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                          | `"Register"`         |
| `passwordLabel`            | `password-label`             |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                          | `"Password"`         |
| `redirectPath`             | `redirect-path`              | The page that users are redirected to from the verification email. | `string`                                                                                                                                                                                                                                                                                                                                                                                                          | `"/verifyEmail"`     |
| `submitLabel`              | `submit-label`               |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                          | `"Register"`         |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Depends on

- [sqm-form-message](../sqm-form-message)
- [sqm-password-field](../sqm-password-field)

### Graph
```mermaid
graph TD;
  sqm-portal-register --> sqm-form-message
  sqm-portal-register --> sqm-password-field
  sqm-stencilbook --> sqm-portal-register
  style sqm-portal-register fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
