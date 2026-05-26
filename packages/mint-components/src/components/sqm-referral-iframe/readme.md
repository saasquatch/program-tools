# sqm-referral-iframe



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                     | Type                                                                                                                                              | Default     |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `codeParam`    | `code-param`    | Override the default parameter name used in the iframe                                          | `string`                                                                                                                                          | `"rsCode"`  |
| `demoData`     | --              |                                                                                                 | `{ states?: { content: { iframeSrc: string; iframeHeight: string; iframeWidth: string; codeParam: string; }; }; data?: { shareCode: string; }; }` | `undefined` |
| `iframeHeight` | `iframe-height` | Define the height of the iframe with any valid CSS height value. Example: 100px, 5rem, or auto. | `string`                                                                                                                                          | `"100%"`    |
| `iframeSrc`    | `iframe-src`    | URL of iframe to display                                                                        | `string`                                                                                                                                          | `undefined` |
| `iframeWidth`  | `iframe-width`  | Define the width of the iframe with any valid CSS width value. Example: 100px, 5rem, or auto.   | `string`                                                                                                                                          | `"100%"`    |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Graph
```mermaid
graph TD;
  sqm-stencilbook --> sqm-referral-iframe
  style sqm-referral-iframe fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
