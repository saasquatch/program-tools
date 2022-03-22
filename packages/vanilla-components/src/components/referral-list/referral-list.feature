@owner:sam
@author:sam
Feature: Referral List

  The Referral list component shows users a list of their referrals.

  @motivating
  Scenario: Referrer widget only shows referrals/rewards for associated program
    Given I have made referrals in an attribution program "Program A" for user "A"
    And I have made referrals in a different attribution program for "A"
    And I have made referrals in the classic program for "A"
    And I have manually made rewards for "A"
    When I load the "Program A" referrer widget for "A"
    Then I should only see the referrals associated with "Program A"


  @ui
  Scenario: "Referred by" users status label is "referred" until rewarded
    Given I was referred to a program
    When I load my program widget
    Then the user who referred me in the referral list is shown
    And the referral status for that user is not "referral pending"
    But the referral status for that user is "referred"
    And it is colored in green
    When I earn a reward for being referred by that user
    Then the referral status for that user matches the reward earned
    And the status is colored in green


  @ui
  Scenario: Users I refer have the status "Reward Pending" until rewarded
    Given I referred someone to a program
    When I load my program widget
    Then the user I referred in the referral list is shown
    And the referral status for that user is "Reward Pending"
    And the referral status is colored gray
    When I earn a reward for referring that user
    Then the referral status for that user matches the reward earned
    And the status is colored in green


  @ui
  Scenario: Users I refer have the status "Reward Pending" until converted
    Given I referred someone to a program
    And the program does not reward the referrer
    When I load my program widget
    Then the user I referred in the referral list is shown
    And the referral status for that user is "Reward Pending"
    And the referral status is colored gray
    When the referred user triggers the conversion
    Then the referral status for that user says "Referred"
    And the status is colored in green

  @ui
  Scenario Outline: The referral list displays reward descriptions based on the number of rewards and their status
    Given I have a referral
    And the number of rewards for that referral is <numberOfRewards>
    And the statuses for the first reward in the list are <statuses>
    And the reward <mayHave> an expiry date
    Then I see <rewardDescription>

    Examples:
      | statuses          | rewardDescription | numberOfRewards | hasExpiryDate |
      | AVAILABLE         | X or more         | 2 or more       | does not      |
      | CANCELLED         | X or more         | 2 or more       | does not      |
      | REDEEMED          | X or more         | 2 or more       | does not      |
      | EXPIRED           | X or more         | 2 or more       | does not      |
      | CANCELLED         | Cancelled Reward  | 1               | does not      |
      | CANCELLED,EXPIRED | Expired Reward    | 1               | does          |
      | EXPIRED           | Expired Reward    | 1               | does          |
      | AVAILABLE         | Expires in X      | 1               | does          |
      | AVAILABLE         |                   | 1               | does not      |
      | PENDING           | Reward Pending    | 0               | does not      |
      | REDEEMED          | Redeemed          | 1               | does not      |


  @minutia
  Scenario: Setting show-referrer prop to false prevents query for referredByReferral
    Given a user with the same accountId as another user
    And they have been referred
    And the referral list has the prop 'show-referrer="false"'
    When the user views the referral list
    Then the query does not return data for referredByReferral
    And the referral table renders successfully
    But they do not see the referral that referred them

  @landmine
  Scenario: Showing the referrer for a user with a duplicate accountId breaks the referral list
    Given a user with the same accountId as another user
    And they have been referred
    But the referral list does not have the prop 'show-referrer="false"'
    When the user views the referral list
    Then the query fails with a permission error
    And the referral table renders as "undefined"

  @minutia
  Scenario: The referral list can show a users referrer
    Given a user that has been referred
    And they have been referred
    And the referral list does not have the prop 'show-referrer="false"'
    When the user views the referral list
    Then the referral table renders successfully
    And the referrer row is shown at the top of the list

