@owner:noah
@author:noah
Feature: Leaderboard Rank

    The leaderboard rank components displays the current users rank on the leaderboard.

    @minutiae
    Scenario: Users without a rank are shown a generic message
        Given a user has no rank
        Then the component displays a generic message
        And the message is the string from the prop "unrankedText"

    @motivating
    Scenario: Users with a rank are shown a message containing their rank
        Given a user has a valid rank
        And the prop "rankText" is an ICU message
        Then the ICU message is parsed to include the user's rank
        And the parsed message is displayed to the users

    @motivating
    Scenario Outline: Ranks from any of the three standard leaderboards can be displayed
        Given a leaderboard rank component with <leaderboardType>
        And a user has a valid rank
        When they view the leaderboard rank component
        Then they see their rank for <leaderboardType>
        Examples:
            | leaderboardType       |
            | topStartedReferrers   |
            | topConvertedReferrers |
            | topPointEarners       |

    @motivating
    Scenario Outline: Program Context is used by default to filter leaderboard rank
        Given a <leaderboardType> leaderboard rank component loaded with program context for "my-program"
        When they view the leaderboard rank component
        Then they see their rank for <leaderboardType> from "my-program"
        Examples:
            | leaderboardType       |
            | topStartedReferrers   |
            | topConvertedReferrers |
            | topPointEarners       |

    @motivating
    Scenario Outline: Program Id context can be overwritten with a prop
        Given a <leaderboardType> leaderboard rank component has prop "program-Id" with value "my-test-program"
        When they view the leaderboard rank component
        Then they see their rank for <leaderboardType> from "my-test-program"
        Examples:
            | leaderboardType       | results             |
            | topStartedReferrers   | started referrals   |
            | topConvertedReferrers | converted referrals |
            | topPointEarners       | points earned       |

    @motivating
    Scenario Outline: Global leaderboards ranks can be displayed by clearing program context
        #This can also be done with a program section in a similar manner
        Given a <leaderboardType> leaderboard rank component has prop "program-Id" with value ""
        When they view the leaderboard rank component
        Then they see global <results> rank
        Examples:
            | leaderboardType       | results             |
            | topStartedReferrers   | started referrals   |
            | topConvertedReferrers | converted referrals |
            | topPointEarners       | points earned       |

    @motivating
    Scenario: Rank calculation is controlled by the "rankType" prop
        Given the current user is User C
        And User C has <points>
        And User A has <points>
        And User B has <points>
        And the value of the "rankType" prop is <rankType>
        Then the rank of the current user is <rank>
        Examples:
            | user   | points | rankType  | rank |
            | User A | 5      | rowNumber | 3    |
            | User B | 10     | rowNumber | 1    |
            | User C | 10     | rowNumber | 2    |

            | user   | points | rankType | rank |
            | User A | 10     | rank     | 1    |
            | User B | 10     | rank     | 1    |
            | User C | 5      | rank     | 3    |

            | user   | points | rankType  | rank |
            | User A | 10     | denseRank | 1    |
            | User B | 10     | denseRank | 1    |
            | User C | 5      | denseRank | 2    |