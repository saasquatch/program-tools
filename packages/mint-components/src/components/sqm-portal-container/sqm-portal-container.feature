@author:kutay
@owner:noah
Feature: Portal Container

	@motivating
	@ui
	Scenario: Horizontal content overflows, but does not stretch
		Given there are two element in the container
		And the first is small
		And the second would stretch the container wider than it's parent
		Then the second one is clipped
		And the first one doesn't stretch

	@landmine
	@ui
	Scenario: `max-width` is required for displaying as a row
		Given I have `direction` to "row"
		And I have not set a `max-width`
		Then it displays as a column

	@motivating
	@ui
	Scenario Outline: Content padding can be customized
		Given prop "padding" has <value>
		Then <padding> is applied to content

		Examples:
			| value      | padding    |
			| none       | no padding |
			| xxx-small  | xxx-small  |
			| xx-small   | xx-small   |
			| x-small    | x-small    |
			| small      | small      |
			| medium     | medium     |
			| large      | large      |
			| x-large    | x-large    |
			| xx-large   | xx-large   |
			| xxx-large  | xxx-large  |
			| xxxx-large | xxxx-large |
			| N/A        | no padding |


	@motivating
	@ui
	Scenario Outline: Gap between content elements can be customized
		Given prop "gap" has <value>
		Then <gap> is applied to elements between content

		Examples:
			| value      | gap        |
			| none       | no padding |
			| xxx-small  | xxx-small  |
			| xx-small   | xx-small   |
			| x-small    | x-small    |
			| small      | small      |
			| medium     | medium     |
			| large      | large      |
			| x-large    | x-large    |
			| xx-large   | xx-large   |
			| xxx-large  | xxx-large  |
			| xxxx-large | xxxx-large |
			| N/A        | no padding |

	@minutia
	@ui
	Scenario: Content can be center aligned in horizontal view
		Given I have supplied the prop "center"
		Then the content is center aligned

	@minutia
	@ui
	Scenario: Content in the last row can span full width with display in horizontal view
		Given I have `display` to "flex"
		Then the content is full width on the last row

	@motivating
	@ui
	Scenario Outline: Content can be aligned along the x-axis
		Given prop "justify-content" has <value>
		Then content within the container is aligned <alignment>

		Examples:
			| value         | alignment          |
			| none          | no alignment       |
			| start         | to the start       |
			| center        | to the center      |
			| end           | to the end         |
			| space-between | with space between |
			| space-around  | with space around  |
			| space-evenly  | with space evenly  |


	@motivating
	@ui
	Scenario Outline: Component background color can be customized
		Given a user is viewing the Portal Container component
		Then the default value is "#ffffff00"
		When the prop "background-color" has <value>
		Then the background has color <backgroundColor>
		Examples:
			| value                 | backgroundColor                     |
			| empty (default value) | var(--sl-color-neutral-0) (#ffffff) |
			| aquamarine            | #7fffd4                             |
