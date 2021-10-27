Feature: Hero Unit

    Background: A portal with a hero unit exists
        Given a hosted portal
        And the portal has hero unit on the login page
        And a user is viewing the login page

    Scenario: The hero unit defaults to a single column layout
        Given a hero unit does not have a "column" prop
        But the following html is wrapped by the hero unit
            """
            <sqm-portal-login></sqm-portal-login>
            <div slot="secondary-column">
            <h1 style="text-align:center">Get Referring!</h1>
            <p style="text-align:center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
            </p>
            </div>
            """
        Then only a single column will be displayed
        And within it will be the login component

    Scenario Outline: The hero unit supports single or dual column layouts
        Given a hero unit with prop "column" having <columnValue>
        And it wraps <html>
        Then the hero unit displays <columnValue> columns
        Examples:
            | columnValue | html                                                                                              |
            | 1           | <h1>Column 1!</h1>                                                                                |
            | 2           | <h1>Column 1!</h1><div slot="secondary-column"><h1 style="text-align:center">Column 2!</h1></div> |

    Scenario: HTML to be displayed in the second column comes from the "secondary-column" slot
        Given a hero unit with "columns" "2"
        And the following html
            """
            <h1>Column 1!</h1>
            <div>
            <h1 style="text-align:center">Column 2!</h1>
            </div>
            """
        When the hero unit is rendered
        Then only one column is displayed with content
        And column 1 will contain the "Column 1!" text
        And column 1 will contain the "Column 2!" text
        When the div for column two is updated to have 'slot="secondary-column"'
        Then the two columns are displayed with content
        And column 1 will contain the "Column 1!" text
        And column 2 will contain the "Column 2!" text

    Scenario Outline: A background for the hero unit can be set as an image or colour
        Given a hero unit with <backgroundPropValue>
        Then the background will be <background>
        Examples:
            | background                                                                                                                                                     | background               |
            | https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80 | image of misty mountains |
            | LightSlateGrey                                                                                                                                                 | light slate grey         |
            | #00FF00                                                                                                                                                        | green                    |
            | rgb(128,0,128)                                                                                                                                                 | purple                   |

    Scenario Outline: Wrap Direction can be configured for mobile experiences
        Given a hero unit with the following HTML
            """
            <h1>Column 1!</h1>
            <div slot="secondary-column">
            <h1 style="text-align:center">Column 2!</h1>
            </div>
            """
        And prop "wrapDirection" has <value>
        When the window width is less than 600px
        Then the two columns will stack
        And <column> will be on top
        Examples:
            | value        | column |
            | wrap         | 1      |
            | wrap-reverse | 2      |
            |              | 1      |