@author:derek
@owner:ian
Feature: Forgot Password

  @motivating
  Scenario: Users can request to reset their password
    Given a user enters their email address
    And that email address is linked to a previously created account
    When they click "Reset Password"
    Then the button enters a loading state
    When the password reset email is sent
    Then a confirmation banner is shown stating a password reset email was sent

  @motivating
  Scenario: Users are notified if sending their password reset email fails
    Given a user enters their email address
    And that email address is linked to a previously created account
    When they click "Reset Password"
    Then the button enters a loading state
    When the password reset email fails to send
    Then the user does not receive a password reset email
    And an error banner is shown stating that they should try again

  @motivating
  @landmine
  Scenario: If the input email is not associated to an account a success banner is shown but an email is not be sent
    Given the user entered an email address that is not associated to an accoun
    When they click "Reset Password"
    Then the button enters a loading state
    But no email is sent
    And a success banner is shown stating a password reset email was sent if the given email was associated to an account

  @motivating
  Scenario: Users can resend password reset email
    Given a user had previously requested to reset their password
    When they enter their email address
    And that email address is linked to a previously created account
    And they click "Reset Password"
    Then the user receives a second password reset email
    And a success banner is shown stating that their email was sent

  @motivating
  Scenario Outline: The email link can be configured to redirect users to a specific base path but defaults to "/resetPassword"
    Given a user viewing the password reset component
    And the component <mayHave> "redirect-path" with <value>
    When they request a password reset email
    And they click the link in the email
    Then they are redirected to <redirectPath>
    Examples:
      | mayHave      | value            | redirectPath     |
      | doesn't have | N/A              | /resetPassword   |
      | has          | /resetMyPassword | /resetMyPassword |

  @minutae
  Scenario Outline: Navigation back to the login page can be customized but defaults to "/login"
    Given a user viewing the password reset component
    And the component <mayHave> "login-path" with <value>
    Then they see a "Sign In" text button
    When they click "Sign In"
    Then they are redirected to <redirectPath>
    Examples:
      | mayHave      | value   | redirectPath |
      | doesn't have | N/A     | /login       |
      | has          | /signin | /signin      |