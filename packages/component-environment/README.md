Provides the environment for running SaaSquatch web components.

SaaSquatch web components can run in a number of different environments, including:

- in a widget via `squatch-js`
- in a microsite (portal)
- in a mobile SDK (i.e. `squatch-android`)
- in the admin portal

In each environment, a different set of context information about the tenant, user and program are provided, and the goal of this package is to normalize the differences in environments to provide a common API.

The environment is provided in a set of contexts through `dom-context`, which provides vanilla global context providers. They can be accessed through a raw `ContextListener` or via `useDomContext` in `dom-context-hooks`.

## General environment

### `getEnvironment()`

Get the environment type. The current possible values are: `SquatchJS2`, `SquatchAndroid`, `SquatchPortal`, `SquatchAdmin` or `None`.

### `isDemo()`

Returns whether components should run in demo/preview mode.

### `getTenantAlias()`

Get the current tenant alias.

### `getAppDomain()`

Get the SaaSquatch app domain.

### `getEngagementMedium()`

Get the current engagement medium. This is particularly important in widgets rendered by `squatch-js` for informing metadata about share link clicks.

## User identity

The user identity context name is exported in a constant `USER_CONTEXT_NAME`. The current value can be retrieved with `getUserIdentity()` and set with `setUserIdentity(identity)`.

## Locale

The locale context name is exported in a constnat `LOCALE_CONTEXT_NAME`. The current value can be retrieved with `getLocale()` and set with `setLocal(locale)`.

## Program ID

The program ID context name is exported in a constant `PROGRAM_CONTEXT_NAME`. The current value can be retrieved with `getProgramId()` and set with `setProgramId(programId)`.
