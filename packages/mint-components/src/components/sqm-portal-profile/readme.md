# sqm-portal-profile



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description | Type                                                                                                                                                                                                                                                                                                                                                                                                                        | Default        |
| --------------- | --------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `countrytext`   | `countrytext`   |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                    | `"Country"`    |
| `demoData`      | --              |             | `{ states?: { success: boolean; loading: boolean; submitDisabled: boolean; showCountry: boolean; formState: { country: string; firstName: string; lastName: string; errors: any; error: string; }; user: { id: string; accountId: string; firstName: string; lastName: string; email: string; countryCode: string; }; text: { firstnametext: string; lastnametext: string; emailtext: string; countrytext: string; }; }; }` | `undefined`    |
| `emailtext`     | `emailtext`     |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                    | `"Email"`      |
| `firstnametext` | `firstnametext` |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                    | `"First Name"` |
| `lastnametext`  | `lastnametext`  |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                    | `"Last Name"`  |
| `showCountry`   | `show-country`  |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                   | `true`         |


## Dependencies

### Depends on

- [sqm-form-message](../sqm-form-message)

### Graph
```mermaid
graph TD;
  sqm-portal-profile --> sqm-form-message
  style sqm-portal-profile fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
