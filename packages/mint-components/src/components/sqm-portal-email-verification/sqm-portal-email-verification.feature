@author:derek
@owner:ian
Feature: Email Verification

    @minutia
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
        Then the text link is disabled
        When an error occurs trying to send the verification email
        Then the user does not receive a verification email
        And an error banner is shown stating that they should try again

    @motivating
    Scenario: Users are notified if sending the email verification message succeeds
        Given a user viewing the email verification component
        And they have an email stored in session data from registration
        When they click to "Resend-Email"
        Then the text link is disabled
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

    @motivating
    Scenario Outline: Verification status is refetched on refresh
        Given a user viewing the email verification component
        And the component <mayHave> "redirect-path" with <value>
        And they verified their account on another device
        And the local storage verification state is outdated
        When they refresh the page the component is on
        Then their verification status is re-queried
        And the local storage managed identity state is updated
        And they are redirected to <redirectPath>
        Examples:
            | mayHave      | value          | redirectPath   |
            | doesn't have | N/A            | /verifyEmail   |
            | has          | /verifyMyEmail | /verifyMyEmail |

    @motivating
    Scenario Outline: Verification status is refetched every 10 seconds
        Given a user viewing the email verification component
        And the component <mayHave> "redirect-path" with <value>
        Then they see text "Checking verification status in 10" above the re-send verification text link
        And the time counts down from 10 to 0
        When the counter hits 0
        Then their verification status is re-queried
        And the text displays a spinner where the "in {seconds}" text was
        When they verify their account on another device
        And the count down hits 0 again from 10
        Then their verification status is re-queried
        And the local storage managed identity state is updated
        And they are redirected to <redirectPath>
        Examples:
            | mayHave      | value          | redirectPath   |
            | doesn't have | N/A            | /verifyEmail   |
            | has          | /verifyMyEmail | /verifyMyEmail |

    @minutia
    Scenario Outline: Verification refetch text is customizable
        Given the email verication has prop "verification-status-message" with <verificationPropValue>
        And has prop "verification-loading-message" with <loadingPropValue>
        And a user viewing the component
        When it is counting down
        Then they see <verificationTextValue>
        When it is refetching their verification status
        Examples:
            | verificationPropValue                         | verificationTextValue                         | loadingPropValue      | loadingTextValue             |
            | N/A                                           | Checking verification status in {countdown}   | N/A                   | Checking verification status |
            | {countdown} seconds till verification refresh | {countdown} seconds till verification refresh | Checking verification | Checking verification        |


    @minutia
    Scenario: 10 second countdown pauses when minimizing or moving between tabs
        Given a user viewing the email verification component
        Then they see text "Checking verification status in 10" above the re-send verification text link
        And the time counts down from 10 to 7
        And the user changes to a different tab
        When the user goes back to the verification tab
        Then the countdown will still be 7
        When the counter hits 0
        Then their verification status is re-queried
