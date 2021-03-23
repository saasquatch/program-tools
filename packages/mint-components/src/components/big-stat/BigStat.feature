Feature: Big Stat

  Big stat is a component for displaying a statistic as a large number with a label

  Scenario: Demo hook creates label from path names
    Given isDemo() returns true
    And the component renders with props:
      | type                             |
      | /(somePathName)/:with/:someArgs? |
    Then the label is: "Some Path Name"
    And the value is: "12345"

  Scenario: Demo hook falls back to default label on invalid path
    Given isDemo() returns true
    And the component renders with props:
      | type       |
      | a bad path |
    Then the label is: "Demo Label"
    And the value is: "12345"

  Scenario: Displays error on unrecognized path
    Given isDemo() returns false
    And the component renders with props:
      | type                       |
      | /(doesNotExistNopeNotHere) |
    Then the label is: "BAD TYPE PROP"
    And the value is: "!!!"

  Scenario: Display user's credit
    Given isDemo() returns false
    And the user has earned 34 COFFEE from the program
    And the component renders with props:
      | type                                     |
      | /rewardBalance/CREDIT/COFFEE/prettyValue |
    Then the label is: "BALANCE - CREDIT EARNED"
    And the value is: "34 COFFEE"

  Scenario: Memoizes most recent query
    Given isDemo() returns false
    And the component's type prop is set to a variable named PATH
    And PATH is "/referralsWeek"
    Then the component will show a loading state before showing the result
    When the component reloads given some external reload
    Then the component will not show a loading state
    When PATH is set to "/rewardsWeek"
    Then the component will show a loading state before showing the result
    When PATH is set to "/referralsWeek"
    Then the component will show a loading state before showing the result
    