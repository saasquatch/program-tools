# sqm-portal-verify-email



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                                       | Type                                                                                                 | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------- |
| `demoData`   | --            |                                                                                                   | `{ states?: { error: string; loading: boolean; verified: boolean; }; data?: { oobCode: string; }; }` | `undefined` |
| `failedPage` | `failed-page` | The page that users are redirected to if verification fails due to outdated verification attempt. | `string`                                                                                             | `"/"`       |
| `nextPage`   | `next-page`   | The page that users are redirected to when the verification succeeds.                             | `string`                                                                                             | `"/"`       |


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
