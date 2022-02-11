# sqm-big-stat



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                 | Type                                                                                                                                              | Default     |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `alignment`   | `alignment`    |                                                                                                             | `"center" \| "left" \| "right"`                                                                                                                   | `undefined` |
| `demoData`    | --             |                                                                                                             | `{ loading?: boolean; value?: number; statvalue?: string; flexReverse?: boolean; alignment?: "left" \| "right" \| "center"; labelSlot?: VNode; }` | `undefined` |
| `flexReverse` | `flex-reverse` |                                                                                                             | `boolean`                                                                                                                                         | `false`     |
| `programId`   | `program-id`   | The ID of the program that is used to scope stats. Defaults to the program context when no ID is specified. | `string`                                                                                                                                          | `undefined` |
| `statType`    | `stat-type`    | Select what type of stat to display. Manual paths are also supported.                                       | `string`                                                                                                                                          | `undefined` |


## Slots

| Slot                                 | Description |
| ------------------------------------ | ----------- |
| `"the description of the component"` |             |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Graph
```mermaid
graph TD;
  sqm-stencilbook --> sqm-big-stat
  style sqm-big-stat fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
