# sqm-empty



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description | Type     | Default                                                                                                  |
| ------------------ | -------------------- | ----------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `emptyStateHeader` | `empty-state-header` |             | `string` | `undefined`                                                                                              |
| `emptyStateImage`  | `empty-state-image`  |             | `string` | `"https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png"` |
| `emptyStateText`   | `empty-state-text`   |             | `string` | `undefined`                                                                                              |
| `supportText`      | `support-text`       |             | `string` | `undefined`                                                                                              |


## Dependencies

### Used by

 - [sqm-invoice-table](../sqm-invoice-table)
 - [sqm-leaderboard](../sqm-leaderboard)
 - [sqm-referral-codes](../sqm-referral-codes)
 - [sqm-referral-table](../sqm-referral-table)
 - [sqm-reward-exchange-list](../sqm-reward-exchange-list)
 - [sqm-rewards-table](../sqm-rewards-table)
 - [sqm-stencilbook](../sqm-stencilbook)

### Depends on

- [sqm-portal-container](../sqm-portal-container)
- [sqm-titled-section](../sqm-titled-section)
- [sqm-text](../sqm-text)

### Graph
```mermaid
graph TD;
  sqm-empty --> sqm-portal-container
  sqm-empty --> sqm-titled-section
  sqm-empty --> sqm-text
  sqm-invoice-table --> sqm-empty
  sqm-leaderboard --> sqm-empty
  sqm-referral-codes --> sqm-empty
  sqm-referral-table --> sqm-empty
  sqm-reward-exchange-list --> sqm-empty
  sqm-rewards-table --> sqm-empty
  sqm-stencilbook --> sqm-empty
  style sqm-empty fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
