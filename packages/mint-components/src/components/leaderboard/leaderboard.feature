@owner:noah
@author:noah

Feature: Leaderboard Rank

    The leaderboard displays the top referrers along with their scores

    @review
    @motivating
    Scenario: If there are any users the leaderboard is shown
    Given there is aleast one user
    Then the leaderboard will display the top referrers
    And leaderboard will be ordered by the referrers score in descending ordered
    And in the case of a tie the rows will be ordered alphabetically

    @review
    @minutiae
    Scenario: An empty state is displayed if no users
    Given there are no users
    Then the leaderboard will display an empty state