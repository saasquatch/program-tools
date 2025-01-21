Feature: Widget verification flow

  @motivating
  Scenario: sqm-widget-verification has a slot for a "verified" template
    Given the following html
      """
      <sqm-widget-verification>
      <template slot="verified">
      <generic-element></generic-element>
      </template>
      </sqm-widget-verification>
      """
    When the html is loaded
    Then the page displays the widget verification flow
    When an email is successfully verified
    Then the html inside the "verified" template is displayed
    And the widget verification flow is hidden

  @motivating @ui
  Scenario: Entering an email for verification
    Given a user viewing the verification flow
    Then they see the default sub-header text
      """
      Start by verifying your email. We’ll send you a code through our referral provider, impact.com.
      """
    And they see the default input label text "Email"
    And they see the default button text "Send code"

  @minutia
  Scenario: Invalid email error state
    Given a user viewing the email verification step
    When they enter an invalid email
    And click the submit button
    Then they see the default error text "Please enter a valid email" under the input

  @motivating
  Scenario: Submitting a valid email sends a 2FA code to the email
    Given enters a valid email
    When they click the submit button
    Then an email containing a 2FA is sent to the provided email address
    And the component displays the code verification step

  @motivating @ui
  Scenario: Code verification step
    Given a user on the code verification step
    Then they see the default sub-header text:
      """
      Enter the code sent to {email} from our referral provider, impact.com.
      """
    And the default button text: "Verify"
    And the default help text:
      """
      Didn't recieve your code? Resend Code
      """
    And the default undo text:
      """
      Use a different email
      """

  @motivating
  Scenario Outline: Entering an invalid or expired 2FA code
    Given a user has recieved the 2FA code "123456" via email
    But they enter the code <code> into the code input
    And it has been <time> after recieving the 2FA email
    When they click the submit button
    Then the following error is displayed
      """
      Please check your code and try again. If you’re still having trouble, try resending your code.
      """
    And the code inputs are highlighted in red

    Examples:
      | code   | time       |
      | 234567 | 1 minute   |
      | 123456 | 30 minutes |
      | 234567 | 30 minutes |

  @motivating
  Scenario: Resending a 2FA code
    Given a user entered the email "test@example.com"
    And the 2FA code in the email is "123456"
    And they are now on the code verification step
    When they click "Resend Code"
    Then a new 2FA email is sent to "test@example.com"
    And the new 2FA code is not "123456"
    And a success banner with the following default text is displayed
      """
      Another code has been sent to {email}
      """

  @minutia
  Scenario: Entering a previous 2FA code gives an invalid error
    Given a user entered the email "test@example.com"
    And the 2FA code in the email is "123456"
    And they are now on the code verification step
    And they click "Resend Code"
    And a new email is sent to "test@example.com"
    And the new 2FA code is "234567"
    When they enter the "123456" into the code input
    And they click the submit button
    Then an invalid code error is displayed

  @motivating
  Scenario: Users can re-enter an email
    Given a user originally entered "test@example.com" as their email
    And they are on the code verification step
    When they click "Use a different email"
    Then they are shown the email verification step
    And they can re-enter an email address
    When they enter "test2@example.com"
    And they click the submit button
    Then a 2FA email is sent to "test2@example.com"
    And any 2FA codes associated with "test@example.com" are now invalid

  @minutia
  Scenario: `sqm-widget-verification` displays a loading state initially
    Given "sqm-widget-verification" is included in the page's html
    When the component loads
    Then a spinner loading state is shown

  @motivating
  Scenario Outline: Email verification is only required if they have not already verified their email
    Given a user with participant email "asdf@example.com"
    And their email <mayBeVerified>
    When the "sqm-widget-verification" component loads
    Then the <UI> is shown

    Examples:
      | mayBeVerified   | UI                      |
      | is verified     | enabled slot            |
      | is not verified | email verification flow |

