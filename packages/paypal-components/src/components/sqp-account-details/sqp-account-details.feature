@author:derek
@owner:derek
Feature: Paypal Account Details

    @motivating
    Scenario: Participants can configure their paypal email
        Given a "<sqp-account-details>" component
        And a participant without a "paypalEmail" custom field value
        When they view the component
        Then they see a button to connect their paypal account
        When they click the button
        Then they see the modal
        When they enter their email
        And they confirm their email
        And they click "Save"
        Then the modal closes
        And their email is saved on the participant as their "paypalEmail"

    @minutia
    @ui
    Scenario: Clicking the "Edit" button displays a modal to choose between editing email or disconnecting your email from the integration
        Given a "<sqp-account-details>" component
        And a participant with a "paypalEmail" custom field value
        Then they see an "Edit" button beside the PayPal header
        When they click "Edit"
        Then they see a modal
        And in the top of the modal they see their PayPal in a disabled input
        And they see a brand colour button to change their email
        And below the see a section to disconnect their account

    @motivating
    Scenario: Paypal Email can be changed after configuration
        Given a "<sqp-account-details>" component
        And a participant with a "paypalEmail" custom field value
        When click the "Edit" button
        And click "change account" in the modal
        Then they see the following inputs
            | input         |
            | PayPal Email  |
            | Confirm Email |
        When they change their email
        And confirm
        And click "Save"
        Then the modal closes
        And their new email is saved on the participant as their "paypalEmail"

    @minutia
    Scenario: Participants can disconnect themselves from the PayPal integration
        Given a "<sqp-account-details>" component
        And a participant with a "paypalEmail" custom field value
        When click the "Edit" button
        And click "Disconnect account" in the modal
        Then the modal closes
        And their PayPal email is wiped from their user in SSQT

    @minutia
    Scenario: Paypal email must be a valid email
        Given a participant configuring their paypal email
        But they do not enter a valid email address
        When they click "Save"
        Then they see a validation error saying that the email is invalid
        And the modal isn't closed
        And their "paypalEmail" isn't saved

    @minutia
    Scenario: Paypal email cannot be configured without confirming the field
        Given a user configuring their email
        But they do not enter the confirmation email
        When they click "Save"
        Then they see a validation error saying that they must confirm their email
        And the modal isn't closed
        And their "paypalEmail" isn't saved

    @minutia
    Scenario: The component displays an alert banner if the integration is not configured/enabled
        Given a "<sqp-account-details>" component
        But the tenant has not configured/enabled the PayPal integration
        When a participant views the component
        Then they see a light blue banner
        And text explaining that the integration is not configured/enabled
        And they are unable to connect their email

    @motivating
    Scenario: Payout schedule information is displayed when a user has a PayPal email configured
        Given a "<sqp-account-details>" component
        And a user with a PayPal email
        Then they see a "Payout details" section displaying a large card of their next payout
        And to the right they see a "Schedule" section with 4 cards
        And they see three cards for the next three payouts
        And they see one card for pending rewards
        And they see a brand colour border around the first card to signify that it is selected
        When they click on a different card in the "Schedule" section
        Then that card replaces the card in the "Payout details" section
        And it is selected in the "Schedule" section

    @motivating
    Scenario Outline: Payout details cards show all currencies being paid out for a payout
        Given a "<sqp-account-details>" component
        And a user with a PayPal email
        And they have rewards in <numCurrencies> currencies to be paid out during a singular payout
        When they see the payout details card for that payout
        Then they see the payout amount of the currency with the largest total in the middle of the card
        And they <maySee> text "+ <text> other currencies" below
        And the <maySee> the payout amount of the other currencies seperated by "|" below
        Examples:
            | numCurrencies | maySee | text |
            | 1             | don't  |      |
            | 2             | see    | 1    |
            | 3             | see    | 2    |
            | 4             | see    | 3    |

    @motivating
    Scenario Outline: Payout details cards show payout date and a status pill
        Given a "<sqp-account-details>" component
        And a user with a PayPal email
        When they view a payout details card for <payout>
        Then they see <dateText> in the top left hand corner of the card
        And <color> pill with <text> in the right hand corner
        Examples:
            | payout              | dateText        | color | text        |
            | the next payout     | the payout date | green | Next payout |
            | the 2nd next payout | the payout date | green | Upcoming    |
            | the 3rd next payout | the payout date | green | Upcoming    |



            | pending rewards past the 3 next payouts | Check rewards table for available date | orange | Pending |

    @motivating
    Scenario Outline: Payout details cards show pending and w9 reward totals to be paid out in the future
        Given a "<sqp-account-details>" component
        And a user with a PayPal email
        And they have <rewards>
        When they view the pending payout details card
        Then they see an orange pill with text "Pending" in top top right hand corner
        And they see <sections> on the card with currency totals
        And multi currencies below
        Examples:
            | rewards                                                    | sections                                       |
            | W9 pending rewards                                         | W9 section                                     |
            | scheduled pending rewards beyond the next 3 payouts        | Scheduled pending section                      |
            | W9 and scheduled pending rewards beyond the next 3 payouts | Scheduled pending section and W9 section below |

    @motivating
    Scenario Outline: Payout Schedule cards display the payout amout with the largest total
        Given a "<sqp-account-details>" component
        And a user with a PayPal email
        And rewards to be paid out
        When they view the Schedule card for <payout>
        Then they see <text> in the top left of the card
        And the payout amount of the currency with the largest total in the middle of the card
        Examples:
            | payout                                  | dateText        |
            | the next payout                         | the payout date |
            | the 2nd next payout                     | the payout date |
            | the 3rd next payout                     | the payout date |
            | pending rewards past the 3 next payouts | Pending         |

    @motivating
    Scenario: Payout totals handle rewards with pending periods within
        Given a "<sqp-account-details>" component
        And a user with a PayPal email
        And todays date is "2022-11-02"
        And the tenant timezone is "America/Vancouver"
        And the following rewards
            | reward                                     |
            | Available 25$ USD                          |
            | Pending 25$ USD till 2022-11-04 at 12:00PM |
            | Pending 30$ USD till 2022-11-31 at 11:59PM |
            | Pending 30$ USD till 2023-01-01 at 12:59PM |
            | Pending 30$ USD till 2023-01-01 at 12:01PM |
            | Pending 35$ USD till 2023-02-04 at 5:00PM  |
        And the following payout schedule for the next 3 payouts
            | payoutDate |
            | 2022-12-01 |
            | 2023-01-01 |
            | 2023-02-01 |
        Then they see the following payout schedule totals
            | payoutDate | rewardTotal |
            | 2022-12-01 | 110$ USD    |
            | 2023-01-01 | 30$ USD     |
            | 2023-02-01 | 35$ USD     |

    @motivating
    Scenario: Payout Schedule cards display if there are payouts in multiple currencies
        Given a "<sqp-account-details>" component
        And a user with a PayPal email
        And they have rewards in <numCurrencies> currencies to be paid out during a singular payout
        When they see the payout schedule card for that payout
        Then they see the payout amount of the currency with the largest total in the middle of the card
        And they <maySee> text "+ <text> other currencies" below
        Examples:
            | numCurrencies | maySee | text |
            | 1             | don't  |      |
            | 2             | see    | 1    |
            | 3             | see    | 2    |
            | 4             | see    | 3    |

    @minutia
    Scenario: Payout cards display an empty state when there are no rewards to payout for a scheduled payout
        Given a "<sqp-account-details>" component
        And a user with a PayPal email
        But they have no rewards to be paid out for a scheduled payout
        Then the <card> displays "No rewards" instead of a payout amount
        Examples:
            | card           |
            | Payout details |
            | Schedule       |

    @motivating
    Scenario: The component displays an alert banner if the integration is paused
        Given a "<sqp-account-details>" component
        But the tenant's PayPal integration is paused
        When a participant views the component
        Then they see a light blue banner
        And text explaining that payouts will resume when the integration is resumed
        And they still see the payout schedule

    @minutia
    @ui
    Scenario: A loading state is displayed when the component is loading
        Given a "<sqp-account-details>" component
        When a user views the component
        But the components data is loading
        Then they see a skeleton of the payout cards
