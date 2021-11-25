# sqm-referral-table



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                                                                                                                                                                   | Type                                                                                                                                                                                                                                                                                                                               | Default     |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `demoData`     | --              |                                                                                                                                                                                                                                                                               | `{ states?: { hasPrev: boolean; loading: boolean; hasNext: boolean; }; data?: { textOverrides: { showLabels: boolean; prevLabel: string; moreLabel: string; }; referralData?: Referral[]; }; elements?: { columns: VNode[]; rows: VNode[][]; loading?: boolean; emptyElement?: VNode; loadingElement?: VNode; page?: number; }; }` | `undefined` |
| `moreLabel`    | `more-label`    |                                                                                                                                                                                                                                                                               | `string`                                                                                                                                                                                                                                                                                                                           | `"Next"`    |
| `perPage`      | `per-page`      |                                                                                                                                                                                                                                                                               | `number`                                                                                                                                                                                                                                                                                                                           | `3`         |
| `prevLabel`    | `prev-label`    |                                                                                                                                                                                                                                                                               | `string`                                                                                                                                                                                                                                                                                                                           | `"Prev"`    |
| `programId`    | `program-id`    | Filters to only show referrals in this program. Will default to filtering by the program context where this table lives. If no program ID is set or provided by context, then shows all referrals from all programs. If program ID is "classic", shows classic-only referrals | `string`                                                                                                                                                                                                                                                                                                                           | `undefined` |
| `showLabels`   | `show-labels`   |                                                                                                                                                                                                                                                                               | `boolean`                                                                                                                                                                                                                                                                                                                          | `true`      |
| `showReferrer` | `show-referrer` |                                                                                                                                                                                                                                                                               | `boolean`                                                                                                                                                                                                                                                                                                                          | `false`     |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Depends on

- [sqm-table-row](../../tables)
- [sqm-table-cell](../../tables)
- [sqm-text](../sqm-text)

### Graph
```mermaid
graph TD;
  sqm-referral-table --> sqm-table-row
  sqm-referral-table --> sqm-table-cell
  sqm-referral-table --> sqm-text
  sqm-stencilbook --> sqm-referral-table
  style sqm-referral-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
