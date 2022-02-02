@owner:noah
@author:noah
Feature: Leaderboard

	The leaderboard displays the top referrers along with their scores

	@motivating
	Scenario Outline: The leaderboard can be for referrals started or converted
		Given a leaderboard is configured with "leaderboard-type" <value>
		And a user with started referrals
		And a user with converted referrals
		When they view the leaderboard
		Then then only <referralType> referrals are counted in the leaderboard
		Examples:
			| value                 | referralType |
			| topStartedReferrers   | started      |
			| topConvertedReferrers | converted    |
			|                       | started      |

	@motivating
	Scenario: If there are any users with referrals the leaderboard is shown
		Given there is aleast one user
		Then the leaderboard displays up to 10 top referrers
		And leaderboard is ordered by the referrers score in descending ordered
		And in the case of a tie the rows are ordered alphabetically

	@motivating
	Scenario: The leaderboard can filter referrals within an time interval
		Given a leaderboard is configured with "interval" "2021-11-02T07:00:00.000Z/2021-11-07T07:00:00.000Z"
		And a user with referrals
		When they view the leaderboard
		Then only referrals from within "2021-11-02T07:00:00.000Z/2021-11-07T07:00:00.000Z" are counted in the leaderboard

	@motivating
	Scenario Outline: Rank Type can be configured
		Given a leaderboard is configured with "rank-type" <value>
		And a user
		When they view the leaderboard
		Then their leaderboard rank is their <rank>
		Examples:
			| value     | rank       |
			| rowNumber | row number |
			| denseRank | dense rank |
			| rank      | rank       |
			|           | row number |

	@minutiae
	Scenario: An empty state is displayed if no users
		Given a user
		But no users have made any referrals
		When they view the leaderboard
		Then an empty state is dislayed
		And they see an image of a leaderboard
		And below they see "View your rank in the leaderboard"
		And below they see "Be the first to refer a friend and reach the top of the leaderboard"
		And the text is center aligned

	@minutiae
	Scenario: Leaderboard headings can be customized
		Given a leaderboard
		And it has the following props
			| prop         | value          |
			| rankheading  | Place          |
			| usersheading | Customer       |
			| statsheading | Referral Count |
			| show-rank    | true           |
		And a user
		When they view the leaderboard
		Then they see the following columns with headings
			| column | heading        |
			| rank   | Place          |
			| user   | Customer       |
			| stat   | Referral Count |

	@motivating
	Scenario Outline: Rank can be hidden or shown
		Given a leaderboard
		And it has prop "show-rank" with <propValue>
		And a user
		When they view the leaderboard
		Then they <maySee> the rank column
		Examples:
			| propValue | maySee    |
			| true      | see       |
			| false     | don't see |
			|           | don't see |

	@motivating
	Scenario: Users in the top 10 referrers see their leaderboard row highlighted
		Given a user
		And they are in the top 10 referrers
		When they view the leaderboard
		Then they see the row with their name highlighted with brand colour

	@motivating
	Scenario Outline: Users not in the top 10 referrers can see their progress at the bottom of the leaderboard
		Given a user
		And they <mayHmayHaveReferralave>
		And they are not in the top 10 referrers
		And the leaderboard has prop "show-user" with <value>
		When they view the leaderboard
		Then they <maySee> "..." under the top 10 referrers
		And under "..." they <maySee> a row highlighted with brand colour
		And they <maySee> their name
		And they <maySee> their referral count
		And they <maySeeRank>
		Examples:
			| mayHaveReferral      | value | maySee    | maySeeRank           |
			| have referrals       | true  | see       | see their rank       |
			| don't have referrals | true  | see       | don't see their rank |
			|                      | false | don't see | don't see their rank |
			| have referrals       |       | see       | see their rank       |

	@minutiae
	Scenario: Users without names are displayed as an "Anonymous User"
		Given a user
		And they do not have a first name
		And they do not have a last initial
		When they view the leaderboard
		Then they see the user disyapled as "Anonymous User"