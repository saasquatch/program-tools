# sqm-portal-forgot-password



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                                                                                                                                                                                        | Default                    |
| ------------- | -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `demoData`    | --             |             | `{ states?: { error: string; loading: boolean; success: boolean; loginPath: string; }; content?: { secondaryButton: any; messageSlot: any; emailLabel?: string; submitLabel?: string; }; }` | `undefined`                |
| `emailLabel`  | `email-label`  |             | `string`                                                                                                                                                                                    | `"Email"`                  |
| `loginPath`   | `login-path`   |             | `string`                                                                                                                                                                                    | `"/login"`                 |
| `submitLabel` | `submit-label` |             | `string`                                                                                                                                                                                    | `"Request Password Reset"` |


## Dependencies

### Depends on

- [sqm-form-message](../sqm-form-message)

### Graph
```mermaid
graph TD;
  sqm-portal-forgot-password --> sqm-form-message
  style sqm-portal-forgot-password fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
