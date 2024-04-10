# sqm-referral-table



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                                                                                                                   | Type                                                                                                             | Default     |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------- |
| `demoData`      | --               |                                                                                                                                                                                                                                                                               | `Partial<Pick<GenericTableViewProps, "states" \| "data" \| "elements">> & { mockData?: { data: Referral[]; }; }` | `undefined` |
| `hiddenColumns` | `hidden-columns` | Provide the column numbers (0 indexed) that should not be displayed in mobile views. Ex. 0,2,3                                                                                                                                                                                | `string`                                                                                                         | `"0"`       |
| `hideLabels`    | `hide-labels`    |                                                                                                                                                                                                                                                                               | `boolean`                                                                                                        | `false`     |
| `mdBreakpoint`  | `md-breakpoint`  |                                                                                                                                                                                                                                                                               | `number`                                                                                                         | `799`       |
| `moreLabel`     | `more-label`     |                                                                                                                                                                                                                                                                               | `string`                                                                                                         | `"Next"`    |
| `perPage`       | `per-page`       | Number of referrals displayed per page                                                                                                                                                                                                                                        | `number`                                                                                                         | `4`         |
| `prevLabel`     | `prev-label`     |                                                                                                                                                                                                                                                                               | `string`                                                                                                         | `"Prev"`    |
| `programId`     | `program-id`     | Filters to only show referrals in this program. Will default to filtering by the program context where this table lives. If no program ID is set or provided by context, then shows all referrals from all programs. If program ID is "classic", shows classic-only referrals | `string`                                                                                                         | `undefined` |
| `showReferrer`  | `show-referrer`  | Show referred by user in table                                                                                                                                                                                                                                                | `boolean`                                                                                                        | `false`     |
| `smBreakpoint`  | `sm-breakpoint`  |                                                                                                                                                                                                                                                                               | `number`                                                                                                         | `599`       |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Depends on

- [sqm-empty](../sqm-empty)
- [sqm-table-row](../sqm-table-row)
- [sqm-table-cell](../sqm-table-cell)

### Graph
```mermaid
graph TD;
  sqm-referral-table --> sqm-empty
  sqm-referral-table --> sqm-table-row
  sqm-referral-table --> sqm-table-cell
  sqm-empty --> sqm-portal-container
  sqm-empty --> sqm-titled-section
  sqm-empty --> sqm-text
  sqm-stencilbook --> sqm-referral-table
  style sqm-referral-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
