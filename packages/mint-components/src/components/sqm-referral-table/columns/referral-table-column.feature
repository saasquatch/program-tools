Feature: Referral Table User Column

    Shows the same custom content for each referral

    Background:
        Given the column in included in the referral table

    Scenario: The title of the column is configurable
        Given the <columnTitle> prop is set to <title>
        Then the column is shown with <title>

    Scenario: The same custom content is shown for each referral
        Given there is at least one referral
        Then for each referral custom content is shown
        And the custom content is provided as slot content