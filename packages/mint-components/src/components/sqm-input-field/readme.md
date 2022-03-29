# sqm-input-field



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                                                                                                                                                                                                | Default             |
| --------------- | ---------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `demoData`      | --               |             | `{ states?: { validationErrors?: ValidationErrors; }; content?: { fieldName: string; fieldLabel: string; fieldType: "text" \| "date" \| "tel"; fieldOptional?: boolean; errorMessage: string; }; }` | `undefined`         |
| `errorMessage`  | `error-message`  |             | `string`                                                                                                                                                                                            | `"Cannot be empty"` |
| `fieldLabel`    | `field-label`    |             | `string`                                                                                                                                                                                            | `undefined`         |
| `fieldName`     | `field-name`     |             | `string`                                                                                                                                                                                            | `undefined`         |
| `fieldOptional` | `field-optional` |             | `boolean`                                                                                                                                                                                           | `false`             |
| `fieldType`     | `field-type`     |             | `"date" \| "tel" \| "text"`                                                                                                                                                                         | `"text"`            |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Graph
```mermaid
graph TD;
  sqm-stencilbook --> sqm-input-field
  style sqm-input-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
