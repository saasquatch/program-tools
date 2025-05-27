# sqm-password-field



<!-- Auto Generated Below -->


## Properties

| Property                      | Attribute                         | Description                      | Type                         | Default                                            |
| ----------------------------- | --------------------------------- | -------------------------------- | ---------------------------- | -------------------------------------------------- |
| `demoData`                    | --                                |                                  | `PasswordFieldViewDemoProps` | `undefined`                                        |
| `disableValidation`           | `disable-validation`              | Disable live password validation | `boolean`                    | `false`                                            |
| `doesNotMeetRequirementsText` | `does-not-meet-requirements-text` |                                  | `string`                     | `"Password must meet the following requirements:"` |
| `fieldLabel`                  | `field-label`                     | Label for password field         | `string`                     | `"Password"`                                       |
| `hasErrorText`                | `has-error-text`                  |                                  | `string`                     | `"contain at least 1 number or symbol"`            |
| `lowercaseErrorText`          | `lowercase-error-text`            |                                  | `string`                     | `"contain at least 1 lowercase character"`         |
| `meetsRequirementsText`       | `meets-requirements-text`         |                                  | `string`                     | `"Password has met all requirements"`              |
| `minErrorText`                | `min-error-text`                  |                                  | `string`                     | `"be a minimum of 8 characters"`                   |
| `uppercaseErrorText`          | `uppercase-error-text`            |                                  | `string`                     | `"contain at least 1 uppercase character"`         |


## Dependencies

### Used by

 - [sqm-portal-change-password](../sqm-portal-change-password)
 - [sqm-portal-google-registration-form](../sqm-portal-google-registration-form)
 - [sqm-portal-register](../sqm-portal-register)
 - [sqm-portal-registration-form](../sqm-portal-registration-form)
 - [sqm-portal-reset-password](../sqm-portal-reset-password)
 - [sqm-stencilbook](../sqm-stencilbook)

### Graph
```mermaid
graph TD;
  sqm-portal-change-password --> sqm-password-field
  sqm-portal-google-registration-form --> sqm-password-field
  sqm-portal-register --> sqm-password-field
  sqm-portal-registration-form --> sqm-password-field
  sqm-portal-reset-password --> sqm-password-field
  sqm-stencilbook --> sqm-password-field
  style sqm-password-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
