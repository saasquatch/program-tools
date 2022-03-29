@owner:sam
@author:sam
Feature: Checkbox Field

  Field to be used to be used as a checkbox during registration. A motivating use case is to use this component as a terms
  and conditions field, to sastisfy legal requirements that a customer might have for their end users.

  Background: A user is on the portal registration page
    Given a user is viewing the "/register"
    And "/register" contains the registration form
    And the registration form has the following fields
      | fields     |
      | first name |
      | last name  |
      | email      |
      | password   |
      | checkbox   |

  @motivating
  Scenario: Checkbox is required by default
    Given the user is filling out the registration form
    And the name fields have valid input
    And the email field has valid input
    And the password field has valid input
    And the checkbox is not checked
    When they try to register
    Then the checkbox is highlighted in red
    And the error message says "Must be checked"

  @landmine
  Scenario: Checkboxes with the same "checkbox-name" are not submitted in the form data
    Given the register form has the following html
      """
      <sqm-portal-register>
      <sqm-name-fields slot="formData"></sqm-name-fields>
      <sqm-checkbox-field
      slot="formData"
      checkbox-label="I am not a robot"
      error-message="Cannot be a robot"
      checkbox-name="isHuman"
      ></sqm-checkbox-field>
      <div slot="terms">
      <sqm-checkbox-field checkbox-name="isHuman"></sqm-checkbox-field>
      </div>
      </sqm-portal-register>
      """
    And the checkboxes are checked
    When the user tries to register
    Then the form is submitted
    But no field with key "isHuman" is included in the form data

  @motivating
  Scenario: Multiple checkboxes need different "checkbox-name" values
    Given the register form has the following html
      """
      <sqm-portal-register>
      <sqm-name-fields slot="formData"></sqm-name-fields>
      <sqm-checkbox-field
      slot="formData"
      checkbox-label="I am not a robot"
      error-message="Cannot be a robot"
      checkbox-name="isHuman"
      ></sqm-checkbox-field>
      <div slot="terms">
      <sqm-checkbox-field checkbox-name="myCheckbox"></sqm-checkbox-field>
      </div>
      </sqm-portal-register>
      """
    And the checkboxes are not checked
    When the user tries to register
    Then both checkboxes are bordered in red
    And the checkboxes have different error messages
    When the user checks the boxes
    And tries to register
    Then the form is submitted
    And the following fields are included in the form data
      | feilds     |
      | isHuman    |
      | myCheckbox |

  @motivating
  Scenario: Checkboxes can be optional
    Given the register form has the following html
      """
      <sqm-portal-register>
      <sqm-name-fields slot="formData"></sqm-name-fields>
      <sqm-checkbox-field
      slot="formData"
      checkbox-label="I am not a robot"
      checkbox-optional="true"
      checkbox-name="isHuman"
      />
      </sqm-portal-register>
      """
    And the checkbox is not checked
    When the user tries to register
    Then there is no error for the checkbox

  @minutae
  Scenario Outline: Validation error message is configurable
    The error message string is evaluated as an ICU string, but currently is provided no context
    Given the checkbox is required
    And the checkbox has prop "error-message" with <propValue>
    When the user tries to register
    But they havent checked the checkbox
    Then they see <errorMessage> below
    Examples:
      | propValue         | errorMessage      |
      |                   | Must be checked   |
      | My Custom Message | My Custom Message |

  @motivating
  Scenario Outline: Checkbox text and link are configurable
    Given the checkbox has the following prop values
      | prop                     | value           |
      | checkbox-label           | <labelText>     |
      | checkbox-label-link      | <labelLink>     |
      | checkbox-label-link-text | <labelLinkText> |
    When the user views the checkbox
    Then they see <text>
    And when they click <labelLinkText> they are redirected to <labelLink>
    #First example below is the defaults set by the controller
    Examples:
      | labelText                                            | labelLinkText        | labelLink                 | text                                                 |
      | By signing up you agree to the {labelLink}           | Terms and Conditions | https://example.com       | By signing up you agree to the Terms and Conditions  |
      | Read our {labelLink} before registration             | Terms of Service     | https://example.com/terms | Read our Terms of Service before registration        |
      | By registering you agree to our terms and conditions | N/A                  | N/A                       | By registering you agree to our terms and conditions |

  @motivating
  Scenario: The form field name attribute is configurable
    Given the checkbox has prop "checkbox-name" with value "myCheckBox"
    When the user checks the box
    And they register
    Then the value of the checkbox is submitted under "myCheckBox" field

  @minutae
  Scenario Outline: The checkbox field component fails fast if a checkbox name isn't provided
    Given the checkbox <mayHave> prop "checkbox-name"
    And it <mayHavePropValue>
    When a user views the checkbox
    Then an alert with an error message is displayed in place of the checkbox
    And it has a details section
    When "More details" is clicked
    Then the following information will be displayed
      | component being used |
      | missing attribute(s) |
    Examples:
      | mayBeAnAttribute | mayHavePropValue |
      | doesn't have     | N/A              |
      | has              | ""               |
      | has              |                  |