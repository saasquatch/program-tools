# sqm-rewards-table-cell



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type     | Default               |
| ------------------ | ------------------- | ----------- | -------- | --------------------- |
| `expiryText`       | `expiry-text`       |             | `string` | `"Expires"`           |
| `locale`           | `locale`            |             | `string` | `"en"`                |
| `pendingScheduled` | `pending-scheduled` |             | `string` | `"Until"`             |
| `pendingUnhandled` | `pending-unhandled` |             | `string` | `"Fulfillment error"` |
| `pendingUsTax`     | `pending-us-tax`    |             | `string` | `"W-9 required"`      |
| `reward`           | --                  |             | `Reward` | `undefined`           |
| `statusText`       | `status-text`       |             | `string` | `undefined`           |


## Dependencies

### Used by

 - [sqm-rewards-table-status-column](../columns)
 - [sqm-stencilbook](../../sqm-stencilbook)

### Graph
```mermaid
graph TD;
  sqm-rewards-table-status-column --> sqm-rewards-table-status-cell
  sqm-stencilbook --> sqm-rewards-table-status-cell
  style sqm-rewards-table-status-cell fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
