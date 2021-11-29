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

		Given <points>, <title>, <description>,  <progress>, <goal>, <buttonText>, <buttonLink>,
		Then <points> is shown on the top left corner of the header area
		And <title> is shown in the body area left aligned and in bold text
		And <buttonText> is shown on the bottom right corner of the footer area
		When the user clicks on details icon
		Then <description> becomes visible

		Examples:
			| points | title             | description           | progress | goal | buttonText  | buttonLink      |
			| 20     | Complete a survey | Description of action | 0        | 1    | Take Survey | www.example.com |


	Scenario Outline: Single Action

		Given TaskCard with <progress> and <goal>,
		and showProgressBar is false,
		then <points> is shown on the top left corner of the header area
		And <title> is shown in the body area in bold text and left aligned
		And <buttonText> is shown on the bottom right corner of the footer area
		When the user clicks on details icon
		Then <description> becomes visible


	Scenario Outline: Single Action Repeatable
