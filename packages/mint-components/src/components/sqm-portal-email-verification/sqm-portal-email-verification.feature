@author:derek
@owner:ian
Feature: Email Verification

    @minutae
    Scenario: User's redirected from registration can re-send their verification email
        Given a user has registered
        And they have been sent a verification email
        When they are redirected to the email verification page
        Then a message is displayed
        And it reflects that a email has been sent to their email
        But they can still re-send the email
        When they click to "Resend-Email"
        Then they receive a verification email

    @motivating
    Scenario: Users are notified if sending the email verification message fails
        Given a user viewing the email verification component
        And they have an email stored in session data from registration
        When they click to "Resend-Email"
        Then the button enters a loading state
        When an error occurs trying to send the verification email
        Then the user does not receive a verification email
        And an error banner is shown stating that they should try again

    @motivating
    Scenario: Users are notified if sending the email verification message succeeds
        Given a user viewing the email verification component
        And they have an email stored in session data from registration
        When they click to "Resend-Email"
        Then the button enters a loading state
        When the email verification message sends
        Then the user receives a verification email
        And a success banner is shown stating that their email was resent

    @motivating
    Scenario Outline: The email link can be configured to redirect users to a specific base path but defaults to "/verifyEmail"
        Given a user viewing the email verification component
        And they have an email stored in session data from registration
        And the component <mayHave> "redirect-path" with <value>
        When they resend their verification email
        And they click the link in the email
        Then they are redirected to <redirectPath>
        Examples:
            | mayHave      | value          | redirectPath   |
            | doesn't have | N/A            | /verifyEmail   |
            | has          | /verifyMyEmail | /verifyMyEmail |