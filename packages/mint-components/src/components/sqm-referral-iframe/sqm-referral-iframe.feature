@owner:sam
@author:sam

Feature: Referral Iframe

  Used to provide an external form for submitting referral leads using the current user's referral code

  Background: A user is logged in
    Given there is a logged in user
    And the "iframe-src" is "https://example.com"

  @motivating
  Scenario: Referral code is passed to the iframe as a query parameter
    Given the user has navigated to "/refer"
    And the user's referral code is "BOBBYREFER"
    When the iframe content is loaded
    Then the iframe url will be "https://example.com?rsCode=BOBBYREFER"

  @ui
  Scenario Outline: The height and width of the iFrame can be controlled via props
    Given the iframe content is 1000x1000
    And the "iframe-height" is set to <heightValue>
    And the "iframe-width" is set to <widthValue>
    Then the content of the iframe will be displayed with scrollbars
    And the dimension of the iFrame displayed will be 500x500
    When the "iframe-height" is set to <heightValue>
    And the "iframe-width" is set to <widthValue>
    Then the full content of the iframe will be displayed on the page
    And the dimension of the iFrame displayed will be 1000x1000
    Examples:
      | heightValue | widthValue |
      | 500px       | 500px      |
      | 50%         | 50%        |

  @minutae
  Scenario: Example.com is displayed when no iFrame source is provided
    Given no "iframe-src" is provided
    When a user views the iFrame
    Then "https://example.com" is displayed
    And the users referral code is added as UTM parameter