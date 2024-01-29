@owner:zach
@author:zach

Feature: Indirect Tax Form


	Background: A user has submitted their personal information in Tax Form Step One
		Given a user is on the Indirect Tax Form

	@minutia
    Scenario Outline: A user fills out the Indirect Tax Form with the required information
    When they succesfully fill out Tax Form Step One with:
        | First Name               | <firstName>             |
        | Last Name                | <lastName>              |
        | Email                    | <email>                 |
        | Country Code             | <countryCode>           |
        | Currency                 | <currency>              |
        | Participant Type         | <participantType>       |
        | Allow Banking Collection | <allowBankingCollection>|
	Then they must select one or more of the following options and provide their information in the Indirect Tax Form:
	 	| I am registered for HST in Canada 								| <province> | <indirectTaxNumber> |
		| I am registered for Indirect Tax in a different Country / Region  | <country>  | <vatNumber> 		   |
		| I am not registered for Indirect Tax 								| N/A 		 | N/A				   |
	Then they can press the Continue button and move to the next step

	@minutia
	@ui
	Scenario: Different selects appear based on which Indirect Tax Detail option a user checks
	When they check "I am registered for HST in Canada"
	Then A "Province" select appears and they choose one of the following options:
		| BC |
		| NL |
		| PE |
		| ON |
		| MB |
		| QC |
		| NS |
		| NB |
		| SK |
		| AB |
		| YT |
		| NT |
		| NU |
	And if they check "I am registered for Indirect Tax in a different Country / Region"
	Then a "Country / Region of Indirect Tax" select appears and they choose one of the following options
		| countries here |
	And if they check "I am not registered for Indirect Tax"
	Then no select appears
	

    # Scenario Outline: Different inputs are shown depending on the registered region of a user

