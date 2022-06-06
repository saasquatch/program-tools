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

