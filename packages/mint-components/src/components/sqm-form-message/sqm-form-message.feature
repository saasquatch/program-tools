@author:noah
@owner:noah

Feature: Form Message

    @ui
    Scenario Outline: Form messages are displayed as banners in four variants differentiated by color and default icon
        Given a <variant> type form message
        Then a banner is displayed with the slot content
        And the banner is <color>
        And has the icon <icon> by default
        Examples:
            | variant | color         | icon                         |
            | success | green         | check mark in circle         |
            | info    | blue          | question mark in circle      |
            | error   | red           | exclamation mark in octagon  |
            | warning | orange/yellow | exclamation mark in triangle |

    @ui
    Scenario: The default icon can be overridden
        Given the icon prop is set to a valid icon key
        Then that icon is displayed to the left of the Message
        When the icon prop is empty
        Then the banner displays the default icon