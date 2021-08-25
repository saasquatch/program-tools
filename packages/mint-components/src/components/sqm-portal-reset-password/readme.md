# sqm-portal-reset-password



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description | Type                                                                                                                                                                                             | Default     |
| ----------------- | ------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `confirmPassword` | `confirm-password` |             | `boolean`                                                                                                                                                                                        | `false`     |
| `demoData`        | --                 |             | `{ states?: { error: string; loading: boolean; reset: boolean; confirmPassword: boolean; oobCodeValidating: boolean; oobCodeValid: boolean; passwordDemoData?: PasswordFieldViewDemoProps; }; }` | `undefined` |
| `nextPage`        | `next-page`        |             | `string`                                                                                                                                                                                         | `"/"`       |


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
