@author:noah
@owner:noah
Feature: Referral Table Status Column

    Shows the status of each referral

    Background:
        Given the status column is included in the referral table

    @motivating
    @ui
    Scenario: The title of the date column is configurable
        Given the "column-title" prop is set to "My column title"
        Then the date column is shown with "My column title"

    @motivating
    Scenario Outline: The status column's fraudStatus maps to the fraud status of the referral
        Given at least one referral
        And the referral has fraud autoModerationStatus <autoModerationStatus>
        And the referral has fraud manualModerationStatus <manualModerationStatus>
        Then the referral cell fraud status is set to <fraudStatus>

        Examples:
            | autoModerationStatus | manualModerationStatus | fraudStatus   |
            | DENIED               | DENIED                 | MANUAL_DENIED |
            | PENDING              | DENIED                 | MANUAL_DENIED |
            | APPROVED             | DENIED                 | MANUAL_DENIED |
            | DENIED               | APPROVED               | APPROVED      |
            | PENDING              | APPROVED               | APPROVED      |
            | APPROVED             | APPROVED               | APPROVED      |
            | DENIED               | null                   | AUTO_DENIED   |
            | PENDING              | null                   | PENDING       |
            | APPROVED             | null                   | APPROVED      |

    @motivating
    Scenario Outline: The status column displays the status of each referral
        Given referrals exist
        Then the status of each referral is displayed
        And the status <status> is displayed as text from <statusTextProp> in a <pillColour> pill

        Examples:
            | status      | statusTextProp          | pillColour |
            | In Progress | inProgressStatusText    | Orange     |
            | Converted   | convertedStatusText     | Green      |
            | Pending     | pendingReviewStatusText | Orange     |
            | Denied      | deniedStatusText        | Red        |
