# sqm-indirect-tax-form



<!-- Auto Generated Below -->


## Properties

| Property                         | Attribute                             | Description | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Default                                                                                                                                                                                                                  |
| -------------------------------- | ------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `backButton`                     | `back-button`                         |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"Back"`                                                                                                                                                                                                                 |
| `demoData`                       | --                                    |             | `{ states?: { hideSteps: boolean; disabled: boolean; loading: boolean; isPartner: boolean; errors: {}; formState: { checked: "hstCanada" \| "otherRegion" \| "notRegistered"; }; }; data?: { esRegions: { regionCode: string; taxType: string; displayName: string; }[]; countries: TaxCountry[]; provinces: { provinceCode: string; taxType: string; displayName: string; }[]; }; refs?: { formRef: Ref<HTMLFormElement>; }; slotProps?: { formState: { selectedRegion?: string; subRegion?: string; subRegionTaxNumber?: string; qstNumber?: string; province?: string; indirectTaxNumber?: number; hasQst?: boolean; hasSubRegionTaxNumber?: boolean; errors?: any; error?: string; }; }; }` | `undefined`                                                                                                                                                                                                              |
| `formStep`                       | `form-step`                           |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"Step 2 of 4"`                                                                                                                                                                                                          |
| `generalErrorDescription`        | `general-error-description`           |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"Please review your information and try again. If this problem continues, contact Support."`                                                                                                                            |
| `generalErrorTitle`              | `general-error-title`                 |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"There was a problem submitting your information"`                                                                                                                                                                      |
| `indirectTax`                    | `indirect-tax`                        |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"Indirect Tax"`                                                                                                                                                                                                         |
| `indirectTaxDescription`         | `indirect-tax-description`            |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"Indirect taxes (e.g. VAT, HST, GST) are transactional based taxes collected by business and retailers on behalf of governments. Any rewards you receive may be subject to indirect taxes based on your country."`      |
| `indirectTaxDetails`             | `indirect-tax-details`                |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"Indirect Tax Details"`                                                                                                                                                                                                 |
| `indirectTaxDetailsDescription`  | `indirect-tax-details-description`    |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"If you represent a business entity, you may be registered for indirect tax. If you are based in the US you are most likely not registered. Not sure if you’re registered? Contact our Support team to find out more."` |
| `indirectTaxNumber`              | `indirect-tax-number`                 |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"{taxType, select, GST {GST Number} HST {HST Number} VAT {VAT Number} CT {CT Number}}"`                                                                                                                                 |
| `indirectTaxNumberError`         | `indirect-tax-number-error`           |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"{taxType, select, GST {GST Number} HST {HST Number} VAT {VAT Number} CT {CT Number}} is required"`                                                                                                                     |
| `isPartnerAlertDescription`      | `is-partner-alert-description`        |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"If you don’t recognize this referral program provider or believe this is a mistake, please contact Support or sign up for this referral program with a different email."`                                              |
| `isPartnerAlertHeader`           | `is-partner-alert-header`             |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"An account with this email already exists with our referral program provider, impact.com"`                                                                                                                             |
| `isRegisteredQST`                | `is-registered-q-s-t`                 |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"I am registered for QST Tax"`                                                                                                                                                                                          |
| `isRegisteredSubRegionIncomeTax` | `is-registered-sub-region-income-tax` |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"I am an individual registered for Income Tax purposes in Spain, and withholding tax will apply to any payments made to me."`                                                                                           |
| `notRegistered`                  | `not-registered`                      |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"I am not registered for Indirect Tax"`                                                                                                                                                                                 |
| `otherRegion`                    | `other-region`                        |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"I am registered for Indirect Tax in a different Country / Region"`                                                                                                                                                     |
| `province`                       | `province`                            |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"Province"`                                                                                                                                                                                                             |
| `provinceError`                  | `province-error`                      |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"Province is required"`                                                                                                                                                                                                 |
| `qstNumber`                      | `qst-number`                          |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"QST Number"`                                                                                                                                                                                                           |
| `qstTaxNumberError`              | `qst-tax-number-error`                |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"QST Number is required"`                                                                                                                                                                                               |
| `selectedRegion`                 | `selected-region`                     |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"Country / Region of Indirect Tax"`                                                                                                                                                                                     |
| `selectedRegionError`            | `selected-region-error`               |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"Country is required"`                                                                                                                                                                                                  |
| `subRegion`                      | `sub-region`                          |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"Sub-region"`                                                                                                                                                                                                           |
| `subRegionError`                 | `sub-region-error`                    |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"Sub-region is required"`                                                                                                                                                                                               |
| `subRegionTaxNumberError`        | `sub-region-tax-number-error`         |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"Income Tax Number is required"`                                                                                                                                                                                        |
| `subRegionTaxNumberLabel`        | `sub-region-tax-number-label`         |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"Income Tax Number"`                                                                                                                                                                                                    |
| `submitButton`                   | `submit-button`                       |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"Continue"`                                                                                                                                                                                                             |
| `taxDetailsError`                | `tax-details-error`                   |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"This field is required"`                                                                                                                                                                                               |


## Dependencies

### Used by

 - [sqm-stencilbook](../../sqm-stencilbook)
 - [sqm-tax-and-cash](../sqm-tax-and-cash)

### Graph
```mermaid
graph TD;
  sqm-stencilbook --> sqm-indirect-tax-form
  sqm-tax-and-cash --> sqm-indirect-tax-form
  style sqm-indirect-tax-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*