@author:derek
@owner:derek
Feature: Redirect

    @motivating
    Scenario Outline: Users are redirected to the value of the redirect path when the component is rendered
        Given a redirect component with prop "redirec-to" <value>
        When the component is loaded at <currentUrl>
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