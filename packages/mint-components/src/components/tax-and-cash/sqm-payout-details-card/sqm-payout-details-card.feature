@author sam
@owner sam
Feature: Payout Details Card

    Displays the details of the user's next payout via impact

    @motivating
    Scenario Outline: Payout information is shown for users with banking information configured for fixed day schedule
        Given the user has created a valid partner
        And the user has saved banking information with <payoutSchedule> and <payoutDate>
        And the current date is <currentDate>
        Then <payoutMessage> is shown
        And a badge with <badgeText> is shown
        And the payout balance is shown
        And the bank account number preview is shown
        Examples:
            | payoutSchedule | payoutDate | currentDate  | payoutMessage | badgeText    |
            | FIXED_DAY      | 1          | Feb 1, 2024  | Feb 1, 2024   | Payout Today |
            | FIXED_DAY      | 1          | Feb 2, 2024  | Mar 1, 2024   | Next payout  |
            | FIXED_DAY      | 15         | Feb 1, 2024  | Feb 15, 2024  | Next payout  |
            | FIXED_DAY      | 15         | Feb 15, 2024 | Feb 15, 2024  | Payout Today |
            | FIXED_DAY      | 15         | Feb 28, 2024 | Mar 15, 2024  | Next payout  |


    @motivating
    Scenario Outline: Payout information is shown for users with banking information configured for balance threshold
        Given the user has created a valid partner
        And the user has saved banking information with <payoutSchedule> and <payoutThreshold>
        Then <payoutMessage> is shown
        And the payout balance is <payoutBalance>
        And the bank account number preview is shown
        Examples:
            | payoutSchedule    | payoutThreshold | payoutMessage                         | payoutBalance |
            | BALANCE_THRESHOLD | 50 USD          | Payout occurs when balance is 50 USD  | 0             |
            | BALANCE_THRESHOLD | 50 USD          | Payout occurs when balance is 50 USD  | 25            |
            | BALANCE_THRESHOLD | 50 USD          | Payout occurs when balance is 50 USD  | 49            |
            | BALANCE_THRESHOLD | 100 USD         | Payout occurs when balance is 100 USD | 0             |
            | BALANCE_THRESHOLD | 100 USD         | Payout occurs when balance is 100 USD | 50            |
            | BALANCE_THRESHOLD | 100 USD         | Payout occurs when balance is 100 USD | 99            |



    @motivating
    Scenario Outline: Payout information is shown for users with a PayPal email configured for fixed day schedule
        Given the user has created a valid partner
        And the user has saved banking information with <payoutSchedule> and <payoutDate>
        And the current date is <currentDate>
        Then <payoutMessage> is shown
        And the payout balance is shown
        And the PayPal email is shown
        Examples:
            | payoutSchedule | payoutDate | currentDate  | payoutMessage | badgeText    |
            | FIXED_DAY      | 1          | Feb 1, 2024  | Feb 1, 2024   | Payout Today |
            | FIXED_DAY      | 1          | Feb 2, 2024  | Mar 1, 2024   | Next payout  |
            | FIXED_DAY      | 15         | Feb 1, 2024  | Feb 15, 2024  | Next payout  |
            | FIXED_DAY      | 15         | Feb 15, 2024 | Feb 15, 2024  | Payout Today |
            | FIXED_DAY      | 15         | Feb 28, 2024 | Mar 15, 2024  | Next payout  |


    @motivating
    Scenario Outline: Payout information is shown for users with a PayPal email configured for balance threshold
        Given the user has created a valid partner
        And the user has saved banking information with <payoutSchedule> and <payoutThreshold>
        Then <payoutMessage> is shown
        And the payout balance is shown
        And the PayPal email is shown
        Examples:
            | payoutSchedule    | payoutThreshold | payoutMessage                         | payoutBalance |
            | BALANCE_THRESHOLD | 50 USD          | Payout occurs when balance is 50 USD  | 0             |
            | BALANCE_THRESHOLD | 50 USD          | Payout occurs when balance is 50 USD  | 25            |
            | BALANCE_THRESHOLD | 50 USD          | Payout occurs when balance is 50 USD  | 49            |
            | BALANCE_THRESHOLD | 100 USD         | Payout occurs when balance is 100 USD | 0             |
            | BALANCE_THRESHOLD | 100 USD         | Payout occurs when balance is 100 USD | 50            |
            | BALANCE_THRESHOLD | 100 USD         | Payout occurs when balance is 100 USD | 99            |

    @minutia
    Scenario Outline: An error banner is shown if the payout is on hold
        Given the user has a valid partner
        And the user has saved payment information
        And data for payoutsAccount is returned
        When the value for "hold" is <holdValue>
        Then an error banner <mayBe> shown above the payout details
        Examples:
            | holdValue | mayBe  |
            | true      | is     |
            | false     | is not |