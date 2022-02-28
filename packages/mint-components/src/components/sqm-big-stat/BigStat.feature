@author:sam
@owner:sam
Feature: Big Stat

  Big stat is a component for displaying a statistic as a large number with a label

  @minutae
  Scenario: Demo hook retrieves label using stat pattern
    Given isDemo() returns true
    And the component renders with props:
      | type            |
      | /referralsCount |
    Then the label is: "REFERRALS - COUNT"
    And the value is: "12345"

  @minutae
  Scenario: Demo hook falls back to default label on invalid path
    Given isDemo() returns true
    And the component renders with props:
      | type       |
      | a bad path |
    Then the label is: "Demo Label"
    And the value is: "12345"

  @motivating
  Scenario: Displays error on unrecognized path
    Given isDemo() returns false
    And the component renders with props:
      | type                       |
      | /(doesNotExistNopeNotHere) |
    Then the label is: "BAD PROP TYPE"
    And the value is: "!!!"

  @motivating
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
      | customField      | Custom Fields           | Custom Fields     |
      | programGoals     | Program Goals           | Program Goals     |

  @motivating
  Scenario: Display user's credit
    Given isDemo() returns false
    And the user has earned 34 COFFEE from the program
    And the component renders with props:
      | type                                     |
      | /rewardBalance/CREDIT/COFFEE/prettyValue |
    Then the label is: "Balance - Credit Earned"
    And the value is: "34 COFFEE"

  @minutae
  Scenario: Memoizes most recent query
    Given isDemo() returns false
    And the component's type prop is set to a variable named PATH
    And PATH is "/referralsWeek"
    Then the component shows a loading state before showing the result
    When the component reloads given some external reload
    Then the component doesn't show a loading state
    When PATH is set to "/rewardsWeek"
    Then the component shows a loading state before showing the result
    When PATH is set to "/referralsWeek"
    Then the component shows a loading state before showing the result

  @motivating
  Scenario: Stat has a loading state
    Given isDemo() returns false
    And the component's stat type prop is valid
    When the component renders
    Then The stat value displays "..."
    And when the stat query is completed
    And the stat value displays a value

  @motivating
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

  @motivating
  Scenario Outline: rewardCountFiltered supports many formats
    Given the statType begins with "/rewardCountFiltered"
    When the component renders with <statType>
    Then the stat <mayRender> a value
    Examples:
      | statType                                               | mayRender      |
      | /rewardsCountFiltered                                  | renders        |
      | /rewardsCountFiltered/COFFEE                           | doesn't render |
      | /rewardsCountFiltered/global                           | renders        |
      | /rewardsCountFiltered/INTEGRATION                      | renders        |
      | /rewardsCountFiltered/INTEGRATION/global               | renders        |
      | /rewardsCountFiltered/PCT_DISCOUNT                     | renders        |
      | /rewardsCountFiltered/PCT_DISCOUNT/global              | renders        |
      | /rewardsCountFiltered/CREDIT                           | renders        |
      | /rewardsCountFiltered/CREDIT/COFFEE                    | renders        |
      | /rewardsCountFiltered/CREDIT/global                    | renders        |
      | /rewardsCountFiltered/CREDIT/COFFEE/PENDING            | renders        |
      | /rewardsCountFiltered/CREDIT/COFFEE/AVAILABLE          | renders        |
      | /rewardsCountFiltered/CREDIT/CASH%2FUSD                | renders        |
      | /rewardsCountFiltered/CREDIT/CASH%2FUSD/global         | renders        |
      | /rewardsCountFiltered/CREDIT/CASH%2FUSD/PENDING        | renders        |
      | /rewardsCountFiltered/CREDIT/CASH%2FUSD/PENDING/global | renders        |

  @motivating
  Scenario Outline: Program Goals and Reward units with currencies must be encoded
    Given the statType is <statType>
    When the stat is queried
    Then the stat is filtered by <decodedFilter>
    And a value <mayBe> rendered
    Examples:
      | statType                                | decodedFilter     | may   |
      | /rewardBalance/CREDIT/COFFEE            | COFFEE            | is    |
      | /rewardBalance/CREDIT/CENTS             | CENTS             | is    |
      | /rewardBalance/CREDIT/COFFEE%2FUSD      | COFFEE/USD        | is    |
      | /rewardBalance/CREDIT/COFFEE/USD        | COFFEE            | is    |
      | /rewardBalance/CREDIT/CASH              | CASH              | is    |
      | /rewardBalance/CREDIT/CASH/USD          | CASH              | is    |
      | /rewardBalance/CREDIT/CASH%2FUSD        | CASH/USD          | is    |
      | /programGoals/count/My-Goal             | My-Goal           | is    |
      | /programGoals/count/My-Goal/referrals   |                   | isn't |
      | /programGoals/count/My-Goal%2Freferrals | My-Goal/referrals | is    |

  @motivating
  Scenario Outline: User custom fields can be queried
    Given the StatType is <statType>
    When the stat is queried
    Then the value matches that of the users <customField>
    Examples:
      | statType                         | customField        |
      | /customFields/videosShared       | videosShared       |
      | /customFields/totalPurchaseCount | totalPurchaseCount |

  @motivating
  Scenario Outline: Some stats can use a global value instead of filtered by program
    Given the stat <statName>
    Then the global value <mayBe> available
    Examples:
      | statName                        | mayBe |
      | referralsCount                  | isn't |
      | referralsMonth                  | isn't |
      | referralsWeek                   | isn't |
      | rewardsCount                    | is    |
      | rewardsCountFiltered            | is    |
      | integrationRewardsCountFiltered | is    |
      | rewardsMonth                    | is    |
      | rewardsWeek                     | is    |
      | rewardsAssigned                 | is    |
      | rewardsRedeemed                 | is    |
      | rewardsAvailable                | is    |
      | rewardBalance                   | is    |

  @motivating
  Scenario Outline: referralsCount stat can be filtered by Converted and Started
    Given statType prop is <statType>
    Then the stat returned has a <filter>
    Examples:
      | statType                  | filter                                                   |
      | /referralsCount           | { programId_eq: programId }                              |
      | /referralsCount/converted | { programId_eq: programId, dateConverted_exists: true }  |
      | /referralsCount/started   | { programId_eq: programId, dateConverted_exists: false } |

  @motivating
  Scenario: Program context is used by default to source the programId used for queries
    Given a valid "statType"
    And its not a global stat
    And the stat is loaded in an environment for "program-a"
    And the "program-id" prop is not used
    When the stat is queried
    Then the query is filtered by "{ programId_eq: 'program-a' }"
    And only results from "program-a" are returned

  @motivating
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