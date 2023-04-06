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
