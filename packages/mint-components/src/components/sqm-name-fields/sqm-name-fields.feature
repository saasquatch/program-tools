@owner:sam
@author:sam

Feature: Name Fields

  Fields to be used to fill the first and last name of a user during registration

  Background:
    Given the current page is "/register"

  @motivating
  Scenario: Both first name and last name are required
    Given email and password fields have valid data
    And first name and last name fields are empty
    When register is clicked
    Then the name fields will be highlighted in red
    And the error messages will say "Cannot be empty"


  @motivating
  Scenario: First and last name are upserted with the SaaSquatch user
    Given all fields have been filled with data
      | firstName | lastName  | email           | password        |
      | Bob       | Testerson | bob@example.com | SecurePassword1 |
    When register is clicked
    Then the email verification page will be loaded
    And the user will be upserted
    And the SaaSquatch user will contain data
      | firstName | lastName  | email           |
      | Bob       | Testerson | bob@example.com |

