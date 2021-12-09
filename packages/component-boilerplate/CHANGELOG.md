# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[unreleased]: https://github.com/saasquatch/program-tools/compare/component-boilerplate@1.3.0...HEAD
[1.2.3]: https://github.com/saasquatch/program-tools/compare/component-boilerplate@1.2.2...component-boilerplate@1.2.3
[1.2.2]: https://github.com/saasquatch/program-tools/compare/component-boilerplate@1.2.1...component-boilerplate@1.2.2
[1.2.1]: https://github.com/saasquatch/program-tools/compare/component-boilerplate@1.2.0...component-boilerplate@1.2.1
[1.2.0]: https://github.com/saasquatch/program-tools/compare/component-boilerplate@1.1.0...component-boilerplate@1.2.0
[1.1.0]: https://github.com/saasquatch/program-tools/compare/component-boilerplate@1.0.1...component-boilerplate@1.1.0
[1.0.1]: https://github.com/saasquatch/program-tools/compare/component-boilerplate@1.0.0...component-boilerplate@1.0.1
[1.0.0]: https://github.com/saasquatch/program-tools/releases/tag/component-boilerplate@1.0.0
