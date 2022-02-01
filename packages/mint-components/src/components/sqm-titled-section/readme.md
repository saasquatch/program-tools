# sqm-sidebar-item



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                  | Type                                                                                                                                           | Default     |
| ------------- | -------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `label`       | `label`        | Label for the section unless overwritten via the label slot. | `string`                                                                                                                                       | `undefined` |
| `labelMargin` | `label-margin` |                                                              | `"large" \| "medium" \| "none" \| "small" \| "x-large" \| "x-small" \| "xx-large" \| "xx-small" \| "xxx-large" \| "xxx-small" \| "xxxx-large"` | `"small"`   |
| `padding`     | `padding`      |                                                              | `"large" \| "medium" \| "none" \| "small" \| "x-large" \| "x-small" \| "xx-large" \| "xx-small" \| "xxx-large" \| "xxx-small" \| "xxxx-large"` | `"none"`    |
| `textAlign`   | `text-align`   |                                                              | `"center" \| "left" \| "right"`                                                                                                                | `"left"`    |


## Dependencies

### Used by

 - [sqm-leaderboard](../sqm-leaderboard)
 - [sqm-referral-table](../sqm-referral-table)
 - [sqm-rewards-table](../sqm-rewards-table)
 - [sqm-stencilbook](../sqm-stencilbook)

### Graph
```mermaid
graph TD;
  sqm-leaderboard --> sqm-titled-section
  sqm-referral-table --> sqm-titled-section
  sqm-rewards-table --> sqm-titled-section
  sqm-stencilbook --> sqm-titled-section
  style sqm-titled-section fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
