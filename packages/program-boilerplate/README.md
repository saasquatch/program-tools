# SaaSquatch Program Development Library

The `program-boilerplate` package includes a variety of utility functions and boilerplate
that assist in developing SaaSquatch
[programs](https://docs.referralsaasquatch.com/growth/quickstart/). The purpose of the
library is to reduce code duplication and enforce consistent behavior and API across all
programs.

## Getting Started

A SaaSquatch program consists of three major components:
* General program trigger handlers ([`PROGRAM_TRIGGER`](src/types/rpc.ts#L89))
* Program introspection handler ([`PROGRAM_INTROSPECTION`](src/types/rpc.ts#L94))
* Program validation handlers ([`PROGRAM_VALIDATION`](src/types/rpc.ts#L103))

Combined, these components form a program. All three triggers are optional and aren't
necessarily implemented by all programs.
