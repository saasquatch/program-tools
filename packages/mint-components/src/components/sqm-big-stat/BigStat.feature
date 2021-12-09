Feature: Big Stat

  Big stat is a component for displaying a statistic as a large number with a label

  Scenario: Demo hook retrieves label using stat pattern
    Given isDemo() returns true
    And the component renders with props:
      | type            |
      | /referralsCount |
    Then the label is: "REFERRALS - COUNT"
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
    Then the label is: "BAD PROP TYPE"
    And the value is: "!!!"

  Scenario Outline: Label displays correctly
    Given the type prop is set to <type>
    When the component renders
    Then the label is <label>
    Given isDemo() returns true
    When the component renders
    Then the label is <inferredLabel>
    Examples:
      | path             | label                   | inferredLabel     |
      | rewardsAssigned  | Rewards Earned          | Rewards Assigned  |
      | rewardsRedeemed  | Rewards Paid            | Rewards Redeemed  |
      | rewardsAvailable | Rewards Available       | Rewards Available |
      | referralsCount   | Referrals - Count       | Referrals Count   |
      | referralsMonth   | Referrals - This Month  | Referrals Month   |
      | referralsWeek    | Referrals - This Week   | Referrals Week    |
      | rewardsCount     | Rewards - Count         | Rewards Count     |
      | rewardsMonth     | Rewards - This Month    | Rewards Month     |
      | rewardsWeek      | Rewards - This Week     | Rewards Week      |
      | rewardBalance    | Balance - Credit Earned | Reward Balance    |
      | programGoals     | Program Goals           | Program Goals     |

  Scenario: Display user's credit
    Given isDemo() returns false
    And the user has earned 34 COFFEE from the program
    And the component renders with props:
      | type                                     |
      | /rewardBalance/CREDIT/COFFEE/prettyValue |
    Then the label is: "Balance - Credit Earned"
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

  Scenario: Stat has a loading state
    Given isDemo() returns false
    And the component's stat type prop is valid
    When the component renders
    Then The stat value will display "..."
    And when the stat query is completed
    And the stat value will display a value

  Scenario Outline: Program Goal stat requires metricType and goalId
    Given the statType prop is <statType>
    When the component renders
    Then the label is <label>
    And the stat value is <InvalidStatValue>
    Examples:
      | statType                              | label         | InvalidStatValue |
      | /programGoals                         | BAD PROP TYPE | true             |
      | /programGoals/count                   | BAD PROP TYPE | true             |
      | /programGoals/conversionCount         | BAD PROP TYPE | true             |
      | /programGoals/My-Goal                 | BAD PROP TYPE | true             |
      | /programGoals/count/My-Goal           | Program Goals | false            |
      | /programGoals/conversionCount/My-Goal | Program Goals | false            |

  Scenario Outline: rewardCountFiltered supports many formats
    Given the statType begins with "/rewardCountFiltered"
    When the component renders with <statType>
    Then the stat <may> render a value
    Examples:
      | statType                                               | may      |
      | /rewardsCountFiltered                                  | will     |
      | /rewardsCountFiltered/COFFEE                           | will not |
      | /rewardsCountFiltered/global                           | will     |
      | /rewardsCountFiltered/INTEGRATION                      | will     |
      | /rewardsCountFiltered/INTEGRATION/global               | will     |
      | /rewardsCountFiltered/PCT_DISCOUNT                     | will     |
      | /rewardsCountFiltered/PCT_DISCOUNT/global              | will     |
      | /rewardsCountFiltered/CREDIT                           | will     |
      | /rewardsCountFiltered/CREDIT/COFFEE                    | will     |
      | /rewardsCountFiltered/CREDIT/global                    | will     |
      | /rewardsCountFiltered/CREDIT/COFFEE/PENDING            | will     |
      | /rewardsCountFiltered/CREDIT/COFFEE/AVAILABLE          | will     |
      | /rewardsCountFiltered/CREDIT/CASH%2FUSD                | will     |
      | /rewardsCountFiltered/CREDIT/CASH%2FUSD/global         | will     |
      | /rewardsCountFiltered/CREDIT/CASH%2FUSD/PENDING        | will     |
      | /rewardsCountFiltered/CREDIT/CASH%2FUSD/PENDING/global | will     |

  Scenario Outline: Program Goals and Reward units with currencies must be encoded
    Given the statType is <statType>
    When the stat is queried
    Then the stat will be filtered by <decodedFilter>
    And a value <may> be rendered
    Examples:
      | statType                                | decodedFilter     | may      |
      | /rewardBalance/CREDIT/COFFEE            | COFFEE            | will     |
      | /rewardBalance/CREDIT/CENTS             | CENTS             | will     |
      | /rewardBalance/CREDIT/COFFEE%2FUSD      | COFFEE/USD        | will     |
      | /rewardBalance/CREDIT/COFFEE/USD        | COFFEE            | will     |
      | /rewardBalance/CREDIT/CASH              | CASH              | will     |
      | /rewardBalance/CREDIT/CASH/USD          | CASH              | will     |
      | /rewardBalance/CREDIT/CASH%2FUSD        | CASH/USD          | will     |
      | /programGoals/count/My-Goal             | My-Goal           | will     |
      | /programGoals/count/My-Goal/referrals   |                   | will not |
      | /programGoals/count/My-Goal%2Freferrals | My-Goal/referrals | will     |

  Scenario Outline: Some stats can use a global value instead of filtered by program
    Given the stat <statName>
    Then the global value <may> be available
    Examples:
      | statName                        | may      |
      | referralsCount                  | will not |
      | referralsMonth                  | will not |
      | referralsWeek                   | will not |
      | rewardsCount                    | will     |
      | rewardsCountFiltered            | will     |
      | integrationRewardsCountFiltered | will     |
      | rewardsMonth                    | will     |
      | rewardsWeek                     | will     |
      | rewardsAssigned                 | will     |
      | rewardsRedeemed                 | will     |
      | rewardsAvailable                | will     |
      | rewardBalance                   | will     |

  Scenario Outline: referralsCount stat can be filtered by Converted and Started
    Given statType prop is <statType>
    Then the stat returned will have a <filter>
    Examples:
      | statType                  | filter                                                   |
      | /referralsCount           | { programId_eq: programId }                              |
      | /referralsCount/converted | { programId_eq: programId, dateConverted_exists: true }  |
      | /referralsCount/started   | { programId_eq: programId, dateConverted_exists: false } |

  Scenario: By default program context is used to source the programId used for queries
    Given a valid "statType"
    And its not a global stat
    And the stat is loaded in an environment for "program-a"
    And the "program-id" prop is not used
    When the stat is queried
    Then the query is filtered by "{ programId_eq: 'program-a' }"
    And only results from "program-a" are returned

  Scenario Outline: ProgramId can be specified to overwrite the program context default
    Given a valid "statType"
    And its not a global stat
    And the "program-id" prop has <value>
    When the stat is queried
    Then the query has a <filter>
    And only results from <value> are returned
    Examples:
      | value     | filter                        |
      | program-b | { programId_eq: "program-b" } |
      | program-c | { programId_eq: "program-c" } |