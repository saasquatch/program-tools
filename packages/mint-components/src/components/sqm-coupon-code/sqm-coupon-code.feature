@author:truman
@owner:truman
Feature: Coupon Code

    The coupon code component is a box that allows users to see and copy their coupon code for a given program

    @motivating
    Scenario: A Users coupon code can be copied to their clipboard
        Given tooltipText is "hello tooltip"
        When the component renders
        Then there is a textbox with the user's coupon code
        When the clipboard icon is clicked
        Then the code is copied to clipboard
        And a tooltip appears for ~1 second

    @motivating
    Scenario: Component only looks at fueltank rewards
        Given a user has multiple rewards of different types
        When the component is loaded
        Then it filters the user's reward to only return FUELTANK rewards

    @motivating
    Scenario: The first reward is the reward that is displayed
        Given a user has at least one fueltank reward
        And the fueltank reward is available
        Then the coupon code component shows the first reward returned

    @motivating
    Scenario Outline: Coupon code has multiple states depending on reward status
        Given a user has at least one fueltank reward
        And the reward has most recent status <status>
        And the dateScheduledFor field is <dateScheduledFor>
        Then the component's status is set to <componentStatus>
        And the <errorMessageTextProp> is displayed under the input field

        Examples:
            | status    | dateScheduledFor | componentStatus | errorMessageTextProp     |
            | AVAILABLE | null             | AVAILABLE       | N/A                      |
            | EXPIRED   | null             | EXPIRED         | expiredErrorMessage      |
            | REDEEMED  | null             | REDEEMED        | redeemedMessage          |
            | CANCELLED | null             | CANCELLED       | cancelledErrorMessage    |
            | PENDING   | null             | EMPTY_TANK      | fullfillmentErrorMessage |
            | PENDING   | 123412341234     | PENDING         | pendingErrorMessage      |
            | null      | null             | ERROR           | genericErrorMessage      |

    Scenario Outline: Coupon code's error message text props are grouped
        Given a user is viewing the coupon code component
        Then they see <prop>
        And <prop> is grouped under "Coupon code error"
        Examples:
            | prop                     |
            | N/A                      |
            | expiredErrorMessage      |
            | redeemedMessage          |
            | cancelledErrorMessage    |
            | fullfillmentErrorMessage |
            | pendingErrorMessage      |
            | genericErrorMessage      |

    @minutia
    Scenario: Tooltip lifespan defaults to 2000
        Given the tooltip's lifespan is set to 2000
        And there is tooltip text
        When the component renders
        And the clipboard icon is clicked
        Then a tooltip appears for ~2 seconds

    @ui
    Scenario: Component shows an error state when there is an error
        Given a user is viewing the coupon code component
        When there is an error in the coupon code
        Then in place of the coupon code is an alert banner
        And the alert banner gives information about the error to the user

    @ui
    Scenario: Component shows an loading state
        Given a user is viewing the coupon code component
        When the coupon code is loading in
        Then the text inside the input is "Loading..."
        And the coupon code input box has a gray background
        And the cursor is set to "default"
        And the user cannot copy the text

    @ui
    Scenario: user can edit the error message and code placeholder
        Given a user is editing the coupon code component
        When they see an option called "Invalid Email Message"
        And an option called "Required Field Message"

    @ui
    Scenario: user can edit the alignment of the coupon code text
        Given a user is editing the coupon code component
        Then they see "Align text" props
        And the default value is "left"
        When they change the option to <option>
        Then they see the text in <position>
        Examples:
            | option | position |
            | left   | left     |
            | center | center   |
            | right  | right    |

    @ui
    Scenario Outline: The position of the copy button can be changed
        Given a user is editing the coupon code component
        Then they see "Style" props
        And the default value is "icon"
        When they change the option to <option>
        Then they see the copy button in <position>
        Examples:
            | option         | position                        |
            | button outside | outside the input, on the right |
            | button below   | outside the input, below        |
            | icon           | inside the input as an icon     |

    @minutia
    Scenario: ICU string converts to a date
        Given a user is viewing a live coupon code code component
        And the "pendingErrorText" has the "{unpendDate}" ICU string
        And the program is configured for rewards to be pending
        Then the user will see an info alert banner
        And the ICU string is converted to the unpend date

    @landmine
    Scenario: ICU string does not work with automatic translations
        Given a coupon code component has an ICU string in the "pendingErrorText" prop
        And the component is translated
        Then the automatic translation is not handled
        And the ICU string might be translated and no longer work