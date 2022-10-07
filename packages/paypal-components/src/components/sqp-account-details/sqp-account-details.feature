@author:derek
@owner:derek
Feature: Paypal Account Details

    @motivating
    #currently we are doing this through the core API, but we will likely want to move this to be through the integration
    Scenario: Participants can configure their paypal email
        Given a "<sqp-account-details>" component
        And a participant without a "paypalEmail" custom field value
        When they view the component
        Then they see a button to connect their paypal account
        When they click the button
        Then they see the modal
        When they enter their email
        And they confirm their email
        And they click "Save"
        Then the modal closes
        And their email is saved on the participant as their "paypalEmail"
        And they see payout information

    @minutia
    #details on validation pretty tbd
    Scenario: Paypal email must be a valid email
        Given a participant configuring their paypal email
        But they do not enter a valid email address
        When they click "Save"
        Then they see a validation error saying that the email is invalid
        And the modal isn't closed
        And their "paypalEmail" isn't saved

    @minutia
    Scenario: Paypal email cannot be configured without confirming the field
        Given a user configuring their email
        But they do not enter the confirmation email
        When they click "Save"
        Then they see a validation error saying that they must confirm their email
        And the modal isn't closed
        And their "paypalEmail" isn't saved

    @motivating
    #we need to source this from the integration
    Scenario: Last payout and next payout are displayed when the participant has configured their paypal email
        Given a "<sqp-account-details>" component
        And a participant with a "paypalEmail" custom field value
        When they view the component
        Then they see the email linked to their account
        And a "edit" text link to the right of the email
        And they see the following information for their previous payout
            | information      |
            | amount payed out |
            | date payed out   |
        And they see the date of the next scheduled payout

    @minutia
    Scenario: Empty state displayed when their is no previous payout

    @motivating
    Scenario: Paypal Email can be edited
        Given a "<sqp-account-details>" component
        And a participant with a "paypalEmail" custom field value
        When they view the component
        And click the "Edit" text link beside their email
        Then the configuration modal opens
        When they change their email
        And confirm
        And click "Save"
        Then the modal closes
        And their new email is saved on the participant as their "paypalEmail"

    @minutia
    @ui
    Scenario: A loading state is displayed when the component is loading

    @unknown
    Scenario: Disconnecting/wiping the config? What if I don't want to be payed out with paypal anymore