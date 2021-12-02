# sqm-rewards-table



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type      | Default     |
| ------------- | -------------- | ----------- | --------- | ----------- |
| `columnTitle` | `column-title` |             | `string`  | `"Rewards"` |
| `hideDetails` | `hide-details` |             | `boolean` | `false`     |


## Methods

### `renderCell(data: Reward[]) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `renderLabel() => Promise<string>`



#### Returns

Type: `Promise<string>`




## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Depends on

- [sqm-referral-table-rewards-cell](../sqm-referral-table/cells)

### Graph
```mermaid
graph TD;
  sqm-rewards-table-column --> sqm-referral-table-rewards-cell
  sqm-stencilbook --> sqm-rewards-table-column
  style sqm-rewards-table-column fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
