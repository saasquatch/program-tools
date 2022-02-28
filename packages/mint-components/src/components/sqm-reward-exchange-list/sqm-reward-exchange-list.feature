@author:derek
@owner:derek
Feature: Reward Exchange List

    The Reward Exchange List gives end users the power to exchange their rewards for other rewards.
    It populates a list from the reward exchange rules set up on a given tenant.

    Background:
        Given a tenant with reward exchange rules

    @motivating
    @ui
    Scenario: The empty state is shown if there are no visible exchanges
        Given a user with no visible exchanges
        When they view the reward exchange
        Then no exchange options are displayed
        And they see an image of a present
        And "Redeem Rewards" in bold
        And "Use your points to redeem rewards once they become available" below the bolded text
        And the pagination buttons are disabled

    @minutae
    @ui
    Scenario: A custom empty state can be provided
        Given a user with no visible exchanges
        And a custom empty state has been supplied in the "empty" slot
        When they view the reward exchange
        Then they see the custom empty state

    @motivating
    @ui
    Scenario: A Loading Skeleton is displayed when the reward exchange rules are loading
        Given a user
        When they load the reward exchange list
        Then they see a loading Skeleton
        And it has 8 skeleton cards
        When the reward exchange rules have loaded
        Then the skeleton is replaced with reward exchange options

    @motivating
    Scenario: An error banner appears when the reward exchange list fails to load
        Given a user trying to view the reward exchange list
        But it fails to load
        Then an error banner is displayed
        And it displays "Unable to load reward exchange list. Please try again"

    @motivating
    @ui
    Scenario: The exchange progress bar progresses through the exchange process
        Given a user who is eligible for the tenants reward exchange rules
        When they view the reward exchange list
        Then the process bar displays the following elements
            | elements                                                           |
            | Step 1 `Rewards` title in black                                    |
            | Step 1 circle with green outline, white fill and number 1 in green |
            | Step 2 `Select` title in grey                                      |
            | Step 2 circle with grey fill and number 2 in white                 |
            | Step 3 `Confirm` title in grey                                     |
            | Step 3 circle with grey fill and number 3 in white                 |
            | lines between all steps are greyed out                             |
        When they continue to the selection page
        Then the progress bar displays the following elements
            | elements                                                           |
            | Step 1 `Rewards` title in black                                    |
            | Step 1 circle with white checkmark and green fill                  |
            | Step 2 `Select` title in black                                     |
            | Step 2 circle with green outline, white fill and number 2 in green |
            | Step 3 `Confirm` title in grey                                     |
            | Step 3 circle with grey fill and number 3 in white                 |
            | Green line between step 1 and 2                                    |
            | Grey line between step 2 and 3                                     |
        When they continue to the confirmation page
        Then the progress bar displays the following elements
            | elements                                                           |
            | Step 1 `Rewards` title in black                                    |
            | Step 1 circle with white checkmark and green fill                  |
            | Step 2 `Select` title in black                                     |
            | Step 2 circle with white checkmark and green fill                  |
            | Step 3 `Confirm` title in black                                    |
            | Step 3 circle with green outline, white fill and number 3 in green |
            | Green line between all steps                                       |
        When they continue to the redemption page
        Then the progress bar displays the following elements
            | elements                                          |
            | Step 1 `Rewards` title in black                   |
            | Step 1 circle with white checkmark and green fill |
            | Step 2 `Select` title in black                    |
            | Step 2 circle with white checkmark and green fill |
            | Step 3 `Confirm` title in black                   |
            | Step 3 circle with white checkmark and green fill |
            | Green line between all steps                      |

    @motivating
    Scenario: Users must choose a reward exchange option to continue to the selection page
        Given a user who is eligible for the tenants reward exchange rules
        When they view the reward exchange list
        Then the 'Continue' button is disabled
        When they select a reward exchange card
        Then the card is outlined in brand colour with a brand colour cirlcular check box icon in the top right
        And the continue button is no longer disabled
        When they click "Continue"
        Then they are brought to the selection page

    @motivating
    @ui
    Scenario: Reward exchange rule names and images are used in the reward exchange cards
        Given a tenant reward exchange rule
        And it has name "My Visa Exchange Rule"
        And it has an image
        When a user views the reward exchange list
        Then they see a exchange card with title "My Visa Exchange Rule"
        And the exchange image on the left hand side of the card

    @motivating
    Scenario Outline: Reward exchange source values are displayed on reward exchange cards
        Given a <type> reward exchange rule
        When a user views the reward exchange list
        Then they see <text> under the name on the exchange option cards
        And the pretty values are localized to a user locale
        Examples:
            | type                        | text                                                                |
            | FIXED_GLOBAL_REWARD         | the exchange source pretty value                                    |
            | STEPPED_FIXED_GLOBAL_REWARD | the exchange source min pretty value to the source max pretty value |
            | VARIABLE_GLOBAL_REWARD      | the exchange source min pretty value to the source max pretty value |
            | VARIABLE_CREDIT_REWARD      | the exchange source min pretty value to the source max pretty value |

    @motivating
    Scenario Outline: Reward exchange cards can display customized error messages
        Given a reward exchange rule
        And it has <availabilityPredicate>
        And the reward exchange list has prop "not-available-error" with <value>
        When the user views the reward exchange list
        Then the card for the reward exchange rule is disabled
        And <message> is displayed
        Examples:
            | availabilityPredicate                                         | value                                                                                                           | message                         |
            | 'champion' in user.segments ? "NOT_CHAMPION" : true           | {unavailableReasonCode, select, NOT_CHAMPION {Sorry must be a champion!} other {unavailableReasonCode} }        | Sorry must be a champion!       |
            | user.customFields.purchaseCount < 10 ? "MORE_PURCHASE" : true | {unavailableReasonCode, select, MORE_PURCHASE {Complete 10 purchases to unlock} other {unavailableReasonCode} } | Complete 10 purchases to unlock |

    @motivating
    Scenario: Exchange options are disabled if they put a user over the W9 limit
        Given a user who is approaching their W9 limit
        And a reward exchange rule
        And its destination reward has a US taxable value that would put the user over their limit
        When they view the reward exchange list
        Then the reward exchange card is disabled
        And a "US Tax Limit" error message is displayed on to the right of a exclamation triangle icon
        And the text is orange
        And the icon is orange

    @motivating
    Scenario Outline: Exchange options are disabled if a users lacks enough credit to redeem
        Given a <type> reward exchange rule
        But the user lacks enough credit to exchange for it
        When they view the reward exchange list
        Then the reward exchange card is disabled
        And a <text> error message is displayed on to the right of a exclamation triangle icon
        And the text is orange
        And the icon is orange
        Examples:
            | type                        | text                            |
            | FIXED_GLOBAL_REWARD         | {prettySourceValue} required    |
            | STEPPED_FIXED_GLOBAL_REWARD | {prettySourceMinValue} required |
            | VARIABLE_GLOBAL_REWARD      | {prettySourceMinValue} required |
            | VARIABLE_CREDIT_REWARD      | {prettySourceMinValue} required |

    @motivating
    Scenario: Users can go back to the Rewards page from the Select page
        Given a user viewing the Select page
        Then they see a "Cancel" text button
        And a "Continue to confirmation" brand colour button in the bottom right corner
        When they click "Cancel"
        Then they return to the Rewards page

    @motivating
    Scenario: Users can go back to the Select Page from the Confirm page
        Given a user viewing the Confirm page
        Then they see a "Back" text button
        And a "Redeem" brand colour button in the bottom right corner
        When they click "Back"
        Then they return to the Select Page

    @motivating
    Scenario: Reward rules with visibility predicates that evaluates to false are not shown
        Given a tenant reward exchange rule with visibility predicates that evaluates to false
        When a user views the reward exchange list
        Then they do not see the card for that reward exchange rule

    @motivating
    Scenario Outline: Users can choose their reward option for variable rewards on the Select page
        Given a <type> exchange rule
        And it has the following fields
            | fields      |
            | name        |
            | description |
            | image       |
        When a user views the reward exchange list
        And they progress to the Select page for this exchange
        Then they see the exchange rule image on the left hand side
        And on the right hand side they see the following in this order from top to bottom
            | elements                                                                                          |
            | exchange name                                                                                     |
            | exchange description                                                                              |
            | select list with all exchange options using pretty values, destination reward above source reward |
        Examples:
            | type                        |
            | STEPPED_FIXED_GLOBAL_REWARD |
            | VARIABLE_GLOBAL_REWARD      |
            | VARIABLE_CREDIT_REWARD      |

    @motivating
    Scenario: Users who selected a fixed exchange rule see exchange information on the Select page
        Given a "FIXED_GLOBAL_REWARD" exchange rule
        And it has the following fields
            | fields      |
            | name        |
            | description |
            | image       |
        When a user views the reward exchange list
        And they progress to the Select page for this exchange
        Then they see the exchange rule image on the left hand side
        And on the right hand side they see the following in this order from top to bottom
            | elements                                               |
            | exchange name                                          |
            | exchange source pretty value displayed in brand colour |
            | exchange description                                   |

    @motivating
    Scenario Outline: Users selection variable rewards can only select rewards they are eligible to exchange for
        Given a <type> exchange rule
        When a user views the reward exchange list
        And they progress to the Select page for this exchange
        Then they see a drop down with all the reward exchange selections
        When they click on the drop down
        But they are not eligible for all of the exchanges options <dueToReason>
        Then the ineligble options are disabled
        And under the source value is <text>
        Examples:
            | type                        | dueToReason                     | text                         |
            | STEPPED_FIXED_GLOBAL_REWARD | due to insufficent source value | {prettySourceValue} required |
            | VARIABLE_GLOBAL_REWARD      | due to insufficent source value | {prettySourceValue} required |
            | VARIABLE_CREDIT_REWARD      | due to insufficent source value | {prettySourceValue} required |
            | STEPPED_FIXED_GLOBAL_REWARD | W9                              | US Tax Limit                 |
            | VARIABLE_GLOBAL_REWARD      | W9                              | US Tax Limit                 |
            | VARIABLE_CREDIT_REWARD      | W9                              | US Tax Limit                 |

    @motivating
    Scenario Outline: The Confirm page allows users to view their exchange before committing
        Given a <type> exchange rule
        When a user views the reward exchange list
        And they select the exchange
        And they progress to Confirm page
        Then they see a row with title "Reward"
        And it contains the exchange name
        And it contains the exchange image
        And they <maySee> a row with title "Reward Amount"
        And it <mayContain> <amountTitle>
        And they see a row with title "Cost to Redeem"
        And it contains the source reward pretty value in bolded text
        Examples:
            | type                        | maySee | mayContain      | amountTitle                  |
            | FIXED_GLOBAL_REWARD         | don't  | doesn't contain | N/A                          |
            | VARIABLE_GLOBAL_REWARD      | see    | contains        | the pretty destination value |
            | STEPPED_FIXED_GLOBAL_REWARD | see    | contains        | the pretty destination value |
            | VARIABLE_CREDIT_REWARD      | see    | contains        | the pretty destination value |

    @motivating
    Scenario: An error banner is displayed if an error occurs during redemeption
        Given a user has selected a reward to exchange
        And is on the confirmation page
        When they click "Redeem"
        But an error occurs
        Then an error banner appears
        And it contains details about the error
        And the reward exchange is not completed

    @motivating
    Scenario: Confetti is displayed when a reward exchange succeeds
        Given a user has selected a reward to exchange
        And they are on the confirmation page
        When they click "Redeem"
        And the exchange is successful
        Then they see confetti centered on the success page
        And they see text describing what they exchanged for their new reward
        And they see a "Done" brand colour button
        When they click "Done"
        Then they see the Rewards page

    @motivating
    Scenario: Fuel tank codes are shown when a reward exchange succeeds
        Given a user has selected to exchange for a fuel tank reward
        When they complete the reward exchange
        And are on the success page
        Then they see a textbox with their fuel tank code
        And a clipboard icon
        When they click the clipboard icon
        Then their fuel tank code is copied to their clipboard

    @motivating
    Scenario Outline: Users can exchange for any type of reward
        Given a <type> reward exchange rule for a <reward>
        And a user who has enough source credit to exchange for the reward
        When they go through the exchange flow
        And exchange for their reward
        Then their credit is exchanged for the <reward>
        Examples:
            | type                        | reward         |
            | FIXED_GLOBAL_REWARD         | gift card      |
            | FIXED_GLOBAL_REWARD         | fuel tank code |
            | FIXED_GLOBAL_REWARD         | discount       |
            | FIXED_GLOBAL_REWARD         | credit reward  |
            | STEPPED_FIXED_GLOBAL_REWARD | gift card      |
            | STEPPED_FIXED_GLOBAL_REWARD | discount       |
            | STEPPED_FIXED_GLOBAL_REWARD | credit reward  |
            | VARIABLE_GLOBAL_REWARD      | gift card      |
            | VARIABLE_GLOBAL_REWARD      | discount       |
            | VARIABLE_GLOBAL_REWARD      | credit reward  |
            | VARIABLE_CREDIT_REWARD      | credit reward  |