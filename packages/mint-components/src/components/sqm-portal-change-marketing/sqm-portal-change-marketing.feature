@owner:sam
@author:sam
Feature: Portal Change Marketing Opt-in Status

    A small form that is used to opt in or out of marketing emails.

    Background: A user is on the portal edit profile page
        Given a user is viewing the "/editProfile"
        And "/editProfile" contains the "<sqm-portal-change-marketing>" component with default props
        And the heading "Email preferences" is shown
        And a checkbox with the following label is shown
            """
            I want to receive marketing emails and promotions for this referral program from impact.com
            """
        And a "Save" button is shown


    @motivating
    Scenario Outline: Checkbox value is based off the logged in user's opt in status
        Given the user sees the email preferences component
        And the user <mayBe> opted into marketing emails
        Then the checkbox <isChecked>
        Examples:
            | mayBe  | isChecked      |
            | is     | is checked     |
            | is not | is not checked |

    @motivating
    Scenario Outline: User can change their opt in status
        Given the user sees the email preferences component
        And the user <mayBe> opted into marketing emails
        When the user <checks> the checkbox
        And save is clicked
        Then the participant's "marketingEmailOptIn" status is <status>
        When the page is refreshed
        Then the checkbox is <newStatus>
        Examples:
            | mayBe  | checks   | status | newStatus |
            | is not | checks   | true   | checked   |
            | is not | unchecks | false  | unchecked |