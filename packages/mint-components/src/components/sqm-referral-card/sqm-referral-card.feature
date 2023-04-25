@author:kutay
@owner:kutay
Feature: Referral Card

	The Referral Card component takes in two slots and displays them side by side.

	Background: A user on the portal is viewing the widget
		Given a user viewing the Referral Card component

	@motivating
	@ui
	Scenario: Referral Card component displays provided content in left and right slots side by side
		Given a Referral Card component
		And a slot with the name "left"
		And a slot with the name "right"
		When the user views the referral card
		Then the slot contents are displayed the card with equal width
		When the component is scaled down to 499px
		Then the column layout switches to row layout
		And the "left" slot content is displayed above the "right" slot content

	@minutiae
	@ui
	Scenario: Left or right column content spans the whole card if there is no content in the other column
		Given a Referral Card component
		And there content in one column
		And there is no content in the other column
		Then the column with content spans 100% of the card width
		And the column with content respects the container's padding
		And the column without content has zero width

	@motivating
	@ui
	Scenario Outline: Referral Card component content can be vertically aligned start, center, end
		Given a Referral Card component
		And a slot with the name "left"
		And a slot with the name "right"
		And the prop "vertical-alignment" has <value>
		Then slots contents are displayed inside the card
		And slots are vertically aligned to <alignment> of the card
		Examples:
			| value  | alignment  |
			| start  | the top    |
			| center | the center |
			| end    | the bottom |
			| N/A    | the top    |

	@ui
	Scenario Outline: Container border can be toggled
		Given a user is viewing the Referral Card component
		And the prop "remove-border" has <value>
		Then the referral card component's border <maybe> removed
		Examples:
			| value            | maybe |
			| true             | is    |
			| false            | isn't |
			| empty (no value) | is    |

	@motivating
	@ui
	Scenario: Component background color can be customized
		Given a user is viewing the Referral Card component
		And the prop "background-color" has <value>
		Then the background has color <backgroundColor>
		Examples:
			| value                 | backgroundColor                     |
			| empty (default value) | var(--sl-color-neutral-0) (#ffffff) |
			| aquamarine            | #7fffd4                             |

	@motivating
	@ui
	Scenario Outline: Container padding can be customized
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