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
            | value                          | currentUrl                                               | url                                           |
            | ./activity                     | https://www.example.com                                  | https://www.example.com/activity              |
            | activity                       | https://www.example.com                                  | https://www.example.com/activity              |
            | /activity                      | https://www.example.com                                  | https://www.example.com/activity              |
            | www.google.com                 | https://www.example.com                                  | https://www.example.com/www.google.com        |
            | //foo.com                      | https://www.example.com                                  | https://www.example.com/                      |
            | https://malicious.example.com  | https://www.example.com                                  | https://www.example.com/                      |
            | activity                       | http://www.example.com/nest/page?oob=123&other#heading-1 | http://www.example.com/activity               |
            | activity                       | https://www.example.com?foo=bar                          | https://www.example.com/activity?foo=bar      |
            | %2Factivity%3Ffoo%3Dbar        | https://www.example.com                                  | https://www.example.com/activity?foo=bar      |
            | %2Factivity%3Ffoo%3Dbar#hash   | https://www.example.com                                  | https://www.example.com/activity?foo=bar      |
            | %2Factivity%3Ffoo%3Dbar%23hash | https://www.example.com                                  | https://www.example.com/activity?foo=bar#hash |
            | activity                       | https://www.example.com:1337                             | https://www.example.com:1337/activity         |
            | activity                       | http://1.1.1.1:1111                                      | http://1.1.1.1:1111/activity                  |

    @minutia
    Scenario: Users are not redirected if there is no "redirect-to" prop
        Given a user
        And a redirect component with no "redirect-to" prop
        When they load the component
        Then they are not redirected