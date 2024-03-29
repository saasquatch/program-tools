# SaaSquatch Program Dev Library

The
[`program-boilerplate`](https://www.npmjs.com/package/@saasquatch/program-boilerplate)
package includes a variety of utility functions and boilerplate
that assist in developing SaaSquatch
[programs](https://docs.referralsaasquatch.com/growth/quickstart/). The purpose of the
library is to reduce code duplication and enforce consistent behavior and API across all
programs.

# Getting Started

Here is the basic architecture of the SaaSquatch program engine:

![](media/arch.png)

## Template
Each program has a template, written in JSON. The template is often referred to as the
"program schema", although this is technically incorrect as it is not a real schema. The
template defines several aspects of the program, including its rules, rewards, emails,
widgets, requirements, and more. The program template is stored in Contentful as a JSON
field in the larger "program" content type. The whole entry including the other fields is
known as the "program template".  Program templates are retrieved and used by the Java
backend and are never directly touched by the program. Programs can self-modify their
templates when activated by customers. This is called Introspection and will be discussed
in further detail below.

## Program Logic / Behavior
In addition to the program template, all programs contain their own business logic. This is
simply some NodeJS code that runs on Heroku. The program logic is completely stateless
and only depends on the input given when it is "triggered". The different trigger types
will be discussed below.

The precise behavior for programs is always defined by one or more specification
documents written in Gherkin language. This is usually done by Eric and resides in the
`blackbox-testing` repository along with the rest of the specs. For newer programs there
are low-level tech specs that are used for unit testing. These also live in the
`blackbox-testing` repo in a sub-folder called `unit`.

SaaSquatch program logic consists of three major components (triggers):
* General program trigger handlers ([`PROGRAM_TRIGGER`](https://github.com/saasquatch/program-tools/blob/master/packages/program-boilerplate/src/types/rpc.ts#L39))
* Program introspection handler ([`PROGRAM_INTROSPECTION`](https://github.com/saasquatch/program-tools/blob/master/packages/program-boilerplate/src/types/rpc.ts#L54))
* Program validation handlers ([`PROGRAM_VALIDATION`](https://github.com/saasquatch/program-tools/blob/master/packages/program-boilerplate/src/types/rpc.ts#L66))

Combined, these components form a program. All three triggers are optional and aren't
necessarily implemented by all programs.

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

In the program template or during introspection, the program requirements are added to the
template. Each requirement includes a key, name, query, long description and other
fields (see `types/rpc/ProgramRequirement`). The queries defined here will be executed by
the backend and the results sent to the programs for validation. Based on the results of
the query, the program will return one or more results indicating the status of the
validation along with a message.

Since the program requirements reside in the template, they can be modified by the
introspection trigger. This means that requirements can be added/removed or modified
depending on the rules of the program.

# Creating a new program
If you are looking for instructions on how to modify an existing program, skip to the
section on the [program development workflow](#Program-development-workflow).

Before you create a new program you will need the following tools installed on your
computer:

* NodeJS / npm
* Heroku CLI (logged in with permission to access the `saasquatch-webtasks` team)

All of the commands in the tutorial, are written for a UNIX shell (MacOS/Linux). If
you're on Windows, good luck!

## Set up the program code on your local machine
Under the `programs` folder, create a new folder for your program:
```
mkdir <my-program>
cd <my-program>
```
Replace `<my-program>` with your program name for the rest of this tutorial. Program
names are kebab case by convention.

Initialize a new npm module:
```
npm init
```
You can reference the other programs for what to answer in the interactive prompt.

Add a couple scripts to your `package.json`
```json
"scripts": {
    "start": "node dist/<my-program>.js",
    "start:dev": "nodemon dist/<my-program>.js",
    "build": "tsc --strict"
}
```

After your npm module is initialized, you may want to install some dependencies for your
program. There are a few that are shared by pretty much every program:
```
npm i @saasquatch/program-boilerplate
```
```
npm i -D typescript @types/node @types/express nodemon
```

After this you will need to setup your `tsconfig.json`. Unfortunately sharing a
`tsconfig` between programs is impossible due to the Heroku deployment process.
Copy/paste one from one of the other programs (they should all be the same).

Create your source tree:
```
mkdir -p src/schema
touch src/schema/<my-program>_schema.json
touch src/program.ts src/<my-program>.ts
```
The program template will be stored under `schema/<my-program>_schema.json`. The `schema`
naming is simply a legacy decision, perhaps in the future it could be changed to
`template/<my-program>_template.json`.

Having `program.ts` and `<my-program>.ts` files in the source root is standard for newer
programs. `program.ts` should export a `Program` type with the relevant handlers, and
`<my-program>.ts` should be the entry point for running the program on Heroku that starts
the Express server. You can take a look at the referral program for examples if you are
unsure.

The rest of the program structure is a matter of personal taste; take a look at the
referral program for an example to follow if you are unsure.

To get your program started, fill the source files with some boilerplate:

`program.ts`
```typescript
import {Program} from '@saasquatch/program-boilerplate';

export const program: Program = {
  AFTER_USER_CREATED_OR_UPDATEDL: undefined,
  AFTER_USER_EVENT_PROCESSED: undefined,
  REFERRAL: undefined,
  PROGRAM_INTROSPECTION: undefined,
  SCHEDULED: undefined,
  REWARD_SCHEDULED: undefined,
  PROGRAM_VALIDATION: undefined,
};
```

`<my-program>.ts`
```typescript
import {program} from './program';
import {webtask, getLogger} from '@saasquatch/program-boilerplate';

const logger = getLogger();
const port = process.env.PORT ?? 3000;

webtask(program).listen(port, () => {
  logger.notice(`My program running on port ${port}`);
});
```

Running `npm build && npm start` should now run your program locally (useless for now,
but a good test to make sure things are working).

## Set up your program template
As mentioned previously, your program also needs a template which defines its rules,
rewards, emails etc. You could try to write your template from scratch, but it would
likely be easier to copy/paste one from another program and edit it accordingly. You can
probably skip this step and come back to it later.

## Provisioning cloud infrastructure
Next it is time to provision your cloud infrastructure that will host your program
components.

### Creating a Heroku pipeline
In the Heroku console, switch to the `saasquatch-webtasks` team. Select `New` -> `Create
new pipeline`. The name of the pipeline should match the name for your program that was
chosen in the previous step. Do not connect to GitHub.

Next, add the staging and prod apps to the pipeline by clicking `Add app` -> `Create new
app...` under the respective staging and production pipeline stages. By convention, the
app names are `<my-program>-staging` and `<my-program>-prod`.

In each Heroku app add `APP_BASE` as a configuration variable and set it to the path of
the program in the SaaSquatch core repo.

#### Setting up the Heroku app
Now that your apps are created, you can configure them to run your program. It's easiest
to do this from the command line. The first thing you will want to do is use the
`heroku.sh` script to set up the git remotes.

From the `programs` folder, run:
```
./heroku.sh setup-remotes
```
This will set up the git remotes for making deployments to the various programs. It's OK
if you get a bunch of `fatal: remote <some_remote> already exists.` errors.

**WARNING**:
The `setup-remotes` command will only work if the folder name for your program matches
the names of the Heroku programs, ie. you have a folder: `my-program` and Heroku programs
`my-program-staging` and `my-program-prod`.

