@author:derek
@owner:ian
Feature: Reset Password

    Background: A user in on the password reset page
        Given a user who has been redirected to the password reset page

    @motivating
    Scenario: Users can reset their password
        Given a user has a valid oob code as a url query parameter
        When they enter their password twice
        And they click "Update"
        Then their password is updated
        And a banner with a success message is displayed
        And they can log in with their new password

    @motivating
    Scenario Outline: Users cannot reset their password with an invalid or missing oob code
        Given a user has a <oobCode> as a url query parameter
        And the component <mayHave> "failed-page" with <value>
        Then they see an error message saying that their password reset code is invalid/expired
        When they click "Continue"
        Then they are redirected to <redirectPath>
        Examples:
            | oobCode               | mayHave      | value  | redirectPath |
            | invalid oob code      | doesn't have | N/A    | /            |
            | non existant oob code | doesn't have | N/A    | /            |
            | invalid oob code      | has          | /login | /login       |
            | non existant oob code | has          | /login | /login       |

    @motivating
    Scenario: Users must enter the same password twice to successfully reset their password
        Given a user has been redirected to the password reset page
        And they have a valid oob code as a url query parameter
        When they enter two different passwords into the password reset form
        And they click "Update"
        Then their password is not be reset
        And an error banner stating the input passwords must match appears
        And their password is not be reset
        When they enter the same password twice
        And they click "Update"
        Then a banner appears with a success message
        And they can log in with their new password

    @motivating
    Scenario: Users are notified if resetting their password fails
        Given a user has a valid oob code as a url query parameter
        When they enter their password twice
        And they click "Update"
        But the password reset fails
        Then the user's password does not reset
        And an error banner is shown

    @motivating
    Scenario: Users are redirected to "/" by default
        Given the component does not have prop "nextPage"
        And the users url does not contain a "nextPage" query parameter
        And a user has entered their password twice
        When they click "Update"
        Then their password is updated
        And they are redirected to "/"

    @motivating
    Scenario: Custom redirection can be configured
        Given the component has prop "nextPage" with value "/activity"
        And the users url does not contain a "nextPage" query parameter
        And a user has entered their password twice
        When they click "Update"
        Then their password is updated
        And they are redirected to "/activity"

    @motivating
    Scenario Outline: Users are redirected to the value of the nextPage url parameter as if it were a relative path
        Given the component is loaded at <currentUrl>
        When they click "Update"
        Then their password is updated
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
        When they click "Update"
        Then their password is updated
        And they are redirected to <url>
        Examples:
            | currentUrl                                              | url                                  |
            | https://user:pass@www.example.com:444?nextPage=activity | https://www.example.com:444/activity |