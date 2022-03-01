@author:noah
@owner:noah
Feature: Referral Table User Column

    Shows the same custom content for each referral

    Background:
        Given the column in included in the referral table

    @motivating
    Scenario: The title of the date column is configurable
        Given the "column-title" prop is set to "My column title"
        Then the date column is shown with "My column title"

    @motivating
    Scenario: The same custom content is shown for each referral
        Given there is at least one referral
        Then for each referral custom content is shown
        And the custom content is provided as slot content