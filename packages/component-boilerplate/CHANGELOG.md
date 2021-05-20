# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2021-05-20

### Added
- BatchedGraphQLClient - Updated client to allow queries to be batched if run in the same 200ms interval
- useLocale added back due to usage in mint-components

### Changed
- useGraphQLClient - uses BatchedGraphQLClient instead of client from graphql-request
- useBaseQuery - handles component unmounts with a cleanup function
- useForm - No longer automatically queries for the form, getForm function must be called manually from the component using the hook
- useQuery - new "skip" parameter based on https://www.apollographql.com/docs/react/data/queries/#skip. Also added to usePaginatedQuery
- jest tests rewritten to use BatchedGraphQLClient
