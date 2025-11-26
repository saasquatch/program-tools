@owner:coleton
@author:coleton

Feature: Switch Templates based on Authentication status

  `sqb-auth-template-switch` provides "logged-in" and "logged-out" templates that are conditionally rendered depending on the the validity of the user identity.

  @motivating
  Scenario: Content in the "logged-in" template are shown when a valid user identity is set.
    Given there is a valid user identity set
    And the "logged-in" template has content
    When the sqb-auth-template-switch is rendered
    Then the content in the "logged-in" template is rendered in the DOM

  @motivating
  Scenario: Content in the "logged-out" template are shown when the user identity is empty.
    Given there is no valid user identity set
    And the "logged-out" template has content
    When the sqb-auth-template-switch is rendered
    Then the content in the "logged-out" template is rendered in the DOM

  @motivating
  Scenario Outline: Content not matching status is not rendered in the DOM
    Given there <isOrNot> a valid user identity set
    And the "logged-in" template has content
    And the "logged-out" template has content
    When the sqb-auth-template-switch is rendered
    Then the content in the "logged-in" template <loggedInmayBe> rendered in the DOM
    And the content in the "logged-out" template <loggedOutmayBe> rendered in the DOM

    Examples:
      | isOrNot | loggedInmayBe | loggedOutmayBe |
      | is      | is            | is not         |
      | is not  | is not        | is             |

  @motivating
  Scenario Outline: Templates are switched when the user identity is changed
    Given there <isOrNot> a valid user identity set
    And the "logged-in" template has content
    And the "logged-out" template has content
    Then the content in the "logged-in" template <loggedInmayBeBefore> rendered in the DOM
    And the content in the "logged-out" template <loggedOutmayBeBefore> rendered in the DOM
    When the user identity is changed to <changedUser>
    Then the content in the "logged-in" template <loggedInmayBeAfter> rendered in the DOM
    And the content in the "logged-out" template <loggedOutmayBeAfter> rendered in the DOM

    Examples:
      | isOrNot | loggedInmayBeBefore | loggedOutmayBeBefore | changedUser   | loggedInmayBeAfter | loggedOutmayBeAfter |
      | is      | is                  | is not               | empty         | is not             | is                  |
      | is not  | is not              | is                   | a valid value | is                 | is not              |


  @minutia
  Scenario Outline: Templates aren't switched if the corresponding template is missing
    Given there <isOrIsNot> a valid user identity set
    And the "logged-in" template <loggedInTemplateExists>
    And the "logged-out" template <loggedOutTemplateExists>
    When the user identity changes to <newUserIdentity>
    Then the template <doesOrDoesNot> switch templates

    Examples:
      | isOrIsNot | loggedInTemplateExists | loggedOutTemplateExists | newUserIdentity       | doesOrDoesNot |
      | is        | exists                 | does not exist          | undefined             | does not      |
      | is not    | does not exist         | exists                  | a valid user identity | does not      |

  @minutia
  Scenario Outline: Missing templates are not shown
    Given there <isOrIsNot> a valid user identity
    But the <templateType> template is missing
    When the sqb-auth-template-switch is rendered
    Then nothing is shown in the DOM

    Examples:
      | isOrIsNot | templateType |
      | is        | "logged-in"  |
      | is not    | "logged-out" |


  @motivating
  Scenario: sqb-auth-template-switch editor states
    Given html is loaded into a raisins editor
    And the html includes "<sqb-auth-template-switch></sqb-auth-template-switch>"
    When "sqb-auth-template-switch" is selected in the editor
    Then the following states are displayed
      | state      |
      | Logged in  |
      | Logged out |
    When "Logged in" is selected
    Then "sqb-auth-template-switch" displays whatever is slotted in the template slot "logged-in"
    When "Logged out" is selected
    Then "sqb-auth-template-switch" displays whatever is slotted in the template slot "logged-out"
