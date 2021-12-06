# sqm-portal-reset-password



<!-- Auto Generated Below -->


## Properties

| Property                    | Attribute                      | Description                                 | Type                                                                                                                                                                                                                                                                                                                                                                                                 | Default                 |
| --------------------------- | ------------------------------ | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `confirmPassword`           | `confirm-password`             |                                             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                            | `false`                 |
| `confirmPasswordFieldLabel` | `confirm-password-field-label` |                                             | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `"Confirm Password"`    |
| `continueButtonText`        | `continue-button-text`         | Displayed after a successful password reset | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `"Continue"`            |
| `demoData`                  | --                             |                                             | `{ states?: { error: string; loading: boolean; reset: boolean; confirmPassword: boolean; oobCodeValidating: boolean; oobCodeValid: boolean; passwordDemoData?: PasswordFieldViewDemoProps; content: { passwordResetHeader: string; resetPasswordHeader: string; continueButtonText: string; resetPasswordButtonText: string; confirmPasswordFieldLabel: string; passwordFieldLabel: string; }; }; }` | `undefined`             |
| `failedPage`                | `failed-page`                  |                                             | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `"/"`                   |
| `nextPage`                  | `next-page`                    |                                             | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `"/"`                   |
| `passwordFieldLabel`        | `password-field-label`         |                                             | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `"New Password"`        |
| `passwordResetHeader`       | `password-reset-header`        | Displayed after a successful password reset | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `"Password reset"`      |
| `resetPasswordButtonText`   | `reset-password-button-text`   |                                             | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `"Reset Password"`      |
| `resetPasswordHeader`       | `reset-password-header`        |                                             | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `"Reset your password"` |


## Dependencies

### Depends on

- [sqm-form-message](../sqm-form-message)
- [sqm-password-field](../sqm-password-field)

### Graph
```mermaid
graph TD;
  sqm-portal-reset-password --> sqm-form-message
  sqm-portal-reset-password --> sqm-password-field
  style sqm-portal-reset-password fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
