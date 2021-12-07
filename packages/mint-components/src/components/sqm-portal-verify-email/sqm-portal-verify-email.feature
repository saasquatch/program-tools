@author:derek
@owner:ian
Feature: Verify Email

    Background: A user is on the email verification page
        Given a user who has been redirected to the email verification page

    @motivating
    Scenario: Verifying your email takes you to the portal login page
        Given a user has a valid oob code as a url query parameter
        When they click "Verify Email"
        Then the button enters a loading state
        When their email is validated
        Then a button that says "Continue" appears
        When they click "Continue"
        Then they are redirected to login

    @motivating
    Scenario: Users are automatically redirected if they dont click "Continue"
        Given a user has a valid oob code as a url query parameter
        When they click "Verify Email"
        Then the button enters a loading state
        When their email is validated
        Then a button that says "Continue" appears
        When they wait 5 seconds
        Then they are redirected to login

    @motivating
    Scenario: Users are notified if verifying their email has failed
        Given a user has a valid oob code as a url query parameter
        When they click "Verify Email"
        Then the button enters a loading state
        When their email fails to be validated
        Then an banner is shown stating that an error occured

    @motivating
    Scenario Outline: Users cannot verify their email with an invalid or missing oob code
        Given a user has a <oobCode> as a url query parameter
        And the component <mayHave> "failed-path" with <value>
        Then they see an error message saying that their verification code is invalid/expired
        When they click "Continue"
        Then they are redirected to <redirectPath>
        Examples:
            | oobCode               | mayHave      | value  | redirectPath |
            | invalid oob code      | doesn't have | N/A    | /            |
            | non existant oob code | doesn't have | N/A    | /            |
            | invalid oob code      | has          | /login | /login       |
            | non existant oob code | has          | /login | /login       |

    @motivating
    Scenario: Users are redirected to "/" by default
        Given the component does not have prop "nextPage"
        And the users url does not contain a "nextPage" query parameter
        And a user has verified their email
        When they click "Continue"
        Then they are redirected to "/"

    @motivating
    Scenario: Custom redirection can be configured
        Given the component has prop "nextPage" with value "/activity"
        And the users url does not contain a "nextPage" query parameter
        And a user has verified their email
        When they click "Continue"
        Then they are redirected to "/activity"

    @motivating
    Scenario Outline: Users are redirected to the value of the nextPage url parameter if it exists
        Given the component <mayHave> prop "nextPage" with <nextPageValue>
        And the users url contains a "nextPage" query paramater with <nextPageParamValue>
        And the user has verified their email
        When they click "Continue"
        Then they are redirected to <nextPageParamValue>
        Examples:
            | mayHave       | nextPageValue | nextPageParamValue |
            | has           | /dashboard    | /activity          |
            | does not have | N/A           | /activity          |