@author:derek
@owner:derek
Feature: Referral Table Reward Column

    Shows the reward associated with each referral

    Background:
        Given the status column is included in the referral table
        And at least one referral exists

    @motivating
    @ui
    Scenario Outline: The referral reward and it's status are shown for each referral
        Then for each referral reward there exists a reward cell
        And the reward type and value is displayed in the cell
        And the status of each reward is displayed as a pill in the cell
        And rewards of <status> have a <pillColour> pill with the text <statusText>
        And they <maySee> the PayPal icon to the right of the pill
        Examples:
            | status                                                                                        | pillColour | statusText  | maySee    |
            | Available                                                                                     | green      | Available   | don't see |
            | Pending                                                                                       | orange     | Pending     | don't see |
            | Cancelled                                                                                     | red        | Cancelled   | don't see |
            | Expired                                                                                       | red        | Expired     | don't see |
            | Redeemed                                                                                      | blue       | Redeemed    | don't see |
            | redeemed and paid out by the PayPal integration                                               | blue       | Transferred | see       |
            | available but being paid out by the PayPal integration (dateLastAttempted but no datePaidOut) | orange     | In Progress | see       |
            | available and has failed to be paid out by the PayPal integration (meta status is ERROR)      | red        | Failed      | see       |

    @motivating
    Scenario: The pending period of a referral reward is shown if it exists
        Given a reward that is pending
        And the reward has a set pending period
        Then the status pill of the reward will instead have the text "Pending for <relativeTime>"
        And all dates are localized to the users locale
        Examples:
            | relativeTime |
            | 2 days       |
            | 1 week       |
            | 3 months     |
            | 2 years      |

    @motivating
    Scenario: The expiry date of a reward is shown if it exists
        Given a reward that is available
        And the reward has a set expiry date
        Then an additional grey pill will appear next to the status pill with the text "Expiring in <relativeTime>"
        And all dates are localized to the users locale
        Examples:
            | relativeTime |
            | 2 days       |
            | 1 week       |
            | 3 months     |
            | 2 years      |

    @motivating
    Scenario: Each reward can be expanded to show additional details about the reward
        When a reward cell is clicked
        Then it expands to show the following additional information (if it's available):
            | Date the reward was received                                                    |
            | Date the reward was paid out by the PayPal integration (paid out)               |
            | Date the reward payout was started with the PayPal integration (in progress)    |
            | Date the reward payout was last attempeted with the PayPal integration (failed) |
            | Date the reward was cancelled                                                   |
            | Date the reward expires                                                         |
            | Date the reward is pending until                                                |
            | Coupon code                                                                     |
        And all dates are localized to a users locale