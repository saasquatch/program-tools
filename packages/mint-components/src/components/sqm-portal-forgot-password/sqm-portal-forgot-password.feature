@author:
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
    Then the user will not receive a password reset email
    And an error banner is shown stating that they should try again

  @motivating
  @landmine
  Scenario: If the input email is not associated to an account a success banner will be shown but an email will not be sent
    Given the user entered an email address that is not associated to an accoun
    When they click "Reset Password"
    Then the button enters a loading state
    But no email will be sent
    And a success banner is shown stating a password reset email was sent if the given email was associated to an account

  @motivating
  Scenario: Users can resend password reset email
    Given a user had previously requested to reset their password
    When they enter their email address
    And that email address is linked to a previously created account
    And they click "Reset Password"
    Then the user will receive a second password reset email
    And a success banner is shown stating that their email was sent
