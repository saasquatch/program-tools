@owner:sam
@author:sam

Feature: Referral Iframe

  Used to provide an external form for submitting referral leads using the current user's referral code

  Background:
    Given there is a logged in user
    And the "iframe-src" is "https://example.com"

  @motivating
  Scenario: Referral code is passed to the iframe as a query parameter
    Given the user has navigated to "/refer"
    And the user's referral code is "BOBBYREFER"
    When the iframe content is loaded
    Then the iframe url will be "https://example.com?rsCode=BOBBYREFER"

  @ui
  Scenario: Height and width can be controlled via props
    Given the iframe content is 1000x1000
    And the "iframe-height" is set to "500px"
    And the "iframe-width" is set to "500px"
    Then the content of the iframe  will be displayed with scrollbars
    When the "iframe-height" is set to "1000px"
    And the "iframe-width" is set to "1000px"
    Then the full content of the iframe will be displayed on the page
