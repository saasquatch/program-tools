@owner:derek
@author:derek
Feature: Dropdown field

  Dropdown field to be used in our portal registration component. Motivating examples include, a dropdown of countries
  for users to select between during registration.

  Background: A user is on the portal registration page
    Given a user is viewing the "/register"

  @motivating
  Scenario: The dropdown field is required by default
    Given a dropdown component inside of a "sqm-portal-register"
    When the user tries to register
    But they havent selected a dropdown option
    Then they are not registered
    And they see the dropdown bordered in red
    And below they see the validation error "Must select an option"

  @minutae
  Scenario: The dropdown field can be optional
    Given a dropdown component inside of a "sqm-portal-register"
    And the dropdown has prop "dropdown-required" with value "false"
    When the user tries to register
    And they havent selected a dropdown option
    Then they see no validation error
    And registration is not blocked

  @motivating
  Scenario Outline: Dropdown label is configurable
    Given a dropdown component inside of a "sqm-portal-register"
    And the dropdown has prop "dropdown-label" with <propValue>
    When the user views the dropdown component
    Then the label is <label>
    Examples:
      | propValue       | label            |
      |                 | Select an option |
      | My Custom Label | My Custom Label  |

  @minutae
  Scenario Outline: Validation error message is configurable
    Given a dropdown component inside of a "sqm-portal-register"
    And the dropdown is required
    And the dropdown has prop "error-message" with <propValue>
    When the user tries to register
    But they havent selected a dropdown option
    Then they see <errorMessage> below
    Examples:
      | propValue         | errorMessage          |
      |                   | Must select an option |
      | My Custom Message | My Custom Message     |

  @motivating
  Scenario: Dropdown options are passed as child sl-menu-item components
    Given the register form has the following html
      """
      <sqm-portal-register>
      <sqm-dropdown-field
      slot="formData"
      dropdown-label="Select an option"
      dropdown-name="options"
      >
      <sl-menu-item value="option-1">Option 1</sl-menu-item>
      <sl-menu-item value="option-2">Option 2</sl-menu-item>
      <sl-menu-item value="option-3">Option 3</sl-menu-item>
      </sqm-dropdown-field>
      </sqm-portal-register>
      """
    When the user views the dropdown component
    And they click on the input
    Then the dropdown expands downwards
    And they see the three following options
      | options  |
      | Option 1 |
      | Option 2 |
      | Option 3 |
    When they select "Option 2"
    And they register
    Then the value "option-2" is submitted as the value for the "options" form field

  @motivating
  Scenario: The form field name attribute is configurable
    Given a dropdown component inside of a "sqm-portal-register"
    And the dropdown has prop "dropdown-name" with value "myDropDown"
    When the user selects a drop down option
    And they register
    Then the value of their selected option is submitted under "myDropDown" field