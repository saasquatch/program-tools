@author:truman
@owner:truman
Feature: Coupon Code

    The coupon code component is a box that allows users to see and copy their coupon code for a given program

    @motivating
    Scenario: A Users sharelink can be copied to their clipboard
        Given tooltipText is "hello tooltip"
        When the component renders
        Then there is a textbox with the user's coupon code
        When the clipboard icon is clicked
        Then the link is copied to clipboard
        And a tooltip appears for ~1 second

    @minutia
    Scenario: Tooltip lifespan defaults to 2000
        Given the tooltip's lifespan is set to 2000
        And there is tooltip text
        When the component renders
        And the clipboard icon is clicked
        Then a tooltip appears for ~2 seconds

    @ui
    Scenario: Component shows an error state when there are no coupon codes
        Given a user is viewing the coupon code component
        When there are no coupon code to display
        Then the coupon code input box has a red border
        And there is red help text about the error
        And in place of the coupon code is "CODE ERROR"
        When the copy button's position is set to "below"
        Then the red help text is below the copy button

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
        When they change the option "Align text" to <option>
        Then they see the text in <position>
        Examples:
            | option | position |
            | left   | left     |
            | center | center   |

    @ui
    Scenario Outline: The position of the copy button can be changed
        Given a user is editing the coupon code component
        When they change the option "Button style" to <option>
        Then they see the copy button in <position>
        Examples:
            | option         | position                        |
            | button inside  | inside the input, on the right  |
            | button outside | outside the input, on the right |
            | button below   | outside the input, below        |