# sqm-portal-profile



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                   | Description | Type                                                                                                                                                                                                                                                                                                                                                                  | Default                                                                                         |
| ------------------------ | --------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `demoData`               | --                          |             | `{ states?: { success: boolean; loading: boolean; submitDisabled: boolean; formState: { marketingEmailOptIn: boolean; errors: any; error: string; }; user: { id: string; accountId: string; marketingEmailOptIn: boolean; }; text: { emailPreferencesHeader: string; marketingCheckboxLabel: string; submitChangeButtonText: string; successMessage: string; }; }; }` | `undefined`                                                                                     |
| `emailPreferencesHeader` | `email-preferences-header`  |             | `string`                                                                                                                                                                                                                                                                                                                                                              | `"Email preferences"`                                                                           |
| `marketingCheckboxLabel` | `marketing-checkbox-label`  |             | `string`                                                                                                                                                                                                                                                                                                                                                              | `"I want to receive marketing emails and promotions for this referral program from impact.com"` |
| `networkRequestMessage`  | `network-request-message`   |             | `string`                                                                                                                                                                                                                                                                                                                                                              | `"An error occurred while loading this page. Please refresh the page."`                         |
| `submitChangeButtonText` | `submit-change-button-text` |             | `string`                                                                                                                                                                                                                                                                                                                                                              | `"Save"`                                                                                        |
| `successMessage`         | `success-message`           |             | `string`                                                                                                                                                                                                                                                                                                                                                              | `"Opt-in preference has been changed."`                                                         |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Depends on

- [sqm-form-message](../sqm-form-message)

### Graph
```mermaid
graph TD;
  sqm-portal-change-marketing --> sqm-form-message
  sqm-stencilbook --> sqm-portal-change-marketing
  style sqm-portal-change-marketing fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
