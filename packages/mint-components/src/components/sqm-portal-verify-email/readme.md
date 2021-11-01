# sqm-portal-verify-email



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type                                                                                                 | Default     |
| ----------- | ------------ | ----------- | ---------------------------------------------------------------------------------------------------- | ----------- |
| `demoData`  | --           |             | `{ states?: { error: string; loading: boolean; verified: boolean; }; data?: { oobCode: string; }; }` | `undefined` |
| `loginPath` | `login-path` |             | `string`                                                                                             | `"/login"`  |
| `nextPage`  | `next-page`  |             | `string`                                                                                             | `"/"`       |


## Dependencies

### Depends on

- [sqm-form-message](../sqm-form-message)

### Graph
```mermaid
graph TD;
  sqm-portal-verify-email --> sqm-form-message
  style sqm-portal-verify-email fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
