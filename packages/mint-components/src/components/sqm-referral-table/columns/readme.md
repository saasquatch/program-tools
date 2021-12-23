# sqm-referral-table-user-column



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type     | Default            |
| --------------- | ---------------- | ----------- | -------- | ------------------ |
| `anonymousUser` | `anonymous-user` |             | `string` | `"Anonymous User"` |
| `columnTitle`   | `column-title`   |             | `string` | `"Customer"`       |
| `deletedUser`   | `deleted-user`   |             | `string` | `"Deleted User"`   |


## Methods

### `renderCell(data: Referral) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `renderLabel() => Promise<string>`



#### Returns

Type: `Promise<string>`




## Dependencies

### Used by

 - [sqm-stencilbook](../../sqm-stencilbook)

### Depends on

- [sqm-referral-table-user-cell](../cells)

### Graph
```mermaid
graph TD;
  sqm-referral-table-user-column --> sqm-referral-table-user-cell
  sqm-stencilbook --> sqm-referral-table-user-column
  style sqm-referral-table-user-column fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
