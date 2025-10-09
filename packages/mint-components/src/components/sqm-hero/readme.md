# sqm-hero



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                  | Description                                                             | Type                                       | Default     |
| ---------------------- | -------------------------- | ----------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| `background`           | `background`               | Content background color or image (for use in the left column)          | `string`                                   | `undefined` |
| `columnToHideInMobile` | `column-to-hide-in-mobile` | Can only be used when two columns are present                           | `"primary" \| "secondary"`                 | `null`      |
| `columns`              | `columns`                  |                                                                         | `1 \| 2`                                   | `1`         |
| `minHeight`            | `min-height`               | Minimum height of each column including when they are stacked on mobile | `number`                                   | `200`       |
| `paddingSize`          | `padding-size`             |                                                                         | `"large" \| "medium" \| "none" \| "small"` | `"large"`   |
| `secondaryBackground`  | `secondary-background`     | Splash image or background color (for use in the right column)          | `string`                                   | `undefined` |
| `wrapDirection`        | `wrap-direction`           | Flexbox wrap direction, accepts wrap or wrap-reverse                    | `"wrap" \| "wrap-reverse"`                 | `"wrap"`    |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Graph
```mermaid
graph TD;
  sqm-stencilbook --> sqm-hero
  style sqm-hero fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
