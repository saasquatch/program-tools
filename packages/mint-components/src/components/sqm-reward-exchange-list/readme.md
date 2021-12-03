# sqm-reward-exchange-list



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description | Type                                                                                                                                                                                                                                       | Default                                                                                                                              |
| ------------------- | --------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `buttonText`        | `button-text`         |             | `string`                                                                                                                                                                                                                                   | `"Exchange Rewards"`                                                                                                                 |
| `demoData`          | --                    |             | `{ states?: { selectedItem: ExchangeItem; selectedStep: ExchangeStep; redeemStage: string; amount: number; exchangeError?: boolean; loading: boolean; content: { text: any; }; }; data?: { exchangeList: any; fuelTankCode?: string; }; }` | `undefined`                                                                                                                          |
| `notAvailableError` | `not-available-error` |             | `string`                                                                                                                                                                                                                                   | `"{unavailableReasonCode, select, US_TAX {US Tax limit} INSUFFICIENT_REDEEMABLE_CREDIT {Not enough points} other {Not available} }"` |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Graph
```mermaid
graph TD;
  sqm-stencilbook --> sqm-reward-exchange-list
  style sqm-reward-exchange-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
