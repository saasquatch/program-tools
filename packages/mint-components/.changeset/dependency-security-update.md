---
"@saasquatch/mint-components": patch
---

Dependency and security update. Component APIs are unchanged.

- Built with `@stencil/core` 2.22 (was 2.4), which regenerates the compiled output and loader.
- `@saasquatch/component-boilerplate` ^1.6.12.
- Editor demo previews merge `demoData` with `@fastify/deepmerge` instead of `deepmerge`, which has an unfixed advisory. Merging is unchanged: `demoData` arrays still replace defaults. `__proto__`, `constructor` and `prototype` keys are now ignored.
- `jsonpointer` 5 for form field names: `__proto__`, `constructor` and `prototype` path segments are ignored at any depth.
- `@saasquatch/stencilbook`, `deepmerge`, `dom-context` and `fast-equals` are no longer installed as runtime dependencies.
