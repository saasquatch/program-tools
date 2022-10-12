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

    @minutia
    @ui
    Scenario: Clicking the "Edit" button displays a modal to choose between editing email or disconnecting your email from the integration
        Given a "<sqp-account-details>" component
        And a participant with a "paypalEmail" custom field value
        Then they see an "Edit" button beside the PayPal header
        When they click "Edit"
        Then they see a modal
        And in the top of the modal they see their PayPal in a disabled input
        And they see a brand colour button to change their email
        And below the see a section to disconnect their account

    @motivating
    Scenario: Paypal Email can be changed after configuration 
        Given a "<sqp-account-details>" component
        And a participant with a "paypalEmail" custom field value
        When click the "Edit" button
        And click "change account" in the modal
        Then they see the following inputs
            | input         |
            | PayPal Email  |
            | Confirm Email |
        When they change their email
        And confirm
        And click "Save"
        Then the modal closes
        And their new email is saved on the participant as their "paypalEmail"

    @minutia
    #Is there a big use case for this?
    Scenario: Participants can disconnect themselves from the PayPal integration
    Given a "<sqp-account-details>" component
        And a participant with a "paypalEmail" custom field value
        When click the "Edit" button
        And click "Disconnect account" in the modal
        Then the modal closes
        And their PayPal email is wiped from their user in SSQT

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
        And they have been paid out by the integration
        And they have rewards that are going to be paid out by the integration
        When they view the component
        Then they see the following information for their previous payout
            | information                                             | text                       |
            | total amount paid out the last time the integration ran | {amount}$ on {datePaidOut} |
            #questions here if this is the above or the last time the integration ran that resulted in the participant being paid out, and how much that was
        And they see the date of the next scheduled payout

    @minutia
    Scenario: Previous payout is hidden if they have no previous payout
       Given a "<sqp-account-details>" component
        And a participant with a "paypalEmail" custom field value
        But they have not been paid out by the integration
        When they view the component
        Then they do not see the "Recent Payment" section

    @unknown
    #Need detail of what is possible from the integration
    Scenario: The "Next Payment" section displays ___ when the participant has nothing to be paid out

    @minutia
    Scenario: The component displays a disabled state if the integration is not configured/enabled
        Given a "<sqp-account-details>" component
        But the tenant has not configured/enabled the PayPal integration
        When a participant views the component
        Then they see text explaining that the integration is not configured/enabled
        And they are unable to connect their email

    @minutia
    @ui
    Scenario: A loading state is displayed when the component is loading
