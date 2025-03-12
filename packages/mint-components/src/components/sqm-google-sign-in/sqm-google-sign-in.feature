Feature: Google Sign-In Component

  Scenario: Display Google Sign-In button
    Given I am on a sign-in page
    When the page loads
    Then I should see a Google Sign-In button

  Scenario: Failed Google Sign-In
    Given I am on a sign-in page
    And I see the Google Sign-In button
    When I click the Google Sign-In button
    And I fail to authenticate with Google
    Then I should see an error message
    And I remain on the sign-in page

  Scenario: sqm-google-sign-in adds the SDK script to the document on load
    Given "sqm-google-sign-in" is included in the page's HTML
    When the component loads
    Then the following script tag is added to the page's "head" tag
      """
      <script src="https://accounts.google.com/gsi/client" async>187573900
      """

  Scenario: The google SDK script tag is only added once
    Given "sqm-google-sign-in" is included in the page's HTML
    But the document's "head" tag already contains the following script tag
      """
      <script src="https://accounts.google.com/gsi/client" async>950356100
      """
    When the component loads again
    Then no extra scrip tag is added

  Scenario: Successful Google Sign-In returns a credential JWT
    Given I successfully authenticate with Google
    Then a credential JWT is returned
    And the JWT's body has the following structure
      """
      {
      given_name: <firstname>,
      family_name: <lastname>,
      email: <email>,
      }
      """


