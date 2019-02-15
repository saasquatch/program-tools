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
- `-c --code-only` Only show the code diff
- `-s --schema-only` Only show the schema diff
- `-p --production` Use the production Webtask/Contentful files for the diff instead. This will NOT make any changes to the production files

Example: `pdcli diff referralProgram.js -pc`

#### `deploy`
Deploy a program. Pass the Webtask Javascript file as the argument

Flags
- `-c --code-only` Only deploy the code
- `-s --schema-only` Only deploy the schema

Example: `pdcli deploy myProgram.js`

#### `logs`
Stream the Webtask logs to the console

Flags
- `-p --pattern="<regex pattern>"` Only print the log messages that match the provided regex
- `-f --flags="<regex flags>"` Flags for the previously provided regex expression

Example: `pdcli logs --pattern="(warn)|(error)" --flags="gmi"`

## TODO
- [ ] Fix Webtask login (needs update to pink credit)
