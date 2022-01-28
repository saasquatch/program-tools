@author:noah
@owner:noah
Feature: Referral Table Date Column

    Shows the date of each referral

    Background:
        Given the date column is included in the referral table

    @motivating
    Scenario Outline: The title of the date column is configurable
        Given the "column-title" prop is set to <value>
        Then the date column is shown with <columTitle>
        Examples:
            | value           | columnTitle     |
            |                 | Date Converted  |
            | My column title | My column title |

    @motivating
    Scenario Outline: A configurable date associated with the referral is shown for each referral
        Given the "date-shown" prop is set to <dateType>
        And referrals exist
        Then for each referral the <referralDate> is shown in the table
        And the date is localized to the users locale
        Examples:
            | dateType            | referralDate          |
            | dateReferralStarted | date referral started |
            | dateReferralPaid    | date referral paid    |
            | dateReferralEnded   | date referral ended   |
            | dateModerated       | date moderated        |
            | dateUserModified    | date user modified    |
            | dateConverted       | date converted        |
            | dateModified        | date modified         |
            |                     | date converted        |