# sqm-dropdown-field



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                        | Type                                                                                                                                                                                                     | Default              |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `demoData`         | --                  |                                                                                                                    | `{ states?: { validationErrors?: ValidationErrors; }; content?: { dropdownName: string; dropdownLabel: string; dropdownOptional?: boolean; errorMessage: string; selectOptions?: VNode \| VNode[]; }; }` | `undefined`          |
| `dropdownLabel`    | `dropdown-label`    |                                                                                                                    | `string`                                                                                                                                                                                                 | `"Select an option"` |
| `dropdownName`     | `dropdown-name`     | This name is used as the key for this form field on submission. The name must be unique within this specific form. | `string`                                                                                                                                                                                                 | `undefined`          |
| `dropdownOptional` | `dropdown-optional` |                                                                                                                    | `boolean`                                                                                                                                                                                                | `false`              |
| `errorMessage`     | `error-message`     |                                                                                                                    | `string`                                                                                                                                                                                                 | `"Select an option"` |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Graph
```mermaid
graph TD;
  sqm-stencilbook --> sqm-dropdown-field
  style sqm-dropdown-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
