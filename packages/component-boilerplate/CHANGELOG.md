# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.9] - 2025-03-18

### Changed

- `component-environment` package bump
  
## [1.6.8] - 2025-03-12

### Changed
- `@saasquatch/component-environment` package bump

## [1.6.7] - 2024-07-04

### Changed

- Added options object to `useParentQuery`
  - `merge` option renamed to `batch`

## [1.6.6] - 2024-07-04

### Changed

- Added options object to `useQuery`
  - merge option added prevent specific queries from being batched

## [1.6.5] - 2024-05-30

### Changed

- `@saasquatch/component-environment` package bump
- `dom-context` package bump
- `dom-context-hooks` package bump

## [1.6.4] - 2024-05-07

### Changed

- `@saasquatch/component-environment` package bump

## [1.6.3] - 2024-04-01

### Added

- `useParentQuery`, `useParentQuery` hooks

  - Allows a parent component to share graphQL query data with child component(s)

- `useParentState`, `useParentState`, `useParent`, `useParentValue`, `useSetParent`, `getContextName`, `getContextValueName` hooks
  - Allows a parent component to share state with child component(s)

## [1.6.2] - 2024-02-13

### Added

- `useLoadEvent` hook
  - Returns a function to send a `USER_REFERRAL_PROGRAM_LOADED_EVENT` analytics event

## [1.6.1] - 2023-02-06

### Added

- Fires `sq:user-registration` event in `useAuthenticateManagedIdentityWithInstantAccess` hook upon successful registration when in `SquatchJS2` environment

## [1.6.0] - 2023-01-08

### Added

- Fraud check in `useAuthenticateManagedIdentityWithInstantAccess` hook

## [1.5.3] - 2023-05-18

### Changed

- `@saasquatch/component-environment` package bump

## [1.5.2] - 2023-05-16

### Added

- useAuthenticateManagedIdentityWithInstantAccess hook for registration via an Instant Access registration form

## [1.5.1] - 2023-04-20

### Changed

- Updated license copyright to be in line with SaaSquatch open-source policy.

## [1.5.0] - 2022-07-21

### Added

- useRegisterViaRegistrationFormMutation hook for registration via the SaaSquatch Forms Platform

### Changed

- Environment code has been refactored out to a new package @saasquatch/component-environment
- The function useBaseQuery for performing a query/mutation now returns the result of the client request

## [1.4.0] - 2022-05-09

### Changed

- rename useManagedIdentityQuery to useManagedIdentitySessionQuery
- update portal hooks to use error message from the extensions

## [1.3.1] - 2022-02-23

### Changed

- useLocale hook uses locale from SaaSquatch user instead of browser

### Added

- useRefreshDispatcher hook and `sq:refresh` event listener added to give ability to refresh query data without triggering a loading state

## [1.3.0] - 2021-12-09

### Fixed

- Rare race condition causing queries to not return their data fixed
- User identity no longer being cleared if identity is not immediately available in context

### Added

- redirectPath is now included with registration, password reset, and verify email requests

## [1.2.2] - 2021-08-23

### Added

- Support for theme engine JWTs for determining user identity, enabling support for hybrid themes

## [1.2.1] - 2021-08-20

### Changed

- Fixed infinite loop caused by calling useToken while logged out
- Changed environment detection to support `widgetIdent.env = "demo"` in vanilla components

## [1.2.0] - 2021-08-04

### Added

- Portal environment now supports storing and retrieving user identity from localStorage
  and validating JWT expiry
- New hooks:
  - useAuthenticatedWithEmailAndPasswordMutation: Login a user with email and password
  - useChangePasswordMutation: Change a user's password
  - useManagedIdentityQuery: Query a user's managed identity
  - useRegisterWithEmailAndPasswordMutation: Register a user with email and password
  - useRequestPasswordResetEmailMutation: Request a password reset for an email address
  - useRequestVerificationEmailMutation: Request an email verification for a user
  - useResetPasswordMutation: Reset a user's password from an oobCode
  - useVerifyEmailMutation: Verify a user's email from an oobCode
  - useVerifyPasswordResetCodeMutation: Verify a password reset oobCode

### Changed

## [1.1.0] - 2021-05-20

### Added

- BatchedGraphQLClient - Updated client to allow queries to be batched if run in the same 200ms interval
- useLocale Added back due to usage in mint-components

### Changed

- useGraphQLClient - Use BatchedGraphQLClient instead of client from graphql-request
- useBaseQuery - Handle component unmounts with a cleanup function
- useForm - No longer automatically queries for the form, getForm function must be called manually from the component using the hook
- useQuery - New "skip" parameter based on https://www.apollographql.com/docs/react/data/queries/#skip. Also added to usePaginatedQuery
- Jest tests rewritten to use BatchedGraphQLClient

## [1.0.0] - 2021-04-21

### Added

- Initial release
- exported hooks available:
  - identity hooks:
    - useUserIdentity
      setUserIdentity
      useToken
  - environment hooks:
    - getEnvironmentSDK
      useTenantAlias
      useProgramId
      setProgramId
      useAppDomain
      isDemo
      useEngagementMedium
  - graphql hooks:
    - useQuery
      useMutation
      useLazyQuery
  - navigation hooks
    - navigation
      useCurrentPage
  - pagination hooks
    - usePagination
      usePaginatedQuery
  - Generic low-level helpers
    - useDebounce
      useDebouncedCallback
      useTick
      useHost
      setUseHostImplementation
  - Common higher-level functionality
    - useShareEvent
      useForm

[unreleased]: https://github.com/saasquatch/program-tools/compare/%40saasquatch%2Fcomponent-boilerplate@1.6.8...HEAD
[1.6.8]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.6.8
[1.6.7]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.6.7
[1.6.6]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.6.6
[1.6.5]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.6.5
[1.6.4]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.6.4
[1.6.3]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.6.3
[1.6.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.6.2
[1.6.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.6.1
[1.6.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.6.0
[1.5.3]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.5.3
[1.5.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.5.2
[1.5.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.5.1
[1.5.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.5.0
[1.4.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.4.0
[1.3.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.3.1
[1.3.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.3.0
[1.2.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.2.2
[1.2.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.2.1
[1.2.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.2.0
[1.1.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.1.0
[1.0.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.0.1
[1.0.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-boilerplate%401.0.0
