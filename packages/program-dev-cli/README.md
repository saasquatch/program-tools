# SaaSquatch Program Dev CLI

CLI tool for making deployments to Webtask & Contentful easier.

## Installation
TBD

## Usage
Before using you must set up your .env file. See the `.env.example` file to get started.

Basic usage:
```
pdcli <command> [args...]
```

### Commands
#### `login`
Login to Contentful and Webtask.

#### `logout`
Delete stored Contentful/Webtask tokens

#### `space`
Set the Contentful space. This will also affect the naming of the Webtasks (staging vs production)
Pass 'test' or 'live' as an argument to bypass the selection dialog

Example: `pdcli space test`

#### `diff`
Take a diff between the local program and the remote program

Flags:
- `--code-only` Only show the code diff
- `--schema-only` Only show the schema diff
- `--production` Use the production Webtask/Contentful files for the diff instead. This will NOT make any changes to the production files

#### `deploy`
Deploy a program. Pass the Webtask Javascript file as the argument

Example: `pdcli deploy myProgram.js`

#### `logs`
Stream the Webtask logs to the console

## TODO
- [ ] Fix Webtask login (needs update to pink credit)
- [ ] Maybe some code for automatically determining NPM dependencies and telling webtask to install those?
- [x] Add command to view Webtask logs from the CLI
- [x] Be able to set the space by passing a parameter instead of using the list to select
