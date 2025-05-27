# sqm-edit-profile



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                 | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Default                                                     |
| --------------------- | ----------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `canceltext`          | `canceltext`            |                             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined`                                                 |
| `currentregiontext`   | `currentregiontext`     |                             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined`                                                 |
| `demoData`            | --                      |                             | `{ states?: { loading: boolean; submitDisabled: boolean; formState: { currentRegion: string; firstName: string; lastName: string; errors: any; error: string; }; user: { firstName: string; lastName: string; email: string; }; showEdit: boolean; text: { editprofileheader: string; editprofiletext: string; firstnametext: string; lastnametext: string; canceltext: string; updatetext: string; currentregiontext: string; fieldEmptyText?: string; showregion?: boolean; }; }; }` | `undefined`                                                 |
| `editprofileheader`   | `editprofileheader`     |                             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined`                                                 |
| `editprofiletext`     | `editprofiletext`       | Enable editing button text  | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined`                                                 |
| `fieldEmptyText`      | `field-empty-text`      |                             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `"Cannot be empty"`                                         |
| `firstnametext`       | `firstnametext`         |                             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined`                                                 |
| `formErrorText`       | `form-error-text`       |                             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `"Please correct the errors below to update your profile."` |
| `lastnametext`        | `lastnametext`          |                             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined`                                                 |
| `networkErrorMessage` | `network-error-message` |                             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `"Network request failed."`                                 |
| `showregion`          | `showregion`            | Show or hide current region | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `undefined`                                                 |
| `updatetext`          | `updatetext`            |                             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined`                                                 |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Depends on

- [sqm-form-message](../sqm-form-message)

### Graph
```mermaid
graph TD;
  sqm-edit-profile --> sqm-form-message
  sqm-stencilbook --> sqm-edit-profile
  style sqm-edit-profile fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
