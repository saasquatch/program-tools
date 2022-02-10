@owner:sam
@author:sam

Feature: Checkbox Field

  Field to be used to be used as a checkbox during registration

  Background:
    Given the current page is "/register"

  @motivating
  Scenario: Checkbox is required by default
    Given the email field has valid input
    And the password field has valid input
    And the checkbox is not checked
    When register is clicked
    Then the name fields will be highlighted in red with an error message
    And the checkbox will be highlighted in red
    And the error message will say "Must be checked"

  @motivating
  Scenario: Multiple checkboxes need different "checkbox-name" values
    Given the register form has the following html
      """
      <sqm-portal-register>
      <sqm-name-fields></sqm-name-fields>
      <sqm-checkbox-field
      slot="formData"
      checkbox-label="I am not a robot"
      error-message="Cannot be a robot"
      checkbox-name="isHuman"
      ></sqm-checkbox-field>
      <div slot="terms">
      <sqm-checkbox-field></sqm-checkbox-field>
      </div>
      </sqm-portal-register>
      """
    And the checkboxes are not checked
    When register is clicked
    Then both checkboxes will be highlighted in red
    And the checkboxes will have different error messages


