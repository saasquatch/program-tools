@author:derek
@owner:derek
Feature: Redirect

    @motivating
    Scenario Outline: Users are redirected to the value of the redirect path when the component is rendered
        Given a user
        And a redirect component with prop "redirect-to" <value>
        When they load the component at <currentUrl>
        And they are redirected to <url>
        Examples:
            | value                         | currentUrl                                               | url                                      |
            | ./activity                    | https://www.example.com                                  | https://www.example.com/activity         |
            | activity                      | https://www.example.com                                  | https://www.example.com/activity         |
            | /activity                     | https://www.example.com                                  | https://www.example.com/activity         |
            | www.google.com                | https://www.example.com                   ˝               | https://www.example.com/www.google.com   |
            | //foo.com                     | https://www.example.com                                  | https://www.example.com/                 |
            | https://malicious.example.com | https://www.example.com                                  | https://www.example.com/                 |
            | activity                      | http://www.example.com/nest/page?oob=123&other#heading-1 | http://www.example.com/activity          |
            | activity?foo=bar              | https://www.example.com                                  | https://www.example.com/activity?foo=bar |

    @minutia
    Scenario: Users are not redirected if there is no "redirect-to" prop
        Given a user
        And a redirect component with no "redirect-to" prop
        When they load the component
        Then they are not redirected