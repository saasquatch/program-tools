@owner:andy
@author:andy

Feature: Indirect Tax Form


	Background: A user has submitted their personal information in Tax Form Step One
		Given a user is on the Indirect Tax Form

	
	@minutia
	Scenario Outline: Different indirect tax inputs are shown depending on the country of a participant
	When <option> is selected based on based the participant <country> from step 1
	Then different <inputs> appear
	Examples:
		| country        | option                                                           | inputs                        |
		| Canada         | I am registered for HST in Canada		                        | Province, Indirect Tax Number |
		| United States  | I am registered for Indirect Tax in a different Country / Region | Country, VAT Number           |
        | United Kingdom | I am registered for Indirect Tax in a different Country / Region | Country, VAT Number           |
        | Egypt          | I am not registered for Indirect tax                             | N/A, N/A                      |

	@minutia
	@ui
	Scenario: The province select should display applicable indirect tax provinces
	When the "I am registered for HST in Canada" option is selected
	Then A Province select appears with the available <provinces>
	Examples:
		| provinces				|
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


	@minutia
	@ui
	Scenario Outline: A participant fills out the Indirect Tax Form with invalid values
	When they fill out the form with invalid values for the following fields:
		| Province     			   | <province>     |
		| Indirect Tax 			   | <indirectTax>  |
		| VAT Number   			   | <vatNumber>    |
	Then the form displays the respective errors for each field:
        | <province>               | Province is required            |
        | <indirectTax>            | Indirect tax number is required |
        | <vatNumber>              | VAT number is required          |

	@minutia
	Scenario: A general error banner appears upon form submission request failing
	When the participant completes the form with their information
	And they press "Continue" to submit the form
	Then a request is sent to the backend with the form data
	But if the request fails
	Then a general error banner appears with <generalTitle> and <generalDescription>
	

