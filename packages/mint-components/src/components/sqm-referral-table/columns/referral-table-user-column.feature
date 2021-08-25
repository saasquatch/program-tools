Feature: Referral Table User Column

    Shows the user of each referral

    Background:
        Given the user column in included in the referral table

    Scenario: The title of the user column is configurable
        Given the <columnTitle> prop is set to <title>
        Then the user column is shown with <title>

    Scenario: The first and last name of the other user in the referral is displayed for each referral
        Given at least one referral exists
        Then for each referral where the other user's name is available their first and last name is displayed

    Scenario: Deleted users are displayed with a fallback name
        Given a referral exists where the other user was deleted
        Then in place of the name the text from the prop <deletedUser> is used

    Scenario: Anonymous users are displayed with a fallback name
        Given a referral exists where the other user was anonymous
        Then in place of the name the text from the prop <anonymousUser> is used