# sqm-widget-verification



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [sqm-widget-verification](.)

### Depends on

- [sqm-code-verification](sqm-code-verification)
- [sqm-email-verification](sqm-email-verification)

### Graph
```mermaid
graph TD;
  sqm-widget-verification-internal --> sqm-code-verification
  sqm-widget-verification-internal --> sqm-email-verification
  sqm-code-verification --> sqm-form-message
  sqm-widget-verification --> sqm-widget-verification-internal
  style sqm-widget-verification-internal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
