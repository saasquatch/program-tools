@owner:noah
@author:noah

Feature: Leaderboard Rank

    The leaderboard rank components displays the current users rank on the leaderboard.

    @review
    @minutiae
    Scenario: Users without a rank are shown a generic message
        Given a user has no rank
        Then the component will display a generic message
        And the message will be the string from the prop "unrankedText"

    @review
    @motivating
    Scenario: Users with a rank will be shown a message containing their rank
        Given a user has a valid rank
        And the prop rankText is an ICU message
        Then the ICU message will be parsed to include the user's rank
        And the parsed message will be displayed to the users

    @review
    @motivating
    Scenario: Rank calculation is controlled by the "rankType" prop
        Given the current user is User C
        And User C has <points>
        And User A has <points>
        And User B has <points>
        And the value of the "rankType" prop is <rankType>
        Then the rank of the current user will be <rank>
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