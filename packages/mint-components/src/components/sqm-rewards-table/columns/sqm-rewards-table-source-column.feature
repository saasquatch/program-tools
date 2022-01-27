@author:derek
@owner:derek
Feature: Reward Table Source Column

    Shows the source of each reward

    @motivating
    Scenario Outline: The title of the source column is configurable
        Given the "column-title" prop is set to <value>
        Then the source column is shown with <columnTitle>
        Examples:
            | value           | columnTitle     |
            | Source          |                 |
            | My column title | My column title |

    @motivating
    Scenario: The source column displays manual if the reward is caused by a manual action
        Given a user with a "MANUAL" reward
        When they view the rewards table
        Then the source of their reward is displayed as "Manual"

    @motivating
    Scenario: The source column displays "Automated" if the reward is caused automatically by a program
        Given a user with a "AUTOMATED" program reward
        When they view the rewards table
        Then the source of their reward is displayed as "Automated"

    @motivating
    Scenario Outline: The source column displays customizable reward exchange text with amount if the reward is caused by reward exchange
        Given the "reward-exchange-text" prop is <propValue>
        And a user with a "MANUAL" reward
        But it was created by a reward exchange
        Then they view the rewards table
        Then the source displays <exchangeText>
        And under it displays the following
            | prettyRedeemedCredit → prettyValue |
        Examples:
            | propValue | exchangeText    |
            |           | Reward Exchange |
            | Exchanged | Exchanged       |

    @motivating
    Scenario Outline: The source column displays customizable referral information if the reward is from a referral
        Given the "reward-source-text" prop is <propValue>
        And a user with a referral reward
        And that reward has <rewardSource>
        When they view the rewards table
        Then then source displays <referralText>
        And under it displays the full name of the <referralUser>
        Examples:
            | propValue                                                                             | rewardSource  | referralText | referralUser  |
            |                                                                                       | REFERRED      | Referred by  | referrer user |
            |                                                                                       | FRIEND_SIGNUP | Referral to  | referred user |
            | {rewardSource, select, FRIEND_SIGNUP {You Referred} REFERRED {Referred you} other {}} | REFERRED      | Referred you | referrer user |
            | {rewardSource, select, FRIEND_SIGNUP {You Referred} REFERRED {Referred you} other {}} | FRIEND_SIGNUP | You Referred | referred user |

    @motivating
    Scenario Outline: The source column displays the existing name for a referral if either the first name or last name does not exist
        Given a user with a referral reward
        And referral user exists
        And referral user has <name>
        But referral user has no <otherName>
        When they view the rewards table
        Then referral user's name is displayed as <name>
        Examples:
            | name       | otherName  |
            | first.name | last.name  |
            | last.name  | first.name |

    @motivating
    Scenario Outline: The source column displays referral as "Anonymous User" if the referral user has no names
        Given a user with a referral reward
        And that reward has <rewardSource>
        And the <referralUser> has no first name
        And the <referralUser> has no last name
        When they view the rewards table
        Then then source displays <sourceText>
        And under it displays "Anonymous User"
        Examples:
            | rewardSource  | referralUser  | sourceText  |
            | FRIEND_SIGNUP | referrer      | Referral to |
            | REFERRED      | referred user | Referred by |

    @motivating
    Scenario Outline: The source column displays referral as "Deleted User" if the referral user is deleted in the system
        Given a user with a referral reward
        And that reward has <rewardSource>
        But <referral> user was deleted
        When they view the rewards table
        Then the source displays <sourceText>
        And under it displays "Deleted User"
        Examples:
            | rewardSource    | referral | sourceText  |
            | "FRIEND_SIGNUP" | referrer | Referral to |
            | "REFERRED"      | referred | Referred by |

    @minutae
    Scenario Outline: Name fallbacks for referral users without names are customizable
        Given <prop> with <value>
        And a user with a referral reward
        But the referral user <hadAction>
        When they view the rewards table
        Then the source displays <value> as the referral user
        Examples:
            | prop           | value           | hadAction                       |
            | deleted-user   | Former Customer | was deleted                     |
            | anonymous-user | Nameless User   | had first and last name deleted |

    @motivating
    Scenario Outline: Source text can be customized
        Given the "reward-source-text" prop is "{rewardSource, select, MANUAL {Support} AUTOMATED {Loyalty Program} other {}}"
        And a user with a <rewardSource> reward
        When they view the rewards table
        Then the source is <sourceText>
        Examples:
            | rewardSource | sourceText      |
            | MANUAL       | Support         |
            | AUTOMATED    | Loyalty Program |