@owner:andy
@author:andy


Feature: Tax Document Submitted View
        View that informs the user of their Tax Document submission status.

	Background: A user has submitted their Tax Document
		Given a user is on the Tax Document Submitted view

	@motivating
	Scenario: View Tax Document Submitted
		Given the user has submitted a tax document
		When they view Document Submitted
		Then they should see the status of their Tax Document and Banking Information

	@minutia
	@ui
	Scenario Outline: The Tax Form header is controlled via <documentType> prop
	Given the <documentType>
	Then the Tax Form header will display "<documentType> Tax Form"
	Examples:
		| documentType |
		| W9 		   |
		| W8-BEN       |
		| W8-BEN-E     |

	@minutia
	@ui
	Scenario Outline: The Tax Document Submitted badge view is controlled via props
		Given the Tax Document is currently <status>
		When they view the Tax Document Submitted
		And they will see a badge with <status> text and a respective <badgeVariant>
		Then they see a message indicating "<taxStatusMessage> on <dateSubmitted>"
		Examples: 
			| status       | badgeVariant | taxStatusMessage              | dateSubmitted   |
			| ACTIVE       | success 	  | Submitted on                  | Jan 17, 2024    |
			| NOT_VERIFIED | neutral      | Awaiting Review. Submitted on | Jan 17, 2024    |
			| NOT_ACTIVE   | danger       | Submitted on                  | Jan 17, 2024    |
			| EXPIRED      | danger       | Expired on                    | Jan 17, 2024    |

	@minutia
	@ui
	Scenario Outline: A Warning Alert appears based on the <status> prop
	Given the <status> is "NOT_ACTIVE" or "EXPIRED"
	Then a warning alert indicating the <documentType> with a <taxAlertHeader> and <taxAlertMessage> will appear
	Examples:
		| status 	 | documentType | taxAlertHeader 															 		| taxAlertMessage 				  				|
		| NOT_ACTIVE | W9       	| Your W9 tax form has personal information that doesn't match your profile. 		| Please resubmit a new W9 form. 				|
		| EXPIRED    | W8-BEN-E     | Your W8-BEN-E  tax form has personal information that doesn't match your profile. | Please resubmit a new W8-BEN-E form. 			|



	Scenario: Submit New Tax Document Form
		Given the user is viewing the Tax Document Submission
		When they click the "Submit New Form" button
		Then the system should trigger the callback to submit a new Tax Document Form
