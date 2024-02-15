# sqm-document-type-form



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                   | Description                                                                           | Type                                                                                                                                                     | Default                                                                                                                                       |
| ------------------------- | --------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `backButton`              | `back-button`               | Text shown inside of back button                                                      | `string`                                                                                                                                                 | `"Back"`                                                                                                                                      |
| `demoData`                | --                          |                                                                                       | `{ states?: { hideSteps: boolean; loading: boolean; disabled: boolean; formState: { formSubmission: boolean; selectedTaxForm: "W9"; errors: {}; }; }; }` | `undefined`                                                                                                                                   |
| `formLabel`               | `form-label`                | Sub text shown above form selection radio buttons                                     | `string`                                                                                                                                                 | `"Select a tax form"`                                                                                                                         |
| `formStep`                | `form-step`                 | Sub text shown at the top of the page, used to show the current step of the tax form. | `string`                                                                                                                                                 | `"Step 3 of 4"`                                                                                                                               |
| `generalErrorDescription` | `general-error-description` | The error message shown at the top of the page in an error banner                     | `string`                                                                                                                                                 | `"Please review your information and try again. If this problem continues, contact Support."`                                                 |
| `generalErrorTitle`       | `general-error-title`       | The title for error message shown at the top of the page in an error banner           | `string`                                                                                                                                                 | `"There was a problem submitting your information"`                                                                                           |
| `submitButton`            | `submit-button`             | Text shown inside of submit button                                                    | `string`                                                                                                                                                 | `"Continue"`                                                                                                                                  |
| `taxForm`                 | `tax-form`                  | Heading text shown at the top of the top of page                                      | `string`                                                                                                                                                 | `"Tax form"`                                                                                                                                  |
| `w8Description`           | `w-8-description`           | Description for the W8 radio button                                                   | `string`                                                                                                                                                 | `"W8-BEN For individuals residing outside of the US, joining the referral program of a US-based company."`                                    |
| `w8EDescription`          | `w-8-e-description`         | Description for the W8E radio button                                                  | `string`                                                                                                                                                 | `"W8-BEN-E For participants residing outside of the US who represent a business entity, joining the referral program of a US-based company."` |
| `w8ELabel`                | `w-8-e-label`               | Label text for the W8E radio button                                                   | `string`                                                                                                                                                 | `"W8-BEN-E"`                                                                                                                                  |
| `w8Label`                 | `w-8-label`                 | Label text for the W8 radio button                                                    | `string`                                                                                                                                                 | `"W8-Ben"`                                                                                                                                    |
| `w9Description`           | `w-9-description`           | Description for the W9 radio button                                                   | `string`                                                                                                                                                 | `"W9 For participants based in the US, joining the referral program of a US-based company."`                                                  |
| `w9Label`                 | `w-9-label`                 | Label text for the W9 radio button                                                    | `string`                                                                                                                                                 | `"W9"`                                                                                                                                        |


## Dependencies

### Used by

 - [sqm-stencilbook](../../sqm-stencilbook)
 - [sqm-tax-and-cash](../sqm-tax-and-cash)

### Graph
```mermaid
graph TD;
  sqm-stencilbook --> sqm-document-type-form
  sqm-tax-and-cash --> sqm-document-type-form
  style sqm-document-type-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*