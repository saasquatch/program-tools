@author:noah
@owner:noah

Feature: Link Button

	@ui
	Scenario: When a user clicks the button a link open
		When a user clicks the button
		Then a link opens
		And if "open-in-new-tab" is set to true then the link opens in a new tab

	@ui
	Scenario: Slot content is displayed as button content
		Given there is slot content
		Then the slot content is displayed inside the link button