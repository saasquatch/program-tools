@author:kutay
@owner:kutay
Feature: Card Feed

	The Card Feed component displays Task Card components in a grid layout.

	Background: A user on the portal is viewing the widget
		Given a user viewing the Card Feed component

	@motivating
	Scenario: The Card Feed component displays Task Cards given as children slots
		Given a Card Feed component
		And it is wrapping a number of task cards as children
		When the user views the Card Feed
		Then the task cards are displayed in a masonry layout
		When the card feed with grows or shrinks in width
		Then the number of columns adjust to the given width

	@motivating
	@ui
	Scenario Outline: The Card Feed component can have a maximum width
		Given a Card Feed component
		And it is wrapping a number of task cards as children
		And has prop "width" has a provided <value>
		Then the task cards are displayed in a masonry layout
		When the card feed with grows or shrinks in width
		Then the number of columns adjust to the given width
		And the task cards do not exceed <width>
		Examples:
			| value | width |
			|       | 347px |
			| 200   | 200px |
			| 400   | 400px |

	@motivating
	@ui
	Scenario Outline: The Card Feed component gap between task cards can be customized
		Given a Card Feed component
		And it is wrapping a number of task cards as children
		And has prop "gap" has a provided <value>
		Then the task cards are displayed in a masonry layout
		And the gap between the columns is the <gap>
		Examples:
			| value | gap  |
			|       | 24px |
			| 20    | 20px |
			| 50    | 50px |