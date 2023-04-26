@author:truman
Feature: Instant access referred registration

  @motivating
  Scenario: User's must provide an email to register
    Given a user is trying to register as a referrer
    When they do not provide an email
    And they submit the form
    Then an error appears telling the user to provide their email
    When they provide an email
    And they submit the form
    Then they are logged in to the instant access widget

  @motivating
  Scenario: Users are notified if registration fails
    Given a user is trying to register
    And they have included their email
    When an error occurs with the registration
    Then an alert banner appears letting the user know about the error

  @motivating
  Scenario: Successful registration attributes referrals
    Given a user has entered a valid email
    And a user has a valid "_saasquatch" cookie
    And they have submitted the form
    When the submission is successful
    Then the corresponding referral inside the "_saasquatch" cookie is attributed to the upserted user

  @motivating
  Scenario: Error banner is shown if an error occurs during registration
    Given a user has entered a valid email
    And they submit the form
    When an error occurs during the user upsert
    Then an error banner is displayed
    And the error banner is at the top of the form

  @motivating
  Scenario: Successful registration upserts a user
    Given a user has entered a valid email
    And they submit the form
    And the submission is successful
    Then a new user has been upserted to SaaSquatch

  @ui
  Scenario: Slotted content can be included
    Given a user a viewing the follow component HTML
      """
      <sqm-referred-registration>
      <div slot='top-slot'>
      top slot
      </div>
      <div slot='bottom-slot'>
      bottom slot
      </div>
      </sqm-referred-registration>
      """
    Then the top slot is above the form inputs
    And the bottom slot is below the form inputs

  @ui
  Scenario: First name and last name input fields can be hidden
    Given a user is editing the registration component
    Then they see an option labeled "Include name fields"
    And the default is set to "false"
    When they toggle the option
    Then the first name and last name input field visibility is toggled

  @ui
  Scenario: Input labels can be customized
    Given a user is editing the registration component
    Then they see an option labeled "Include name fields"
    And the default value is "false"
    And the user also sees options for "First name field label" and "Last name field label"
    And the defaults are "First Name" and "Last name"
  @ui
  Scenario Outline: Container border can be toggled
    Given a user is viewing the registration component
    Then the default value for the prop "remove-border" is "true"
    When "remove-border" has <value>
    Then the registration component's border <maybe> removed
    Examples:
      | value            | maybe |
      | true             | is    |
      | false            | isn't |
      | empty (no value) | is    |

  @motivating
  @ui
  Scenario: Component background color can be customized
    Given a user is viewing the registration component
    And the prop "background-color" has <value>
    Then the background has color <backgroundColor>
    Examples:
      | value                 | backgroundColor                     |
      | empty (default value) | var(--sl-color-neutral-0) (#ffffff) |
      | aquamarine            | #7fffd4                             |

  @motivating
  @ui
  Scenario Outline: Container padding can be customized
    Given a user is looking at the component
    Then the default values for "padding-top", "padding-bottom", "padding-left", "padding-right" is "large"
    When prop "padding-top" has <value>
    Then <padding> is applied to content
    And the same applies to "padding-bottom", "padding-left", "padding-right"

    Examples:
      | value      | padding    |
      | none       | no padding |
      | xxx-small  | xxx-small  |
      | xx-small   | xx-small   |
      | x-small    | x-small    |
      | small      | small      |
      | medium     | medium     |
      | large      | large      |
      | x-large    | x-large    |
      | xx-large   | xx-large   |
      | xxx-large  | xxx-large  |
      | xxxx-large | xxxx-large |
      | N/A        | no padding |