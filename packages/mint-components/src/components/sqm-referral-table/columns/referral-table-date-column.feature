Feature: Referral Table Date Column

    Shows the date of each referral

    Background:
        Given the date column in included in the referral table

    Scenario: The title of the date column is configurable
        Given the <columnTitle> prop is set to <title>
        Then the date column is shown with <title>

    Scenario Outline: A configurable date associated with the referral is shown for each referral
        Given the <dateShown> prop is set to <dateType>
        And referrals exist
        Then for each referral the value of <dateType> for that referral is shown in the table
        Examples:
            | dateType            |
            | dateReferralStarted |
            | dateReferralPaid    |
            | dateReferralEnded   |
            | dateModerated       |
            | dateUserModified    |
            | dateConverted       |
            | dateModified        |