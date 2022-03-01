@owner:derek
@author:derek
Feature: Country Field

  Dropdown field to be used in our portal registration component. Motivating examples include, a dropdown of countries
  for users to select between during registration.

  Background: A user is on the portal registration page
    Given a user is viewing the "/register"

  @motivating
  Scenario: The country field displays a list of all countries

  @motivating
  Scenario: The country field is required by default
    Given a country component inside of a "sqm-portal-register"
    When the user tries to register
    But they havent selected a country
    Then they are not registered
    And they see the country field is bordered in red
    And below they see the validation error "Select a country"

  @minutae
  Scenario: The country field can be optional
    Given a country component inside of a "sqm-portal-register"
    And the component has prop "country-required" with value "false"
    When the user tries to register
    And they havent selected a country
    Then they see no validation error
    And registration is not blocked

  @motivating
  Scenario Outline: The country field label is configurable
    Given a country component inside of a "sqm-portal-register"
    And the component has prop "dropdown-label" with <propValue>
    When the user views the country component
    Then the label is <label>
    Examples:
      | propValue       | label           |
      |                 | Country         |
      | My Custom Label | My Custom Label |

  @minutae
  Scenario Outline: Validation error message is configurable
    Given a country component inside of a "sqm-portal-register"
    And the country is required
    And the component has prop "error-message" with <propValue>
    When the user tries to register
    But they havent selected a country
    Then they see <errorMessage> below
    Examples:
      | propValue         | errorMessage          |
      |                   | Must select a country |
      | My Custom Message | My Custom Message     |

  @motivating
  Scenario: The form field name attribute defaults to "country"
    Given a country component inside of a "sqm-portal-register"
    When the user selects a drop down option
    And they register
    Then the selected country is submitted under the "country" field

  @motivating
  Scenario: The form field name attribute is customizable
    Given a country component inside of a "sqm-portal-register"
    And the component has prop "dropdown-name" with value "myDropDown"
    When the user selects a country
    And they register
    Then the selected country is submitted under the "myDropDown" field