@author:noah
@owner:noah
Feature: Referral Table User Column

    Shows the user of each referral

    Background:
        Given the user column is included in the referral table

    @motivating
    @ui
    Scenario: The title of the date column is configurable
        Given the "column-title" prop is set to "My column title"
        Then the date column is shown with "My column title"

    @motivating
    Scenario: The first and last name of the other user in the referral is displayed for each referral
        Given at least one referral exists
        Then for each referral where the other user's name is available their first and last name is displayed

    @motivating
    Scenario: Deleted users are displayed with a fallback name
        Given a referral exists where the other user was deleted
        Then in place of the name the text from the prop "deleted-user" is used

    @motivating
    Scenario: Anonymous users are displayed with a fallback name
        Given a referral exists where the other user was anonymous
        Then in place of the name the text from the prop "anonymous-user" is used