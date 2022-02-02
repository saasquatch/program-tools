@author:kutay
@owner:kutay
Feature: Card Feed

	The Card Feed component displays Task Card components in a grid layout.

	Background: A user on the portal is viewing the widget
		Given a user viewing the Card Feed component

	@motivating
	Scenario: Card Feed component displays Task Cards given as children slots
		Given a Card Feed component
		And a number of task cards in the children slot
		Then task cards are displayed in a grid layout
		When the component is scaled down or up
		Then the number of columns change to fit the task cards

	@motivating
	Scenario: Card Feed component can have a maximum width
		Given a Card Feed component
		And a number of task cards in the children slot
		And prop "width" has a provided maximum value
		Then task cards are displayed in a grid layout
		When the component is scaled down or up
		Then the width of the component is constrained by the maximum value

	@motivating
	Scenario: Card Feed component gap between task cards can be customized
		Given a Card Feed component
		And a number of task cards in the children slot
		And prop "gap" has a provided value
		Then task cards are displayed in a grid layout
		And the gap between the columns is the provided value