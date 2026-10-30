---
"@saasquatch/mint-components": patch
---

Remove signed user JWTs from stories and demo registration flows. Stories now render from canned GraphQL data (`@saasquatch/component-boilerplate/canned`) instead of live staging tenants, and the instant-access and referred registration demos use an unsigned token.
