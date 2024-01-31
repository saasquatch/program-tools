@owner:andy
@author:andy

Feature: Document Type Form

    Background: A user has submitted their personal information in User Info Form and filled out the Indirect Tax Form
		Given a user is on the Document Type Form

    @minutia
    Scenario: A general error banner appears upon form submission request failing
    When the user completes the form with their information
    And they press "Continue" to submit the form
    Then a request is sent to the backend with the form data
    But if the request fails
    Then a general error banner appears with <generalTitle> and <generalDescription>