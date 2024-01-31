@owner:andy
@author:andy

Feature: Indirect Tax Form


	Background: A user has submitted their personal information in Tax Form Step One
		Given a user is on the Indirect Tax Form

	@minutia
	@ui
	Scenario: Different selects appear based on which Indirect Tax Detail radio option the user checks
	When they check "I am registered for HST in Canada"
	Then A "Province" select appears and they choose one of the following options:
		| Ontario 				|
		| Alberta 				|
		| British Columbia 		|
		| Manitoba 				|
		| New Brunswick 		|
		| Newfoundland 			|
		| Nova Scotia 			|
		| Prince Edward Island  |
		| Quebec 				|
		| Saskatchewan 			|
		| Northwest Territories |
		| Nunavut 				|
		| Yukon 				|
	But if they check "I am registered for Indirect Tax in a different Country / Region"
	Then a "Country / Region of Indirect Tax" select appears and they choose one <country>
	But if they check "I am not registered for Indirect Tax"
	Then no select appears

	@minutia
	@ui
	Scenario Outline: A user fills out the Indirect Tax Form with invalid values
	When they fill out the form with invalid values for the following fields:
		| Province     					 | <province>     |
		| Indirect Tax 					 | <indirectTax>  |
		| Country/Region of Indirect Tax | <country>      |
		| VAT Number   					 | <vatNumber>    |
	Then the form displays the respective errors for each field:
        | <province>               |          |
        | <indirectTax>            |          |
        | <country>                |          |
        | <vatNumber>              |          |

	@minutia
	Scenario: A general error banner appears upon form submission request failing
	When the user completes the form with their information
	And they press "Continue" to submit the form
	Then a request is sent to the backend with the form data
	But if the request fails
	Then a general error banner appears with <generalTitle> and <generalDescription>
	

    # Scenario Outline: Different inputs are shown depending on the registered region of a user

