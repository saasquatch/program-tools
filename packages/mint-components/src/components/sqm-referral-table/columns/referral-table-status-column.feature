Feature: Referral Table Status Column

    Shows the status of each referral

    Background:
        Given the status column in included in the referral table

    Scenario: The title of the status column is configurable
        Given the <columnTitle> prop is set to <title>
        Then the status column is shown with <title>

    Scenario Outline: The status column displays the status of each referral
        Given referrals exist
        Then the status of each referral is displayed
        And the status <status> is displayed as text from <statusTextProp> in a <pillColour> pill
        Examples:
            | status      | statusTextProp       | pillColour |
            | IN PROGRESS | inProgressStatusText | Orange     |
            | Converted   | convertedStatusText  | Green      |
