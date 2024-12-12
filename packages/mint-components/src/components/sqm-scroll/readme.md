# sqm-scroll

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                                                                   | Type                                                                                  | Default     |
| ----------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------- |
| `buttonText`      | `button-text`      |                                                                                                                                               | `string`                                                                              | `undefined` |
| `buttonType`      | `button-type`      |                                                                                                                                               | `"danger" \| "default" \| "neutral" \| "primary" \| "success" \| "text" \| "warning"` | `"default"` |
| `circle`          | `circle`           | Draws a circle button.                                                                                                                        | `boolean`                                                                             | `undefined` |
| `iconName`        | `icon-name`        | Full list of valid icon names available in the [Shoelace Icon Library](https://shoelace.style/components/icon). This value is case sensitive. | `string`                                                                              | `undefined` |
| `iconSlot`        | `icon-slot`        |                                                                                                                                               | `string`                                                                              | `undefined` |
| `mobile`          | `mobile`           | The button becomes full width if the screen size is smaller than 500px                                                                        | `boolean`                                                                             | `undefined` |
| `outline`         | `outline`          | Draws an outlined button.                                                                                                                     | `boolean`                                                                             | `undefined` |
| `pill`            | `pill`             | Draws a pill-style button with rounded edges.                                                                                                 | `boolean`                                                                             | `undefined` |
| `scrollAnimation` | `scroll-animation` |                                                                                                                                               | `"auto" \| "smooth"`                                                                  | `"smooth"`  |
| `scrollId`        | `scroll-id`        | ID applied to the HTML tag you would like to scroll to. E.g tab-1                                                                             | `string`                                                                              | `undefined` |
| `scrollTagName`   | `scroll-tag-name`  | The name of the HTML tag you would like to scroll to. E.g referral-table                                                                      | `string`                                                                              | `undefined` |
| `size`            | `size`             |                                                                                                                                               | `string`                                                                              | `undefined` |


## Dependencies

### Used by

 - [sqm-payout-button-scroll](../sqm-payout-button-scroll)
 - [sqm-payout-status-alert](../tax-and-cash/sqm-payout-status-alert)
 - [sqm-stencilbook](../sqm-stencilbook)

### Graph
```mermaid
graph TD;
  sqm-payout-button-scroll --> sqm-scroll
  sqm-payout-status-alert --> sqm-scroll
  sqm-stencilbook --> sqm-scroll
  style sqm-scroll fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
