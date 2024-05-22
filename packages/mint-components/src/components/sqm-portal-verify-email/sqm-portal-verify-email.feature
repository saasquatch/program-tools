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
        And the component <mayHave> "failed-page" with <value>
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

    @motivating
    Scenario Outline: Users are redirected to the value of the nextPage url parameter as if it were a relative path
        Given the component is loaded at <currentUrl>
        And the user has verified their email
        When they click "Continue"
        And they are redirected to <url>
        Examples:
            | currentUrl                                                                 | url                                           |
            | https://www.example.com?nextPage=./activity                                | https://www.example.com/activity              |
            | https://www.example.com?nextPage=activity                                  | https://www.example.com/activity              |
            | https://www.example.com?nextPage=/activity                                 | https://www.example.com/activity              |
            | https://www.example.com?nextPage=www.google.com                            | https://www.example.com/www.google.com        |
            | https://www.example.com?nextPage=//foo.com                                 | https://www.example.com/                      |
            | https://www.example.com?nextPage=https://malicious.example.com             | https://www.example.com/                      |
            | http://www.example.com/nest/page?oob=123&other&nextPage=activity#heading-1 | http://www.example.com/activity               |
            | https://www.example.com?nextPage=activity?foo=bar                          | https://www.example.com/activity?foo=bar      |
            | https://www.example.com?nextPage=%2Factivity%3Ffoo%3Dbar                   | https://www.example.com/activity?foo=bar      |
            | https://www.example.com?nextPage=%2Factivity%3Ffoo%3Dbar#hash              | https://www.example.com/activity?foo=bar      |
            | https://www.example.com?nextPage=%2Factivity%3Ffoo%3Dbar%23hash            | https://www.example.com/activity?foo=bar#hash |
            | https://www.example.com:1337?nextPage=activity                             | https://www.example.com:1337/activity         |
            | http://1.1.1.1:1111?nextPage=activity                                      | http://1.1.1.1:1111/activity                  |

    @landmine
    Scenario Outline: Username and password are not persisted on redirects
        Given the component is loaded at <currentUrl>
        And the user has verified their email
        When they click "Continue"
        And they are redirected to <url>
        Examples:
            | currentUrl                                              | url                                  |
            | https://user:pass@www.example.com:444?nextPage=activity | https://www.example.com:444/activity |


    @minutia
    Scenario Outline: Users may not be logged in or logged out depending on the verified status and logged in email
        Given an oobCode with email <oobCodeEmail> as a url query parameter
        And the user is logged in as <loggedInEmail>
        And the logged in user <isVerified>
        When the oobCode is submitted
        And the oobCode <isValid>
        Then the <submitState> screen is shown
        And after 3 seconds pass
        Then the user is redirected to <redirect>
        Examples:
            | oobCodeEmail      | loggedInEmail     | isVerified | isValid      | submitState | redirect  |
            | user1@example.com | N/A               | false      | is valid     | success     | /login    |
            | user1@example.com | N/A               | false      | is not valid | error       | /login    |
            | user1@example.com | user1@example.com | false      | is valid     | success     | /activity |
            | user1@example.com | user1@example.com | false      | is not valid | error       | N/A       |
            | user1@example.com | user2@example.com | false      | is valid     | success     | /login    |
            | user1@example.com | user2@example.com | false      | is not valid | error       | /login    |
            | user1@example.com | user1@example.com | true       | is valid     | success     | /activity |
            | user1@example.com | user1@example.com | true       | is not valid | success     | /activity |
            | user1@example.com | user2@example.com | true       | is not valid | error       | /login    |
