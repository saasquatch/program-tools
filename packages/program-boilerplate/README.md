# SaaSquatch Program Dev Library

The
[`program-boilerplate`](https://www.npmjs.com/package/@saasquatch/program-boilerplate)
package includes a variety of utility functions and boilerplate
that assist in developing SaaSquatch
[programs](https://docs.referralsaasquatch.com/growth/quickstart/). The purpose of the
library is to reduce code duplication and enforce consistent behavior and API across all
programs.

## Getting Started

Here is the basic architecture of the SaaSquatch program engine:

![](media/arch.png)

A SaaSquatch program consists of three major components:
* General program trigger handlers ([`PROGRAM_TRIGGER`](https://github.com/saasquatch/program-tools/blob/master/packages/program-boilerplate/src/types/rpc.ts#L39))
* Program introspection handler ([`PROGRAM_INTROSPECTION`](https://github.com/saasquatch/program-tools/blob/master/packages/program-boilerplate/src/types/rpc.ts#L54))
* Program validation handlers ([`PROGRAM_VALIDATION`](https://github.com/saasquatch/program-tools/blob/master/packages/program-boilerplate/src/types/rpc.ts#L66))

Combined, these components form a program. All three triggers are optional and aren't
necessarily implemented by all programs.

## Schema
Each program has a schema, written in JSON schema language. The schema defines several
aspects of the program, including its rules, rewards, emails, widgets, requirements, and
more. The program schema is stored in Contentful as a JSON field in the larger "program"
content type. The whole entry including the other fields is known as the "program
template". Program templates are retrieved and used by the Java backend and are never
directly touched by the program. Programs can self-modify their templates when activated
by customers. This is called Introspection and will be discussed in further detail below.

## Program Logic / Behavior
In addition to the program schema, all programs contain their own business logic. This is
simply some NodeJS code that runs on Heroku. The program logic is completely stateless
and only depends on the input given when it is "triggered". The different trigger types
will be discussed below.

The precise behavior for programs is always defined by one or more specification
documents written in Gherkin language. This is usually done by Eric and resides in the
`blackbox-testing` repository along with the rest of the specs. For newer programs there
are low-level tech specs that are used for unit testing. These also live in the
`blackbox-testing` repo in a sub-folder called `unit`.

### General Program Triggers

A general program trigger is one of the following

* `AFTER_USER_CREATED_OR_UPDATED` Triggered after a user is created or updated ("upsert")
* `AFTER_USER_EVENT_PROCESSED` Triggered after a user event has been processed by the
    backend
* `REFERRAL` Triggered when a referral is created or updated
* `SCHEDULED` Triggered on a set schedule defined by the program template or during
    introspection
* `REWARD_SCHEDULED` ??


### Program Introspection

The program introspection trigger allows programs to modify themselves based on the rules
defined by the tenant. For example: enabling or disabling emails, setting the trigger
schedule, or changing the content of the example code snippets.

When introspection is triggered, the program will be provided with the rules, the default
program template, and some information about the tenant. The program is expected to
return a new template that may or may not have changed based on the provided context.
Introspection is one of the most powerful tools for programs to provide a good user
experience, and it is a critical part of the application architecture.

### Program Validations

As part of the program setup flow, there are a number of "requirements" for programs that
should be satisfied by the tenant before the program launches. The requirements do not
block the launch if they are not satisfied, but it is recommended to complete them. All
requirements can be automatically verified by the programs based on a GraphQL query.

In the program schema or during introspection, the program requirements are added to the
template. Each requirement includes a key, name, query, long description and other
fields (see `types/rpc/ProgramRequirement`). The queries defined here will be executed by
the backend and the results sent to the programs for validation. Based on the results of
the query, the program will return one or more results indicating the status of the
validation along with a message.

Since the program requirements reside in the template, they can be modified by the
introspection trigger. This means that requirements can be added/removed or modified
depending on the rules of the program.
