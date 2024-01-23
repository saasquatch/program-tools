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
		Then they see the status of their Tax Document and Banking Information

	@motivating
	Scenario: View Tax Document Submission is loading
		Given the user has submitted a tax document
		When they view Document Submitted
		Then they see a loading spinner until the end users Tax Document data is available
	
	@minutia
	@ui
	Scenario Outline: The Tax Form header is displayed to the end users
	Given the user has submitted a W9/W8-BEN/W8-BEN-E Tax form
	Then the Tax Form header displays "<documentType> Tax Form"
	Examples:
		| documentType |
		| W9 		   |
		| W8-BEN       |
		| W8-BEN-E     |

	@minutia
	@ui
	Scenario Outline: The date submitted and status of a Tax Form is displayed to end users
		Given the Tax Document is currently <status>
		When they view the Tax Document Submitted
		Then they see a badge with <status> text and a respective <badgeVariant>
		Then they see a message indicating "<taxStatusMessage> on <dateSubmitted>"
		Examples: 
			| status       | badgeVariant | taxStatusMessage              | dateSubmitted   |
			| ACTIVE       | success 	  | Submitted on                  | Jan 17, 2024    |
			| NOT_VERIFIED | neutral      | Awaiting Review. Submitted on | Jan 17, 2024    |
			| NOT_ACTIVE   | danger       | Submitted on                  | Jan 17, 2024    |
			| EXPIRED      | danger       | Expired on                    | Jan 17, 2024    |

	@minutia
	@ui
	Scenario Outline: A Warning Alert is displayed if the end users tax form is invalid
	Given the <status> is "NOT_ACTIVE" or "EXPIRED"
	Then a warning alert indicating the <documentType> with a <taxAlertHeader> and <taxAlertMessage>
	Examples:
		| status 	 | documentType | taxAlertHeader 															 		| taxAlertMessage 				  				|
		| NOT_ACTIVE | W9       	| Your W9 tax form has personal information that doesn't match your profile. 		| Please resubmit a new W9 form. 				|
		| EXPIRED    | W8-BEN-E     | Your W8-BEN-E tax form has expired. 												| Please resubmit a new W8-BEN-E form. 			|

	@unknown
	Scenario: Submit New Tax Document Form
		Given the user is viewing the Tax Document Submission
		When they click the "Submit New Form" button
		Then the system should trigger the callback
		Then they are redirected to the first step to submit a new form
