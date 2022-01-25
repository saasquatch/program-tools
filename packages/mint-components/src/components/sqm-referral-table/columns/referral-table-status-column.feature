@author:noah
@owner:noah
Feature: Referral Table Status Column

    Shows the status of each referral

    Background:
        Given the status column is included in the referral table

    @motivating
    Scenario: The title of the date column is configurable
        Given the "column-title" prop is set to "My column title"
        Then the date column is shown with "My column title"

    @motivating
    Scenario Outline: The status column displays the status of each referral
        Given referrals exist
        Then the status of each referral is displayed
        And the status <status> is displayed as text from <statusTextProp> in a <pillColour> pill
        Examples:
            | status      | statusTextProp       | pillColour |
            | IN PROGRESS | inProgressStatusText | Orange     |
            | Converted   | convertedStatusText  | Green      |
