@author:derek
@owner:ian
Feature: Portal Login

  @motivating
  Scenario: Users can enter valid login information to gain access to the portal
    Given a user entered a valid email and password combination
    When they click "Login"
    Then the login button enters a loading state
    When they are logged in
    Then they are redirected

  @motivating
  Scenario: An error banner is displayed if the user enters invalid credentials
    Given a user entered a invalid email and password combination
    When they click "Login"
    Then the login button enters a loading state
    When they are not logged in
    And they are not redirected
    And an error banner is shown stating that they should try again

  @motivating
  Scenario: User's must provide an email and password to login
    Given a user only inputs a value into one of the following fields
      | email    |
      | password |
    When they click "Login"
    Then the login button enters a loading state
    When they are not logged in
    And the missing field is highlighted with a validation error

  @motivating
  Scenario: Users are redirected to the verification page if they login with an unverified email address
    Given a user has registered
    But they have not verified their email
    When they log in
    Then they are instructed to verify their email address

  @motivating
  Scenario: After logging in users are redirected to "/" by default
    Given a user entered a valid email and password combination
    And the component does not have prop "nextPage"
    And the users url does not contain a "nextPage" query parameter
    When they click "Login"
    Then they are logged in
    And they are redirected to "/"

  @motivating
  Scenario: Custom redirection can be configured
    Given a user entered a valid email and password combination
    And the component has prop "nextPage" with value "/activity"
    And the users url does not contain a "nextPage" query parameter
    When the user clicks "Login"
    Then they are logged in
    And they are redirected to "/activity"

  @motivating
  Scenario Outline: Users are redirected to the value of the nextPage url parameter if it exists
    Given a user entered a valid email and password combination
    And the component <mayHave> prop "nextPage" with <nextPageValue>
    But the users url contains a "nextPage" query paramater with <nextPageParamValue>
    When the user clicks "Login"
    Then they are logged in
    And they are redirected to <nextPageParamValue>
    Examples:
      | mayHave       | nextPageValue | nextPageParamValue |
      | has           | /dashboard    | /activity          |
      | does not have | N/A           | /activity          |

  @minutae
  Scenario Outline: Navigation to the registration page can be customized but defaults to "/register"
    Given a user viewing the login component
    And the component <mayHave> "register-path" with <value>
    Then they see a "Register" text button
    When they click "Register"
    Then they are redirected to <redirectPath>
    Examples:
      | mayHave      | value   | redirectPath |
      | doesn't have | N/A     | /register    |
      | has          | /signup | /signup      |

  @minutae
  Scenario Outline: Navigation to the forgot password page can be customized but defaults to "/forgotPassword"
    Given a user viewing the login component
    And the component <mayHave> "forgot-password-path" with <value>
    Then they see a "Forgot Password?" text button
    When they click "Forgot Password?"
    Then they are redirected to <redirectPath>
    Examples:
      | mayHave      | value                    | redirectPath             |
      | doesn't have | N/A                      | /forgotPassword          |
      | has          | /whatTheHeckIsMyPassword | /whatTheHeckIsMyPassword |