@author:
@owner:
Feature: Task Card

	Scenario Outline: Task Card View

		Given <points>, <title>, <description>,  <progress>, <goal>, <buttonText>, <buttonLink>,
		Then <points> is shown on the top left corner of the header area
		And <title> is shown in the body area left aligned and in bold text
		And <buttonText> is shown on the bottom right corner of the footer area
		When the user clicks on details icon
		Then <description> becomes visible

		Examples:
			| points | title             | description           | progress | goal | buttonText  | buttonLink      |
			| 20     | Complete a survey | Description of action | 0        | 1    | Take Survey | www.example.com |

	Scenario Outline: Task Card Single Action

		Given a task card
		And showProgressBar has value false

	Scenario Outline: Single Action Repeatable


	Scenario Outline: Task Card Expiry

		Given a task card component
		And it has expire value true
		And it has <dateExpire>
		Then <dateExpire> is shown on the lower left corner of the task card
