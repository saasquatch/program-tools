# sqm-portal-email-verification



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                                                                                                                        | Default                                                                                           |
| --------------- | ---------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `demoData`      | --               |             | `{ states?: { error: string; loading: boolean; success: boolean; }; content?: { email: string; verifyMessage: string; }; }` | `undefined`                                                                                       |
| `verifyMessage` | `verify-message` |             | `string`                                                                                                                    | `"A verification email was sent to {email}. Please verify your email to continue to the portal."` |


## Dependencies

### Depends on

- [sqm-form-message](../sqm-form-message)

### Graph
```mermaid
graph TD;
  sqm-portal-email-verification --> sqm-form-message
  style sqm-portal-email-verification fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
