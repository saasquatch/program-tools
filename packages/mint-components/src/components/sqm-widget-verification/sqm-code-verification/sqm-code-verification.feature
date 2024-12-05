@owner:coleton

Feature: sqm-code-verification component

  @minutia
  Scenario Outline: Codes can be copy-pasted into the code input
    Given <code> is on the user's clipboard
    When they paste into the first input
    Then <result> is auto-filled into all code inputs
    And only one character/digit is in each input

    Examples:
      | code    | result |
      | 123456  | 123456 |
      | 1234567 | 123456 |

  @minutia
  Scenario Outline: Focus shifts to the next code input after typing
    Given a user is focused on input <previous>
    When they type any character
    Then the character is filled in the input
    And the cursor focus changes to input <next>
    When they are focussed on input <next>
    And the input is clear
    And they click "Backspace"
    Then the cursor focusses on the input <previous>

  Example:
      | number | next |
      | 1      | 2    |
      | 2      | 3    |
      | 3      | 4    |
      | 4      | 5    |
      | 5      | 6    |

  @minutia
  Scenario: Clicking a code input highlights its contents
    Given a code input with a character already entered
    When a user clicks on the code input
    Then the character is highlighted

  @minutia
  Scenario: Successful code verification fires an event
    Given a valid code is entered
    And the mutation `verifyUserEmail` is successful
    And an access key is recieved
    Then a "sq:code-verified" event is dispatched
    And it has detail
      """
      { token: <accessKey> }
      """

