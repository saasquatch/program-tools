# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/saasquatch/program-tools/compare/component-boilerplate@1.0.0...HEAD
[1.0.1]: https://github.com/saasquatch/program-tools/compare/component-boilerplate@1.0.0...component-boilerplate@1.0.1
[1.0.0]: https://github.com/saasquatch/program-tools/releases/tag/component-boilerplate%401.0.0
