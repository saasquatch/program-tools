# sqm-big-stat



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                 | Type                                                                                                                                              | Default     |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `alignment`   | `alignment`    | Controls the alignment of the flexbox                                                                       | `"center" \| "left" \| "right"`                                                                                                                   | `undefined` |
| `demoData`    | --             |                                                                                                             | `{ value?: number; statvalue?: string; loading?: boolean; flexReverse?: boolean; alignment?: "left" \| "right" \| "center"; labelSlot?: VNode; }` | `undefined` |
| `flexReverse` | `flex-reverse` | Controls the order of the stat value & description column                                                   | `boolean`                                                                                                                                         | `false`     |
| `programId`   | `program-id`   | The ID of the program that is used to scope stats. Defaults to the program context when no ID is specified. | `string`                                                                                                                                          | `undefined` |
| `statType`    | `stat-type`    | Select what type of stat to display. Manual paths are also supported.                                       | `string`                                                                                                                                          | `undefined` |


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
