# sqm-payout-status-alert



<!-- Auto Generated Below -->


## Properties

| Property                          | Attribute                           | Description | Type                                                                                                                                                                                                        | Default                                                                                                                                                                                                       |
| --------------------------------- | ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `demoData`                        | --                                  |             | `{ states?: { loading: boolean; status: PayoutStatus; showVerifyIdentity: boolean; }; data?: { type: "SquatchJS2" \| "SquatchAndroid" \| "SquatchIOS" \| "SquatchPortal" \| "SquatchAdmin" \| "None"; }; }` | `undefined`                                                                                                                                                                                                   |
| `holdDescription`                 | `hold-description`                  |             | `string`                                                                                                                                                                                                    | `"Please check your inbox for an email from our referral provider, impact.com. It contains details on how to resolve this issue. If you need further assistance, feel free to reach out to {support email}."` |
| `holdHeader`                      | `hold-header`                       |             | `string`                                                                                                                                                                                                    | `"Your payouts and account are on hold"`                                                                                                                                                                      |
| `informationRequiredButtonText`   | `information-required-button-text`  |             | `string`                                                                                                                                                                                                    | `"Payouts & Tax Settings"`                                                                                                                                                                                    |
| `informationRequiredDescription`  | `information-required-description`  |             | `string`                                                                                                                                                                                                    | `"Submit your banking details and tax documents to receive your rewards."`                                                                                                                                    |
| `informationRequiredHeader`       | `information-required-header`       |             | `string`                                                                                                                                                                                                    | `"Payout and tax information required"`                                                                                                                                                                       |
| `termsUrl`                        | `terms-url`                         |             | `string`                                                                                                                                                                                                    | `"https://terms.advocate.impact.com/PayoutTermsAndConditions.html"`                                                                                                                                           |
| `verificationRequiredButtonText`  | `verification-required-button-text` |             | `string`                                                                                                                                                                                                    | `"Start Verification"`                                                                                                                                                                                        |
| `verificationRequiredDescription` | `verification-required-description` |             | `string`                                                                                                                                                                                                    | `"Complete your verification to start receiving your cash rewards. It should only take a few minutes verify."`                                                                                                |
| `verificationRequiredHeader`      | `verification-required-header`      |             | `string`                                                                                                                                                                                                    | `"Verify your identity"`                                                                                                                                                                                      |


## Dependencies

### Used by

 - [sqm-stencilbook](../../sqm-stencilbook)

### Depends on

- [sqm-scroll](../../sqm-scroll)

### Graph
```mermaid
graph TD;
  sqm-payout-status-alert --> sqm-scroll
  sqm-stencilbook --> sqm-payout-status-alert
  style sqm-payout-status-alert fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
