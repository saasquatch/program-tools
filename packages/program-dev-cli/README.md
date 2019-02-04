# SaaSquatch Program Dev CLI

CLI tool for making deployments to Webtask & Contentful easier.

## Installation
TBD

## Usage
Before using you must set up your .env file. See the `.env.example` file to get started.

Basic usage:
```
program-dev-cli <command> [args...]
```

### Commands
#### `login`
Login to Contentful and Webtask.

#### `logout`
Delete stored Contentful/Webtask tokens

#### `space`
Set the Contentful space. This will also affect the naming of the Webtasks (staging vs production)
Pass 'test' or 'prod' as an argument to bypass the selection dialog

#### `deploy`
Deploy a program. Pass the Webtask Javascript file as the argument
Example: `program-dev-cli deploy myProgram.js`

#### `logs`
Stream the Webtask logs to the console

## TODO
- [ ] Fix Webtask login (needs update to pink credit)
- [ ] Maybe some code for automatically determining NPM dependencies and telling webtask to install those?
- [x] Add command to view Webtask logs from the CLI
- [x] Be able to set the space by passing a parameter instead of using the list to select
