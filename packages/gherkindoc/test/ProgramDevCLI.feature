@automated
@failing
@current
Feature: SaaSquatch Program Development CLI

    The SaaSquatch program dev CLI aims to improve the workflow of a program developer by automating
    the process of uploading code/schemas to Webtask and Contentful.

    @approved
    @implemented
    Scenario: Sensitive information will be loaded through environment variables
        Given I have installed the CLI
        When the CLI loads and begins executing
        Then if a .env file is found in the current working directory it will be loaded
        And the environment variables will store the sensitive information

    @review
    @implemented
    Scenario: Users can log in via the CLI
        Given I have just installed the CLI and want to log in
        And I have accounts on Contentful and Webtask with the proper access rights
        When I use the command `login`
        Then I will be prompted and the appropriate web pages will open in the browser
        And I will be prompted to login and paste the access tokens in the CLI
        And the CLI will store the tokens in a configuration file in my home directory

    @review
    @implemented
    Scenario: Users can log out
        Given I have installed the CLI and logged in
        When I use the command `logout`
        Then my tokens will be deleted from the configuration file

    @review
    @implemented
    Scenario: Users can select whether to use the staging or production environment
        Given I have installed the CLI and logged in with the `login` command
        When I use the command `space`
        Then I will be prompted to select the Contentful space I want to use
        And the options will be either 'Product (TEST)' or 'Product (LIVE)'
        When I select one of the two options
        Then the option I selected will be stored in the configuration file

    @review
    @implemented
    Scenario: The environment must be selected before making a deployment
        Given I have installed the CLI and logged in
        And I have not yet configured the environment
        When I use the command `deploy`
        Then the CLI will not deploy the program
        And I will be asked to set the environment before continuing

    @review
    @implemented
    Scenario: The CLI will issue a clear warning when deploying to production
        Given I have installed the CLI and logged in
        And I have set the space to 'Product (LIVE)'
        When I use the command `deploy`
        Then the CLI will print a warning on the screen & confirm that I want to continue

    @review
    @implemented
    Scenario: The user must be logged in to make a deployment
        Given I have installed the CLI
        And I am not logged in
        When I use the command `deploy`
        Then the CLI will not deploy
        And the CLI will prompt me to log in

    @review
    @implemented
    Scenario Outline: The CLI will automatically determine which files to upload
        Given I have installed the CLI and logged in
        And I have set the environment
        And I have two files, <programName>.js and <programName>_schema.json
        When I use the command `deploy <programName>.js`
        Then the CLI will determine the name of the schema file to be <file>

        Examples:
            | programName    | file                       |
            | winBackProgram | winbackProgram_schema.json |
            | VIPprogram     | VIPProgram_schema.json     |

    @review
    @implemented
    Scenario: The CLI will not run if it cannot determine the other file to upload
        Given I have installed the CLI and logged in
        And I have set the environment
        And I have two files, <programName>.js and <programName>.json
        When I use the command `deploy <programName>.js`
        Then the CLI will not be able to determine the schema file to upload
        And the CLI will prompt the user to name their files correctly

    @review
    @implemented
    Scenario: The `deploy` command must be passed the Webtask file, not the schema file
        Given I have installed the CLI and logged in
        And I have set the environment
        And I have two files, <programName>.js and <programName>_schema.json
        When I use the command `deploy <programName>_schema.json`
        Then the CLI will not be able to make the deployment
        And the CLI will prompt the user to upload the .js file instead

    @review
    @implemented
    Scenario: The `deploy` command will determine the Contentful entry ID automatically
        Given I have installed the CLI and logged in
        And I have set the environment
        And I have two files, programName.js and programName_schema.json
        When I use the command `deploy programName.js`
        Then the CLI will obtain a list of entries from Contentful
        And if the CLI finds an entry with matching name, summary, and description
        Then the CLI will upload the schema to that entry
        But if the CLI does not find a match
        Then the CLI will prompt the user to enter the entry ID manually

    @review
    @implemented
    Scenario Outline: The `deploy` command will choose the name of the Webtask automatically
        Given I have installed the CLI and logged in
        And I have set the environment to <environment>
        And I have two files, <programName>.js and <programName>_schema.json
        When I use the command `deploy <programName>.js`
        Then the CLI will choose the name of the Webtask as <name>

        Examples:
            | programName    | environment    | name                   |
            | winbackProgram | Product (TEST) | staging-winbackProgram |
            | winbackProgram | Product (LIVE) | winbackProgram         |
            | VIPProgram     | Product (TEST) | staging-VIPProgram     |
            | VIPProgram     | Product (LIVE) | VIPProgram             |

    @review
    Scenario: The `deploy` command will determine the required NPM modules automatically
        Given I have installed the CLI and logged in
        And I have set the environment
        When I use the command `deploy`
        Then the CLI will scan the Webtask file for `require` statements
        And the CLI will automatically update the NPM modules in webtask according to what it finds

    @review
    @implemented
    Scenario: The `deploy` command will only upload if the files have changed
        Given I have installed the CLI and logged in
        And I have set the environment
        And I have two files, programName.js and programName_schema.json
        And I have made changes to <files>
        When I use the command `deploy programName.js`
        Then the CLI will only upload <files>

    @review
    @implemented
    Scenario: I can stream the Webtask logs to the console
        Given I have installed the CLI and logged in
        When I use the command `logs`
        Then the Webtask log stream will be outputted on the console
