@author:kutay
@owner:kutay
Feature: Referral Card

	The Referral Card component takes in two slots and displays them side by side.

	Background: A user on the portal is viewing the widget
		Given a user viewing the Referral Card component

	@motivating
	Scenario: Referral Card component displays provided content in left and right slots side by side
		Given a Referral Card component
		And a slot with the name "left"
		And a slot with the name "right"
		Then the slots contents are displayed inside the card
		When the component is scaled down to 499px
		Then the column layout switches to row layout

	@motivating
	Scenario Outline: Referral Card component content can be vertically aligned start, center, end
		Given a Referral Card component
		And a slot with the name "left"
		And a slot with the name "right"
		And prop "vertical-alignment" has <value>
		Then the slots contents are displayed inside the card
		And they are vertically aligned to <value>

		Examples:
			| value  |
			| start  |
			| center |
			| end    |

