# sqm-portal-register



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description | Type                                                                                                                                                                                                                                               | Default      |
| ----------------- | ------------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `confirmPassword` | `confirm-password` |             | `boolean`                                                                                                                                                                                                                                          | `false`      |
| `demoData`        | --                 |             | `{ states?: { error: string; loading: boolean; confirmPassword?: boolean; hideInputs?: boolean; }; content?: { formData?: any; secondaryButton?: any; emailLabel?: string; passwordLabel?: string; submitLabel?: string; pageLabel?: string; }; }` | `undefined`  |
| `emailLabel`      | `email-label`      |             | `string`                                                                                                                                                                                                                                           | `"Email"`    |
| `hideInputs`      | `hide-inputs`      |             | `boolean`                                                                                                                                                                                                                                          | `false`      |
| `nextPage`        | `next-page`        |             | `string`                                                                                                                                                                                                                                           | `"/"`        |
| `pageLabel`       | `page-label`       |             | `string`                                                                                                                                                                                                                                           | `"Register"` |
| `passwordLabel`   | `password-label`   |             | `string`                                                                                                                                                                                                                                           | `"Password"` |
| `submitLabel`     | `submit-label`     |             | `string`                                                                                                                                                                                                                                           | `"Register"` |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Depends on

- [sqm-form-message](../sqm-form-message)

### Graph
```mermaid
graph TD;
  sqm-portal-register --> sqm-form-message
  sqm-stencilbook --> sqm-portal-register
  style sqm-portal-register fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
