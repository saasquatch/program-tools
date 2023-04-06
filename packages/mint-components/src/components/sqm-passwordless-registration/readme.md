# sqm-portal-login



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description | Type                                                                                                                                                                                                                          | Default             |
| ---------------- | ------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `demoData`       | --                 |             | `{ states?: { error: string; loading: boolean; }; content?: { emailLabel?: string; firstNameLabel?: string; lastNameLabel?: string; registerLabel?: string; includeName?: boolean; topSlot?: VNode; bottomSlot?: VNode; }; }` | `undefined`         |
| `emailLabel`     | `email-label`      |             | `string`                                                                                                                                                                                                                      | `"Email"`           |
| `firstNameLabel` | `first-name-label` |             | `string`                                                                                                                                                                                                                      | `"First Name"`      |
| `includeName`    | `include-name`     |             | `boolean`                                                                                                                                                                                                                     | `false`             |
| `lastNameLabel`  | `last-name-label`  |             | `string`                                                                                                                                                                                                                      | `"Last Name"`       |
| `registerLabel`  | `register-label`   |             | `string`                                                                                                                                                                                                                      | `"Start Referring"` |


## Dependencies

### Depends on

- [sqm-form-message](../sqm-form-message)

### Graph
```mermaid
graph TD;
  sqm-passwordless-registration --> sqm-form-message
  style sqm-passwordless-registration fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
