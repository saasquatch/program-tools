# sqm-marketing-emails-checkbox



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                        | Type                                                                                                                                                                                                                                                            | Default                                                                                |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `checkboxLabel`    | `checkbox-label`    |                                                                                                                    | `string`                                                                                                                                                                                                                                                        | `"I would like to receive marketing and promotional emails for this referral program"` |
| `checkboxName`     | `checkbox-name`     | This name is used as the key for this form field on submission. The name must be unique within this specific form. | `string`                                                                                                                                                                                                                                                        | `"marketingEmails"`                                                                    |
| `checkboxRequired` | `checkbox-required` |                                                                                                                    | `boolean`                                                                                                                                                                                                                                                       | `false`                                                                                |
| `demoData`         | --                  |                                                                                                                    | `{ states?: { registrationFormState?: RegistrationFormState; checked: boolean; }; content?: { checkboxName: string; checkboxLabel: string; checkboxLabelLink?: string; checkboxLabelLinkText?: string; checkboxOptional?: boolean; errorMessage?: string; }; }` | `undefined`                                                                            |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Graph
```mermaid
graph TD;
  sqm-stencilbook --> sqm-marketing-emails-checkbox
  style sqm-marketing-emails-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
