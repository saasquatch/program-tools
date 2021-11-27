@author:
@owner:
Feature: Task Card

	Scenario Outline: Task Card View

		Given <points>, <title>, <description>, <buttonText> <buttonLink>,
		Then <points> is shown on the top left corner of the header area
		And <title> is shown in the body area left aligned and in bold text
		And <buttonText> is shown on the bottom right corner of the footer area
		When the user clicks on details icon
		Then <description> becomes visible

		Examples:
			| progress | goal | progressBar           | unit | color |
			| -100     | 500  | ●――――――――――――――――――🎁 | $    | no    |
			| 0        | 500  | ●――――――――――――――――――🎁 | $    | no    |
			| 250      | 500  | ―――――――――●―――――――――🎁 | $    | no    |
			| 500      | 500  | ―――――――――――――――――――🎁 | $    | yes   |
			| 1000     | 500  | ―――――――――――――――――――🎁 | $    | yes   |

	Scenario Outline: Single Action

		Given TaskCard with <progress> and <goal>,
		and showProgressBar is false,
		then <points> is shown on the top left corner of the header area
		And <title> is shown in the body area in bold text and left aligned
		And <buttonText> is shown on the bottom right corner of the footer area
		When the user clicks on details icon
		Then <description> becomes visible

		Examples:
			| progress | goal | progressBar           | unit | color |
			| -100     | 500  | ●――――――――――――――――――🎁 | $    | no    |
			| 0        | 500  | ●――――――――――――――――――🎁 | $    | no    |
			| 250      | 500  | ―――――――――●―――――――――🎁 | $    | no    |
			| 500      | 500  | ―――――――――――――――――――🎁 | $    | yes   |
			| 1000     | 500  | ―――――――――――――――――――🎁 | $    | yes   |


	Scenario Outline: Single Action Repeatable
