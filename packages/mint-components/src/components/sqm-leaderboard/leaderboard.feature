@owner:noah @author:noah
Feature: Leaderboard
	The leaderboard supports three main cases
	- Top Started Referrers
	- Top Converted Referrers
	- Top Point Earners
	To display these different types of leaderboards it uses the backends pre-canned options.
	The backend supports filtering on programId and interval, programId is sourced from program context.

  Background: A user exists
    Given a user
    And they are viewing the leaderboard

  @motivating
  Scenario Outline: Two types of referrals leaderboards can be displayed
    Given a leaderboard has prop "leaderboard-type" with <value>
    And there are started referrals on the tenant
    And there are started converted on the tenant
    When the user views the leaderboard
    Then they see the referral <referralType> leaderboard

    Examples:
      | value                 | referralType |
      | topStartedReferrers   | started      |
      | topConvertedReferrers | converted    |

  @motivating
  Scenario: The top point earners leaderboard can be displayed
    Given a leaderboard has prop "leaderboard-type" with value "topPointEarners"
    And there are users with points
    When the user views the leaderboard
    Then they see the top point earners leaderboard
    And text values are displayed for point counts

  @minutia
  Scenario Outline: Reward pretty value is used on the top point earners leaderboard
    Given top point earners leaderboard
    And the "POINT" reward unit has a pretty value for the following locales
      | locale |
      | en     |
      | fr     |
      | tr     |
    When the user views the leaderboard
    And they have <locale>
    Then they see the translated pretty value in the stat value column

  @motivating
  Scenario Outline: Program Context is used by default to filter leaderboard results
    Given a <leaderboardType> leaderboard loaded with program context for "my-program"
    When the user views the leaderboard
    Then they only see <results> from "my-program"

    Examples:
      | leaderboardType       | results             |
      | topStartedReferrers   | started referrals   |
      | topConvertedReferrers | converted referrals |
      | topPointEarners       | points earned       |

  @motivating
  Scenario Outline: Program Id context can be overwritten with a prop
    Given a <leaderboardType> leaderboard has prop "program-Id" with value "my-test-program"
    When the user views the leaderboard
    Then they only see <results> from "my-test-program"

    Examples:
      | leaderboardType       | results             |
      | topStartedReferrers   | started referrals   |
      | topConvertedReferrers | converted referrals |
      | topPointEarners       | points earned       |

  @motivating
  Scenario Outline: Global leaderboards can be displayed by clearing program context
		#This is important for clients with use cases like StaffTracks global points leaderboard
		#This can also be done with a program section in a similar manner
    Given a <leaderboardType> leaderboard has prop "program-Id" with value ""
    When the user views the leaderboard
    Then they see global <results>

    Examples:
      | leaderboardType       | results             |
      | topStartedReferrers   | started referrals   |
      | topConvertedReferrers | converted referrals |
      | topPointEarners       | points earned       |

  @motivating
  Scenario: Leaderboard results are shown in descending order
    Given there are leaderboard results
    When the user views the leaderboard
    Then they see up to the 10 top leaderboard results
    And leaderboard is in descending order

  @motivating
  Scenario Outline: Leaderboard results can be filtered with a time interval
    Given a <leaderboardType> leaderboard
    And it has prop "interval" with value "2021-11-02T07:00:00.000Z/2021-11-07T07:00:00.000Z"
    When the user views the leaderboard
    Then they only see <results> from within "2021-11-02T07:00:00.000Z/2021-11-07T07:00:00.000Z"

    Examples:
      | leaderboardType       | results             |
      | topStartedReferrers   | started referrals   |
      | topConvertedReferrers | converted referrals |
      | topPointEarners       | points earned       |

  @motivating
  Scenario Outline: Leaderboard rank type can be configured
    Given a leaderboard has prop "rank-type" with <value>
    When the user views the leaderboard
    Then their leaderboard rank is their <rank>

    Examples:
      | value     | rank       |
      | rowNumber | row number |
      | denseRank | dense rank |
      | rank      | rank       |

  @minutia
  Scenario Outline: The max number of leaderboard rows displayed can be configured but defaults to 10
    Given a leaderboard has prop "max-rows" with <value>
    And the leaderboard has <resultCount>
    When the user views the leaderboard
    Then they see <number> rows

    Examples:
      | value | resultCount | number |
      |       |          10 |     10 |
      |     5 |          10 |      5 |
      |     3 |           1 |      1 |
      |    25 |          15 |     15 |

  @minutiae @ui
  Scenario: Leaderboards with no results show an empty state
    Given a leaderboard has no results
    When the user views the leaderboard
    Then an empty state is dislayed
    And they see an image of a leaderboard
    And below they see "View your rank in the leaderboard"
    And below they see "Be the first to refer a friend and reach the top of the leaderboard"
    And the text is center aligned

  @minutiae @ui
  Scenario: A custom empty state can be provided
    Given a leaderboard has no results
    When the user views the leaderboard
    Then the contents of the "empty" slot are displayed

  @minutiae @ui
  Scenario: User is on Essentials plan
    Given the user has an Essentials plan
    When they view the leaderboard
    Then a message telling them to upgrade their plan appears:
      """
      Contact Support to upgrade your plan and start leveraging
                gamification in your program.
      """
    And an empty table image is displayed

  @minutiae @ui
  Scenario: Leaderboard headings can be customized
    Given a leaderboard
    And it has the following props
      | prop         | value          |
      | rankheading  | Place          |
      | usersheading | Customer       |
      | statsheading | Referral Count |
      | show-rank    | true           |
    When the user views the leaderboard
    Then they see the following columns with headings
      | column | heading        |
      | rank   | Place          |
      | user   | Customer       |
      | stat   | Referral Count |

  @motivating @ui
  Scenario Outline: Leaderboard rank can be hidden or shown
    Given a leaderboard
    And it has prop "show-rank" with <propValue>
    When the user views the leaderboard
    Then they <maySee> the rank column

    Examples:
      | propValue | maySee    |
      | true      | see       |
      | false     | don't see |
      |           | don't see |

    Scenario Outline: Users names can be hidden or shown
    Given a leaderboard
    And it has prop "hide-names" with <propValue>
    When the user views the leaderboard
    Then they <maySee> the referrer column

    Examples:
      | propValue | maySee    |
      | true      | don't see |
      | false     | see       |
      |           | see       |

  @motivating @ui
  Scenario: Users in the top 10 of the leaderboard results see their leaderboard row highlighted
    Given a user in the top 10 of the leaderboard results
    When they view the leaderboard
    Then they see the row with their name highlighted with brand colour

  @motivating @ui
  Scenario Outline: Users not in the top 10 leaderboard results can see their progress at the bottom of the leaderboard
    Given a user <mayHave> completed actions counted by the leaderboard
    And they are not in the top 10 leaderboard results
    And the leaderboard has prop "show-user" with <value>
    When they view the leaderboard
    Then they <maySee> "..." under the top 10 leaderboard results
    And under "..." they <maySee> a row highlighted with brand colour
    And they <maySee> their name
    And they <maySee> their leaderboard value
    And they <maySeeRank>

    Examples:
      | mayHave | value | maySee    | maySeeRank           |
      | has     | true  | see       | see their rank       |
      | hasn't  | true  | see       | don't see their rank |
      | N/A     | false | don't see | don't see their rank |
      | hasn't  |       | see       | don't see their rank |

  @minutiae
  Scenario: Users without names are displayed as an "Anonymous User"
    Given a user
    And they do not have a first name
    And they do not have a last initial
    When they view the leaderboard
    Then they see the user displayed as "Anonymous User"

  @minutiae
  Scenario Outline: If a user only has a first or last name, then only that is displayed
    Given a user
    And they only have a <name>
    When they view the leaderboard
    Then they only see their <name>

    Examples:
      | name      |
      | firstName |
      | lastName  |
