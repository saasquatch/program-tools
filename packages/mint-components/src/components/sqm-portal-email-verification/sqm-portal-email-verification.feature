@author:
@owner: ian
Feature: Email Verification

    @minutae
    Scenario: User's redirected from registration can re-send their verification email
        Given a user has registered
        And they have been sent a verification email
        When they are redirected to the email verification page
        Then a message will be displayed
        And it will reflect that a email has already been sent to their email
        But they can still re-send the email
        When they click to "Resend-Email"
        Then the user will receive a verification email

    @motivating
    Scenario: Users are notified if sending the email verification message fails
        Given a user with an email was stored in session data from registration
        When they click to "Resend-Email"
        Then the button enters a loading state
        When an error occurs trying to send the verification email
        Then the user will not receive a verification email
        And an error banner is shown stating that they should try again

    @motivating
    Scenario: Users are notified if sending the email verification message succeeds
        Given a user with an email was stored in session data from registration
        When they click to "Resend-Email"
        Then the button enters a loading state
        When the email verification message sends
        Then the user will receive a verification email
        And a success banner is shown stating that their email was resent